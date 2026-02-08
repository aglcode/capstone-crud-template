import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, CheckCircle, Clock, AlertCircle, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, type Variants } from "framer-motion";

// Mock Data for Charts
const reportTrendsData = [
    { name: 'Mon', total: 12, completed: 10, failed: 2 },
    { name: 'Tue', total: 18, completed: 15, failed: 3 },
    { name: 'Wed', total: 15, completed: 14, failed: 1 },
    { name: 'Thu', total: 22, completed: 20, failed: 2 },
    { name: 'Fri', total: 25, completed: 24, failed: 1 },
    { name: 'Sat', total: 10, completed: 9, failed: 1 },
    { name: 'Sun', total: 8, completed: 8, failed: 0 },
];

// Mock Data for Table
const recentReports = [
    { id: "REP-001", name: "Monthly Sales Report", date: "2023-10-25", status: "Completed", type: "PDF" },
    { id: "REP-002", name: "User Retention Analysis", date: "2023-10-24", status: "Pending", type: "CSV" },
    { id: "REP-003", name: "System Logs Export", date: "2023-10-24", status: "Completed", type: "JSON" },
    { id: "REP-004", name: "Q3 Financial Summary", date: "2023-10-23", status: "Failed", type: "PDF" },
    { id: "REP-005", name: "New Signups List", date: "2023-10-23", status: "Completed", type: "CSV" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

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

function AdminReports() {
    return (
        <ScrollArea className="h-full w-full">
            <div className="p-8 space-y-8 bg-background min-h-screen container mx-auto overflow-x-hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Reports Center</h2>
                        <p className="text-muted-foreground">Manage and generate system reports.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate New Report
                        </Button>
                    </div>
                </div>

                {/* Main Content Animation Container */}
                <motion.div
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* KPI Cards */}
                    {[
                        { title: "Total Reports", value: "1,245", sub: "+12% this month", icon: FileText },
                        { title: "Completed", value: "1,210", sub: "97.1% success rate", icon: CheckCircle },
                        { title: "Pending", value: "24", sub: "Currently processing", icon: Clock },
                        { title: "Failed", value: "11", sub: "-2% from last week", icon: AlertCircle }
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

                <motion.div
                    className="grid gap-4 md:grid-cols-1 lg:grid-cols-7"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Reports Trend Chart */}
                    <motion.div variants={itemVariants} className="col-span-4">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Report Generation Trends</CardTitle>
                                <CardDescription>Weekly overview of generated reports.</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={reportTrendsData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="completed" name="Completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} stackId="a" />
                                        <Bar dataKey="failed" name="Failed" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} stackId="a" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recent Reports Table */}
                    <motion.div variants={itemVariants} className="col-span-3">
                        <Card className="h-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Recent Reports</CardTitle>
                                    <CardDescription>Latest generated documents.</CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                    <Filter className="h-4 w-4" />
                                    <span className="sr-only">Filter</span>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Report Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentReports.map((report) => (
                                            <TableRow key={report.id}>
                                                <TableCell className="font-medium">
                                                    <div>{report.name}</div>
                                                    <div className="text-xs text-muted-foreground">{report.date} • {report.type}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            report.status === "Completed" ? "default" : // "success" if you have it
                                                                report.status === "Pending" ? "secondary" : // "warning" if you have it
                                                                    "destructive"
                                                        }
                                                        className="capitalize"
                                                    >
                                                        {report.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Download className="h-4 w-4" />
                                                        <span className="sr-only">Download</span>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </ScrollArea>
    );
}

export default AdminReports;
