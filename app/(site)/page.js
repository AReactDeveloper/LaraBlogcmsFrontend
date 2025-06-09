import dynamic from "next/dynamic";
import { getSiteInfo } from "../lib/apiHelper";


export default async function Page() {
  
  const { data: siteInfo} = await getSiteInfo();
  const theme = siteInfo.siteTheme
  const Home = dynamic(() => import(`@/app/(site)/components/${theme}/ui/Home/Home`)); 

  return <Home />;
}