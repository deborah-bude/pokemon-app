export function Card({ children }) {
    return (
        <div class="bg-card text-card-foreground rounded-xl border shadow">
            {children}
        </div>
    );
}

export function CardHeader({ children }) {
    return (
        <div class="flex flex-col space-y-1.5 p-6">
            {children}
        </div>
    );
}

export function CardTitle({ children }) {
    return (
        <h3 class="font-semibold leading-none tracking-tight">{children}</h3>
    );
}

export function CardContent({ children }) {
    return (
        <div class="p-6 pt-0">
            {children}
        </div>
    );
}