import { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const providers = [{ id: "credentials", name: "Email and password" }];

const signIn = async (provider, formData, navigate, setPopupOpen, resetFormFields) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const email = formData?.get("email");
      const password = formData?.get("password");

      if (email === "admin@mail.com" && password === "A12345") {
        alert(`Signing in with "${provider.name}" and credentials: ${email}`);
        resolve({ type: "CredentialsSignin" }); // Success
        navigate("/dashboard"); // Redirect to dashboard on success
      } else {
        setPopupOpen(true); // Show popup for invalid credentials
        resetFormFields(); // Reset form fields manually
        reject(new Error("Invalid credentials")); // Reject for invalid credentials
      }
    }, 300);
  });
};

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);

  // Controlled form state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const resetFormFields = () => {
    setEmail(""); // Reset email
    setPassword(""); // Reset password
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) =>
          signIn(provider, formData, navigate, setPopupOpen, resetFormFields)
        }
        providers={providers}
        navigate={navigate}
        formData={{
          email,
          password,
        }}
        onEmailChange={(e) => setEmail(e.target.value)} // Controlled email input
        onPasswordChange={(e) => setPassword(e.target.value)} // Controlled password input
      />
      {/* Invalid Credentials Popup */}
      <Dialog open={popupOpen} onClose={handleClosePopup}>
        <DialogTitle>Invalid Credentials</DialogTitle>
        <DialogContent>
          <Typography>
            The email or password you entered is incorrect. Please try again.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </AppProvider>
  );
}
