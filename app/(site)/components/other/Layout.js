import Navbar from "./ui/Navbar/Navbar.js"
import Sidebar from "./ui/SideBar/Sidebar.js"
import './styles/main.other.scss'


import { getArticles, getCategories, getPages, getTags } from "@/app/lib/apiHelper";

export default async function Layout({ children , siteInfo }) {


  const { data: categories } = await getCategories();
  const { data: tags } = await getTags();
  const { data: articles } = await getArticles();
  const { data: pages } = await getPages();


  return (
    <>

        <Navbar siteName={siteInfo.siteName} />        
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    {children}
                </div>
                <Sidebar categories={categories} tags={tags} pages={pages} />
            </div>
        </div>

        <footer className="py-5 bg-dark">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" defer></script>
    </>
  );
}
