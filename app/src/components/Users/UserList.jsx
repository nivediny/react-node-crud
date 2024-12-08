import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function UserList({ users = [], onDelete, onEdit, fields }) {
  if (!Array.isArray(users)) {
    // If users is not an array, log the issue for debugging
    console.error("Expected users to be an array, but got:", typeof users);
    return <div>There was an error loading the users.</div>;
  }

  return (
    
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell sx={{ fontWeight: "bold" }} key={field.name}>
                {field.label}
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id || user.email}> {/* Fallback key */}
              {fields.map((field) => {
                if (field.type === "checkbox") {
                  return (
                    <TableCell key={field.name}>
                      {user[field.name] ? "Yes" : "No"}
                    </TableCell>
                  );
                }

                if (field.type === "date") {
                  return (
                    <TableCell key={field.name}>
                      {user[field.name] ? new Date(user[field.name]).toLocaleDateString() : "N/A"}
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={field.name}>
                    {user[field.name] || "N/A"} {/* Handle missing values gracefully */}
                  </TableCell>
                );
              })}
              <TableCell>
                <IconButton onClick={() => onEdit(user)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(user.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
  );
}

export default UserList;
