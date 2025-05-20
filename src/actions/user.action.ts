"use server"

import { PrismaClient } from "@/generated/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
// change this to prisma client

const prisma = new PrismaClient();

export async function syncUser(){
    try {
        const {userId} = await auth()
        const user = await currentUser();
        
        if (!userId || !user) return;
        // check if user already exists
        const existUser = await prisma.user.findUnique({
            where:{
                clerkId: userId,
            }
        });
        if (existUser) return existUser;
        
        // create user
        const dbUser = await prisma.user.create({
            data:{
                clerkId: userId,
                name:  `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
            }
        })
        return dbUser;

    } catch (error) {
        console.log("Error in syncUser", error)
    }
}

export async function getUserByClerkId(clerkId: string){
    return prisma.user.findUnique({
        where:{
            clerkId,
        },
        include:{
            _count:{
                select:{
                    followers: true,
                    following: true,
                    posts: true,
                }
            }
        }
    })
}

export async function getDbUserId(){
    const {userId: clerkId} = await auth();
    if(!clerkId) return null;

    const user = await getUserByClerkId(clerkId);
    if(!user) throw new Error("User not found");

    return user.id;
}

export async function getRandomUsers(){
    try {
        const userId = await getDbUserId();

        if(!userId) return [];

        // get 3 random users exclude ourself and users that we are already following
        const randomUsers = await prisma.user.findMany({
            where: {
                AND:[
                    {NOT:{id: userId}},
                    {
                        NOT:{
                            followers:{
                                some:{
                                    followerId: userId,
                                }
                            }
                        }
                    },
                ]
            },
            select:{
                id: true,
                name: true,
                username: true,
                image: true,
                _count: {
                    select: {
                        followers: true,
                    }
                }
            },
            take: 3,
        })
        return randomUsers;
    } catch (error) {
        console.log("Error in getRandomUsers", error);
        return [];
    }

}

export async function toggleFollow(targetUserId: string){
    try {
        const userId =  await getDbUserId();

        if(!userId) return;

        if(userId === targetUserId) throw new Error("You cannot follow yourself");

        const existingFollow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: targetUserId,
                }
            }
        })
        if(existingFollow){
            // unfollow
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: targetUserId,
                    }
                }
            })
        } else {
            // follow
            await prisma.$transaction([ // using this is to make sure that both operations are successful
                // if one of them fails, both of them will fail
                prisma.follows.create({
                    data: {
                        followerId: userId,
                        followingId: targetUserId,
                    }
                }),

                prisma.notification.create({
                    data: {
                        type: "FOLLOW",
                        userId: targetUserId, // user being followed
                        creatorId: userId, // user that is following
                    }
                })
            ])
        }
        revalidatePath("/") // to update the following count on the profile page
        return {success: true}

    } catch (error) {
        console.log("Error in toggleFollow", error);
        return {success: false, error:"Error toggling follow"} // return false if something goes wrong
    }
}