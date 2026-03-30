import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import * as API from "../../Endpoint/Endpoint";

const initialForm = {
  name: "",
  email: "",
  password: "",
  mobileNumber: "",
  companyId: "",
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

const buildTree = (rows) => {
  const map = new Map();
  rows.forEach((row) => {
    map.set(row.UserId, { ...row, children: [] });
  });

  const roots = [];
  rows.forEach((row) => {
    const node = map.get(row.UserId);
    if (row.ReportingManagerId && map.has(row.ReportingManagerId)) {
      map.get(row.ReportingManagerId).children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
};

const HierarchyNode = ({ node }) => {
  return (
    <li className="mb-2">
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
        <p className="font-semibold text-slate-800">{node.Name}</p>
        <p className="text-xs text-slate-500">{node.Email || "No email"}</p>
        <p className="text-xs text-slate-500">Level: {node.Level}</p>
      </div>
      {node.children.length ? (
        <ul className="ml-5 mt-2 border-l border-slate-300 pl-3">
          {node.children.map((child) => (
            <HierarchyNode key={child.UserId} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [hierarchyRows, setHierarchyRows] = useState([]);
  const [hierarchyMode, setHierarchyMode] = useState("org");
  const [hierarchyLoading, setHierarchyLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [userImage, setUserImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(API.GETALLUSERS, {
        params: { search, page, limit },
      });
      setUsers(response.data.users || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axiosInstance.get(API.COMPANIES.GET_ACTIVE);
      setCompanies(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]);
    }
  };

  const fetchHierarchy = async () => {
    setHierarchyLoading(true);
    try {
      const hierarchyUrl = hierarchyMode === "team" ? API.USERS_MY_TEAM : API.USERS_HIERARCHY;
      const response = await axiosInstance.get(hierarchyUrl);
      setHierarchyRows(response.data.hierarchy || []);
    } catch (error) {
      console.error("Error fetching hierarchy:", error);
      setHierarchyRows([]);
    } finally {
      setHierarchyLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchHierarchy();
  }, [hierarchyMode]);

  const hierarchyTree = useMemo(() => buildTree(hierarchyRows), [hierarchyRows]);

  const openCreateModal = () => {
    setMode("create");
    setSelectedUserId(null);
    setForm(initialForm);
    setUserImage(null);
    setStatusMessage("");
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setMode("edit");
    setSelectedUserId(user.id);
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      mobileNumber: user.mobileNumber || "",
      companyId: user.companyId ? String(user.companyId) : "",
      userTypeId: user.userTypeId ? String(user.userTypeId) : "",
      reportingManagerId: user.reportingManagerId ? String(user.reportingManagerId) : "",
      departmentId: user.departmentId ? String(user.departmentId) : "",
      designationId: user.designationId ? String(user.designationId) : "",
      hierarchyLevel: user.hierarchyLevel != null ? String(user.hierarchyLevel) : "0",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      country: user.country || "",
      postalCode: user.postalCode || "",
    });
    setUserImage(null);
    setStatusMessage("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm(initialForm);
    setUserImage(null);
    setStatusMessage("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatusMessage("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (mode === "edit" && key === "password" && !value) return;
        data.append(key, value);
      });

      if (mode === "edit") {
        data.append("userId", selectedUserId);
      }

      if (userImage) {
        data.append(mode === "create" ? "userImage" : "image", userImage);
      }

      if (mode === "create") {
        await axiosInstance.post(API.CREATEUSER, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setStatusMessage("User created successfully");
      } else {
        await axiosInstance.put(API.UPDATE_USER, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setStatusMessage("User updated successfully");
      }

      await fetchUsers();
      closeModal();
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Unable to save record");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    "name",
    "email",
    "password",
    "mobileNumber",
    "companyId",
    "userTypeId",
    "reportingManagerId",
    "departmentId",
    "designationId",
    "hierarchyLevel",
    "address",
    "city",
    "state",
    "country",
    "postalCode",
  ];

  const getCompanyName = (companyId) => {
    if (!companyId) return "-";
    const company = companies.find((c) => String(c.Id) === String(companyId));
    return company?.CompanyName || companyId;
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Users List</h2>
            <p className="text-sm text-slate-500">Create and update records from a single clean list page.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Create New Record
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name, email, or mobile..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="mb-4 w-full max-w-md rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Mobile</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Role Type</th>
                <th className="px-4 py-3 text-left">Manager</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.mobileNumber || "-"}</td>
                    <td className="px-4 py-3">{getCompanyName(user.companyId)}</td>
                    <td className="px-4 py-3">{user.userTypeId || "-"}</td>
                    <td className="px-4 py-3">{user.reportingManagerName || "-"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="rounded-lg border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page <= 1}
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page >= totalPages}
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Organization Hierarchy</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHierarchyMode("org")}
              className={`rounded px-3 py-1 text-sm ${
                hierarchyMode === "org"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-700"
              }`}
            >
              Full Org
            </button>
            <button
              onClick={() => setHierarchyMode("team")}
              className={`rounded px-3 py-1 text-sm ${
                hierarchyMode === "team"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-700"
              }`}
            >
              My Team
            </button>
            <button onClick={fetchHierarchy} className="rounded bg-slate-900 px-3 py-1 text-sm text-white">
              Refresh Tree
            </button>
          </div>
        </div>

        {hierarchyLoading ? (
          <p className="text-sm text-slate-600">Loading hierarchy...</p>
        ) : hierarchyTree.length ? (
          <ul>
            {hierarchyTree.map((node) => (
              <HierarchyNode key={node.UserId} node={node} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-600">No hierarchy data available.</p>
        )}
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">
                {mode === "create" ? "Create New User" : "Update User"}
              </h3>
              <button onClick={closeModal} className="rounded border px-3 py-1 text-sm">
                Close
              </button>
            </div>

            {statusMessage ? (
              <p className="mb-3 rounded bg-slate-100 px-3 py-2 text-sm text-slate-700">{statusMessage}</p>
            ) : null}

            <form onSubmit={handleSave} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {fields.map((field) => (
                <label key={field} className="flex flex-col gap-1 text-sm">
                  <span className="capitalize text-slate-700">
                    {field === "companyId" ? "Company" : field}
                  </span>
                  {field === "companyId" ? (
                    <select
                      name={field}
                      value={form[field]}
                      onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                      required
                      className="rounded border border-slate-300 px-3 py-2"
                    >
                      <option value="">Select company</option>
                      {companies.map((company) => (
                        <option key={company.Id} value={company.Id}>
                          {company.CompanyName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field === "password" ? "password" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                      required={mode === "create" ? ["name", "email", "password", "mobileNumber"].includes(field) : false}
                      className="rounded border border-slate-300 px-3 py-2"
                    />
                  )}
                </label>
              ))}

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-slate-700">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setUserImage(event.target.files[0])}
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : mode === "create" ? "Create Record" : "Update Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UsersPage;
