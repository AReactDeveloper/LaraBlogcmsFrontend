import { getSiteInfo } from "../lib/apiHelper";

export async function generateMetadata() {
  const {data } = await getSiteInfo();
  const result = data;

  if(!data){
    return {
      title : 'site name',
      description : 'site description'
    }
  }

  return {
    title: result.siteName || 'Default Site Title',
    description: result.siteDescription || 'Default site description',
  };
}

export default async function RootLayout({ children }) {
  const {data , error , loading} = await getSiteInfo();
  const result = data || {};

  const theme = result?.siteTheme || 'default';

  const { default: Layout } = await import(`./components/${theme}/Layout`);

  if(error){
    return(
      <html lang="en">
      <body style={{display:'flex',placeContent:'center',minHeight:'100vh'}}>
          <div className="error-message" style={{height:'fit-content'}}>
            <p>Failed to load resources from the server</p>
          </div>
      </body>
    </html>
     
    )
  }


  return (
    <html lang="en" >
      <body>
        <Layout siteInfo={data}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
