import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import * as API from "../../Endpoint/Endpoint";

const initialForm = {
  name: "",
  email: "",
  password: "",
  mobileNumber: "",
  companyId: "",
  roleId: "",
  userTypeId: "",
  reportingManagerId: "",
  departmentId: "",
  designationId: "",
  hierarchyLevel: "0",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};

const RegisterUserPage = () => {
  const [form, setForm] = useState(initialForm);
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [companiesRes, rolesRes, userTypesRes, usersRes] = await Promise.all([
          axiosInstance.get(API.COMPANIES.GET_ACTIVE),
          axiosInstance.get(API.ROLES),
          axiosInstance.get(API.USER_TYPES),
          axiosInstance.get(API.GETALLUSERS, { params: { page: 1, limit: 200 } }),
        ]);

        setCompanies(companiesRes.data?.data || []);
        setRoles(rolesRes.data || []);
        setUserTypes(userTypesRes.data || []);
        setUsers(usersRes.data?.users || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load register form data");
      }
    };

    loadLookups();
  }, []);

  const managerOptions = useMemo(
    () =>
      users.map((user) => ({
        value: String(user.id),
        label: `${user.name} (${user.email})`,
      })),
    [users]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (userImage) {
        data.append("userImage", userImage);
      }

      await axiosInstance.post(API.CREATEUSER, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("User registered successfully");
      setForm(initialForm);
      setUserImage(null);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register user");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Register User</h2>
            <p className="text-sm text-slate-500">Create a new user from a full-page admin form.</p>
          </div>
          <Link to="/Admin/users" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back To Users
          </Link>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        {message ? <p className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p> : null}
        {error ? <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Name</span>
            <input name="name" value={form.name} onChange={handleChange} required className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Mobile Number</span>
            <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} required className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Company</span>
            <select name="companyId" value={form.companyId} onChange={handleChange} required className="rounded-xl border border-slate-300 px-3 py-2">
              <option value="">Select company</option>
              {companies.map((company) => (
                <option key={company.Id} value={company.Id}>{company.CompanyName}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Role</span>
            <select name="roleId" value={form.roleId} onChange={handleChange} required className="rounded-xl border border-slate-300 px-3 py-2">
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role.Id} value={role.Id}>{role.RoleName}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Access Type</span>
            <select name="userTypeId" value={form.userTypeId} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2">
              <option value="">Select access type</option>
              {userTypes.map((userType) => (
                <option key={userType.UserTypeId} value={userType.UserTypeId}>{userType.UserType}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Reporting Manager</span>
            <select name="reportingManagerId" value={form.reportingManagerId} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2">
              <option value="">Select manager</option>
              {managerOptions.map((manager) => (
                <option key={manager.value} value={manager.value}>{manager.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Department Id</span>
            <input name="departmentId" value={form.departmentId} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Designation Id</span>
            <input name="designationId" value={form.designationId} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Hierarchy Level</span>
            <input name="hierarchyLevel" value={form.hierarchyLevel} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm md:col-span-2">
            <span className="font-medium text-slate-700">Address</span>
            <input name="address" value={form.address} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">City</span>
            <input name="city" value={form.city} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">State</span>
            <input name="state" value={form.state} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Country</span>
            <input name="country" value={form.country} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Postal Code</span>
            <input name="postalCode" value={form.postalCode} onChange={handleChange} className="rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm md:col-span-2">
            <span className="font-medium text-slate-700">Profile Image</span>
            <input type="file" accept="image/*" onChange={(event) => setUserImage(event.target.files?.[0] || null)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" disabled={saving} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
              {saving ? "Registering..." : "Register User"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterUserPage;
