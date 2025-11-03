// frontend/src/pages/Auth.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === adminUser && password === adminPass) {
      localStorage.setItem("isAdmin", "true");
      toast.success("Welcome Admin");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <div className="bg-white/90 rounded-xl p-8 w-full max-w-sm shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Admin Login</h2>
        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} className="w-full bg-purple-600 text-white">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Auth;
