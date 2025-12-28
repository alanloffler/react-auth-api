import { Badge } from "@components/Badge";
import { Link } from "react-router";

import type { LucideIcon } from "lucide-react";

interface IProps {
  icon: LucideIcon;
  text: string;
  url: string;
}

export function ConfigButton({ icon: Icon, text, url }: IProps) {
  return (
    <Link to={url}>
      <Badge
        className="hover:text-foreground uppercase transition-colors duration-150 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        variant="id"
      >
        <Icon className="mr-2 h-4 w-4" strokeWidth={1.5} />
        {text}
      </Badge>
    </Link>
  );
}
