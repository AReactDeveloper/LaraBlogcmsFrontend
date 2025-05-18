import Navbar from "./ui/Navbar/Navbar"
import Sidebar from "./ui/SideBar/Sidebar"
import './styles/main.scss'

import { Open_Sans } from 'next/font/google';
import { getSiteInfo , getCategories , getTags } from "@/app/lib/apiHelper";
import { notFound } from "next/navigation";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function Layout({ children }) {
  let siteInfo = null;
  let categories = [];
  let tags = [];

  const {data : siteInfoData, error: siteInfoError} = await getSiteInfo()
  if(siteInfoData){
    siteInfo = siteInfoData;
  }
  if(siteInfoError){
    return notFound()
  }

  const {data : categoriesData, error: categoriesError} = await getCategories()
  if(categoriesData){
    categories = categoriesData;
  }
  if(categoriesError){
    return notFound()
  }

  const {data : tagsData, error: tagsError} = await getTags()
  if(tagsData){
    tags = tagsData;
  }
  if(tagsError){
    return notFound()
  } 

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
