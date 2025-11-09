import "./globals.css";

import { Sidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex">
                <Sidebar />
                <main className="flex-1 p-4 bg-gray-100 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
