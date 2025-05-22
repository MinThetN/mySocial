"use client"
import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ImageIcon, Loader2Icon, SendIcon } from 'lucide-react'
import { createPost } from '@/actions/post.action'
import toast from 'react-hot-toast'
import ImageUpload from './ImageUpload'

function CreatePost() {

    const {user} = useUser()
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [showImageUpload, setShowImageUpload] = useState(false)

    const handleSubmit = async () => {
        if(!content.trim() && !imageUrl) return
        setIsPosting(true)

        try {
            const result = await createPost(content, imageUrl)
            if(result?.success) {
                // reset the form
                setContent("")
                setImageUrl("")
                setShowImageUpload(false)

                toast.success("Post created successfully")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsPosting(false)
        }
    }

  return (
    <Card className='mb-6'>
        <CardContent className='pt-6'>
            <div className='space-y-4'>
                <div className='flex space-x-2'>
                    <Avatar className='w-10 h-10'>
                        <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                    </Avatar>
                    <Textarea
                        placeholder='Share your thoughts...'
                        className = "min-h-auto resize-none border-none focus-visible:ring-0 p-2 text-base"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isPosting}
                    />
                </div>

                {/* todo: Handle image uploads */}

                {(showImageUpload || imageUrl) && (
                    <div className='border rounded-lg p-4'>
                        <ImageUpload
                            endpoint='postImage'
                            value={imageUrl}
                            onChange={(url) => {
                                setImageUrl(url);
                                if(!url) setShowImageUpload(false)
                            }}
                        />
                    </div>
                )}

                <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex space-x-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary hover:text-white hover:bg-gradient-to-r
                        hover:from-cyan-600 hover:to-blue-600
                        dark:hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-cyan-600 dark:hover:to-indigo-600"
                        onClick={() => setShowImageUpload(!showImageUpload)}
                        disabled={isPosting}
                    >
                        <ImageIcon className="size-4 mr-2" />
                        Photo
                    </Button>
                    </div>
                    <Button
                    className="flex items-center rounded-full" // Post button styles
                    onClick={handleSubmit}
                    disabled={(!content.trim() && !imageUrl) || isPosting}
                    >
                    {isPosting ? (
                        <>
                        <Loader2Icon className="size-4 mr-2 animate-spin" />
                        Posting...
                        </>
                    ) : (
                        <>
                        <SendIcon className="size-4 mr-2 " />
                        Post
                        </>
                    )}
                    </Button>
                </div>

            </div>
        </CardContent>
    </Card>
  )
}

export default CreatePost
