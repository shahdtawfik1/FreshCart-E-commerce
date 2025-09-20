import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";
import { ToastContainer } from "react-toastify";
import MySessionProvider from "@/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MySessionProvider>
            <Navbar />
              {children}
            <ToastContainer />
            <Footer />
        </MySessionProvider>
      </body>
    </html>
  );
}
