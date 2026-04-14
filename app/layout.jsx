import "./globals.css";
import Preloader from "../components/preloader/Preloader";

export const metadata = {
  title: "Tijaruk - Your Complete Trade & Growth Partner",
  description:
    "Tijaruk connects Saudi Arabia-based wholesalers, suppliers, and retailers to global markets through trusted partnerships.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
