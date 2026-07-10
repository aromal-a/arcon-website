import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Your living space built with Harmony and Elegance",
  description: "Bulit for Dream Home Seekers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
