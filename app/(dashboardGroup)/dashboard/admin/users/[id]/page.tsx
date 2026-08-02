import Link from "next/link";
import { ArrowLeft, Calendar, Mail, Phone, User } from "lucide-react";
import AppStatusBadge from "@/components/shared/AppBadge";
import { getSingleUser } from "../../_actions/getSingleUser";
import AdminUserTableActionButtons from "../../_components/AdminUserTableActionButtons";
interface Props {
  params: Promise<{ id: string }>;
}
export default async function UsersDetailsPageAdminView({ params }: Props) {
  const { id } = await params;
  const result = await getSingleUser(id);
  const user = result?.data;
  if (!user) {
    return <div className="p-6">User not found</div>;
  }
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  return (
    <div className="p-6 space-y-6">
      <Link
        href="/dashboard/admin/users"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Users
      </Link>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Details</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage this user account
          </p>
        </div>
        <AppStatusBadge status={user.status} />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border">
            {user.profile?.avatar ? (
              <img
                src={user.profile.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-slate-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.role}</p>
          </div>
        </div>
        {user.profile?.bio && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Bio</p>
            <p className="text-sm">{user.profile.bio}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 rounded-2xl border p-4">
            <Mail className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium break-all">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border p-4">
            <Phone className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">
                {user.profile?.phone || "Not provided"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border p-4">
            <Calendar className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-muted-foreground">Joined</p>
              <p className="font-medium">{formatDate(user.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border p-4">
            <Calendar className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-muted-foreground">Updated</p>
              <p className="font-medium">{formatDate(user.updatedAt)}</p>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <AdminUserTableActionButtons item={user} />
        </div>
      </div>
    </div>
  );
}
