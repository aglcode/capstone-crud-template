import { useState } from "react";
import { User, Shield, Bell, History, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

import Profile from "./components/Profile";
import ManageAccount from "./components/ManageAccount";
import Appearance from "./components/Appearance";
import Notifications from "./components/Notifications";
import BackupAndLogs from "./components/BackupAndLogs";

const sidebarNavItems = [
    {
        title: "Profile",
        icon: User,
        id: "profile"
    },
    {
        title: "Account & Security",
        icon: Shield,
        id: "account"
    },
    {
        title: "Appearance",
        icon: Palette,
        id: "appearance"
    },
    {
        title: "Notifications",
        icon: Bell,
        id: "notifications"
    },
    {
        title: "Backup and Logs",
        icon: History,
        id: "backupAndLogs"
    },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="h-full overflow-hidden">
            <ScrollArea className="h-full">
                <div className="space-y-6 p-10 pb-16 md:block">
                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                        <p className="text-muted-foreground">
                            Manage your account settings and set e-mail preferences.
                        </p>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <aside className="-mx-4 lg:w-1/5">
                            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                                {sidebarNavItems.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        className={cn(
                                            "justify-start cursor-pointer transition-colors",
                                            activeTab === item.id
                                                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        )}
                                        onClick={() => setActiveTab(item.id)}
                                    >
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.title}
                                    </Button>
                                ))}
                            </nav>
                        </aside>

                        <div className={cn("flex-1", activeTab === "backupAndLogs" ? "lg:max-w-full" : "lg:max-w-2xl")}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    {activeTab === "profile" && <Profile />}
                                    {activeTab === "account" && <ManageAccount />}
                                    {activeTab === "appearance" && <Appearance />}
                                    {activeTab === "notifications" && <Notifications />}
                                    {activeTab === "backupAndLogs" && <BackupAndLogs />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}

