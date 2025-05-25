import Navbar from "./ui/Navbar/Navbar"
import Sidebar from "./ui/SideBar/Sidebar"
import './styles/main.scss'

import { Open_Sans } from 'next/font/google';
import { getArticles, getCategories, getPages, getTags } from "@/app/lib/apiHelper";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function Layout({ children , siteInfo }) {

  const { data: categories } = await getCategories();
  console.log('categories:', categories); // ✅ Check if it's an array

  const { data: tags } = await getTags();
  console.log('tags:', tags);

  const { data: articles } = await getArticles();
  console.log('articles:', articles);

  const { data: pages } = await getPages();
  console.log('pages:', pages);

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
