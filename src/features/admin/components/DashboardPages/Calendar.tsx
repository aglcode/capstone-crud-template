import { useState } from 'react';
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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

// Mock events data
const events = [
    {
        id: 1,
        title: "Team Sync",
        date: new Date(2023, 10, 15, 10, 0), // Note: Month is 0-indexed (10 = Nov)
        type: "work",
        location: "Conference Room A"
    },
    {
        id: 2,
        title: "Product Launch",
        date: new Date(2023, 10, 20, 14, 0),
        type: "important",
        location: "Virtual"
    },
    {
        id: 3,
        title: "Design Review",
        date: new Date(2023, 10, 10, 11, 30),
        type: "work",
        location: "Design Studio"
    },
    {
        id: 4,
        title: "Lunch with Client",
        date: new Date(2023, 10, 25, 12, 30),
        type: "personal",
        location: "Downtown Cafe"
    }
];

const eventTypes = [
    { id: 'work', label: 'Work', color: 'bg-blue-500' },
    { id: 'personal', label: 'Personal', color: 'bg-green-500' },
    { id: 'important', label: 'Important', color: 'bg-red-500' },
    { id: 'travel', label: 'Travel', color: 'bg-yellow-500' },
];

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date(2023, 10, 1)); // Default to Nov 2023 for demo
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['work', 'personal', 'important', 'travel']);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const goToToday = () => setCurrentDate(new Date());

    const toggleEventType = (typeId: string) => {
        setSelectedTypes(prev =>
            prev.includes(typeId)
                ? prev.filter(t => t !== typeId)
                : [...prev, typeId]
        );
    };

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="flex h-full flex-col relative overflow-hidden bg-background">
            <ScrollArea className="h-full">
                <div className="flex-1 p-8 pt-6">
                    <div className="flex flex-col gap-6 h-full">
                        {/* Component Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
                                <p className="text-muted-foreground">Manage your events and schedules.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-9">
                                            <Filter className="mr-2 h-4 w-4" />
                                            Filter Events
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="w-56 p-4">
                                        <div className="space-y-4">
                                            <h4 className="font-medium leading-none">My Calendars</h4>
                                            <div className="space-y-2">
                                                {eventTypes.map((type) => (
                                                    <div key={type.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`filter-${type.id}`}
                                                            checked={selectedTypes.includes(type.id)}
                                                            onCheckedChange={() => toggleEventType(type.id)}
                                                        />
                                                        <Label htmlFor={`filter-${type.id}`} className="flex items-center gap-2 text-sm font-normal cursor-pointer">
                                                            <div className={`h-3 w-3 rounded-full ${type.color}`} />
                                                            {type.label}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                <Button size="sm" className="h-9">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Event
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
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-background px-3 py-1 text-sm font-medium text-foreground shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                Calendar
                            </button>
                            <Link
                                to="/dashboard/status"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Status
                            </Link>
                            <Link
                                to="/dashboard/notifications"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Notifications
                            </Link>
                        </div>

                        {/* Main Calendar Area */}
                        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex flex-col bg-card rounded-lg border shadow-sm min-h-[500px]">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
                                    <div className="flex items-center rounded-md border bg-background shadow-sm">
                                        <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-r-none">
                                            <ChevronLeft size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-l-none border-l">
                                            <ChevronRight size={16} />
                                        </Button>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
                                </div>

                                <Tabs defaultValue="month" className="w-[200px]">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="month">Month</TabsTrigger>
                                        <TabsTrigger value="week">Week</TabsTrigger>
                                        <TabsTrigger value="day">Day</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            {/* Calendar Grid */}
                            <div className="flex flex-col min-w-[700px]">
                                {/* Header Row */}
                                <div className="grid grid-cols-7 border-b bg-muted/20 sticky top-0 z-10">
                                    {weekDays.map((day) => (
                                        <div key={day} className="p-3 text-sm font-medium text-center text-muted-foreground border-r last:border-r-0">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Days Grid */}
                                <div className="flex-1 grid grid-cols-7 grid-rows-5">
                                    {days.map((day) => {
                                        const dayEvents = events.filter(e => isSameDay(e.date, day) && selectedTypes.includes(e.type));
                                        return (
                                            <div
                                                key={day.toString()}
                                                className={`
                                                    min-h-[100px] p-2 border-b border-r last:border-r-0 transition-colors hover:bg-muted/30 flex flex-col
                                                    ${!isSameMonth(day, monthStart) ? 'bg-muted/5' : 'bg-background'}
                                                    ${isSameDay(day, new Date()) ? 'bg-primary/5' : ''}
                                                `}
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className={`
                                                        text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full
                                                        ${isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground' : 'text-foreground'}
                                                        ${!isSameMonth(day, monthStart) ? 'text-muted-foreground' : ''}
                                                    `}>
                                                        {format(day, dateFormat)}
                                                    </span>
                                                </div>

                                                <div className="space-y-1">
                                                    {dayEvents.map(event => {
                                                        const typeColor = eventTypes.find(t => t.id === event.type);
                                                        return (
                                                            <Badge
                                                                key={event.id}
                                                                variant="secondary"
                                                                className="w-full justify-start font-normal px-1.5 py-0.5 h-auto text-[10px] truncate cursor-pointer hover:opacity-80 gap-1 border border-border/50"
                                                            >
                                                                <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${typeColor?.color || 'bg-gray-500'}`} />
                                                                <span className="truncate">{event.title}</span>
                                                            </Badge>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
