"use server"

import { PrismaClient } from "@/generated/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"
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