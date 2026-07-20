import { createContext, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Toast = {
  id: string;
  title: string;
  description?: string;
};

type ToastContextValue = {
  notify: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo(
    () => ({
      notify: (toast: Omit<Toast, "id">) => {
        const id = crypto.randomUUID();
        setToasts((current) => [...current, { ...toast, id }]);
        window.setTimeout(() => {
          setToasts((current) => current.filter((item) => item.id !== id));
        }, 4200);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[80] grid w-[calc(100%-2rem)] max-w-sm gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={cn("premium-panel flex gap-3 p-4")}>
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-500" />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{toast.title}</p>
              {toast.description ? <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p> : null}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      notify: ({ title, description }: Omit<Toast, "id">) => {
        window.alert(description ? `${title}\n${description}` : title);
      },
    };
  }

  return context;
}

export function InlineNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 rounded-lg border border-primary/15 bg-primary/5 p-3 text-sm text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 text-primary" />
      <div>{children}</div>
    </div>
  );
}
