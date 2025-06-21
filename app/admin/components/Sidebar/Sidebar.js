'use client'

import { usePathname } from 'next/navigation'
import { GrOverview } from 'react-icons/gr'
import { RiArticleFill, RiLayout5Fill } from 'react-icons/ri'
import { BiSolidCategory } from 'react-icons/bi'
import { FaTags, FaComments } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { LuFileSpreadsheet, LuFileSymlink } from 'react-icons/lu'
import { IoMdAnalytics } from 'react-icons/io'
import { FaUserAlt } from "react-icons/fa";

import Link from 'next/link'
import styles from './sidebar.module.scss'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/admin', icon: <GrOverview />, label: 'Dashboard Overview' },
    { href: '/admin/articles', icon: <RiArticleFill />, label: 'Articles' },
    { href: '/admin/categories', icon: <BiSolidCategory />, label: 'Categories' },
    { href: '/admin/tags', icon: <FaTags />, label: 'Tags' },
    { href: '/admin/theme', icon: <RiLayout5Fill />, label: 'Theme' },
    { href: '/admin/analytics', icon: <IoMdAnalytics />, label: 'Analytics' },
    { href: '/admin/pages', icon: <LuFileSpreadsheet />, label: 'Pages' },
    { href: '/admin/comments', icon: <FaComments />, label: 'Comments' },
    { href: '/admin/files', icon: <LuFileSymlink />, label: 'Files' },
    { href: '/admin/settings', icon: <FaGear />, label: 'Settings' },
    { href: '/admin/account', icon: <FaUserAlt />, label: 'Account Settings' },
  ]

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Dashboard</h2>
      <nav className={styles.nav}>
        {links.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
            aria-current={pathname === href ? 'page' : undefined}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
