'use server'
import SettingsForm from "./components/SettingsForm";

export default async function SettingsPage() {

    return (
      <>
        <h1>General Settings</h1>
        <SettingsForm />
      </>
    );
  }
  