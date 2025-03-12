import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note-Nest",
  description: "A Notes App created by Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}
      >
        <div className="w-full lg:w-[1300px] mx-auto">
          <Navbar></Navbar>
          {children}
        </div>
      </body>
    </html>
  );
}
