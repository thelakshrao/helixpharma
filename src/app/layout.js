import "./globals.css";

export const metadata = {
  title: "Healix Pharmaceutical | Verify Your Product",
  description: "Verify the authenticity of your Healix Pharmaceutical product.",
};

const fontVars = {
  "--font-display": '"Avenir Next", "Segoe UI Semibold", "Segoe UI", system-ui, sans-serif',
  "--font-body": '"Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
  "--font-data": 'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Consolas, monospace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" style={fontVars}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}