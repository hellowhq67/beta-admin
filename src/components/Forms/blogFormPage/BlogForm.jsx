"use client";
import React from "react";
import style from "./Style.module.css";
import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import { ToastContainer, toast } from "react-toastify";
function BlogForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [blogimg, setBlogImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      desc,
      blogimg: imageUrl,
    };

    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setTitle("");
      setDesc("");
      setImageUrl("");
      toast.success("Blog post created successfully", { autoClose: 2000 }); // Show success toast
    } else {
      console.error("Error creating blog post:", response.statusText);
      toast.error("Failed to create blog post"); // Show error toast
    }
  };
  return (
    <form className={style.formContainer} onSubmit={handleSubmit}>
      <ToastContainer />
      <label htmlFor="title" className={style.label}>
        Title:
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={style.input}
      />
      <label className={style.label} htmlFor="desc">
        Description:
      </label>
      <textarea
        id="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <label htmlFor="blogimg">Image:</label>
      <div className={style.dropzone}>
        {!imageUrl && (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              const fileUrl = res?.[0]?.url;
              setImageUrl(fileUrl);
              console.log("Files: ", res);
            }}
            onUploadError={(error) => {
              console.log(error);
            }}
          />
        )}

        {/* Render the uploaded image if imageUrl2 is available */}
        {imageUrl && (
          <div>
            <img
              width={220}
              src={imageUrl}
              className={style.imgs}
              alt="Uploaded Image"
            />
            {/* Button to remove the uploaded image and show UploadDropzone again */}
            <button onClick={() => setImageUrl(null)}>Remove Image</button>
          </div>
        )}
      </div>
      <button type="submit">upload</button>
    </form>
  );
}

export default BlogForm;
