import { Button } from "@components/ui/button";
import { ArrowLeft, OctagonAlert } from "lucide-react";

import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="-mt-8 flex h-full flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-4">
        <OctagonAlert className="h-10 w-10 text-red-500" />
        <h1 className="text-3xl font-bold">ERROR 404</h1>
      </div>
      <h2 className="text-2xl">Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Button className="mt-4" onClick={() => navigate(-1)} size="lg">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Button>
    </div>
  );
}
