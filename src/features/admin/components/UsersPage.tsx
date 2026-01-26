import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Plus, Filter, Sun, Moon, Eye, Pencil, Trash2 } from "lucide-react";
import { type User, type UserStatus } from '../../../types/types';

const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Miller',
    email: 'sarah.miller@acme.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Super Admin',
    status: 'Active',
    lastActive: 'Oct 24, 2023',
  },
  {
    id: '2',
    name: 'James Chen',
    email: 'james.c@acme.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Admin',
    status: 'Active',
    lastActive: 'Oct 23, 2023',
  },
  {
    id: '3',
    name: 'Maria Kostas',
    email: 'm.kostas@acme.com',
    initials: 'MK',
    role: 'Customer',
    status: 'Offline',
    lastActive: 'Sep 12, 2023',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'd.kim@acme.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Customer',
    status: 'Suspended',
    lastActive: 'Aug 01, 2023',
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert.b@acme.com',
    initials: 'RB',
    role: 'Customer',
    status: 'Pending',
    lastActive: '--',
  },
];

const StatusBadge = ({ status }: { status: UserStatus }) => {
  const variants: Record<UserStatus, "success" | "secondary" | "destructive" | "warning"> = {
    Active: 'success',
    Offline: 'secondary',
    Suspended: 'destructive',
    Pending: 'warning',
  };

  return (
    <Badge variant={variants[status]} className="font-normal">
      {status}
    </Badge>
  );
};

export default function UsersPage() {
  const [users] = useState<User[]>(INITIAL_USERS);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(['1']);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u.id));
    }
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background transition-colors duration-300">
      {/* Header */}
      <header className="flex-shrink-0 px-8 py-6 border-b border-border/40">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Users</h2>
            <p className="text-muted-foreground text-sm">
              Manage your team members and their account permissions.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-8 pb-8 pt-6">
        <div className="max-w-[1400px] mx-auto flex flex-col h-full space-y-4">
          
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:max-w-sm">
              <Input placeholder="Filter emails..." className="h-9" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Columns
              </Button>
              <Button size="sm" className="h-9">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedUsers.length === users.length && users.length > 0}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead className="min-w-[200px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Active</TableHead>
                  <TableHead className="text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} data-state={selectedUsers.includes(user.id) ? "selected" : undefined}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleSelection(user.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className={user.initials === 'MK' ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold' : undefined}>
                            {user.initials || user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium leading-none">{user.name}</span>
                          <span className="text-xs text-muted-foreground mt-1 font-normal">{user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {user.lastActive}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-green-600 dark:hover:text-green-400">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {selectedUsers.length} of {users.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}