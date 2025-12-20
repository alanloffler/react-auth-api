import { Card } from "@components/ui/card";
import { Link } from "react-router";
import { Protected } from "@core/auth/components/Protected";

import type { ComponentType, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

interface IProps {
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  permission: string;
  text: string;
  url: string;
}

export function ActionCard({ icon: Icon, permission, text, url }: IProps) {
  return (
    <Protected requiredPermission={permission}>
      <Link className="col-span-2" to={url}>
        <Card className="items-center gap-3 px-6 font-medium hover:bg-neutral-50">
          <Icon className="h-6 w-6" />
          <span>{text}</span>
        </Card>
      </Link>
    </Protected>
  );
}
