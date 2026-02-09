import { useState } from "react";
import { format } from "date-fns";
import {
    Download,
    RotateCcw,
    FileText,
    Archive,
    AlertCircle,
    CheckCircle2,
    ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/ui/data-table"; // Import the new reusable component
import { type ColumnDef } from "@tanstack/react-table"; // Still need types


// --- Types ---
type BackupCallback = (id: number) => void;

interface Backup {
    id: number;
    name: string;
    date: Date;
    size: string;
    version: string;
    status: "success" | "warning" | "error";
}

interface Log {
    id: number;
    action: string;
    user: string;
    timestamp: Date;
    resource: string;
    status: "success" | "warning" | "error";
}

// --- Mock Data ---
const backups: Backup[] = [
    { id: 1, name: "backup-v2.4.0-2026-02-09.zip", date: new Date(2026, 1, 9, 4, 0), size: "1.2 GB", version: "v2.4.0", status: "success" },
    { id: 2, name: "backup-v2.3.9-2026-02-08.zip", date: new Date(2026, 1, 8, 4, 0), size: "1.1 GB", version: "v2.3.9", status: "success" },
    { id: 3, name: "backup-v2.3.8-2026-02-07.zip", date: new Date(2026, 1, 7, 4, 0), size: "1.1 GB", version: "v2.3.8", status: "warning" },
    { id: 4, name: "backup-v2.3.7-2026-02-06.zip", date: new Date(2026, 1, 6, 4, 0), size: "1.0 GB", version: "v2.3.7", status: "success" },
    { id: 5, name: "backup-v2.3.6-2026-02-05.zip", date: new Date(2026, 1, 5, 4, 0), size: "1.0 GB", version: "v2.3.6", status: "success" },
    { id: 6, name: "backup-v2.3.5-2026-02-04.zip", date: new Date(2026, 1, 4, 4, 0), size: "0.9 GB", version: "v2.3.5", status: "error" },
    { id: 7, name: "backup-v2.3.4-2026-02-03.zip", date: new Date(2026, 1, 3, 4, 0), size: "0.9 GB", version: "v2.3.4", status: "success" },
];

const logs: Log[] = [
    { id: 1, action: "System Backup Created", user: "System", timestamp: new Date(2026, 1, 9, 4, 0), resource: "Database", status: "success" },
    { id: 2, action: "User Role Updated", user: "Admin (Jane Doe)", timestamp: new Date(2026, 1, 8, 14, 30), resource: "User Management", status: "success" },
    { id: 3, action: "Failed Login Attempt", user: "Unknown (192.168.1.104)", timestamp: new Date(2026, 1, 8, 9, 15), resource: "Auth", status: "error" },
    { id: 4, action: "API Key Generated", user: "Dev Team", timestamp: new Date(2026, 1, 8, 11, 20), resource: "API Settings", status: "success" },
    { id: 5, action: "Settings Configuration Changed", user: "Admin (Jane Doe)", timestamp: new Date(2026, 1, 7, 16, 45), resource: "System Settings", status: "warning" },
    { id: 6, action: "User Deleted", user: "Admin (Jane Doe)", timestamp: new Date(2026, 1, 7, 10, 0), resource: "User Management", status: "success" },
    { id: 7, action: "System Update Installed", user: "System", timestamp: new Date(2026, 1, 6, 2, 0), resource: "System", status: "success" },
    { id: 8, action: "Database Optimization", user: "System", timestamp: new Date(2026, 1, 5, 3, 0), resource: "Database", status: "success" },
];

// --- Columns Definitions ---

const createBackupColumns = (handleRestore: BackupCallback): ColumnDef<Backup>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Filename
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" />{row.getValue("name")}</div>,
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => format(row.getValue("date"), "MMM d, yyyy HH:mm"),
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            if (status === "success") return <Badge variant="outline" className="border-green-500/50 text-green-700 bg-green-500/10">Success</Badge>;
            if (status === "warning") return <Badge variant="outline" className="border-yellow-500/50 text-yellow-700 bg-yellow-500/10">Incomplete</Badge>;
            return <Badge variant="destructive" className="bg-red-500/10 text-red-700 border-red-500/50 hover:bg-red-500/20">Failed</Badge>;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const backup = row.original;
            return (
                <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleRestore(backup.id)} title="Restore">
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
];

const logColumns: ColumnDef<Log>[] = [
    {
        accessorKey: "action",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Action
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "user",
        header: "User",
    },
    {
        accessorKey: "resource",
        header: "Resource",
        cell: ({ row }) => <Badge variant="secondary" className="font-normal">{row.getValue("resource")}</Badge>,
    },
    {
        accessorKey: "timestamp",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full justify-center"
                >
                    Timestamp
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-center">
                <span className="text-muted-foreground text-xs">{format(row.getValue("timestamp"), "MMM d, HH:mm:ss")}</span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div className="flex justify-center">
                    {status === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                    {status === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                </div>
            );
        },
    },
];

// --- Components ---


export default function BackupAndLogs() {
    const { toast } = useToast();
    const [isCreatingBackup, setIsCreatingBackup] = useState(false);

    const handleCreateBackup = () => {
        setIsCreatingBackup(true);
        // Simulate network request
        setTimeout(() => {
            setIsCreatingBackup(false);
            toast({
                title: "Backup Started",
                description: "The system is creating a new backup. You will be notified when it completes.",
            });
        }, 2000);
    };

    const handleRestore = (id: number) => {
        toast({
            title: "Restore Initiated",
            description: `Restoring configuration from backup #${id}. System may restart.`,
        });
    };

    // Memoize columns to prevent re-creation
    const backupColumns = createBackupColumns(handleRestore);

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div>
                <h3 className="text-lg font-medium">Backup & Logs</h3>
                <p className="text-sm text-muted-foreground">
                    Manage system backups and view activity logs for security and auditing.
                </p>
            </div>
            <Separator />

            <Tabs defaultValue="backups" className="w-full flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="backups">Backups</TabsTrigger>
                    <TabsTrigger value="logs">Activity Logs</TabsTrigger>
                </TabsList>

                {/* Backups Content */}
                <TabsContent value="backups" className="space-y-4 mt-6 flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-sm font-medium">System Backups</h4>
                            <p className="text-sm text-muted-foreground">Automated daily backups and manual snapshots.</p>
                        </div>
                        <Button onClick={handleCreateBackup} disabled={isCreatingBackup}>
                            {isCreatingBackup ? (
                                <>Creating...</>
                            ) : (
                                <>
                                    <Archive className="mr-2 h-4 w-4" />
                                    Create Backup
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="h-full flex flex-col space-y-4">
                        <div className="pb-3">
                            <h3 className="text-base font-semibold">Recent Snapshots</h3>
                            <p className="text-sm text-muted-foreground">
                                List of the last 30 days of backup archives.
                            </p>
                        </div>
                        <div className="flex-1">
                            <DataTable columns={backupColumns} data={backups} />
                        </div>
                    </div>
                </TabsContent>

                {/* Logs Content */}
                <TabsContent value="logs" className="space-y-4 mt-6 flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-sm font-medium">Audit Logs</h4>
                            <p className="text-sm text-muted-foreground">Detailed history of system actions and user activities.</p>
                        </div>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                    </div>

                    <div className="h-full flex flex-col space-y-4">
                        <div className="pb-3">
                            <h3 className="text-base font-semibold">Activity Stream</h3>
                        </div>
                        <div className="flex-1">
                            <DataTable columns={logColumns} data={logs} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
