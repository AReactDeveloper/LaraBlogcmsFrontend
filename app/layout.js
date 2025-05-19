import React from 'react';
//import { Analytics } from "@vercel/analytics/next"
import { getSiteInfo } from './lib/apiHelper';

//cache the site info to avoid reputative requests
let siteInfoCache;
let cacheTime = 0;
const cacheDuration = 600000; 

async function getSiteInfoCached() {
  const currentTime = new Date().getTime();
  if (!siteInfoCache || currentTime - cacheTime > cacheDuration) {
    siteInfoCache = await getSiteInfo();
    cacheTime = currentTime;
  }
  return siteInfoCache;
}



export async function generateMetadata() {
  const { data } = await getSiteInfoCached();

  return {
    title: data.siteName,
    description: data.siteDescription,
  };
}

export default async function RootLayout({ children }) {
  const { data } = await getSiteInfoCached();

  const theme = data?.siteTheme || 'default';

  const { default: Layout } = await import(`./components/${theme}/Layout`);

  return (
    <html lang="en">
      <body>
        <Layout siteInfo={data}>
          {children}
        </Layout>
      </body>
    </html>
  );
}