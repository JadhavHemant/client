// import {
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "@headlessui/react";
// import {
//   HomeIcon,
//   UsersIcon,
//   ChartBarIcon,
//   ArchiveBoxIcon,
//   Bars3Icon,
//   XMarkIcon,
//   ChevronDownIcon,
//   FolderIcon,
//   ChevronRightIcon,
//   ChevronLeftIcon,
// } from "@heroicons/react/24/outline";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import LogoutButton from "../LogoutButton/LogoutButton";
// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import * as API from "../../Endpoint/Endpoint";

// export default function NavigationBar() {
//   const [uData, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const location = useLocation();

//   console.log(loading, error);

//   const navigation = [
//     { name: "Home", href: "/Admin", icon: HomeIcon },
//     { name: "Users", href: "/Admin/users", icon: UsersIcon },
//     { name: "Reports", href: "/Admin/reports", icon: ChartBarIcon },
//     {
//       name: "Inventory",
//       icon: ArchiveBoxIcon,
//       children: [
//         { name: "Company", href: "/Admin/Company" },
//         { name: "Category", href: "/Admin/category" },
//         { name: "Units", href: "/Admin/Units" },
//         { name: "Product", href: "/Admin/product" },
//       ],
//     },
//     {
//       name: "CRM",
//       icon: FolderIcon,
//       children: [
//         { name: "Master Details", href: "/Admin/Master" },
//         { name: "Accounts", href: "/Admin/Accounts" },
//         { name: "Contact", href: "/Admin/Contact" },
//         { name: "Leads", href: "/Admin/leads" },
//         { name: "Opportunities", href: "/Admin/opportunities" },
//         { name: "PreSales", href: "/Admin/presales" },
//         { name: "Cases", href: "/Admin/cases" },
//       ],
//     },
//   ];

//   useEffect(() => {
//     axiosInstance
//       .get(API.PROFILE)
//       .then((res) => setData(res.data))
//       .catch((err) => {
//         const message =
//           err.response?.data?.message || "Failed to fetch profile.";
//         setError(message);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
//   }

//   const handleDropdownToggle = (menuName) => {
//     setOpenDropdown((prev) => (prev === menuName ? null : menuName));
//   };

//   const toggleSidebar = () => {
//     setIsSidebarCollapsed(!isSidebarCollapsed);
//     if (!isSidebarCollapsed) {
//       setOpenDropdown(null);
//     }
//   };

//   const isSidebarExpanded = !isSidebarCollapsed || isHovering;

//   return (
//     <div className="flex h-screen">
//       {/* ===== DESKTOP SIDEBAR WITH LOGO ===== */}
//       <div
//         className={classNames(
//           "hidden sm:flex sm:flex-col bg-[#1e293b] text-gray-300 fixed left-0 top-0 bottom-0 z-30 transition-all duration-300 ease-in-out",
//           isSidebarExpanded ? "w-64" : "w-16"
//         )}
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//       >
//         {/* ===== LOGO & TOGGLE SECTION ===== */}
//         <div className="h-16 bg-gray-800 flex items-center justify-between px-3 border-b border-gray-700 flex-shrink-0">
//           {isSidebarExpanded ? (
//             <>
//               <h1 className="text-lg font-bold text-white">LOGO</h1>
//               <button
//                 onClick={toggleSidebar}
//                 className="text-gray-300 hover:text-white p-1.5 rounded-md hover:bg-gray-700"
//               >
//                 <ChevronLeftIcon className="h-5 w-5" />
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={toggleSidebar}
//               className="text-gray-300 hover:text-white p-1.5 rounded-md hover:bg-gray-700 mx-auto"
//             >
//               <ChevronRightIcon className="h-5 w-5" />
//             </button>
//           )}
//         </div>

