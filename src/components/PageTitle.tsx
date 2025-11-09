import { BadgeInfo } from "lucide-react";

interface PageTitleProps {
    title: string;
    description?: string;
}

export const PageTitle = ({ title, description }: PageTitleProps) => (
    <div className="flex items-center gap-2 mb-3">
        <BadgeInfo />
        <div>
            <h1 className="text-2xl text-white font-bold">{title}</h1>
            {description && <p className="text-sm italic">{description}</p>}
        </div>
    </div>
);