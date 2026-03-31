import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getUserFromToken } from "../../../Components/AdminSite/utils/tokenUtils";

const emptyForFields = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : field.defaultValue ?? "";
    return acc;
  }, {});

const normalizeValue = (field, value) => {
  if (field.type === "number" || field.type === "select") {
    if (value === "" || value === null || value === undefined) {
      return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  if (field.type === "checkbox") {
    return Boolean(value);
  }

  return value === "" ? null : value;
};

const ADMIN_ONLY_FIELD_NAMES = new Set(["IsActive", "IsDeleted", "Flag"]);

const isCurrentUserSuperAdmin = () => {
  try {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      const parsedUser = JSON.parse(cookieUser);
      if (Number(parsedUser?.roleId) === 1) {
        return true;
      }
    }
  } catch (error) {
    // ignore malformed cookie and fall back to token
  }

  const tokenUser = getUserFromToken();
  return Number(tokenUser?.roleId) === 1;
};

const CrmWorkspace = ({
  title,
  description,
  fields,
  service,
  searchPlaceholder,
  primaryField,
}) => {
  const isSuperAdmin = useMemo(() => isCurrentUserSuperAdmin(), []);
  const visibleFields = useMemo(
    () => fields.filter((field) => isSuperAdmin || !ADMIN_ONLY_FIELD_NAMES.has(field.name)),
    [fields, isSuperAdmin]
  );
  const initialForm = useMemo(() => emptyForFields(fields), [fields]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldOptions, setFieldOptions] = useState({});
  const tableFields = useMemo(
    () => visibleFields.filter((field) => field.name !== primaryField && !field.tableHidden).slice(0, 3),
    [visibleFields, primaryField]
  );

  const loadFieldOptions = async (cancelled = false) => {
    const selectableFields = visibleFields.filter((field) => typeof field.loadOptions === "function");

    if (!selectableFields.length) {
      setFieldOptions({});
      return;
    }

    const results = await Promise.all(
      selectableFields.map(async (field) => {
        try {
          const options = await field.loadOptions();
          return [field.name, options];
        } catch (error) {
          toast.error(`Unable to load ${field.label.toLowerCase()} options`);
          return [field.name, []];
        }
      })
    );

    if (!cancelled) {
      setFieldOptions(Object.fromEntries(results));
    }
  };

  useEffect(() => {
    let cancelled = false;

    loadFieldOptions(cancelled);

    return () => {
      cancelled = true;
    };
  }, [visibleFields]);

  const loadRows = async () => {
    setLoading(true);
    try {
      const response = await service.list({ limit: 100, offset: 0, search });
      setRows(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || `Unable to load ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, [search]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field.name]: value,
    }));
  };

  const getDisplayValue = (field, value) => {
    if (field.type === "checkbox") {
      return value ? "Yes" : "No";
    }

    if (field.type === "select") {
      const selectedOption = (fieldOptions[field.name] || []).find(
        (option) => String(option.value) === String(value)
      );
      return selectedOption?.label || (value ?? "-");
    }

    return value ?? "-";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = visibleFields.reduce((acc, field) => {
      acc[field.name] = normalizeValue(field, form[field.name]);
      return acc;
    }, {});

    try {
      if (editingId) {
        await service.update(editingId, payload);
        toast.success(`${title} updated`);
      } else {
        await service.create(payload);
        toast.success(`${title} created`);
      }

      resetForm();
      loadFieldOptions();
      loadRows();
    } catch (error) {
      toast.error(error.response?.data?.message || `Unable to save ${title.toLowerCase()}`);
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (row) => {
    const nextForm = fields.reduce((acc, field) => {
      acc[field.name] =
        row[field.name] ?? (field.type === "checkbox" ? false : field.defaultValue ?? "");
      return acc;
    }, {});

    setForm(nextForm);
    setEditingId(row.Id);
  };

  const handleDelete = async (id) => {
    try {
      await service.remove(id);
      toast.success(`${title} deleted`);
      if (editingId === id) {
        resetForm();
      }
      loadRows();
    } catch (error) {
      toast.error(error.response?.data?.message || `Unable to delete ${title.toLowerCase()}`);
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">CRM</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[380px,1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? `Edit ${title}` : `Create ${title}`}
              </h2>
              {editingId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
              ) : null}
            </div>

            <div className="mt-5 space-y-4">
              {visibleFields.map((field) =>
                field.createOnly && editingId ? null : (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    {field.label}
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      value={form[field.name] ?? ""}
                      onChange={(event) => handleChange(field, event.target.value)}
                      required={field.required}
                      rows={4}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.name])}
                      onChange={(event) => handleChange(field, event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-orange-500"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={form[field.name] ?? ""}
                      onChange={(event) => handleChange(field, event.target.value)}
                      required={field.required}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                    >
                      <option value="">{field.placeholder || `Select ${field.label}`}</option>
                      {(fieldOptions[field.name] || []).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={form[field.name] ?? ""}
                      onChange={(event) => handleChange(field, event.target.value)}
                      required={field.required}
                      placeholder={field.placeholder || ""}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                    />
                  )}
                </label>
                )
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {submitting ? "Saving..." : editingId ? "Update record" : "Create record"}
            </button>
          </form>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{title} Records</h2>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 sm:max-w-xs"
              />
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {primaryField}
                      </th>
                      {tableFields.map((field) => (
                          <th
                            key={field.name}
                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                          >
                            {field.label}
                          </th>
                        ))}
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                          Loading records...
                        </td>
                      </tr>
                    ) : rows.length ? (
                      rows.map((row) => (
                        <tr key={row.Id} className="hover:bg-slate-50">
                          <td className="px-4 py-4 text-sm font-medium text-slate-900">
                            {row[primaryField] || "-"}
                          </td>
                          {tableFields.map((field) => (
                              <td key={field.name} className="px-4 py-4 text-sm text-slate-600">
                                {String(getDisplayValue(field, row[field.name]))}
                              </td>
                            ))}
                          <td className="px-4 py-4 text-right text-sm">
                            <button
                              type="button"
                              onClick={() => startEdit(row)}
                              className="mr-3 font-semibold text-orange-600"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(row.Id)}
                              className="font-semibold text-rose-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                          No records available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrmWorkspace;
