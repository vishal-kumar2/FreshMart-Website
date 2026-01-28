import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please login first.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <p className="mb-2">
        <strong>Username:</strong> {user.username}
      </p>

      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>

      <p className="mb-2">
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default Profile;
