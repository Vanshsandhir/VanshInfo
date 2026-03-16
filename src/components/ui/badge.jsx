export function Badge({ children, className = "" }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-200 ${className}`}
    >
      {children}
    </span>
  );
}