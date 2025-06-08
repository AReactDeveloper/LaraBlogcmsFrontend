import dynamic from "next/dynamic";
import { getSiteInfo } from "../lib/apiHelper";

const { data: siteInfo} = await getSiteInfo();

const theme = siteInfo.siteTheme

console.log(theme)

const Home = dynamic(() => import(`@/app/(site)/components/${theme}/ui/Home/Home`)); 

export default function Page() {
  return <Home />;
}