"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { toggleFollow } from '@/actions/user.action'

function FollowButton({userId}: {userId: string}) {
    const [isLoading, setIsLoading] = useState(false)

    const handleFollow = async () => {
        setIsLoading(true)
        try {
            await toggleFollow(userId)
            toast.success("User followed successfully")
        } catch (error) {
            toast.error("Error following user")
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <Button
    size={"sm"}
    variant={"secondary"}
    onClick={handleFollow}
    disabled={isLoading}
    className='w-20 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-400 hover:to-cyan-500 
    dark:bg-gradient-to-r dark:from-sky-600 dark:to-cyan-500 dark:hover:from-cyan-600 dark:hover:to-sky-500'
    >
        {isLoading ? <Loader2 className='size-4 animate-spin' /> : "Follow"}
    </Button>
  )
}

export default FollowButton
