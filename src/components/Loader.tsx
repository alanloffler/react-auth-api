import { cn } from "@lib/utils";

interface IProps {
  className?: string;
  color?: string;
  size?: number;
  spinnerSize?: number;
  text?: string;
}

export function Loader({ className, color = "#fff", size = 16, spinnerSize = 2, text }: IProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="animate-spin rounded-full"
        style={{
          borderColor: color,
          borderTopColor: "transparent",
          borderWidth: spinnerSize + "px",
          height: size + "px",
          width: size + "px",
        }}
      ></div>
      {text && <span>{text}</span>}
    </div>
  );
}
