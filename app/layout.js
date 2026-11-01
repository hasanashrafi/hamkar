import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/shop/CartProvider";

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
  title: "فروشگاه حبوبات",
  description: "فروش و ثبت سفارش عدس، لوبیا، نخود و سایر حبوبات",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={myFont.variable}>
      <body className="min-h-screen bg-white text-slate-900">
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
