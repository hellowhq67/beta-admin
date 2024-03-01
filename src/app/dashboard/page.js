import AdminPanel from '@/components/AdminPanel'
import React from 'react'
import styles from './style.module.css'
import Dasborad from '@/components/dasborad/Dasborad'
import AdminSidebar from '@/components/Sidebar/AdminSidebar'
import Header from '@/components/Header/Header'
export default function page() {
  return (
    <div className={styles.wrapper}>
      <Header/>
     <div className={styles.flex}>
     <AdminSidebar/>
       <Dasborad/>

     </div>
    </div>
  )
}
