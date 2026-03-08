import { useLoadingStore } from "@/stores/loading.store";
import { Spinner } from "@/components/ui/spinner";

export function GlobalSpinner() {
  const isLoading = useLoadingStore((s) => s.loadingCount > 0);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
      role="status"
      aria-label="Loading"
    >
      <Spinner className="size-10 text-primary" />
    </div>
  );
}
