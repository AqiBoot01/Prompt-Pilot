
'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import Profile from '@components/Profile'

const MyProfile = () => {
const {data : session}  = useSession()
const [posts , setPosts] = useState([])



useEffect(()=>{
    const fetchPost =  async () =>{
        const response = await fetch(`api/users/${session?.user?.id}/post` ,{method : "GET"})
        const data = await response.json()
        console.log(data)
        setPosts(data)
    }

     if(session?.user?.id) fetchPost()
},{})


    
const handleEdit = () =>{}
const handleDelete = () =>{}

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
