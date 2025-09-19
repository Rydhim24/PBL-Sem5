import { useState } from "react";
import API from "./api";

export default function Register() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const route = isLogin ? "/auth/login" : "/auth/register";
            const { data } = await API.post(route, form);
            alert(JSON.stringify(data)); // demo output
            localStorage.setItem("token", data.token);
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundColor: "#e3f0ff" }}
        >
            {/* backgroundColor: "#e3f0ff" */}
            <div className="absolute inset-0 bg-blue-200 bg-opacity-70 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-xl shadow-2xl w-96 p-8 text-center z-10">
                <h2 className="text-2xl font-bold mb-6 text-black">{isLogin ? "Welcome Back" : "Join CampusCollab"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full text-black border border-gray-300 rounded-lg px-3 py-2 mb-3 placeholder-black"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        className="w-full text-black border border-gray-300 rounded-lg px-3 py-2 mb-6 placeholder-black"
                    />
                    <button
                        type="submit"
                        className="w-full text-black bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <p
                    className="mt-4 text-sm text-gray-600 cursor-pointer hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
}

