'use client';

import { useEffect } from "react";
import { logOut } from "@/app/lib/authHelper";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import Head from "next/head";


export default function AutoLogout() {
  const router = useRouter();

  useEffect(() => {
    async function doLogout() {
      const { success } = await logOut();
      if (success) {
        Cookies.remove('token');
        router.push("/login");
      } else {
        console.error("Logout failed");
        router.push("/admin");
      }
    }

    doLogout();
  }, [router]);

  // Optionally render nothing or a loading indicator
  return <>
  <Head>
    <title>Logging Out...</title>
    <meta name="description" content="Logging out and redirecting you to the login page." />
  </Head>
  logging out....
</>;
}
