import { Suspense } from "react";
import ProfileCard from "../../_components/ProfileCard";
import { ProfileSkeleton } from "../../_components/ProfileSkeleton";

const AdminProfilePage = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your account details and information.
        </p>
      </div>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileCard />
      </Suspense>
    </div>
  );
};

export default AdminProfilePage;
