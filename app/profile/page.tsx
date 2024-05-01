import { getCurrentUser } from "@/data/get-user";
import EditProfileForm from "@/components/form/EditProfileForm";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="space-y-8">
      <EditProfileForm user={user!} />
      {user?.isOAuth === false && <ChangePasswordForm />}
    </div>
  );
};

export default ProfilePage;