//         {/* ===== NAVIGATION MENU ===== */}
//         <div className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
//           {navigation.map((item) =>
//             item.children ? (
//               <div key={item.name}>
//                 <button
//                   onClick={() => handleDropdownToggle(item.name)}
//                   className={classNames(
//                     "flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white transition",
//                     openDropdown === item.name
//                       ? "bg-gray-700 text-white"
//                       : location.pathname.startsWith(
//                           `/Admin/${item.name.toLowerCase()}`
//                         )
//                       ? "bg-orange-500 text-white"
//                       : ""
//                   )}
//                   title={!isSidebarExpanded ? item.name : ""}
//                 >
//                   <div className="flex items-center gap-3 min-w-0">
//                     <item.icon className="h-5 w-5 flex-shrink-0" />
//                     {isSidebarExpanded && <span className="truncate">{item.name}</span>}
//                   </div>
//                   {isSidebarExpanded && (
//                     <ChevronDownIcon
//                       className={classNames(
//                         "h-4 w-4 flex-shrink-0 transition-transform duration-300",
//                         openDropdown === item.name ? "rotate-180" : ""
//                       )}
//                     />
//                   )}
//                 </button>

//                 {openDropdown === item.name && isSidebarExpanded && (
//                   <div className="ml-8 mt-1 space-y-1">
//                     {item.children.map((subItem) => (
//                       <Link
//                         key={subItem.name}
//                         to={subItem.href}
//                         className={classNames(
//                           location.pathname === subItem.href
//                             ? "bg-orange-500 text-white"
//                             : "hover:bg-gray-700 hover:text-white",
//                           "block px-3 py-2 rounded-md text-sm font-medium truncate"
//                         )}
//                       >
//                         {subItem.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={classNames(
//                   location.pathname === item.href
//                     ? "bg-orange-500 text-white"
//                     : "hover:bg-gray-700 hover:text-white",
//                   "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition"
//                 )}
//                 title={!isSidebarExpanded ? item.name : ""}
//               >
//                 <item.icon className="h-5 w-5 flex-shrink-0" />
//                 {isSidebarExpanded && <span className="truncate">{item.name}</span>}
//               </Link>
//             )
//           )}
//         </div>

//         {/* ===== USER PROFILE SECTION ===== */}
//         <div className="border-t border-gray-700 p-3 flex-shrink-0">
//           <Menu as="div" className="relative">
//             <MenuButton
//               className={classNames(
//                 "flex items-center w-full rounded-md hover:bg-gray-700 p-2 transition",
//                 isSidebarExpanded ? "gap-3" : "justify-center"
//               )}
//             >
//               <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex-shrink-0">
//                 {uData?.image ? (
//                   <img
//                     src={`http://localhost:5351/${uData.image}`}
//                     alt="User"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                 ) : (
//                   uData?.name?.charAt(0).toUpperCase() || "?"
//                 )}
//               </div>
//               {isSidebarExpanded && (
//                 <div className="flex-1 text-left min-w-0">
//                   <p className="text-sm font-medium text-white truncate">
//                     {uData?.name || "User"}
//                   </p>
//                   <p className="text-xs text-gray-400 truncate">
//                     {uData?.email || "user@example.com"}
//                   </p>
//                 </div>
//               )}
//             </MenuButton>

//             <MenuItems className="absolute bottom-full left-0 mb-2 w-48 rounded-md bg-gray-800 shadow-lg py-1 z-50">
//               <MenuItem>
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
//                 >
//                   Your Profile
//                 </Link>
//               </MenuItem>
//               <MenuItem>
//                 <Link
//                   to="/settings"
//                   className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
//                 >
//                   Settings
//                 </Link>
//               </MenuItem>
//               <MenuItem>
//                 <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
//                   <LogoutButton />
//                 </div>
//               </MenuItem>
//             </MenuItems>
//           </Menu>
//         </div>
//       </div>

//       {/* ===== MOBILE HEADER ===== */}
//       <div className="sm:hidden fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 z-50">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setIsMobileOpen(!isMobileOpen)}
//             className="text-gray-200 hover:bg-gray-700 p-1.5 rounded-md"
//           >
//             {isMobileOpen ? (
//               <XMarkIcon className="h-6 w-6" />
//             ) : (
//               <Bars3Icon className="h-6 w-6" />
//             )}
//           </button>
//           <h1 className="text-lg font-bold text-white">LOGO</h1>
//         </div>

//         {/* Mobile User Menu */}
//         <Menu as="div" className="relative">
//           <MenuButton className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white font-bold">
//             {uData?.image ? (
//               <img
//                 src={`http://localhost:5351/${uData.image}`}
//                 alt="User"
//                 className="w-9 h-9 rounded-full object-cover"
//               />
//             ) : (
//               uData?.name?.charAt(0).toUpperCase() || "?"
//             )}
//           </MenuButton>

