import Navbar from "./ui/Navbar/Navbar"
import Sidebar from "./ui/SideBar/Sidebar"
import './styles/main.scss'

import { Open_Sans } from 'next/font/google';
import { getArticles, getCategories, getPages, getTags } from "@/app//(site)/lib/apiHelper";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function Layout({ children , siteInfo }) {
  
  const {data : categories} = await getCategories()
  const {data : tags} = await getTags()
  const {data: articles} = await getArticles();
  const {data: pages} = await getPages();


  return (
    <span className={openSans.className}>
      <Navbar articles={articles} siteName={siteInfo.siteName} />
      <div className="container">
        <main className='main-area'>
          {children}
          <Sidebar 
            categories={categories} 
            tags={tags} 
            pages={pages}
          />
        </main>
      </div>
    </span>
  );
}
