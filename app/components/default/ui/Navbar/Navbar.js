'use client'
import { FaSearch , FaSun , FaMoon  } from "react-icons/fa";
import styles from  './navbar.module.scss'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { usePathname  } from 'next/navigation';  // import the router hook


import Link from 'next/link'
import React, {  useEffect, useState } from 'react'
import Modal from "../Modal/Modal";
import Search from "../Search/Search";


export default function NavBar({siteName,articles}) {

  const [navOpen,setNavOpen] = useState(false)
  const [isSearchOpen,setIsSearchOpen] = useState(false)

  const pathname  = usePathname();  // get router instance

  useEffect(() => {
    // Close modal and nav when pathname changes
    setIsSearchOpen(false);
    setNavOpen(false);
  }, [pathname]);

  const handleMobileNav = ()=>{
    setNavOpen(!navOpen)
  }

  return (
    <>
    <Modal 
      isOpen={isSearchOpen} 
      onClose={()=>setIsSearchOpen(false)}
      title={'Search'}
    >
      <Search articles={articles} />
    </Modal>
    <nav className={styles.navbar}>
        <div className={styles.navContaier}>
          <div className={styles.mainNav}>
            <div className={styles.logo}>
                <Link href={'/'}><h1>{siteName}</h1></Link>
            </div>
            <div className={styles.navList}>
              <Link href={'/'}>Home</Link>
              <Link href={'/blog'}>Blog</Link>
              <Link href={'/'}>About</Link>
              <Link href={'/'}>Pages</Link>
              <Link href={'/'}>Documentation</Link>
            </div>
          </div>
          <div className={styles.iconList}>
            <Link href={'/'}><FaMoon /></Link>
            <button  onClick={()=>setIsSearchOpen(true)}><FaSearch size={20} /></button>
          </div>
        </div>
        <div className={styles.mobileNavIcon}>
          <button onClick={handleMobileNav}>
            {navOpen ? <IoCloseSharp size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
    </nav>
      <div className={`${styles.mobileNav} ${navOpen ? styles.active : ''}`}>
        <Link href={'/'}>Home</Link>
        <Link href={'/blog'}>Blog</Link>
        <Link href={'/'}>About</Link>
        <Link href={'/'}>Pages</Link>
        <Link href={'/'}>Documentation</Link>
        <div className={styles.iconList}>
            <Link href={'/'}><FaMoon /></Link>
            <button  onClick={()=>setIsSearchOpen(true)}><FaSearch size={20} /></button>
        </div>
      </div>
    <div>

    </div>
    </>
  )
}
