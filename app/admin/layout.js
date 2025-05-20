export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* No parent layout here */}
        <div>Dashboard Only</div>
        {children}
      </body>
    </html>
  );
}
