import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../utils/axiosInstance";
import * as API from "../../Endpoint/Endpoint";

const Reports = () => {
  const [dashboard, setDashboard] = useState({
    summary: {},
    apiHealth: [],
    recentAlerts: [],
  });
  const [employeeActivity, setEmployeeActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    const [dashboardRes, employeeRes, notificationsRes] = await Promise.all([
      axiosInstance.get(API.REPORTS_DASHBOARD),
      axiosInstance.get(API.REPORTS_EMPLOYEE_ACTIVITY),
      axiosInstance.get(API.REPORTS_NOTIFICATIONS, { params: { limit: 10 } }),
    ]);

    setDashboard(dashboardRes.data || { summary: {}, apiHealth: [], recentAlerts: [] });
    setEmployeeActivity(employeeRes.data?.data || []);
    setNotifications(notificationsRes.data?.data || []);
  };

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        await fetchDashboard();
      } catch (error) {
        console.error("Failed to load reports dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const summary = dashboard.summary || {};

  const employeeChartData = useMemo(
    () =>
      employeeActivity.slice(0, 8).map((row) => ({
        name: row.Name,
        leads: Number(row.LeadsCreated || 0),
        opportunities: Number(row.OpportunitiesCreated || 0),
        revenue: Number(row.RevenueGenerated || 0),
      })),
    [employeeActivity]
  );

  const apiHealthData = useMemo(
    () =>
      (dashboard.apiHealth || []).map((row) => ({
        date: row.Date,
        success: Number(row.SuccessCalls || 0),
        failed: Number(row.FailedCalls || 0),
        total: Number(row.TotalCalls || 0),
      })),
    [dashboard.apiHealth]
  );

  const apiPieData = [
    { name: "Success", value: apiHealthData.reduce((sum, row) => sum + row.success, 0) },
    { name: "Failed", value: apiHealthData.reduce((sum, row) => sum + row.failed, 0) },
  ];

  const COLORS = ["#00C49F", "#FF4D4F", "#FFBB28", "#0088FE"];

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-100 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Super Admin Report Dashboard</h1>
        <p className="text-gray-500">
          Employee activity, lead performance, revenue analytics, and API failure monitoring
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          { title: "Active Leads", value: summary.ActiveLeads || 0, color: "bg-blue-500" },
          { title: "Active Users", value: summary.ActiveUsers || 0, color: "bg-green-500" },
          { title: "Total Revenue", value: `Rs ${summary.TotalRevenue || 0}`, color: "bg-indigo-500" },
          { title: "API Failures (7d)", value: summary.ApiFailuresLast7Days || 0, color: "bg-red-500" },
        ].map((card) => (
          <div key={card.title} className={`${card.color} rounded-2xl p-6 text-white shadow-lg`}>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-2 text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">API Success vs Failure Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={apiHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="success" stroke="#00C49F" name="Success" />
              <Line type="monotone" dataKey="failed" stroke="#FF4D4F" name="Failed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Employee Activity (Leads / Opportunities)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employeeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leads" fill="#3B82F6" name="Leads" />
              <Bar dataKey="opportunities" fill="#10B981" name="Opportunities" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">API Health Share</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={apiPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                dataKey="value"
              >
                {apiPieData.map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Employee Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={employeeChartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Recent API Alerts</h3>
          <div className="max-h-80 space-y-3 overflow-auto pr-2">
            {(dashboard.recentAlerts || []).map((alert) => (
              <div key={alert.Id} className="rounded-xl border border-gray-200 p-3">
                <p className="font-semibold text-gray-800">
                  {alert.IntegrationName || "Integration"} / {alert.EndpointName || "Endpoint"}
                </p>
                <p className="text-sm text-gray-600">{alert.ErrorMessage || "No error message"}</p>
                <p className="mt-1 text-xs text-red-600">
                  Status: {alert.AlertStatus} | Code: {alert.ResponseStatusCode || "-"}
                </p>
              </div>
            ))}
            {!loading && !(dashboard.recentAlerts || []).length ? (
              <p className="text-sm text-gray-500">No recent API alerts found.</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Recent Notifications</h3>
          <div className="max-h-80 space-y-3 overflow-auto pr-2">
            {notifications.map((notification) => (
              <div key={notification.Id} className="rounded-xl border border-gray-200 p-3">
                <p className="font-semibold text-gray-800">{notification.Title}</p>
                <p className="text-sm text-gray-600">{notification.Message}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {notification.Type} | {notification.Severity} | {notification.UserName || "System"}
                </p>
              </div>
            ))}
            {!loading && !notifications.length ? (
              <p className="text-sm text-gray-500">No notifications found.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