//           <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg py-1 z-50">
//             <MenuItem>
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
//               >
//                 Your Profile
//               </Link>
//             </MenuItem>
//             <MenuItem>
//               <Link
//                 to="/settings"
//                 className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
//               >
//                 Settings
//               </Link>
//             </MenuItem>
//             <MenuItem>
//               <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
//                 <LogoutButton />
//               </div>
//             </MenuItem>
//           </MenuItems>
//         </Menu>
//       </div>

//       {/* ===== MAIN CONTENT ===== */}
//       <div
//         className={classNames(
//           "flex-1 overflow-auto bg-gray-50 p-4 transition-all duration-300",
//           isSidebarExpanded ? "sm:ml-64" : "sm:ml-16",
//           "pt-20 sm:pt-4" // Extra top padding for mobile header
//         )}
//       >
//         <Outlet />
//       </div>

//       {/* ===== MOBILE SIDEBAR ===== */}
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 sm:hidden"
//           onClick={() => setIsMobileOpen(false)}
//         >
//           <div
//             className="absolute top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#1e293b] text-gray-300 shadow-lg overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-4 space-y-2">
//               {navigation.map((item) =>
//                 item.children ? (
//                   <div key={item.name}>
//                     <button
//                       onClick={() => handleDropdownToggle(item.name)}
//                       className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium rounded-md hover:bg-gray-700 hover:text-white transition"
//                     >
//                       <div className="flex items-center gap-3">
//                         <item.icon className="h-5 w-5" />
//                         <span>{item.name}</span>
//                       </div>
//                       <ChevronDownIcon
//                         className={classNames(
//                           "h-4 w-4 transition-transform duration-300",
//                           openDropdown === item.name ? "rotate-180" : ""
//                         )}
//                       />
//                     </button>

//                     {openDropdown === item.name && (
//                       <div className="ml-8 mt-1 space-y-1">
//                         {item.children.map((subItem) => (
//                           <Link
//                             key={subItem.name}
//                             to={subItem.href}
//                             onClick={() => setIsMobileOpen(false)}
//                             className={classNames(
//                               location.pathname === subItem.href
//                                 ? "bg-orange-500 text-white"
//                                 : "hover:bg-gray-700 hover:text-white",
//                               "block px-3 py-2 rounded-md text-sm font-medium"
//                             )}
//                           >
//                             {subItem.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => setIsMobileOpen(false)}
//                     className={classNames(
//                       location.pathname === item.href
//                         ? "bg-orange-500 text-white"
//                         : "hover:bg-gray-700 hover:text-white",
//                       "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition"
//                     )}
//                   >
//                     <item.icon className="h-5 w-5" />
//                     <span>{item.name}</span>
//                   </Link>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  FolderIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import * as API from "../../Endpoint/Endpoint";

