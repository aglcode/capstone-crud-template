import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check, AlertTriangle, UserPlus, ShieldAlert, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

const notifications = [
    {
        id: 1,
        title: "High CPU Usage Detected",
        description: "Server US-East-1 is experiencing 98% CPU load. Automated scaling protocols initiated.",
        time: "Today, 10:42 AM",
        type: "alert",
        read: false
    },
    {
        id: 2,
        title: "Q3 Financial Export Completed",
        description: "The financial report has been successfully generated and is ready for download.",
        time: "Today, 9:15 AM",
        type: "success",
        read: false
    },
    {
        id: 3,
        title: "New User Registration",
        description: "Sarah Jenkins (s.jenkins@corp.net) has requested access to the Marketing Dashboard.",
        time: "Today, 8:30 AM",
        type: "info",
        read: true
    },
    {
        id: 4,
        title: "System Maintenance Completed",
        description: "Scheduled maintenance for Database Cluster B completed without downtime.",
        time: "Yesterday, 11:00 PM",
        type: "success",
        read: true
    },
    {
        id: 5,
        title: "Password Expiration Notice",
        description: "Your administrative password will expire in 3 days. Please update it.",
        time: "Yesterday, 4:00 PM",
        type: "warning",
        read: true
    },
    {
        id: 6,
        title: "Shared Folder Update",
        description: "Design team added 5 new files to \"Q4 Marketing Assets\"",
        time: "Yesterday, 2:15 PM",
        type: "info",
        read: true
    }
];

const getIcon = (type: string) => {
    switch (type) {
        case "alert": return <ShieldAlert className="h-5 w-5 text-destructive" />;
        case "success": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case "info": return <UserPlus className="h-5 w-5 text-blue-500" />;
        default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
};

export default function Notifications() {
    const todayNotifications = notifications.filter(n => n.time.startsWith("Today"));
    const yesterdayNotifications = notifications.filter(n => n.time.startsWith("Yesterday"));

    return (
        <div className="flex h-full flex-col relative overflow-hidden bg-background">
            <ScrollArea className="h-full">
                <div className="flex-1 p-8 pt-6">
                    <div className="flex flex-col gap-6 h-full">

                        {/* Component Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                                <p className="text-muted-foreground">Manage your system notifications and alerts.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    <Check className="mr-2 h-4 w-4" />
                                    Mark all as read
                                </Button>
                            </div>
                        </div>

                        {/* Tabs List */}
                        <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-fit">
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Overview
                            </Link>
                            <Link
                                to="/dashboard/calendar"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Calendar
                            </Link>
                            <Link
                                to="/dashboard/status"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Status
                            </Link>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-background px-3 py-1 text-sm font-medium text-foreground shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                Notifications
                            </button>
                        </div>

                        {/* Main Notifications Area */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col space-y-8"
                        >
                            <div className="w-full space-y-8">
                                {/* Today's Notifications */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Today</h3>
                                    <div className="space-y-2">
                                        {todayNotifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`
                                                    flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/40
                                                    ${notification.read ? 'bg-background' : 'bg-muted/10'}
                                                `}
                                            >
                                                <div className={`mt-1 rounded-full p-2 bg-muted/50`}>
                                                    {getIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium leading-none">
                                                            {notification.title}
                                                            {!notification.read && (
                                                                <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-blue-600" />
                                                            )}
                                                        </p>
                                                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {notification.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Yesterday's Notifications */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Yesterday</h3>
                                    <div className="space-y-2">
                                        {yesterdayNotifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`
                                                    flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/40
                                                    ${notification.read ? 'bg-background' : 'bg-muted/10'}
                                                `}
                                            >
                                                <div className={`mt-1 rounded-full p-2 bg-muted/50`}>
                                                    {getIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium leading-none">{notification.title}</p>
                                                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {notification.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
