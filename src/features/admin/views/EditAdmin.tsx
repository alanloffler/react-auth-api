import { EditForm } from "@/features/admin/components/EditForm";

import { useParams } from "react-router";

export default function EditAdmin() {
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-10">
      <EditForm adminId={id!} />
    </div>
  );
}
