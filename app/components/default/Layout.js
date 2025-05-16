import Navbar from "./ui/Navbar/Navbar"
import './styles/main.scss'

import { Open_Sans } from 'next/font/google';
import { getSiteInfo } from "@/app/lib/apiHelper";

//get site name
let data = null;
try {
  data = await getSiteInfo();
} catch (error) {
  data = { data: { siteName: 'Default Site Name' } };
}

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default async function Layout({ children }) {

  return (
    <main className={openSans.className}>
      <Navbar siteName={data?.data?.siteName} />
      {children}
    </main>
  );
}
