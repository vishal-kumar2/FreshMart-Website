import { useEffect, useState } from "react";
import api from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get("/users");
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="bg-white rounded-xl shadow">
        {users.map((u) => (
          <div
            key={u._id}
            className="p-4 border-b"
          >
            {u.email} —{" "}
            <span className="font-medium">
              {u.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
