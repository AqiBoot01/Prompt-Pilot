
'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
const {data : session}  = useSession()
const [posts , setPosts] = useState([])
const router = useRouter()



useEffect(()=>{
    const fetchPost =  async () =>{
        const response = await fetch(`api/users/${session?.user?.id}/post` ,{method : "GET"})
        const data = await response.json()
        console.log(data)
        setPosts(data)
    }

     if(session?.user?.id) fetchPost()
},{})


    
const handleEdit = async (post) =>{
  router.push(`/update-prompt?id=${post._id}`)
}
const handleDelete =  async (post) =>{
  const hasConfirmed = confirm('Are you sure you want to delete the prompt')
  if(hasConfirmed) {
    try {
      await fetch(`api/prompt/${post?._id}` , {method : 
        'DELETE'
      })

      const filteredPosts = posts.filter(p=>p._id !== post._id)
      setPosts(filteredPosts)
      
    } catch (error) {
      console.log(error)
      
    }
  }
}

  return (
    <Profile 
     name = 'My'
     desc = "Welcome to your personalized profile page"
     data = {posts}
     handleEdit = {handleEdit}
     handleDelete = {handleDelete}

    />
  )
}

export default MyProfile
