"use client";

interface ExperienceItemProps {
    title: string;
    role: string;
    children: React.ReactNode;
    link?: string;
}

export function ExperienceItem({
    title,
    role,
    children,
    link,
}: ExperienceItemProps) {
    return (
        <div className="group">
            <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-baseline">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-black dark:text-white">
                        {title}
                    </span>

                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-black dark:hover:text-white"
                        >
                            link
                        </a>
                    )}
                </div>

                <span className="text-sm text-gray-400 dark:text-gray-500">
                    {role}
                </span>
            </div>

            <div className="relative max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {children}
            </div>
        </div>
    );
}
