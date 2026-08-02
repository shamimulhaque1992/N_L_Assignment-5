import { getMyProfile } from "@/app/(authGroup)/auth/_actions/getMyProfile";
import { CalendarDays, Mail, Phone, Shield, User } from "lucide-react";
import Image from "next/image";

const ProfileCard = async () => {
  const result = await getMyProfile();
  const user = result?.data;
  const profile = user?.profile;

  const details = [
    {
      icon: Mail,
      label: "Email",
      value: user?.email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile?.phone || "Not provided",
    },
    {
      icon: Shield,
      label: "Role",
      value: user?.role,
    },
    {
      icon: CalendarDays,
      label: "Member since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "—",
    },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      {/* Avatar + name */}
      <div className="flex items-center gap-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="relative h-20 w-20 shrink-0 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
          {profile?.avatar ? (
            <Image
              src={profile.avatar}
              alt={user?.name || "Avatar"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <User className="h-8 w-8 text-slate-400" />
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {user?.name}
          </h2>
          {profile?.bio && (
            <p className="text-sm text-muted-foreground">{profile.bio}</p>
          )}
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
              user?.status === "UNBAN"
                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800"
                : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800"
            }`}
          >
            {user?.status === "UNBAN" ? "Active" : "Banned"}
          </span>
        </div>
      </div>

      {/* Detail rows */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                {label}
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
