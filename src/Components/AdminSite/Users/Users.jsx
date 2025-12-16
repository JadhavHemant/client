
import { useState } from "react";
import axios from "axios";
import * as API from "../../Endpoint/Endpoint"
import UsersPage from "./UsersPage";

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    companyId: "",
    userTypeId: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUserImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (userImage) {
        data.append("userImage", userImage);
      }
      const res = await axios.post(API.CREATEUSER, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMessage(res.data.message || "✅ User created successfully!");
      setFormData({ name: "", email: "", password: "", mobileNumber: "", companyId: "", userTypeId: "", address: "", city: "", state: "", country: "", postalCode: "", });
      setUserImage(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Create New User</h2>
        {message && (<p className={`mb-4 p-2 rounded ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message}</p>)}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {["name", "email", "password", "mobileNumber", "companyId", "userTypeId", "address", "city", "state", "country", "postalCode",].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="capitalize">{field}</label>
              <input type={field === "password" ? "password" : "text"} name={field} value={formData[field]} onChange={handleChange} required={["name", "email", "password", "mobileNumber"].includes(field)} className="border p-2 rounded" />
            </div>
          ))}
          <div className="flex flex-col col-span-2">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
          </div>
          <div className="col-span-2">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
     
      <div>
        <UsersPage />
      </div>
    </>
  );
}

