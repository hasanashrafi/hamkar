import localFont from "next/font/local";

import "./globals.css";



const myFont = localFont({
  src: [
    { path: "../public/fonts/Dana/woff2/DanaFaNum-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Dana/woff2/DanaFaNum-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Dana/woff2/DanaFaNum-DemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-Dana",
  display: "swap",
});

export const metadata = {
  title: "Hamkar",
  description: "hamkar app for all people need a job",
};

import ToastProvider from '../components/ui/ToastProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${myFont.variable} font-sans`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
