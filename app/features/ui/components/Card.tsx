type CardChildren = React.ReactNode;
type CardClassName = string;

export function Card({ children, className }: { children: CardChildren } & { className?: CardClassName }) {
    return (
        <div className={`rounded-xl border shadow relative ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children } : { children: CardChildren }) {
    return (
        <div className="flex flex-col space-y-1.5 p-6">
            {children}
        </div>
    );
}

export function CardTitle({ children } : { children: CardChildren }) {
    return (
        <h3 className="font-semibold leading-none tracking-tight">{children}</h3>
    );
}

export function CardContent({ children } : { children: CardChildren }) {
    return (
        <div className="p-6">
            {children}
        </div>
    );
}