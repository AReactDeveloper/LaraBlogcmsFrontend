import SettingsForm from "./components/SettingsForm";

export const metadata = {
  title: 'Global Settings | Admin Dashboard',
  description: 'Manage, create, and edit your Static Pages in the admin dashboard.'
}



export default function SettingsPage() {
    return (
      <>
        <div className="pageHead">
        <h1>General Settings</h1>
        <p>here is a general settings of your website</p>
        </div>
        <SettingsForm />
      </>
    );
  }
  