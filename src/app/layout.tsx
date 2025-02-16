import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prière du Jour',
  description: 'Une courte prière du jour pour nourrir votre foi et trouver la paix intérieure. Un moment de recueillement quotidien pour vous accompagner spirituellement.',
  keywords:["Prière","Prière du Jour", "Guide du Jour", "Sel du monde"]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}