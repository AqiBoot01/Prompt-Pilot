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
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const respose = await fetch("/api/prompt", {
        method: "GET",
      });
      const data = await respose.json();
      setPost(data);
    };
    fetchPrompts();
  }, []);

  const handleSearchChange = (e) => {};
  return (
    <section className="feed">
      <form className="w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
