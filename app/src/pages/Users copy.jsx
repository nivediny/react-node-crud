import { useState } from "react";
import UserList from "../components/Users/UserList";
import UserForm from "../components/Users/UserForm";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", dob: new Date(), age: 30, mobile: "123456789", phone: "987654321", gender: "Male", hobbies: { reading: true, cooking: false } },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", dob: new Date(), age: 25, mobile: "987654321", phone: "123456789", gender: "Female", hobbies: { traveling: true, gaming: false } },
  ]);
  const [userToEdit, setUserToEdit] = useState(null);

  const fields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "age", label: "Age", type: "number", required: true },
    { name: "mobile", label: "Mobile", type: "text", required: true },
    { name: "phone", label: "Phone", type: "text", required: true },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
    { name: "hobbies", label: "Hobbies", type: "checkbox", required: false },
  ];

  const handleSaveUser = (user) => {
    if (user.id) {
      // Update existing user
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add new user
      const newUser = { ...user, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setUserToEdit(null); // Reset edit mode
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
  };

  return (
    <div>
      <UserForm userToEdit={userToEdit} onSave={handleSaveUser} fields={fields} />
      <UserList users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} fields={fields} />
    </div>
  );
}

export default Users;
