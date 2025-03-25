import Link from "next/link";

type ButtonProps = {
    children: React.ReactNode;  
    variant?: 'primary' | 'secondary' | 'outline';
    href?: string;
};

export function Button({ children, variant = 'primary', href, ...props }: ButtonProps) {
    let className = 'inline-flex items-center justify-center px-4 py-2 rounded-full text-lg font-semibold';

    if (variant === 'primary') {
        className += ' bg-red-500 text-white';
    } else if (variant === 'secondary') {
        className += ' bg-white text-black border';
    } else if (variant === 'outline') {
        className += ' bg-transparent text-black border border-black';
    }

    if (href) {
        return (
            <Link className={className} href={href} {...props}>{children}</Link>
        );
    }

    return (
        <button className={className} {...props}>{children}</button>
    );
}