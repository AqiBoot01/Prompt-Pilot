"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const [filteredPosts , setFilteredPosts] = useState([])

  useEffect(() => {
    const fetchPrompts = async () => {
      const respose = await fetch("/api/prompt", {
        method: "GET",
      });
      const data = await respose.json();
      setPost(data);
      setFilteredPosts(data)
    };
    fetchPrompts();
  }, []);

  const handleSearchChange = (e) => {
     e.preventDefault()
     setSearchText(e.target.value)
  };

  const handleEnterPress =(e) =>{
    if(e.key == 'Enter') {
      e.preventDefault()

      const filteredPost = post.filter((p)=>{
        return (
          p.creator?.username.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          p.prompt.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          p.tag.toLowerCase() === searchText.toLowerCase().trim() 
        )     
      })

      setFilteredPosts(filteredPost)
      
    }

  }

  const handleTagClick =(tag)=>{
    if(tag !== ''){
      setSearchText(tag)
      const filteredPost = post.filter((p)=>{
        return (
          p.tag.toLowerCase() === tag.toLowerCase().trim() 
        )     
      })
  
      setFilteredPosts(filteredPost)
    }
  }

  return (
    <section className="feed">
      <form className="w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username."
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleEnterPress}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
