"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

export function GithubGraph() {
    const { theme } = useTheme();

    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex min-w-max justify-center text-xs px-4">
                <GitHubCalendar
                    username="sanjaysankar2030"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    blockSize={10}
                    blockMargin={4}
                    fontSize={12}
                />
            </div>
        </div>
    );
}
