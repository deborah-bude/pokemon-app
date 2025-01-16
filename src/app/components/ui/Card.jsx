export function Card({ children }) {
    return (
        <div className="bg-card text-card-foreground rounded-xl border shadow relative">
            {children}
        </div>
    );
}

export function CardHeader({ children }) {
    return (
        <div className="flex flex-col space-y-1.5 p-6">
            {children}
        </div>
    );
}

export function CardTitle({ children }) {
    return (
        <h3 className="font-semibold leading-none tracking-tight">{children}</h3>
    );
}

export function CardContent({ children }) {
    return (
        <div className="p-6">
            {children}
        </div>
    );
}