import React from 'react';
import { getSiteInfo } from "@/app/lib/apiHelper";

export const metadata = async () => {
  const { data: SiteInfoData, error: SiteInfoError } = await getSiteInfo();

  return {
    title: SiteInfoData?.siteName
      ? `${SiteInfoData.siteName} | ${SiteInfoData.siteDescription || ''}`
      : 'Site Name',
    description: SiteInfoData?.siteDescription || 'Default description',
  };
};

export default async function RootLayout({ children }) {
  const { data: SiteInfoData, error: SiteInfoError } = await getSiteInfo();

  const theme = SiteInfoData?.siteTheme || 'default';

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
