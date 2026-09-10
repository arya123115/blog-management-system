
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
//
// function Home() {
//     const [blogs, setBlogs] = useState([]);
//     const [comments, setComments] = useState([]);
//     const [newComments, setNewComments] = useState({});
//     const [error, setError] = useState("");
//
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         getBlogs();
//         getComments();
//     }, []);
//
//     const getBlogs = async () => {
//         try {
//             const response = await axios.get(
//                 "http://127.0.0.1:8000/api/blogs/"
//             );
//
//             setBlogs(response.data);
//         } catch (error) {
//             console.log(error);
//             setError("Unable to load blogs");
//         }
//     };
//
//     const getComments = async () => {
//         try {
//             const response = await axios.get(
//                 "http://127.0.0.1:8000/api/comments/"
//             );
//
//             setComments(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     const deleteBlog = async (id) => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this blog?"
//         );
//
//         if (!confirmDelete) {
//             return;
//         }
//
//         try {
//             const token = localStorage.getItem("access");
//
//             await axios.delete(
//                 `http://127.0.0.1:8000/api/blogs/${id}/`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//
//             getBlogs();
//             setError("");
//         } catch (error) {
//             console.log(error);
//
//             if (error.response) {
//                 setError(JSON.stringify(error.response.data));
//             } else {
//                 setError("Unable to delete blog");
//             }
//         }
//     };
//
//     const handleCommentChange = (blogId, value) => {
//         setNewComments({
//             ...newComments,
//             [blogId]: value,
//         });
//     };
//
//     const addComment = async (blogId) => {
//         const token = localStorage.getItem("access");
//
//         if (!token) {
//             setError("Please login first.");
//             return;
//         }
//
//         const commentText = newComments[blogId];
//
//         if (!commentText || !commentText.trim()) {
//             setError("Comment cannot be empty.");
//             return;
//         }
//
//         try {
//             await axios.post(
//                 "http://127.0.0.1:8000/api/comments/",
//                 {
//                     blog: blogId,
//                     content: commentText,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//
//             setNewComments({
//                 ...newComments,
//                 [blogId]: "",
//             });
//
//             setError("");
//             getComments();
//         } catch (error) {
//             console.log(error);
//
//             if (error.response) {
//                 setError(JSON.stringify(error.response.data));
//             } else {
//                 setError("Unable to add comment.");
//             }
//         }
//     };
//
//     const editComment = async (id, blogId, oldContent) => {
//         const newContent = window.prompt(
//             "Edit your comment:",
//             oldContent
//         );
//
//         if (!newContent || !newContent.trim()) {
//             return;
//         }
//
//         try {
//             const token = localStorage.getItem("access");
//
//             await axios.put(
//                 `http://127.0.0.1:8000/api/comments/${id}/`,
//                 {
//                     blog: blogId,
//                     content: newContent,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//
//             getComments();
//             setError("");
//         } catch (error) {
//             console.log(error);
//
//             if (error.response) {
//                 setError(JSON.stringify(error.response.data));
//             } else {
//                 setError("Unable to edit comment.");
//             }
//         }
//     };
//
//     const deleteComment = async (id) => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this comment?"
//         );
//
//         if (!confirmDelete) {
//             return;
//         }
//
//         try {
//             const token = localStorage.getItem("access");
//
//             await axios.delete(
//                 `http://127.0.0.1:8000/api/comments/${id}/`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//
//             getComments();
//             setError("");
//         } catch (error) {
//             console.log(error);
//
//             if (error.response) {
//                 setError(JSON.stringify(error.response.data));
//             } else {
//                 setError("Unable to delete comment.");
//             }
//         }
//     };
//
//     const username = localStorage.getItem("username");
//
//     return (
//         <div>
//             <h1>Blog Management System</h1>
//
//             <p>
//                 Welcome, {username}
//             </p>
//
//             {/* Back Button */}
//             <button
//                 onClick={() => navigate("/login")}
//                 style={{
//                     backgroundColor: "blue",
//                     color: "white",
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     marginRight: "10px",
//                 }}
//             >
//                 Back
//             </button>
//
//             {/* Create Blog Button */}
//             <button
//                 onClick={() => navigate("/create-blog")}
//                 style={{
//                     backgroundColor: "blue",
//                     color: "white",
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                 }}
//             >
//                 Create Blog
//             </button>
//
//             <h2>All Blog Posts</h2>
//
//             {error && (
//                 <p style={{ color: "red" }}>
//                     {error}
//                 </p>
//             )}
//
//             {blogs.length === 0 ? (
//                 <p>No blogs available.</p>
//             ) : (
//                 blogs.map((blog) => (
//                     <div key={blog.id}>
//                         <h3>{blog.title}</h3>
//
//                         <p>{blog.content}</p>
//
//                         <p>
//                             Author: {blog.author_name}
//                         </p>
//
//                         {/* Edit and Delete Own Blog */}
//                         {blog.author_name === username && (
//                             <div>
//                                 <button
//                                     onClick={() =>
//                                         navigate(
//                                             `/edit-blog/${blog.id}`
//                                         )
//                                     }
//                                 >
//                                     Edit
//                                 </button>
//
//                                 <button
//                                     onClick={() =>
//                                         deleteBlog(blog.id)
//                                     }
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         )}
//
//                         <h4>Comments</h4>
//
//                         {/* Display Comments */}
//                         {comments
//                             .filter(
//                                 (comment) =>
//                                     comment.blog === blog.id
//                             )
//                             .map((comment) => (
//                                 <div key={comment.id}>
//                                     <p>
//                                         <b>
//                                             {comment.author_name}
//                                         </b>
//                                         : {comment.content}
//                                     </p>
//
//                                     {/* Edit and Delete Own Comment */}
//                                     {comment.author_name === username && (
//                                         <div>
//                                             <button
//                                                 onClick={() =>
//                                                     editComment(
//                                                         comment.id,
//                                                         blog.id,
//                                                         comment.content
//                                                     )
//                                                 }
//                                             >
//                                                 Edit
//                                             </button>
//
//                                             <button
//                                                 onClick={() =>
//                                                     deleteComment(
//                                                         comment.id
//                                                     )
//                                                 }
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//
//                         {/* Add Comment */}
//                         <input
//                             type="text"
//                             placeholder="Write a comment"
//                             value={
//                                 newComments[blog.id] || ""
//                             }
//                             onChange={(e) =>
//                                 handleCommentChange(
//                                     blog.id,
//                                     e.target.value
//                                 )
//                             }
//                         />
//
//                         <button
//                             onClick={() =>
//                                 addComment(blog.id)
//                             }
//                         >
//                             Add Comment
//                         </button>
//
//                         <hr />
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }
//
// export default Home;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState({});
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getBlogs();
        getComments();
    }, []);

    const getBlogs = async () => {
        try {
            const response = await axios.get("/api/blogs/");
            setBlogs(response.data);
        } catch (error) {
            console.log(error);
            setError("Unable to load blogs");
        }
    };

    const getComments = async () => {
        try {
            const response = await axios.get("/api/comments/");
            setComments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBlog = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("access");

            await axios.delete(`/api/blogs/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            getBlogs();
            setError("");
        } catch (error) {
            console.log(error);

            if (error.response) {
                setError(JSON.stringify(error.response.data));
            } else {
                setError("Unable to delete blog");
            }
        }
    };

    const handleCommentChange = (blogId, value) => {
        setNewComments({
            ...newComments,
            [blogId]: value,
        });
    };

    const addComment = async (blogId) => {
        const token = localStorage.getItem("access");

        if (!token) {
            setError("Please login first.");
            return;
        }

        const commentText = newComments[blogId];

        if (!commentText || !commentText.trim()) {
            setError("Comment cannot be empty.");
            return;
        }

        try {
            await axios.post(
                "/api/comments/",
                {
                    blog: blogId,
                    content: commentText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setNewComments({
                ...newComments,
                [blogId]: "",
            });

            setError("");
            getComments();
        } catch (error) {
            console.log(error);

            if (error.response) {
                setError(JSON.stringify(error.response.data));
            } else {
                setError("Unable to add comment.");
            }
        }
    };

    const editComment = async (id, blogId, oldContent) => {
        const newContent = window.prompt(
            "Edit your comment:",
            oldContent
        );

        if (!newContent || !newContent.trim()) {
            return;
        }

        try {
            const token = localStorage.getItem("access");

            await axios.put(
                `/api/comments/${id}/`,
                {
                    blog: blogId,
                    content: newContent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            getComments();
            setError("");
        } catch (error) {
            console.log(error);

            if (error.response) {
                setError(JSON.stringify(error.response.data));
            } else {
                setError("Unable to edit comment.");
            }
        }
    };

    const deleteComment = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("access");

            await axios.delete(`/api/comments/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            getComments();
            setError("");
        } catch (error) {
            console.log(error);

            if (error.response) {
                setError(JSON.stringify(error.response.data));
            } else {
                setError("Unable to delete comment.");
            }
        }
    };

    const username = localStorage.getItem("username");

    return (
        <div>
            <h1>Blog Management System</h1>

            <p>
                Welcome, {username}
            </p>

            {/* Back Button */}
            <button
                onClick={() => navigate("/login")}
                style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                }}
            >
                Back
            </button>

            {/* Create Blog Button */}
            <button
                onClick={() => navigate("/create-blog")}
                style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Create Blog
            </button>

            <h2>All Blog Posts</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {blogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                blogs.map((blog) => (
                    <div key={blog.id}>
                        <h3>{blog.title}</h3>

                        <p>{blog.content}</p>

                        <p>
                            Author: {blog.author_name}
                        </p>

                        {/* Edit and Delete Own Blog */}
                        {blog.author_name === username && (
                            <div>
                                <button
                                    onClick={() =>
                                        navigate(`/edit-blog/${blog.id}`)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteBlog(blog.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        )}

                        <h4>Comments</h4>

                        {/* Display Comments */}
                        {comments
                            .filter(
                                (comment) =>
                                    comment.blog === blog.id
                            )
                            .map((comment) => (
                                <div key={comment.id}>
                                    <p>
                                        <b>
                                            {comment.author_name}
                                        </b>
                                        : {comment.content}
                                    </p>

                                    {/* Edit and Delete Own Comment */}
                                    {comment.author_name === username && (
                                        <div>
                                            <button
                                                onClick={() =>
                                                    editComment(
                                                        comment.id,
                                                        blog.id,
                                                        comment.content
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteComment(
                                                        comment.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}

                        {/* Add Comment */}
                        <input
                            type="text"
                            placeholder="Write a comment"
                            value={newComments[blog.id] || ""}
                            onChange={(e) =>
                                handleCommentChange(
                                    blog.id,
                                    e.target.value
                                )
                            }
                        />

                        <button
                            onClick={() =>
                                addComment(blog.id)
                            }
                        >
                            Add Comment
                        </button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;