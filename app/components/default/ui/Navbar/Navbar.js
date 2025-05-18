'use client'
import { FaSearch , FaSun , FaMoon  } from "react-icons/fa";
import styles from  './navbar.module.scss'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";


import Link from 'next/link'
import React, {  useState } from 'react'


export default function NavBar({siteName}) {

  const [navOpen,setNavOpen] = useState(false)

  const handleMobileNav = ()=>{
    setNavOpen(!navOpen)
  }

  return (
    <>
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
            <Link href={'/'}><FaSearch /></Link>
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
        <Link href={'/'}>Blog</Link>
        <Link href={'/'}>About</Link>
        <Link href={'/'}>Pages</Link>
        <Link href={'/'}>Documentation</Link>
        </div>
    <div>

    </div>
    </>
  )
}
