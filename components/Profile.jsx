import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({name , desc , data , handleEdit , handleDelete, isExternalProfile}) => {
  return  (
    <section className="w-full">
      <h1 className="head_text text-left">
        <spna className="blue_gradient">{isExternalProfile ? data[0]?.creator?.username : name} Profile</spna> 
        </h1>
        <p className="desc text-left">{isExternalProfile ? "" : desc}</p>
        <div className="mt-10 prompt_layout">
          {data.map((post)=>(
            <PromptCard 
             key = {post._id}
             post= {post }
             handleEdit={()=>{handleEdit && handleEdit(post)}}
             handleDelete={()=>{handleDelete && handleDelete(post)}}
             isExternalProfile = {isExternalProfile}
            />
          ))}
        </div>
    </section>
  );
};

export default Profile;