export default function NavigationBar() {
  const [uData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Start expanded
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();

  console.log(loading, error);

  const navigation = [
    { name: "Home", href: "/Admin", icon: HomeIcon },
    { name: "Users", href: "/Admin/users", icon: UsersIcon },
    { name: "Reports", href: "/Admin/reports", icon: ChartBarIcon },
    {
      name: "Inventory",
      icon: ArchiveBoxIcon,
      children: [
        { name: "Company", href: "/Admin/Company" },
        { name: "Category", href: "/Admin/category" },
        { name: "Units", href: "/Admin/Units" },
        { name: "Product", href: "/Admin/Product" },
        { name: "Warehouse", href: "/Admin/Warehouse" },

      ],
    },
    {
      name: "CRM",
      icon: FolderIcon,
      children: [
        { name: "Master Details", href: "/Admin/Master" },
        { name: "Accounts", href: "/Admin/Accounts" },
        { name: "Contact", href: "/Admin/Contact" },
        { name: "Leads", href: "/Admin/leads" },
        { name: "Opportunities", href: "/Admin/opportunities" },
        { name: "PreSales", href: "/Admin/presales" },
        { name: "Cases", href: "/Admin/cases" },
      ],
    },
  ];

  useEffect(() => {
    axiosInstance
      .get(API.PROFILE)
      .then((res) => setData(res.data))
      .catch((err) => {
        const message =
          err.response?.data?.message || "Failed to fetch profile.";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleDropdownToggle = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    if (!isSidebarCollapsed) {
      setOpenDropdown(null);
    }
  };

  const isSidebarExpanded = !isSidebarCollapsed || isHovering;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside
        className={classNames(
          "hidden sm:flex sm:flex-col bg-gray-900 text-gray-300 transition-all duration-300 ease-in-out flex-shrink-0 border-r border-gray-800",
          isSidebarExpanded ? "w-64" : "w-20"
        )}
        onMouseEnter={() => !isSidebarCollapsed && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Logo Section */}
        <div className="h-16 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700 flex-shrink-0">
          {isSidebarExpanded ? (
            <>
              <h1 className="text-xl font-bold text-white whitespace-nowrap">LOGO</h1>
              <button
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700 transition"
                title="Collapse sidebar"
              >
                <ChevronDoubleLeftIcon className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700 transition mx-auto"
              title="Expand sidebar"
            >
              <ChevronDoubleRightIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name}>
                <button
                  onClick={() => isSidebarExpanded && handleDropdownToggle(item.name)}
                  className={classNames(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                    openDropdown === item.name
                      ? "bg-gray-800 text-white"
                      : location.pathname.startsWith(`/Admin/${item.name.toLowerCase()}`)
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-800 text-gray-300 hover:text-white"
                  )}
                  title={!isSidebarExpanded ? item.name : ""}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {isSidebarExpanded && (
                    <>
                      <span className="ml-3 flex-1 text-left">{item.name}</span>
                      <ChevronDownIcon
                        className={classNames(
                          "h-4 w-4 transition-transform duration-200",
                          openDropdown === item.name ? "rotate-180" : ""
                        )}
                      />
                    </>
                  )}
                </button>

                {/* Dropdown Items */}
                {openDropdown === item.name && isSidebarExpanded && (
                  <div className="ml-11 mt-1 space-y-1">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={classNames(
                          location.pathname === subItem.href
                            ? "bg-orange-500 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white",
                          "block px-3 py-2 rounded-lg text-sm transition-all"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "bg-orange-500 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                )}
                title={!isSidebarExpanded ? item.name : ""}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarExpanded && <span className="ml-3">{item.name}</span>}
              </Link>
            )
          )}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-800 p-3 flex-shrink-0">
          <Menu as="div" className="relative">
            <MenuButton
              className={classNames(
                "flex items-center w-full rounded-lg hover:bg-gray-800 p-2 transition",
                isSidebarExpanded ? "gap-3" : "justify-center"
              )}
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white font-bold flex-shrink-0">
                {uData?.image ? (
                  <img
                    src={`http://localhost:5351/${uData.image}`}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  uData?.name?.charAt(0).toUpperCase() || "?"
                )}
              </div>
              {isSidebarExpanded && (
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {uData?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {uData?.email || "user@example.com"}
                  </p>
                </div>
              )}
            </MenuButton>

            <MenuItems className="absolute bottom-full left-0 mb-2 w-48 rounded-lg bg-gray-800 shadow-lg py-1 border border-gray-700">
              <MenuItem>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md mx-1"
                >
                  Your Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md mx-1"
                >
                  Settings
                </Link>
              </MenuItem>
              <MenuItem>
                <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer rounded-md mx-1">
                  <LogoutButton />
                </div>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </aside>

      {/* ===== MOBILE HEADER ===== */}
      <div className="sm:hidden fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-gray-200 hover:bg-gray-700 p-1.5 rounded-md"
          >
            {isMobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
          <h1 className="text-lg font-bold text-white">LOGO</h1>
        </div>

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white font-bold">
            {uData?.image ? (
              <img
                src={`http://localhost:5351/${uData.image}`}
                alt="User"
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              uData?.name?.charAt(0).toUpperCase() || "?"
            )}
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 shadow-lg py-1 border border-gray-700">
            <MenuItem>
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                Your Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                <LogoutButton />
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-auto bg-gray-50 pt-16 sm:pt-0">
        <Outlet />
      </main>

      {/* ===== MOBILE SIDEBAR ===== */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setIsMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-gray-900 shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="p-4 space-y-1">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.name}>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDownIcon
                        className={classNames(
                          "h-4 w-4 transition-transform",
                          openDropdown === item.name ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {openDropdown === item.name && (
                      <div className="ml-11 mt-1 space-y-1">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={classNames(
                              location.pathname === subItem.href
                                ? "bg-orange-500 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white",
                              "block px-3 py-2 rounded-lg text-sm"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
