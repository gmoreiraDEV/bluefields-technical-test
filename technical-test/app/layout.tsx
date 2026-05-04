import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bluefields Startups",
  description: "Dashboard para acompanhar progresso, riscos e próximos passos das startups aceleradas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="font-sans">
      <body>{children}</body>
    </html>
  );
}
