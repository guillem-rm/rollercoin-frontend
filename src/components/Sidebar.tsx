"use client";

import { usePathname } from "next/navigation";
import { Database } from "lucide-react";

interface SidebarItem {
    name: string;
    href: string;
    icon: any;
}

const items: SidebarItem[] = [
    { 
        name: "Miners", 
        href: "/miners", 
        icon: <Database /> 
    },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-48 bg-gray-800 text-white min-h-screen p-4">
            <ul className="space-y-2">
                {items.map(item => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className={`flex items-center p-2 rounded hover:bg-gray-700 transition-colors
                                ${isActive ? "bg-gray-700" : ""}`}
                            >
                                <span className={`mr-2 ${isActive ? "text-yellow-400" : "text-gray-400"}`}>
                                    {item.icon}
                                </span>
                                <span>{item.name}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}