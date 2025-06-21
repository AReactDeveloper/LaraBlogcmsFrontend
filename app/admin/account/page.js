import AuthorSettings from "./components/AuthorSettings";
import EmailSettings from "./components/EmailSettings";
import PasswordSettings from "./components/PasswordSettings";

export const metadata = {
  title: 'Account Settings | Admin Dashboard',
  description: 'here is a Account settings of your admin account.'
}



export default function SettingsPage() {
    return (
      <>
        <div className="pageHead">
            <h1>Account Settings</h1>
            <p>here is a Account settings of your admin account</p>
        </div>
        {/** form */}
        <AuthorSettings />
        <br />
        <EmailSettings />
        <br />
        <PasswordSettings />
      </>
    );
  }
  