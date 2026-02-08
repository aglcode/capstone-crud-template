import React from 'react'
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/layout/Logo";
import {
  LayoutDashboard,
  Users,
  Package,
  BarChart,
  FileText,
  Settings,
  HelpCircle,
  Bot,
  Layers,
  PanelLeft,
  LogOut,
  User,
  CreditCard,
  Handshake,
  BadgeQuestionMark
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { cn } from "../../lib/utils";


interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, toggleCollapse }) => {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-[width,transform] duration-300 ease-in-out md:relative",
        isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0 md:shadow-none",
        isCollapsed ? "w-64 md:w-[70px]" : "w-64"
      )}
    >
      <div className={cn("flex h-16 items-center border-b border-border", isCollapsed ? "justify-center" : "justify-between px-6")}>
        <div className={cn("flex items-center gap-2 overflow-hidden", isCollapsed ? "hidden" : "flex")}>
          <Logo size={24} className="h-8 w-8 text-primary-foreground bg-primary" />
          <h1 className="text-lg font-bold tracking-tight whitespace-nowrap">
            Geek Devs
          </h1>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="hidden md:flex h-8 w-8 text-muted-foreground hover:text-foreground"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <PanelLeft size={18} />
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 overflow-y-auto overflow-x-hidden">
        <nav className="flex flex-col gap-1">
          <Link
            to="/dashboard"
            activeOptions={{ exact: true }}
          >
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "justify-center px-0" : "px-3 gap-3",
                  !isActive && "text-muted-foreground"
                )}
                title={isCollapsed ? "Dashboard" : ""}
              >
                <LayoutDashboard size={18} className="shrink-0" />
                <span className={isCollapsed ? "hidden" : "block truncate"}>Dashboard</span>
              </Button>
            )}
          </Link>

          <Link to="/dashboard/users">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "justify-center px-0" : "px-3 gap-3",
                  !isActive && "text-muted-foreground"
                )}
                title={isCollapsed ? "Users" : ""}
              >
                <Users size={18} className="shrink-0" />
                <span className={isCollapsed ? "hidden" : "block truncate"}>Users</span>
              </Button>
            )}
          </Link>

          <Link to="/dashboard/products">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "justify-center px-0" : "px-3 gap-3",
                  !isActive && "text-muted-foreground"
                )}
                title={isCollapsed ? "Products" : ""}
              >
                <Package size={18} className="shrink-0" />
                <span className={isCollapsed ? "hidden" : "block truncate"}>Products</span>
              </Button>
            )}
          </Link>

          <Link to="/dashboard/analytics">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "justify-center px-0" : "px-3 gap-3",
                  !isActive && "text-muted-foreground"
                )}
                title={isCollapsed ? "Analytics" : ""}
              >
                <BarChart size={18} className="shrink-0" />
                <span className={isCollapsed ? "hidden" : "block truncate"}>Analytics</span>
              </Button>
            )}
          </Link>

          <Link to="/dashboard/reports">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "justify-center px-0" : "px-3 gap-3",
                  !isActive && "text-muted-foreground"
                )}
                title={isCollapsed ? "Reports" : ""}
              >
                <FileText size={18} className="shrink-0" />
                <span className={isCollapsed ? "hidden" : "block truncate"}>Reports</span>
              </Button>
            )}
          </Link>
        </nav>

        <div className="my-2">
          <Separator />
        </div>

        <nav className="mt-auto flex flex-col gap-1">
          <Link to="/dashboard/support">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "justify-center px-0" : "px-3 gap-3",
                  !isActive && "text-muted-foreground"
                )}
                title={isCollapsed ? "Help Center" : ""}
              >
                <HelpCircle size={18} className="shrink-0" />
                <span className={isCollapsed ? "hidden" : "block truncate"}>Help Center</span>
              </Button>
            )}
          </Link>
          <Link to="/dashboard/ai-assistant">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "justify-center px-0" : "px-3 gap-3",
                  !isActive && "text-muted-foreground"
                )}
                title={isCollapsed ? "AI Assistant" : ""}
              >
                <Bot size={18} className="shrink-0" />
                <span className={isCollapsed ? "hidden" : "block truncate"}>AI Assistant</span>
              </Button>
            )}
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <div className={cn("flex items-center rounded-md transition-colors hover:bg-accent group", isCollapsed ? "justify-center p-0" : "px-2 py-2 gap-3")}>
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1XV9LbQz7NaXltmIL7-9B0ZOjXbXeEffD5WstMrNvWiNsTct3iY3c_c8dBZXAHzuxiPo5czNcSWU9SW32UROKarGO8sXGWx68h1W0pm0xESjGjiUJ1nZ4SsBf0jAMZbQ_OvVIPDn4qNlVxBkXM6Uv6mgp7fDCyMIQeARzVTHvgrgRrExzYFNikVo_8PR3uqZTr7DsOKF8ZNiKz8wiBNyVsEthT1wKcpdcJvxS8GVOpD-9gSdauTTdAO34g5Z7jwbDWCk97UTLNcat" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          {!isCollapsed && (
            <>
              <div className="flex flex-col flex-1 overflow-hidden ml-1">
                <span className="text-sm font-medium text-foreground truncate">
                  Jane Doe
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  jane@acme.com
                </span>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Settings size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="center" side="top" sideOffset={10}>
                  <div className="grid gap-1">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      My Account
                    </div>

                    <div className="my-1 h-px bg-border" />

                    <Link to="/dashboard/whats-new" className="w-full">
                      {({ isActive }) => (
                        <div
                          className={cn(
                            "flex w-full items-center rounded-sm px-2 py-1.5 text-sm font-medium cursor-pointer transition-colors",
                            isActive
                              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <BadgeQuestionMark className="mr-2 h-4 w-4" />
                          <span>What's New?</span>
                        </div>
                      )}
                    </Link>

                    <button
                      onClick={() => console.log("Terms and Conditions")}
                      className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                    >
                      <Handshake className="mr-2 h-4 w-4" />
                      <span>Terms and Conditions</span>
                    </button>

                    <Link to="/dashboard/settings" className="w-full">
                      {({ isActive }) => (
                        <div
                          className={cn(
                            "flex w-full items-center rounded-sm px-2 py-1.5 text-sm font-medium cursor-pointer transition-colors",
                            isActive
                              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                          onClick={() => console.log("Settings")}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </div>
                      )}
                    </Link>

                    <div className="my-1 h-px bg-border" />

                    <button
                      onClick={() => console.log("Logout")}
                      className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 cursor-pointer transition-colors"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar