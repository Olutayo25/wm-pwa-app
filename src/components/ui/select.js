export function Select({ children, ...props }) {
  return <select className="border p-2 w-full" {...props}>{children}</select>;
}
