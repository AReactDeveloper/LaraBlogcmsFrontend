import { login } from "@/app/lib/authHelper";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // import this to set cookies
import axiosInstance from "@/app/lib/axios";

export default async function LoginPage() {

  // Server action to handle form POST
  async function handleSubmit(formData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await login(email, password);

    if (data) {
      //these must be in client
      const cookieStore = await cookies();
      cookieStore.set("token", data.token); // simple set, no protection

      redirect("/admin");
    } else {
      console.log(error.error);
    }
  }

  return (
    <form action={handleSubmit}>
      <label>
        email: <input name="email" type="email" required />
      </label>
      <br />
      <label>
        password: <input name="password" type="password" required />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
