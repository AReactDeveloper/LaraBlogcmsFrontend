import Sidebar from '../admin/components/Sidebar/Sidebar';
import './styles/main.scss'

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* No parent layout here */}
        <div className="dashboard">
          <Sidebar />
          <main className="main-content">
          {children}
          </main>
        </div>
      </body>
    </html>
  );
}
