

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                {
                    username: username,
                    password: password,
                }
            );

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("username", username);

            // Login successful → All Blogs page
            navigate("/home");

        } catch (error) {
            setError("Invalid username or password");
        }
    };

    return (
        <div>
            <h1>Blog Management System</h1>

            <h2>Login</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleLogin}>

                <div>
                    <label>Username</label>
                    <br />

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button
                    type="submit"
                    style={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </form>
        </div>
    );
}

export default Login;