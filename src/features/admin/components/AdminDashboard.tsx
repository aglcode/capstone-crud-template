import {
  Menu,
  Search,
  Sun,
  Moon,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Calendar,
  Bell,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
// import { Button } from "../../../components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/card";
// import { Input } from "../../../components/input";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/tabs";
// import { Avatar, AvatarFallback, AvatarImage } from "../../../components/avatar";


interface DashboardProps {
  onMenuClick: () => void;
}

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];


const AdminDashboard = ({ onMenuClick }: DashboardProps) => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex flex-1 flex-col h-full relative overflow-hidden bg-background">
    <header className="flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-border bg-background px-6">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
      >
        <Menu size={20} />
      </button>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
        <a
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Overview
        </a>
        <a
          href="#"
          className="transition-colors hover:text-foreground"
        >
          Customers
        </a>
        <a
          href="#"
          className="transition-colors hover:text-foreground"
        >
          Products
        </a>
        <a
          href="#"
          className="transition-colors hover:text-foreground"
        >
          Settings
        </a>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <div className="relative w-full max-w-[240px] hidden sm:block">
          <Search
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-input bg-background py-1.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        >
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Notifications</span>
        </button>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </header>
    
    <main className="flex-1 overflow-y-auto p-8 pt-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none gap-2">
              <Calendar size={16} />
              Jan 20, 2023 - Feb 09, 2023
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none">
              Download
            </button>
          </div>
        </div>

        {/* Tabs List */}
        <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-fit">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-background px-3 py-1 text-sm font-medium text-foreground shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Overview
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Analytics
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Reports
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Notifications
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Total Revenue
              </h3>
              <DollarSign size={16} className="text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Subscriptions
              </h3>
              <Users size={16} className="text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Sales</h3>
              <CreditCard size={16} className="text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Active Now
              </h3>
              <Activity size={16} className="text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </div>
          </div>
        </div>

        {/* Charts and Lists */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                Overview
              </h3>
            </div>
            <div className="p-6 pt-0 pl-2">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Bar
                      dataKey="total"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Tooltip
                       cursor={{fill: 'transparent'}}
                       contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '6px' }}
                       itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                Recent Sales
              </h3>
              <p className="text-sm text-muted-foreground">
                You made 265 sales this month.
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-8">
                <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <div
                      className="aspect-square h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWFbVZ33UQANon3f-4iTkRXlcvGjJxPlLTTV4VGe6dHPPlbT91NEevJFEkRp8K7mLwZ5obXRkt5sDbIDymjVMtsqVmsu2DqID37zvcXkUz3RVEqn6hs64LzYwuH_Vhu-PLmUo81ws6S0WPtiEvhXawmbc9iUttLbiFZktTAvLxHvCAhQyl1BMKIwXGQP19bDzRJin6B4PF8tEGkpzkpfQHDlPr3R4S-9VaRxLmRNrk_1oRaif1gr_PTDkKBTeaRCK7w7oQiQPpCOBb")',
                      }}
                    ></div>
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 items-center justify-center bg-muted">
                    JL
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Jackson Lee
                    </p>
                    <p className="text-sm text-muted-foreground">
                      jackson.lee@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$39.00</div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <div
                      className="aspect-square h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6spcLpStvKhuBOz_Lum_Awb0zFywu0nYJad72TmHKxmQRpaWwe3uGwuX_6EYJTq2gihT8cpE6bV2_GGnlVPQ578MDcOTC-KMeynEp5_3wx56dejAtpEFHN5b37aSq_ryhrMCMM3JlPtGwSsDhkYiz-wlA56fdfGMtrj4cdzIdt-xxcj3DLWtLnwMuXhRY0YAPr6jTDBKcQdH4jpljY4J7Mkj3OmPoGGHOUcdxoWNR14jHgCpSRQEXKpVamigOGWFhCwpg4hsPcP5f")',
                      }}
                    ></div>
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Isabella Nguyen
                    </p>
                    <p className="text-sm text-muted-foreground">
                      isabella.nguyen@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$299.00</div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 items-center justify-center bg-muted">
                    WK
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      William Kim
                    </p>
                    <p className="text-sm text-muted-foreground">
                      will@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$99.00</div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <div
                      className="aspect-square h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3gsLKaNuvNASxP9xRxhsH2VEssBiO1SrDyyJmONDCIDdvFrydGfxZQbY0Lh10CoVdaJNHQcy4KVFOh6Hx5oM-fmfAnr-IQwz7vbqkFMnUiiRkwd5RFBr5_z96L0eA6Z8d-sqosXah-JNBCesD4MmhPxIZ-ZMpcr-dFmYQWEX1Jq7u_maw4QhirqEhP13JTPCklIvaYC-AHTQ2dji6p7TgxoWqS3PjT9sjLsvlVyykpvXj6wSCnRPVqMe-2b9orkBxDJxrgOvW4x2w")',
                      }}
                    ></div>
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Sofia Davis
                    </p>
                    <p className="text-sm text-muted-foreground">
                      sofia.davis@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$39.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);
};

export default AdminDashboard