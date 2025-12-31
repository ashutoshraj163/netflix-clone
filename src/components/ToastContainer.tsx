import { useToast } from '@/context/ToastContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        info: Info,
        warning: AlertTriangle,
    };

    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
        warning: 'bg-yellow-600',
    };

    if (!toasts.length) return null;

    return (
        <div
            className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm"
            aria-live="polite"
            aria-label="Notifications"
        >
            {toasts.map(toast => {
                const Icon = icons[toast.type];
                return (
                    <div
                        key={toast.id}
                        className={cn(
                            'flex items-start gap-3 p-4 rounded-lg shadow-lg animate-slide-up',
                            colors[toast.type]
                        )}
                        role="alert"
                    >
                        <Icon className="w-5 h-5 text-white shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm">{toast.title}</p>
                            {toast.description && (
                                <p className="text-white/80 text-xs mt-1">{toast.description}</p>
                            )}
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-white/80 hover:text-white transition-colors shrink-0"
                            aria-label="Dismiss notification"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
