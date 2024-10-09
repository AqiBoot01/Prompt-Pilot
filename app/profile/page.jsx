
'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter , useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
const {data : session}  = useSession()
const [posts , setPosts] = useState([])
let isExternalProfile  = false
const router = useRouter()
const searchParams = useSearchParams()
const externalProfileId  = searchParams.get('id')
const userId = externalProfileId ? externalProfileId : session?.user?.id
if(externalProfileId != null){
  isExternalProfile = true 
}


console.log(isExternalProfile, 'value of external profile')

useEffect(()=>{
    const fetchPost =  async () =>{
        const response = await fetch(`api/users/${userId}/post` ,{method : "GET"})
        const data = await response.json()
        setPosts(data)
    }

     if(userId) fetchPost()
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
     isExternalProfile = {isExternalProfile}
    />
  )
}

export default MyProfile
