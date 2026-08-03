"use client";
import { Button } from "@/components/ui/button";
import { Ban, Eye, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { toggleUserBanStatus } from "../_actions/toggleUserBanStatus";
import { toast } from "sonner";
type User = { id: string; status: "BAN" | "UNBAN" };
const AdminUserTableActionButtons = ({ item }: { item: User }) => {
  const router = useRouter();
  const newStatus = item.status === "BAN" ? "UNBAN" : "BAN";
  const [state, action, pending] = useActionState(
    toggleUserBanStatus.bind(null, item.id, newStatus),
    null,
  );
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(`User ${newStatus.toLowerCase()} successfully!`);
    }
  }, [state, router, newStatus]);
  return (
    <div className="flex items-center justify-start gap-2">
      <Button
        onClick={() => router.push(`/dashboard/admin/users/${item.id}`)}
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5"
      >
        <Eye className="h-4 w-4" /> View
      </Button>
      <Button
        onClick={() => startTransition(action)}
        variant={item.status === "BAN" ? "default" : "destructive"}
        size="sm"
        className="flex items-center gap-1.5"
      >
        {item.status === "BAN" ? (
          <>
            <ShieldCheck className="h-4 w-4" />
            {pending ? "Unbanning..." : "Unban"}
          </>
        ) : (
          <>
            <Ban className="h-4 w-4" /> {pending ? "Banning..." : "Ban"}
          </>
        )}
      </Button>
    </div>
  );
};
export default AdminUserTableActionButtons;
