import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, XCircle, Activity, Globe, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

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

// Mock Data Helpers


const generateTrafficHistory = () => {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000); // Past 20 minutes
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            rest: Math.floor(Math.random() * 60 + 40), // 40-100
            post: Math.floor(Math.random() * 30 + 10), // 10-40
        });
    }
    return data;
};

const generateAuthHistory = () => {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            success: Math.floor(Math.random() * 50 + 100),
            failed: Math.floor(Math.random() * 5),
        });
    }
    return data;
};

const generateDatabaseHistory = (isPrimary: boolean) => {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            reads: Math.floor(Math.random() * 500 + 200),
            writes: isPrimary ? Math.floor(Math.random() * 100 + 50) : Math.floor(Math.random() * 10),
        });
    }
    return data;
};

const generateStorageHistory = () => {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            uploads: Math.floor(Math.random() * 20 + 5),
            downloads: Math.floor(Math.random() * 100 + 40),
        });
    }
    return data;
};

const generateCDNHistory = () => {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hits: Math.floor(Math.random() * 800 + 200),
            misses: Math.floor(Math.random() * 50 + 10),
        });
    }
    return data;
};

const generateEmailHistory = () => {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sent: Math.floor(Math.random() * 10 + 2),
            queued: Math.floor(Math.random() * 5),
        });
    }
    return data;
};

const generatePaymentHistory = () => {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            success: Math.floor(Math.random() * 15 + 5),
            failed: Math.floor(Math.random() * 1),
        });
    }
    return data;
};

const services = [
    {
        id: 1,
        name: "API Gateway",
        status: "operational",
        uptime: "99.99%",
        category: "Core",
        history: generateTrafficHistory(),
        chartLines: [
            { key: "rest", color: "#3b82f6", name: "REST Requests" },
            { key: "post", color: "#10b981", name: "POST Requests" }
        ]
    },
    {
        id: 2,
        name: "Authentication Service",
        status: "operational",
        uptime: "99.95%",
        category: "Core",
        history: generateAuthHistory(),
        chartLines: [
            { key: "success", color: "#10b981", name: "Successful Logins" },
            { key: "failed", color: "#ef4444", name: "Failed Logins" }
        ]
    },
    {
        id: 3,
        name: "Database Cluster Primary",
        status: "operational",
        uptime: "100%",
        category: "Database",
        history: generateDatabaseHistory(true),
        chartLines: [
            { key: "reads", color: "#3b82f6", name: "Read IOPS" },
            { key: "writes", color: "#f59e0b", name: "Write IOPS" }
        ]
    },
    {
        id: 4,
        name: "Database Cluster Replica",
        status: "degraded",
        uptime: "98.50%",
        category: "Database",
        message: "High latency detected",
        history: generateDatabaseHistory(false),
        chartLines: [
            { key: "reads", color: "#3b82f6", name: "Read IOPS" },
            { key: "writes", color: "#f59e0b", name: "Write IOPS" }
        ]
    },
    {
        id: 5,
        name: "Storage Service (S3)",
        status: "operational",
        uptime: "99.99%",
        category: "Storage",
        history: generateStorageHistory(),
        chartLines: [
            { key: "downloads", color: "#3b82f6", name: "Downloads" },
            { key: "uploads", color: "#8b5cf6", name: "Uploads" }
        ]
    },
    {
        id: 6,
        name: "CDN Content Delivery",
        status: "operational",
        uptime: "100%",
        category: "Network",
        history: generateCDNHistory(),
        chartLines: [
            { key: "hits", color: "#10b981", name: "Cache Hits" },
            { key: "misses", color: "#ef4444", name: "Cache Misses" }
        ]
    },
    {
        id: 7,
        name: "Email Notification Service",
        status: "outage",
        uptime: "92.00%",
        category: "Communication",
        message: "Service unavailable",
        history: generateEmailHistory(),
        chartLines: [
            { key: "sent", color: "#3b82f6", name: "Emails Sent" },
            { key: "queued", color: "#f59e0b", name: "Queued" }
        ]
    },
    {
        id: 8,
        name: "Payment Processing",
        status: "operational",
        uptime: "99.99%",
        category: "External",
        history: generatePaymentHistory(),
        chartLines: [
            { key: "success", color: "#10b981", name: "Successful Tx" },
            { key: "failed", color: "#ef4444", name: "Failed Tx" }
        ]
    },
];

