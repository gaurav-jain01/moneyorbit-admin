import React, { useState, useEffect } from "react";
import ButtonComponent from "../components/ui/button";
import InputComponent from "../components/ui/input";
import { loginAdmin } from "../features/auth/api/auth.api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin({ email, password });

      const token = res.data.token || res.data.data?.token;
      if (!token) throw new Error("Token missing");

      localStorage.setItem("adminToken", token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl font-bold">Login Page</h1>
        <InputComponent label="Email" type="email" value={email} onChange={setEmail} />
        <InputComponent label="Password" type="password" value={password} onChange={setPassword} />
      </div>
      <ButtonComponent onClick={handleLogin}>Login</ButtonComponent>
    </div>
  );
}

export default Login;
