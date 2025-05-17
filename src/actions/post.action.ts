"use server"

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image: string){
    try {
        const uerId = await getDbUserId();

        const post = await prisma.post.create({
            data:{
                content,
                image,
                authorId: uerId,
            }
        })
        revalidatePath("/") // when user creates a post, it will be immediately updated on the page
        return { success: true, post};
    } catch (error) {
        console.log("Failed to create post", error);
        return { success: false, error: "Failed to create post"}
    }
}