const metrics = [
    { label: "Avg. Response Time", value: "45ms", change: "-12ms", trend: "positive", icon: Zap },
    { label: "Current Request Rate", value: "2.4k/s", change: "+15%", trend: "neutral", icon: Activity },
    { label: "Active Connections", value: "14,203", change: "+5%", trend: "positive", icon: Globe },
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case "operational": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        case "degraded": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case "outage": return <XCircle className="h-5 w-5 text-red-500" />;
        default: return <Activity className="h-5 w-5 text-muted-foreground" />;
    }
};

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case "operational": return "outline";
        case "degraded": return "secondary";
        case "outage": return "destructive";
        default: return "outline";
    }
};


export default function Status() {
    const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);

    const toggleService = (id: number) => {
        setExpandedServiceId(expandedServiceId === id ? null : id);
    };

    return (
        <div className="flex h-full flex-col relative overflow-hidden bg-background">
            <ScrollArea className="h-full">
                <div className="flex-1 p-8 pt-6">
                    <div className="flex flex-col gap-6 h-full">

                        {/* Component Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">System Status</h2>
                                <p className="text-muted-foreground">Real-time system performance and operational status.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    <Activity className="mr-2 h-4 w-4" />
                                    View Incident History
                                </Button>
                                <Button size="sm">
                                    Subscribe to Updates
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
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-background px-3 py-1 text-sm font-medium text-foreground shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                Status
                            </button>
                            <Link
                                to="/dashboard/notifications"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Notifications
                            </Link>
                        </div>

                        {/* Main Content Area */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col space-y-6"
                        >
                            {/* Overall Status Banner */}
                            <div className="rounded-lg border bg-card p-6 shadow-sm flex items-center gap-4">
                                <div className="p-3 rounded-full bg-green-500/10">
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-green-500">All Systems Operational</h3>
                                    <p className="text-sm text-muted-foreground">All services are running normally. No incidents reported today.</p>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {metrics.map((metric, index) => (
                                    <Card key={index}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                {metric.label}
                                            </CardTitle>
                                            <metric.icon className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{metric.value}</div>
                                            <p className="text-xs text-muted-foreground">
                                                {metric.change} from last hour
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Services List */}
                            <div className="rounded-lg border shadow-sm bg-card">
                                <div className="p-6 border-b">
                                    <h3 className="text-lg font-semibold">Service Status</h3>
                                    <p className="text-sm text-muted-foreground">Current status of all system components.</p>
                                </div>
                                <div>
                                    {services.map((service) => (
                                        <div key={service.id} className="border-b last:border-b-0">
                                            <div
                                                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                                onClick={() => toggleService(service.id)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {getStatusIcon(service.status)}
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">{service.name}</p>
                                                            <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                                                                {service.category}
                                                            </Badge>
                                                        </div>
                                                        {service.message && (
                                                            <p className="text-sm text-muted-foreground text-yellow-600 dark:text-yellow-400">
                                                                {service.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right hidden sm:block">
                                                        <p className="text-xs text-muted-foreground">Uptime</p>
                                                        <p className="text-sm font-medium">{service.uptime}</p>
                                                    </div>
                                                    <Badge variant={getStatusBadgeVariant(service.status)} className="capitalize min-w-[100px] justify-center">
                                                        {service.status}
                                                    </Badge>
                                                    {expandedServiceId === service.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {expandedServiceId === service.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden bg-muted/20"
                                                    >
                                                        <div className="p-4 h-[200px] w-full">
                                                            <ResponsiveContainer width="100%" height="100%">
                                                                <LineChart data={service.history}>
                                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                                                    <XAxis
                                                                        dataKey="time"
                                                                        stroke="hsl(var(--muted-foreground))"
                                                                        fontSize={12}
                                                                        tickLine={false}
                                                                        axisLine={false}
                                                                        minTickGap={30}
                                                                    />
                                                                    <YAxis
                                                                        stroke="hsl(var(--muted-foreground))"
                                                                        fontSize={12}
                                                                        tickLine={false}
                                                                        axisLine={false}
                                                                        domain={[0, 100]}
                                                                    />
                                                                    <Tooltip
                                                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '6px' }}
                                                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                                                    />
                                                                    <Legend />
                                                                    {service.chartLines && service.chartLines.map((line) => (
                                                                        <Line
                                                                            key={line.key}
                                                                            type="monotone"
                                                                            dataKey={line.key}
                                                                            stroke={line.color}
                                                                            strokeWidth={2}
                                                                            dot={false}
                                                                            activeDot={{ r: 4, strokeWidth: 0 }}
                                                                            name={line.name}
                                                                        />
                                                                    ))}
                                                                    {!service.chartLines && (
                                                                        <Line
                                                                            type="monotone"
                                                                            dataKey="value"
                                                                            stroke="hsl(var(--primary))"
                                                                            strokeWidth={2}
                                                                            dot={false}
                                                                            activeDot={{ r: 4, strokeWidth: 0 }}
                                                                        />
                                                                    )}
                                                                </LineChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </motion.div>

                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
