import BlogForm from '@/components/Forms/blogFormPage/BlogForm'
import Header from '@/components/Header/Header'
import AdminSidebar from '@/components/Sidebar/AdminSidebar'
import React from 'react'

export default function page() {
  return (
    <div>
      <Header/>
      <div style={{display:"flex"}}>
        <AdminSidebar/>
      <BlogForm/>
      </div>
      
    </div>
  )
}
