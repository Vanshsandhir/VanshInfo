export function Card({ children, className = "" }) {
  return <div className={`rounded-xl p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export function CardDescription({ children }) {
  return <p className="text-sm text-gray-400">{children}</p>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}