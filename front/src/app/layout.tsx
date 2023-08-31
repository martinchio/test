import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WB Email Tester",
  description: "An Email Test app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ height: "100vh" }}
        className="flex items-center justify-center"
      >
        <main className="p-8 border border-purple-600 rounded-lg lg:m-32 bg-white w-full m-8">
          {children}
        </main>
      </body>
    </html>
  );
}
