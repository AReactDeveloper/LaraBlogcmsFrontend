import { getSiteInfo } from "../lib/apiHelper";
import Script from "next/script"; 

export async function generateMetadata() {
  const { data } = await getSiteInfo();

  if (!data) {
    return {
      title: "Site name",
      description: "Default site description",
      keywords: "nextjs, blog, react, seo, javascript",
    };
  }

  const dynamicKeywords = [
    ...(data.siteName?.split(" ") || []),
    ...(data.siteDescription?.split(" ") || []),
    "nextjs",
    "react",
    "seo",
    "blog",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: `${data.siteName} | ${data.siteDescription}` || "Default Site Title",
    description: data.siteDescription || "Default site description",
    keywords: dynamicKeywords,
    alternates: {
      canonical: process.env.NEXT_PUBLIC_FE_URL || "https://yourdomain.com",
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_FE_URL || "https://yourdomain.com"),
    openGraph: {
      title: `${data.siteName}`,
      description: data.siteDescription,
      url: process.env.NEXT_PUBLIC_FE_URL || "https://yourdomain.com",
      siteName: data.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.siteName,
      description: data.siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    themeColor: "#ffffff",
  };
}

export default async function RootLayout({ children }) {
  const { data, error } = await getSiteInfo();

  if (error) {
    return (
      <html lang="en">
        <body style={{ display: "flex", placeContent: "center", minHeight: "100vh" }}>
          <div className="error-message" style={{ height: "fit-content" }}>
            <p>Failed to load resources from the server</p>
            <p style={{ color: "red" }}>{error}</p>
          </div>
        </body>
      </html>
    );
  }

  const theme = data.siteTheme;
  const { default: Layout } = await import(`./components/${theme}/Layout`);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics - replace G-XXXXXXXXXX with your real Measurement ID */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GA_KEY}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QV9J04C4N7');
          `}
        </Script>
      </head>
      <body>
        <Layout siteInfo={data}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
