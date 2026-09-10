
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* First page → Login */}
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                {/* Login Page */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* All Blogs Page */}
                <Route
                    path="/home"
                    element={<Home />}
                />

                {/* Create Blog Page */}
                <Route
                    path="/create-blog"
                    element={<CreateBlog />}
                />

                {/* Edit Blog Page */}
                <Route
                    path="/edit-blog/:id"
                    element={<EditBlog />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;