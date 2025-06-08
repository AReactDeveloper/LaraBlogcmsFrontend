import ThemeForm from "./ui/ThemeForm";

export const metadata = {
  title: 'Theme Settings | Admin Dashboard',
  description: 'here is a general Theme settings of your website.'
}



export default function ThemesPage() {
    return (
      <>
        <div className="pageHead">
        <h1>Themes</h1>
        <p>here is a general Theme settings of your website</p>
        </div>
        <ThemeForm />
      </>
    );
  }
  