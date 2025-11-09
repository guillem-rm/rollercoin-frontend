"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SquareChevronRight, SquareChevronLeft, Database, Warehouse } from "lucide-react";

interface SidebarItem {
    name: string;
    href: string;
    icon: any;
}

// Define sidebar items
const items: SidebarItem[] = [
    { 
        name: "Miners", 
        href: "/miners", 
        icon: <Database /> 
    },
    { 
        name: "Room", 
        href: "/room", 
        icon: <Warehouse /> 
    },
];

export const Sidebar = () => {
    // Get current pathname to determine active item
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className={`${isOpen ? "w-48" : "w-20"} bg-secondary min-h-screen px-4 py-8 transition-all duration-300 flex flex-col`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="mb-6 pl-3 text-primary hover:cursor-pointer"
            >
                {isOpen ? <SquareChevronLeft size={24} /> : <SquareChevronRight size={24} />}
            </button>

            <ul className="space-y-2">
                {items.map(item => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className={`flex gap-2 items-center p-3 rounded sidebar-item`}
                            >
                                <i className={`${isActive ? "text-white" : "text-primary"}`}>
                                    {item.icon}
                                </i>
                                {isOpen && (
                                    <span className={`${isActive ? "text-white" : "text-primary"}`}>
                                        {item.name}
                                    </span>
                                )}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}