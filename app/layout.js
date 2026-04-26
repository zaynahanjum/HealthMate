import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "HealthMate – Daily Wellness Tracker",
  description: "Track your medications, water intake, sleep, and diet in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-outfit">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
