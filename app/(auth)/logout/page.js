'use client';

import { logOut } from "@/app/lib/authHelper";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();

    const { success } = await logOut();

    if (success) {
      router.push("/login");
    } 
  };

  return (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
