import { AuthProvider } from "@/context/AuthContext";
import { CustomThemeProvider } from "@/context/ThemeContext";
import { CssBaseline } from "@mui/material";
import "./globals.css";
import type { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "COP THEME",
  description:
    "A GAMING APPLICATION FOR LOTTERY SYSTEMS, INCLUDING LOTTO, SWEEPSTAKES, AND RAFFLES.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <CustomThemeProvider>
          <CssBaseline />
          <AuthProvider>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              {children}
            </GoogleOAuthProvider>
          </AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
