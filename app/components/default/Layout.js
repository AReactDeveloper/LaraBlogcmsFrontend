import Navbar from "./ui/Navbar/Navbar"
import Sidebar from "./ui/SideBar/Sidebar"
import './styles/main.scss'

import { Open_Sans } from 'next/font/google';
import { getCategories, getTags } from "@/app/lib/apiHelper";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function Layout({ children , siteInfo }) {
  
  const {data : categories} = await getCategories()
  const {data : tags} = await getTags()

  return (
    <span className={openSans.className}>
      <Navbar siteName={siteInfo.siteName} />
      <div className="container">
        <main className='main-area'>
          {children}
          <Sidebar 
            categories={categories} 
            tags={tags} 
          />
        </main>
      </div>
    </span>
  );
}
