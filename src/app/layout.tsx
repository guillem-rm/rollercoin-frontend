import "./globals.css";

import { Sidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex">
                <Sidebar />
                <main className="flex-1 px-8 py-6 bg-primary text-primary h-screen overflow-auto">
                    {children}
                </main>
            </body>
        </html>
    );
}
