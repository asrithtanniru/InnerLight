import React from "react";
import { Button } from "../components/ui/button";

const GOOGLE_AUTH_URL = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/auth/google`;

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    window.open(GOOGLE_AUTH_URL, "_self");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 rounded-lg shadow-lg bg-card flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold mb-4">Sign in to InnerLight</h1>
        <Button onClick={handleGoogleSignIn} className="w-full">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
} 
