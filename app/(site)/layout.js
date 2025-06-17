import { getSiteInfo } from "../lib/apiHelper";
import Script from "next/script"; // <-- Import next/script for Google Analytics
import AnalyticsTracker from "./components/AnalyticsTracker/AnalyticsTracker";

export async function generateMetadata() {
  const { data } = await getSiteInfo();

  if (!data) {
    return {
      title: "site name",
      description: "site description",
    };
  }

  return {
    title: data.siteName || "Default Site Title",
    description: data.siteDescription || "Default site description",
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
        <AnalyticsTracker />
      </body>
    </html>
  );
}
