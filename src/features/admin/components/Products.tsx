import React from 'react'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type ColumnFiltersState,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Eye,
  Pencil,
  Trash2,
  ArrowUpDown,

  Filter,
  Plus
} from "lucide-react";
import { Pagination } from "../../../components/layout/Pagination";
import { type Product } from "../../../types/types";
import { cn } from "../../../lib/utils";
import { motion, type Variants } from "framer-motion";

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

interface ProductTableProps {
  products: Product[];
}

const StatusBadge = ({ status }: { status: string }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error" = "secondary";

  switch (status) {
    case "In Stock":
      variant = "success";
      break;
    case "Low Stock":
      variant = "warning";
      break;
    case "Out of Stock":
      variant = "error";
      break;
    default:
      variant = "secondary";
  }

  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {status}
    </Badge>
  );
};

const Products = ({ products }: ProductTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);





  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="border-gray-500 data-[state=checked]:border-primary"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border-gray-500 data-[state=checked]:border-primary"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <div
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product
            <ArrowUpDown className="h-3 w-3" />
          </div>
        ),
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-lg bg-cover bg-center border border-border shrink-0"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{product.name}</span>
                <span className="text-xs text-muted-foreground">{product.model}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => <span className="text-sm text-muted-foreground font-mono">{row.getValue("sku")}</span>,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("category")}</span>,
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <div
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center justify-end gap-1 cursor-pointer hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="h-3 w-3" />
          </div>
        ),
        cell: ({ row }) => {
          const price = parseFloat(row.getValue("price"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price);
          return <div className="text-right font-medium text-foreground font-mono">{formatted}</div>;
        },
      },
      {
        accessorKey: "stock",
        header: ({ column }) => (
          <div
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center justify-end gap-1 cursor-pointer hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="h-3 w-3" />
          </div>
        ),
        cell: ({ row }) => <div className="text-right text-muted-foreground font-mono">{row.getValue("stock")}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
      },
      {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: () => {
          return (
            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Eye className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-background transition-colors duration-300">
      {/* Header */}
      <header className="flex-shrink-0 px-8 py-6 border-b border-border/40">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Products</h2>
            <p className="text-muted-foreground text-sm">
              Manage your product inventory and stock levels.
            </p>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-8 pb-8 pt-6">
        <motion.div
          className="max-w-[1400px] mx-auto flex flex-col h-full space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Toolbar */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:max-w-sm">
              <Input
                placeholder="Filter products..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="h-9"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Columns
              </Button>
              <Button size="sm" className="h-9">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent border-border">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className={cn(
                          "text-xs font-medium uppercase tracking-wider text-muted-foreground",
                          header.id === "select" ? "w-[40px] pl-4" : ""
                        )}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-border hover:bg-muted/30 group transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className={cn(
                          cell.column.id === "select" ? "pl-4" : ""
                        )}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>

          {/* Pagination Controls */}
          <motion.div variants={itemVariants}>
            <Pagination
              currentPage={table.getState().pagination.pageIndex + 1}
              totalPages={table.getPageCount()}
              selectedCount={table.getFilteredSelectedRowModel().rows.length}
              totalCount={table.getFilteredRowModel().rows.length}
              onPageChange={(page) => table.setPageIndex(page - 1)}
              onPrevious={() => table.previousPage()}
              onNext={() => table.nextPage()}
              onFirst={() => table.setPageIndex(0)}
              onLast={() => table.setPageIndex(table.getPageCount() - 1)}
              canPrevious={table.getCanPreviousPage()}
              canNext={table.getCanNextPage()}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Products