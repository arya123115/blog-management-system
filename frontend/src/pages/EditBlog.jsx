import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/blogs/${id}/`
            );

            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.log(error);
            setError("Unable to load blog");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem("access");

            await axios.put(
                `http://127.0.0.1:8000/api/blogs/${id}/`,
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

            navigate("/");
        } catch (error) {
            console.log(error);

            if (error.response) {
                setError(
                    JSON.stringify(error.response.data)
                );
            } else {
                setError("Unable to update blog");
            }
        }
    };

    return (
        <div>
            <h1>Edit Blog</h1>

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
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Content</label>
                    <br />

                    <textarea
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        rows="8"
                        cols="50"
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Update Blog
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>

            </form>
        </div>
    );
}

export default EditBlog;