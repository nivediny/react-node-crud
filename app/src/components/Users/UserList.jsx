import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function UserList({ users, onDelete, onEdit, fields }) {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell key={field.name}>{field.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
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
                      {new Date(user[field.name]).toLocaleDateString()|| ""}
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={field.name}>{user[field.name]}</TableCell>
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
    </div>
  );
}

export default UserList;
