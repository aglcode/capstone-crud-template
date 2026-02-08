import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    selectedCount?: number;
    totalCount?: number;
    onPageChange: (page: number) => void;
    onPrevious: () => void;
    onNext: () => void;
    onFirst: () => void;
    onLast: () => void;
    canPrevious: boolean;
    canNext: boolean;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    selectedCount,
    totalCount,
    onPrevious,
    onNext,
    onFirst,
    onLast,
    canPrevious,
    canNext,
    className,
}: PaginationProps) {
    return (
        <div className={`flex items-center justify-between px-2 ${className}`}>
            <div className="flex-1 text-sm text-muted-foreground">
                {selectedCount !== undefined && totalCount !== undefined ? (
                    <>
                        {selectedCount} of {totalCount} row(s) selected.
                    </>
                ) : null}
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-muted-foreground">Page</p>
                    <span className="text-sm font-medium">
                        {currentPage} of {totalPages}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 border-border"
                        onClick={onFirst}
                        disabled={!canPrevious}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 border-border"
                        onClick={onPrevious}
                        disabled={!canPrevious}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 border-border"
                        onClick={onNext}
                        disabled={!canNext}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 border-border"
                        onClick={onLast}
                        disabled={!canNext}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
