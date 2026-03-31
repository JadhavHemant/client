const USER_PORTAL_ITEMS = [
  { label: "Dashboard", to: "/user", roles: [2, 3, 4, 5, 6], section: "main" },
  { label: "Profile", to: "/user/profile", roles: [2, 3, 4, 5, 6], section: "main" },
  { label: "Settings", to: "/user/settings", roles: [2, 3, 4, 5, 6], section: "main" },
  { label: "Accounts", to: "/user/accounts", roles: [2, 3, 4, 5, 6], section: "crm" },
  { label: "Contacts", to: "/user/contacts", roles: [2, 3, 4, 5, 6], section: "crm" },
  { label: "Leads", to: "/user/leads", roles: [2, 3, 4, 5, 6], section: "crm" },
  { label: "Opportunities", to: "/user/opportunities", roles: [2, 3, 4, 5, 6], section: "crm" },
  { label: "PreSales", to: "/user/presales", roles: [2, 3, 4, 5], section: "crm" },
  { label: "Cases", to: "/user/cases", roles: [2, 3, 4, 5, 6], section: "crm" },
  { label: "Products", to: "/user/products", roles: [2, 3, 4, 5, 6], section: "inventory" },
  { label: "Warehouses", to: "/user/warehouses", roles: [2, 3, 4], section: "inventory" },
  { label: "Customers", to: "/user/customers", roles: [2, 3, 4, 5, 6], section: "inventory" },
  { label: "Suppliers", to: "/user/suppliers", roles: [2, 3, 4], section: "inventory" },
  { label: "Purchase Orders", to: "/user/purchase-orders", roles: [2, 3, 4], section: "inventory" },
  { label: "Sales Orders", to: "/user/sales-orders", roles: [2, 3, 4, 5], section: "inventory" },
  { label: "Reports", to: "/user/reports", roles: [2, 3], section: "main" },
];

export const getUserPortalItems = (roleId) =>
  USER_PORTAL_ITEMS.filter((item) => item.roles.includes(Number(roleId)));

export const getUserPortalSections = (roleId) => {
  const items = getUserPortalItems(roleId);

  return {
    main: items.filter((item) => item.section === "main"),
    crm: items.filter((item) => item.section === "crm"),
    inventory: items.filter((item) => item.section === "inventory"),
  };
};
