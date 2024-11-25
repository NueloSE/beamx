import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StarknetProvider } from "@/components/starknet-provider";

export const metadata: Metadata = {
  title: "BEAM X",
  description: "ALL ABOUT MEMECOIN WEBSITE ON STARKNET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StarknetProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
