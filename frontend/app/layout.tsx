import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kinesis Technical Society | KTS Official",
  description:
    "Kinesis Technical Society is the university's premier open source, engineering, and innovation society.",
  icons: {
    icon: [{ url: "/kts-logo.webp", type: "image/webp" }],
  },
  openGraph: {
    title: "Kinesis Technical Society",
    description: "Empowering student innovators, engineers, and open-source contributors.",
    type: "website",
  },
};

import UpcomingEventsBanner from "./components/UpcomingEventsBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${spaceGrotesk.variable} ${geistMono.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('kts-theme');
                  var theme = stored === 'light' ? 'light' : 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  document.documentElement.dataset.theme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <UpcomingEventsBanner />
        {children}
      </body>
    </html>
  );
}

