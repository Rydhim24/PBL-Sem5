// // Profile.jsx
// import { useState, useEffect } from "react";
// import API from "./api";

// export default function Profile() {
//     const [profile, setProfile] = useState(null);
//     const [editing, setEditing] = useState(false);
//     const [form, setForm] = useState({ name: "", about: "", skills: "", reason: "", avatar: "" });

//     useEffect(() => {
//         (async () => {
//             const { data } = await API.get("/profile", {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//             });
//             setProfile(data);
//             setForm({
//                 name: data?.name || "",
//                 about: data?.about || "",
//                 skills: data?.skills?.join(", ") || "",
//                 reason: data?.reason || "",
//                 avatar: data?.avatar || ""
//             });
//         })();
//     }, []);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         const { data } = await API.post(
//             "/profile",
//             { ...form, skills: form.skills.split(",").map(s => s.trim()) },
//             { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//         );
//         setProfile(data);
//         setEditing(false);
//     };

//     if (!profile) return <p className="text-white">Loading...</p>;

//     return (
//         <div className="min-h-screen bg-gray-100 flex justify-center py-10">
//             <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
//                 {/* Avatar */}
//                 <img
//                     src={profile.avatar || "https://via.placeholder.com/150"}
//                     alt="avatar"
//                     className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 object-cover"
//                 />

//                 {editing ? (
//                     <div className="mt-6 space-y-3 text-black">
//                         <input
//                             name="avatar"
//                             placeholder="Avatar URL"
//                             value={form.avatar}
//                             onChange={handleChange}
//                             className="w-full border px-3 py-2 rounded-lg"
//                         />
//                         <input
//                             name="name"
//                             placeholder="Name"
//                             value={form.name}
//                             onChange={handleChange}
//                             className="w-full border px-3 py-2 rounded-lg"
//                         />
//                         <textarea
//                             name="about"
//                             placeholder="About"
//                             value={form.about}
//                             onChange={handleChange}
//                             className="w-full border px-3 py-2 rounded-lg"
//                         />
//                         <input
//                             name="skills"
//                             placeholder="Skills (comma separated)"
//                             value={form.skills}
//                             onChange={handleChange}
//                             className="w-full border px-3 py-2 rounded-lg"
//                         />
//                         <input
//                             name="reason"
//                             placeholder="Why did you join?"
//                             value={form.reason}
//                             onChange={handleChange}
//                             className="w-full border px-3 py-2 rounded-lg"
//                         />
//                         <button
//                             onClick={handleSave}
//                             className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="mt-6">
//                         <h2 className="text-xl font-bold">{profile.name || "No Name Yet"}</h2>
//                         <p className="text-gray-600 mt-2">{profile.about}</p>
//                         <p className="mt-2"><span className="font-semibold">Skills:</span> {profile.skills?.join(", ")}</p>
//                         <p className="mt-2 text-sm text-gray-500">{profile.reason}</p>

//                         <button
//                             onClick={() => setEditing(true)}
//                             className="mt-4 w-full bg-gray-200 text-black py-2 rounded-lg font-semibold hover:bg-gray-300"
//                         >
//                             Edit Profile
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


// Profile.jsx
import { useState, useEffect } from "react";
import API from "./api";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: "",
        about: "",
        skills: "",
        reason: "",
        avatar: ""
    });

    // Fetch profile from backend
    useEffect(() => {
        (async () => {
            try {
                const { data } = await API.get("/profile", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });

                if (data) {
                    setProfile(data);
                    setForm({
                        name: data.name || "",
                        about: data.about || "",
                        skills: data.skills?.join(", ") || "",
                        reason: data.reason || "",
                        avatar: data.avatar || ""
                    });
                    setEditing(false);
                } else {
                    // 🚨 first time user, no profile yet → open form directly
                    setEditing(true);
                }
            } catch (err) {
                console.error("Error loading profile", err);
                setEditing(true); // fallback: open form
            }
        })();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const { data } = await API.post(
                "/profile",
                { ...form, skills: form.skills.split(",").map((s) => s.trim()) },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setProfile(data);
            setEditing(false);
        } catch (err) {
            alert("Error saving profile");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-10">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
                {/* Avatar */}
                <img
                    src={form.avatar || "https://via.placeholder.com/150"}
                    alt="avatar"
                    className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 object-cover"
                />

                {editing ? (
                    <div className="mt-6 space-y-3 text-black">
                        <input
                            name="avatar"
                            placeholder="Avatar URL"
                            value={form.avatar}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                        <textarea
                            name="about"
                            placeholder="About"
                            value={form.about}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                        <input
                            name="skills"
                            placeholder="Skills (comma separated)"
                            value={form.skills}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                        <input
                            name="reason"
                            placeholder="Why did you join?"
                            value={form.reason}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />

                        <button
                            onClick={handleSave}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
                        >
                            Save Profile
                        </button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold">{profile?.name}</h2>
                        <p className="text-gray-600 mt-2">{profile?.about}</p>
                        <p className="mt-2">
                            <span className="font-semibold">Skills:</span>{" "}
                            {profile?.skills?.join(", ")}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">{profile?.reason}</p>

                        <button
                            onClick={() => setEditing(true)}
                            className="mt-4 w-full bg-gray-200 text-black py-2 rounded-lg font-semibold hover:bg-gray-300"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

