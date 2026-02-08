import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function New() {
    const updates = [
        {
            version: "v1.5.0",
            date: "February 8, 2026",
            title: "Global Toast Alerts",
            description: "Implemented a system-wide notification system using Toast alerts for real-time feedback on user actions.",
            tags: ["New", "UX"]
        },
        {
            version: "v1.4.0",
            date: "February 8, 2026",
            title: "System Settings",
            description: "Launched a comprehensive Settings page allowing users to manage their Profile, Appearance (Theme), and Account security (Password, 2FA).",
            tags: ["Feature", "Settings"]
        },
        {
            version: "v1.3.0",
            date: "February 7, 2026",
            title: "AI Assistant",
            description: "Introduced a conversational AI Assistant to help users navigate the platform and answer queries instantly.",
            tags: ["New", "AI"]
        },
        {
            version: "v1.2.0",
            date: "February 6, 2026",
            title: "Help Center",
            description: "Added a dedicated Help Center with categorized support articles and contact options.",
            tags: ["New", "Support"]
        },
        {
            version: "v1.1.0",
            date: "February 5, 2026",
            title: "Admin Reports",
            description: "Released the Admin Reports module featuring visual analytics, KPI cards, and downloadable reports.",
            tags: ["Feature", "Analytics"]
        },
        {
            version: "v1.0.0",
            date: "February 1, 2026",
            title: "Admin Dashboard Launch",
            description: "Initial release of the Admin Dashboard with enhanced UI, animations, and improved navigation.",
            tags: ["Major", "Launch"]
        }
    ];

    return (
        <div className="h-full overflow-hidden">
            <ScrollArea className="h-full">
                <div className="space-y-6 p-10 pb-16 md:block">
                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">Product Updates & Changelog</h2>
                        <p className="text-muted-foreground">
                            Stay updated with the latest changes and improvements to the platform.
                        </p>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex flex-col space-y-8">
                        {updates.map((update, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold">{update.title}</span>
                                    <Badge variant="secondary">{update.version}</Badge>
                                    {index === 0 && (
                                        <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 dark:border-green-900">
                                            Latest
                                        </Badge>
                                    )}
                                </div>
                                <span className="text-sm text-muted-foreground">{update.date}</span>
                                <p className="text-sm text-foreground/80 max-w-2xl">
                                    {update.description}
                                </p>
                                <div className="flex space-x-2 pt-2">
                                    {update.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                {index < updates.length - 1 && <Separator className="mt-6" />}
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
