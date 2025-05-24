import SettingsForm from "./components/SettingsForm";

export const metadata = {
  title: 'Settings Page',
  description: '',
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
  