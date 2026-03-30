import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axiosInstance from "../utils/axiosInstance";
import * as API from "../../Endpoint/Endpoint";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [summary, setSummary] = useState({});
  const [employeeActivity, setEmployeeActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const response = await axiosInstance.get(API.COMPANIES.GET_ACTIVE);
      const rows = response.data?.data || [];
      setCompanies(rows);
      if (rows.length && !selectedCompanyId) {
        setSelectedCompanyId(String(rows[0].Id));
      }
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      setCompanies([]);
    }
  };

  const fetchReports = async (companyId) => {
    if (!companyId) return;

    const params = { companyId };
    const [dashboardRes, employeeRes, notificationsRes] = await Promise.all([
      axiosInstance.get(API.REPORTS_DASHBOARD, { params }),
      axiosInstance.get(API.REPORTS_EMPLOYEE_ACTIVITY, { params }),
      axiosInstance.get(API.REPORTS_NOTIFICATIONS, { params: { companyId, limit: 8 } }),
    ]);

    setSummary(dashboardRes.data?.summary || {});
    setEmployeeActivity(employeeRes.data?.data || []);
    setNotifications(notificationsRes.data?.data || []);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!selectedCompanyId) return;
      try {
        setLoading(true);
        await fetchReports(selectedCompanyId);
      } catch (error) {
        console.error("Failed to fetch report data:", error);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [selectedCompanyId]);

  const employeeChartData = useMemo(
    () =>
      employeeActivity.slice(0, 8).map((item) => ({
        name: item.Name,
        leads: Number(item.LeadsCreated || 0),
        revenue: Number(item.RevenueGenerated || 0),
      })),
    [employeeActivity]
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">Welcome to Home Page</h2>
        <p className="mt-1 text-sm text-slate-500">
          Company-wise report dashboard with employee activity and API failure notifications.
        </p>

        <div className="mt-4 max-w-sm">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Select Company</label>
          <select
            value={selectedCompanyId}
            onChange={(event) => setSelectedCompanyId(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            {companies.map((company) => (
              <option key={company.Id} value={company.Id}>
                {company.CompanyName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { title: "Active Leads", value: summary.ActiveLeads || 0, color: "bg-blue-500" },
          { title: "Active Opportunities", value: summary.ActiveOpportunities || 0, color: "bg-indigo-500" },
          { title: "Total Revenue", value: `Rs ${summary.TotalRevenue || 0}`, color: "bg-emerald-500" },
          { title: "API Failures (7d)", value: summary.ApiFailuresLast7Days || 0, color: "bg-rose-500" },
        ].map((card) => (
          <div key={card.title} className={`${card.color} rounded-2xl p-5 text-white shadow`}>
            <p className="text-sm font-semibold">{card.title}</p>
            <p className="mt-2 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Employee-wise Activity</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={employeeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leads" fill="#3B82F6" name="Leads" />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Latest Notifications</h3>
          <div className="max-h-[320px] space-y-3 overflow-auto pr-2">
            {notifications.map((notification) => (
              <div key={notification.Id} className="rounded-xl border border-slate-200 p-3">
                <p className="font-semibold text-slate-800">{notification.Title}</p>
                <p className="text-sm text-slate-600">{notification.Message}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {notification.Type} | {notification.Severity}
                </p>
              </div>
            ))}
            {!loading && !notifications.length ? (
              <p className="text-sm text-slate-500">No notifications for this company.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
