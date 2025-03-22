import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/Authentication/AuthProvider";
import { Toaster } from "react-hot-toast";
import TanstackClientProvider from "@/components/TanstackClientProvider/TanstackClientProvider";
import { SearchProvider } from "@/components/SearchContext/SearchProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note-Nest",
  description: "A Notes App created by Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster></Toaster>
        <SearchProvider>
          <TanstackClientProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </TanstackClientProvider>
        </SearchProvider>
      </body>
    </html>
  );
}

