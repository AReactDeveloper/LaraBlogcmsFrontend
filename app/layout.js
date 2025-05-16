import React from 'react';

import { getSiteInfo } from "@/app/lib/apiHelper";

//get site info
let data = null;
try {
  data = await getSiteInfo();
} catch (error) {
  data = { data: { siteName: 'Default Site Name' } };
}


export const metadata = {
  title: data?.data?.siteName + ' | ' + data?.data?.siteDescription|| 'Site Name',
  description: data?.data?.siteDescription || 'Site Name',
}


export default async function RootLayout({children}) {
  const theme = data?.data?.siteTheme; 

  // Dynamically import Navbar based on the theme
  const { default: Layout } = await import(`./components/${theme}/Layout`);

  return (
    <html lang="en">
      <body>
        <Layout>
        {children}
        </Layout>
      </body>
    </html>
  );
}
