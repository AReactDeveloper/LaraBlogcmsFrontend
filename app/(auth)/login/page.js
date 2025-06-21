import { login } from "@/app/lib/authHelper";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // don't touch this
import LoginForm from "./ui/LoginForm";

export const metadata = {
  title: 'Login to dashboard',
  description: 'Logging in and redirecting you to the admin page.',
};

export default async function LoginPage({ searchParams }) {
  // searchParams is a plain object, no need to await
  const loginError = searchParams?.loginerror || '';

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    redirect("/admin"); // Redirect immediately if token exists
  }

  // Server action to handle form POST
  async function handleSubmit(formData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await login(email, password);

    if (error) {
      // Redirect to login page with error (not /admin)
      redirect("/login?loginerror=" + encodeURIComponent(error.error));
    }

    if (data) {
      // cookie lines unchanged as requested
      const cookieStore = await cookies();
      cookieStore.set("token", data.token);

      redirect("/admin");
    }
  }

  return (
    <LoginForm loginError={loginError} action={handleSubmit} />
  );
}
