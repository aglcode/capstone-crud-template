import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Activity, DollarSign } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

// Mock Data
const revenueData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Apr', revenue: 2780, profit: 3908 },
    { name: 'May', revenue: 1890, profit: 4800 },
    { name: 'Jun', revenue: 2390, profit: 3800 },
    { name: 'Jul', revenue: 3490, profit: 4300 },
    { name: 'Aug', revenue: 4000, profit: 2400 },
    { name: 'Sep', revenue: 3000, profit: 1398 },
    { name: 'Oct', revenue: 2000, profit: 9800 },
    { name: 'Nov', revenue: 2780, profit: 3908 },
    { name: 'Dec', revenue: 1890, profit: 4800 },
];

const performanceData = [
    { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
    { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
    { subject: 'Dev', A: 86, B: 130, fullMark: 150 },
    { subject: 'Support', A: 99, B: 100, fullMark: 150 },
    { subject: 'Ops', A: 85, B: 90, fullMark: 150 },
    { subject: 'HR', A: 65, B: 85, fullMark: 150 },
];

const trafficData = [
    { time: '00:00', users: 120 }, { time: '04:00', users: 80 },
    { time: '08:00', users: 450 }, { time: '12:00', users: 980 },
    { time: '16:00', users: 850 }, { time: '20:00', users: 340 },
];

const metricData = [
    { name: 'Active', value: 400, color: '#0088FE' },
    { name: 'Inactive', value: 300, color: '#00C49F' },
    { name: 'Pending', value: 300, color: '#FFBB28' },
    { name: 'Banned', value: 200, color: '#FF8042' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
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

function AdminAnalytics() {
    return (
        <ScrollArea className="h-full w-full">
            <div className="p-8 space-y-8 bg-background min-h-screen container mx-auto overflow-x-hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
                        <p className="text-muted-foreground">Overview of key performance metrics.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Last updated: Just now</span>
                    </div>
                </div>

                {/* KPI Cards */}
                <motion.div
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        { title: "Total Revenue", value: "$45,231.89", sub: "+20.1% from last month", icon: DollarSign },
                        { title: "Active Users", value: "+2350", sub: "+180.1% from last month", icon: Users },
                        { title: "Sales", value: "+12,234", sub: "+19% from last month", icon: TrendingUp },
                        { title: "Active Now", value: "+573", sub: "+201 since last hour", icon: Activity }
                    ].map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{item.value}</div>
                                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <motion.div
                            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >

                            {/* Revenue Chart */}
                            <Card className="col-span-4 component-card">
                                <CardHeader>
                                    <CardTitle>Revenue Analysis</CardTitle>
                                    <CardDescription>Monthly revenue trends for the current year.</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <ResponsiveContainer width="100%" height={350}>
                                        <AreaChart data={revenueData}>
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                                            />
                                            <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Performance Radar */}
                            <Card className="col-span-3 component-card">
                                <CardHeader>
                                    <CardTitle>Unit Performance Radar</CardTitle>
                                    <CardDescription>Comparative performance metrics across departments.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                                            <PolarGrid stroke="hsl(var(--border))" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="hsl(var(--border))" />
                                            <Radar name="Performance A" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                                            <Radar name="Performance B" dataKey="B" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.6} />
                                            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Traffic Heatmap (Bar representation) */}
                            <Card className="col-span-4 component-card">
                                <CardHeader>
                                    <CardTitle>Traffic Density</CardTitle>
                                    <CardDescription>User activity levels throughout the day.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={trafficData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                            <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                                            />
                                            <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Metric Breakdown */}
                            <Card className="col-span-3 component-card">
                                <CardHeader>
                                    <CardTitle>Metric Breakdown</CardTitle>
                                    <CardDescription>Status distribution of system entities.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={metricData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {metricData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                                            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}

export default AdminAnalytics;
