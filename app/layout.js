import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingOverlay from "./components/LoadingOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AlgoMentor",
  description: "Allumez Votre Parcours de Code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        <LoadingOverlay />
        <Toaster
          position="top-center" // Adjust position as needed (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
          reverseOrder={false}
          toastOptions={{
            // Define default options for all toasts
            className: '',
            duration: 3000, // How long the toast stays (in ms)
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
        <Footer/>
      </body>
    </html>
  );
}
