type InputProps = {
    placeholder?: string;
    className?: string;
};

export function Input({ placeholder, className }: InputProps) {
    return (
        <input
            placeholder={placeholder}
            className={`px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 ${className}`}
        />
    );
}