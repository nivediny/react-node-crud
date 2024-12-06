import { useEffect, useState } from "react";
import { Drawer, Button, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import UserList from "../components/Users/UserList";
import UserForm from "../components/Users/UserForm";
import api from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "dob", label: "Date of Birth", type: "date", required: true },
    { name: "age", label: "Age", type: "number", required: true },
    { name: "mobile", label: "Mobile", type: "text", required: true },
    { name: "phone", label: "Phone", type: "text", required: true },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    {
      name: "hobbies",
      label: "Hobbies",
      type: "checkbox",
      options: ["Reading", "Cooking", "Traveling", "Gaming"],
      required: false,
    },
  ];

  const handleSaveUser = async (user) => {
    try {
      if (user.id) {
        // Update existing user
        await api.put(`/users/${user.id}`, user);
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? user : u))
        );
      } else {
        // Create new user
        const response = await api.post("/users", user);
        const newUser = { ...user, id: response.data.id };
        setUsers((prevUsers) => [...prevUsers, newUser]);
      }
      setUserToEdit(null); // Reset form
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setDrawerOpen(true); // Open the drawer to edit the user
  };

  const handleOpenDrawer = () => {
    setUserToEdit(null); // Ensure we are in "Add User" mode
    setDrawerOpen(true); // Open the drawer
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
  };

  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDrawer}
        >
          Add User
        </Button>
      </Box>

      {/* User List */}
      <UserList
        users={users}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
        fields={fields}
      />

      {/* Drawer for adding or editing user */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 300, padding: 2, paddingTop: 10 }}>
          <UserForm
            userToEdit={userToEdit}
            onSave={handleSaveUser}
            fields={fields}
          />
        </Box>
      </Drawer>
    </div>
  );
}

export default Users;
