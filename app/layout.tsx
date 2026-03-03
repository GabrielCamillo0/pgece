import type { ReactNode } from "react";
import type { Metadata } from "next";
import { I18nClientProvider } from "@/i18n/I18nClientProvider";
import "../src/index.css";
import "../src/styles/galactic.css";

export const metadata: Metadata = {
  title: "pgece – Portfolio",
  description:
    "Portfolio for agencies and digital businesses, focused on performance and user experience.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <I18nClientProvider>
          <div className="global-bg-wrapper">
            {children}
          </div>
        </I18nClientProvider>
      </body>
    </html>
  );
}

