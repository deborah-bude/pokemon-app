export function Input({ children, placeholder, className }) {
    return (
        <input
            placeholder={placeholder}
            className={`px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 ${className}`}
        />
    );
}