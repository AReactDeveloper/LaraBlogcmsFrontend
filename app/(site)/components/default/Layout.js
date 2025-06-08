import Navbar from "./ui/Navbar/Navbar"
import Sidebar from "./ui/SideBar/Sidebar"
import './styles/main.default.scss'

import { getArticles, getCategories, getPages, getTags } from "@/app/lib/apiHelper";

export default async function Layout({ children , siteInfo }) {

  const { data: categories } = await getCategories();
  const { data: tags } = await getTags();
  const { data: articles } = await getArticles();
  const { data: pages } = await getPages();


  return (
    <>
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
    </>
  );
}
