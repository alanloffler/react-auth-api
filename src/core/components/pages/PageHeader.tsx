import type { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  title: string;
  subtitle?: string;
}

export function PageHeader({ children, title, subtitle }: IProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{title}</h1>
        {subtitle && <p className="text-sm font-normal">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}
