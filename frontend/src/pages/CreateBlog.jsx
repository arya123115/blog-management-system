
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem("access");

            if (!token) {
                setError("Please login first.");
                return;
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/api/blogs/",
                {
                    title: title,
                    content: content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Blog created:", response.data);

            setTitle("");
            setContent("");

            navigate("/home");

        } catch (error) {
            console.log("Create blog error:", error);

            if (error.response) {
                setError(
                    JSON.stringify(error.response.data)
                );
            } else {
                setError("Unable to connect to server.");
            }
        }
    };

    return (
        <div>
            <h1>Create Blog</h1>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Title</label>
                    <br />

                    <input
                        type="text"
                        placeholder="Enter blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Content</label>
                    <br />

                    <textarea
                        placeholder="Enter blog content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="8"
                        cols="50"
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
                    Create Blog
                </button>

            </form>
        </div>
    );
}

export default CreateBlog;
