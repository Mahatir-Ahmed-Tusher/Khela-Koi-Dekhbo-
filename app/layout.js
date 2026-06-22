import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-barlow-condensed",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata = {
  title: 'Khela Koi Dekhbo? | খেলা কই দেখবো? — Live FIFA World Cup 2026',
  description: 'Watch FIFA World Cup 2026 live on Somoy TV, T Sports and more. 225 live channels — Sports, Bangladesh, Movies, Music, Kids, News and more.',
  keywords: 'FIFA World Cup 2026, BTV live, Somoy TV, T Sports, live streaming, Bangladesh TV, live game, IPTV',
  openGraph: {
    title: 'খেলা কই দেখবো? — Live Streaming',
    description: 'FIFA World Cup 2026 live + 225 channels',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#080810',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-bg-void text-text-primary">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
