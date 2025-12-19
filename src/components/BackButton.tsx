import { ArrowLeft } from "lucide-react";

import { Button } from "@components/ui/button";

import { useNavigate } from "react-router";

import { cn } from "@lib/utils";

interface IProps {
  className?: string;
}

export function BackButton({ className }: IProps) {
  const navigate = useNavigate();

  return (
    <Button
      className={cn("absolute top-5 right-5", className)}
      size="icon-lg"
      variant="ghost"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="size-5 cursor-pointer" />
    </Button>
  );
}
