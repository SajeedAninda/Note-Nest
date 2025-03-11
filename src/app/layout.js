import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note-Nest",
  description: "A Notes App created by Next JS",
  icons: {
    icon: "/note-nest-logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
