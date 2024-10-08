"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter , useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(()=>{
    const getPromptDetails = async ()=>{
        console.log('inthe functions')
        const response = await fetch(`api/prompt/${promptId}` , {method : "GET"})
        const data = await response.json()
        console.log(data, 'data////')

        setPost({
            prompt : data.prompt,
            tag : data.tag
        })

    }
    if(promptId) getPromptDetails()
  },[promptId])


  const updatePrompt = async (e) =>{
    e.preventDefault()
    setSubmitting(true)
    try {
        const response = await fetch(`api/prompt/${promptId}` , 
        {
            method : 'PATCH',
            body : JSON.stringify({
                prompt : post.prompt,
                tag : post.tag 
            })
        })
        if (response.ok) {
            router.push("/profile");
        }
    } catch (error) {
        console.log(error)
        
    }
    finally {
     setSubmitting(false);
  }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
