import { getProfileByUsername } from '@/actions/profile.action'
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({params} : {params: {username: string}}) {
  const user = await getProfileByUsername(params.username);
  
  if (!user) return null;


  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

async function ProfilePage({params} : {params: {username: string}}) {
  const user = await getProfileByUsername(params.username);

  if (!user) notFound();

  return (
    <div>
      Profile page
    </div>
  )
}

export default ProfilePage
