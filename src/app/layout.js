import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note-Nest",
  description: "A Notes App created by Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full lg:w-[1270px] mx-auto">
          <Navbar />
          <div className="flex w-full">
            <div className="w-1/5">
              <Sidebar />
            </div>
            
            <div className="w-4/5 flex-grow">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

