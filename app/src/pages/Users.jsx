import { useEffect, useState } from "react";
import { Drawer, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import UserList from "../components/Users/UserList";
import UserForm from "../components/Users/UserForm";
import api from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete dialog
  const [userIdToDelete, setUserIdToDelete] = useState(null); // Store user ID for deletion

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

  const handleDeleteUser = async () => {
    try {
      if (userIdToDelete) {
        await api.delete(`/users/${userIdToDelete}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
      }
      setOpenDeleteDialog(false); // Close dialog after delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId); // Store user ID to delete
    setOpenDeleteDialog(true); // Open delete confirmation dialog
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Close delete dialog without deleting
    setUserIdToDelete(null); // Clear the stored user ID
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
        onDelete={handleDeleteClick} // Use handleDeleteClick for delete button
        onEdit={handleEditUser}
        fields={fields}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this user?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Drawer for adding or editing user */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 400, padding: 2, paddingTop: 10 }}>
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
