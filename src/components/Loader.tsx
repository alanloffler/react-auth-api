import { cn } from "@lib/utils";
import { useTheme } from "@core/providers/theme-provider";

interface IProps {
  className?: string;
  color?: string;
  size?: number;
  spinnerSize?: number;
  text?: string;
}

export function Loader({ className, color, size = 16, spinnerSize = 2, text }: IProps) {
  const { theme } = useTheme();

  const borderColor = color || (theme === "dark" ? "white" : "black");

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="animate-spin rounded-full"
        style={{
          borderColor: borderColor,
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
