import { getRandomUsers } from '@/actions/user.action'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import FollowButton from './FollowButton';


async function WhoToFollow() {
  const users = await getRandomUsers();
  if(users.length === 0) return null
 
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Who To Follow
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
            {users.map((user) => (
                <div key={user.id} className="flex gap-2 items-center justify-between p-2 
                rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ">
                    <div className="flex items-center gap-1 min-w-0">
                        <Link href={`/profile/${user.username}`} className='shrink-0'>
                        <Avatar className='w-8 h-8'>
                            <AvatarImage src={user.image ?? "/avatar.png"} />
                        </Avatar>
                        </Link>
                        <div className="text-xs min-w-0 flex-1">
                        <Link href={`/profile/${user.username}`} className="font-medium cursor-pointer break-words block max-w-[120px]">
                            {user.name}
                        </Link>
                        <p className="text-muted-foreground max-w-[120px] truncate">@{user.username}</p>
                        <p className="text-muted-foreground">{user._count.followers} followers</p>
                        </div>
                    </div>
                    <FollowButton userId={user.id} />
                </div>
            ))}
            </div>
      </CardContent>
    </Card>
  )
}

export default WhoToFollow
