import type { Metadata } from "next";
import { Lato, Tenor_Sans, Mrs_Saint_Delafield } from "next/font/google";
import "./styles/globals.css";
import "./styles/global.scss";
import { Header } from "./src/components/ui/Header/Header";
import Footer from "./src/components/ui/Footer/Footer";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const tenorSans = Tenor_Sans({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-tenor-sans",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-mrs-saint-delafield",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${lato.variable} ${tenorSans.variable} ${mrsSaintDelafield.variable} antialiased h-full flex flex-col`}
        style={{ fontFamily: `var(--font-tenor-sans)` }}
      >
        <div className="mb-[82px] lg:mb-[109px]">
          <Header />
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
