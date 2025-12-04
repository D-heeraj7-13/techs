"use client";

import Link from "next/link";
import Image from "next/image";
import DirectionAwareHover from "@/components/ui/direction-aware-hover";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  HomeIcon,
  ChartBarIcon,
  BellAlertIcon,
  UserIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  DocumentChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },

  {
    name: "Monitoring",
    icon: ChartBarIcon,
    children: [
      { name: "Problems", href: "/monitoring/problems" },
      { name: "Hosts", href: "/monitoring/hosts" },
      { name: "Latest Data", href: "/monitoring/latest-data" },
      { name: "Maps", href: "/monitoring/maps" },
      { name: "Discovery", href: "/monitoring/discovery" },
    ],
  },

  {
    name: "Services",
    icon: ChartBarIcon,
    children: [
      { name: "Services", href: "/services/services" },
      { name: "SLA", href: "/services/sla" },
      { name: "SLA Report", href: "/services/sla_report" },
    ],
  },

  {
    name: "Inventory",
    icon: ChartBarIcon,
    children: [
      { name: "Overview", href: "/inventory/overview" },
      { name: "Hosts", href: "/inventory/hosts" },
    ],
  },

  {
    name: "Data Collection",
    icon: ChartBarIcon,
    children: [
      { name: "Template Groups", href: "/data_collection/template_group" },
      { name: "Host Group", href: "/data_collection/host_groups" },
      { name: "Templates", href: "/data_collection/templates" },
      { name: "Hosts", href: "/data_collection/hosts" },
      { name: "Maintenance", href: "/data_collection/maintenance" },
      { name: "Event Correlation", href: "/data_collection/event_correlation" },
      { name: "Discovery", href: "/data_collection/discovery" },
    ],
  },

  {
    name: "Reports",
    icon: DocumentChartBarIcon,
    children: [
      { name: "System Information", href: "/reports/SysInfo" },
      { name: "System Reports", href: "/reports/SysReport" },
      { name: "Availability Reports", href: "/reports/Availability_Reports" },
      { name: "Top 100 Triggers", href: "/reports/Top100_triggers" },
      { name: "Audit Logs", href: "/reports/Audit_logs" },
      { name: "Notifications", href: "/reports/Notification" },
    ],
  },

  {
    name: "Alerts",
    icon: BellAlertIcon,
    children: [
      {
        name: "Actions",
        href: "/alerts/actions",
        children: [
          { name: "Trigger Actions", href: "/alerts/actions/trigger_action" },
          { name: "Service Actions", href: "/alerts/actions/service_action" },
          {
            name: "Discovery Actions",
            href: "/alerts/actions/discovery_action",
          },
          {
            name: "Autoregistration Actions",
            href: "/alerts/actions/autoregistration_action",
          },
          { name: "Internal Actions", href: "/alerts/actions/internal_action" },
        ],
      },
      { name: "Media Types", href: "/alerts/mediatypes" },
      { name: "Script", href: "/alerts/scripts" },
    ],
  },

  {
    name: "Users",
    icon: UserIcon,
    children: [
      { name: "User Groups", href: "/users/UsrGrp" },
      { name: "User Roles", href: "/users/UsrRole" },
      { name: "Users", href: "/users/Users" },
      { name: "API Tokens", href: "/users/ApiToken" },
      { name: "Authentication", href: "/users/Authen" },
    ],
  },

  {
    name: "Administration",
    icon: Cog6ToothIcon,
    children: [
      {
        name: "General",
        href: "/administration/General",
        children: [
          { name: "GUI", href: "/administration/General/gui" },
          { name: "Autoregistration", href: "/administration/General/autoregistration" },
          { name: "Timeouts", href: "/administration/General/timeout" },
          { name: "Images", href: "/administration/General/images" },
          { name: "Icon Mapping", href: "/administration/General/iconmapping" },
          { name: "Regular Expression", href: "/administration/General/regularepression" },
          { name: "Trigger displaying", href: "/administration/General/regularepression" },
          { name: "Geographical maps", href: "/administration/General/geographical" },
          { name: "Modules", href: "/administration/General/modules" },
          { name: "Connectors", href: "/administration/General/connectors" },
          { name: "Other", href: "/administration/General/other" },
        ],
      },

      { name: "Audit Log", href: "/administration/Audit_log" },
      { name: "Housekeeping", href: "/administration/HouseKeeping" },
      { name: "Proxy Groups", href: "/administration/Proxy_Groups" },
      { name: "Proxies", href: "/administration/Proxies" },
      { name: "Macros", href: "/administration/Macros" },

      {
        name: "Queue",
        href: "/administration/Queue",
        children: [
          { name: "Queue Overview", href: "/administration/Queue/queueoverview" },
          { name: "Queue Overview By Proxy", href: "/administration/Queue/queueoverviewproxy" },
          { name: "Queue Details", href: "/administration/Queue/queuedetails" },
        ],
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const collapsedEffective = collapsed && !isHovering;

  const toggleMenu = (name: string) => {
    if (collapsedEffective) return;
    setOpenMenu(openMenu === name ? null : name);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (name: string) => {
    if (collapsedEffective) return;
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (next) {
      setOpenMenu(null);
      setOpenSubmenu(null);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`${collapsedEffective ? "w-16 p-4" : "w-70 p-6"} 
      bg-white/70 backdrop-blur-xl border-r border-gray-200 h-screen flex flex-col transition-all duration-200`}
    >
      <div
        id="imageIcon"
        className={`text-2xl font-bold text-blue-900 mb-8 flex items-center 
        ${collapsedEffective ? "justify-center" : "justify-start"} gap-2 group`}
      >
        <DirectionAwareHover
          imageUrl="/image.png"
          className={
            collapsedEffective
              ? "flex items-center justify-center p-3 rounded-lg h-12 w-12"
              : "w-28 sm:w-36 md:w-40 lg:w-48 h-auto"
          }
          imageClassName={collapsedEffective ? "p-0 object-contain" : "py-8 object-contain"}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          aria-label={collapsedEffective ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsedEffective}
          title={collapsedEffective ? "Expand sidebar" : "Collapse sidebar"}
          className="focus:outline-none ml-auto md:ml-0"
        >
          {/* Show a clear chevron indicating action: right to expand, left to collapse */}
          {collapsedEffective ? (
            <ChevronRightIcon className="h-6 w-6 text-gray-700 transition-transform duration-200" />
          ) : (
            <ChevronLeftIcon className="h-6 w-6 text-gray-700 transition-transform duration-200" />
          )}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openMenu === item.name;

          const isActive =
            (item.href && pathname.startsWith(item.href)) ||
            (item.children &&
              item.children.some(
                (child) =>
                  pathname.startsWith(child.href) ||
                  (child.children && child.children.some((sub) => pathname.startsWith(sub.href)))
              ));

          /** MENU ITEM WITH CHILDREN */
          if (item.children) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`${collapsedEffective
                    ? "flex items-center justify-center p-3 rounded-lg"
                    : "w-full flex items-center justify-between px-4 py-2 rounded-lg"}
                  transition-all ${isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-100"}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`${collapsedEffective ? "h-6 w-6" : "h-5 w-5"}`} />
                    {!collapsedEffective && <span>{item.name}</span>}
                  </div>

                  {!collapsedEffective && (
                    <ChevronDownIcon className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  )}
                </button>

                {isOpen && !collapsedEffective && (
                  <div className="ml-8 mt-2 flex flex-col space-y-1">
                    {item.children.map((child) => {
                      const isChildOpen = openSubmenu === child.name;

                      // Child with subchildren
                      if (child.children) {
                        const childActive =
                          pathname.startsWith(child.href) ||
                          child.children.some((sub) => pathname.startsWith(sub.href));

                        return (
                          <div key={child.name}>
                            <button
                              onClick={() => toggleSubmenu(child.name)}
                              className={`w-full flex items-center justify-between px-3 py-1 rounded-md text-sm
                                ${childActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-blue-100"}`}
                            >
                              {!collapsedEffective && <span>{child.name}</span>}
                              <ChevronDownIcon
                                className={`h-4 w-4 transform transition-transform ${isChildOpen ? "rotate-180" : ""}`}
                              />
                            </button>

                            {isChildOpen && (
                              <div className="ml-6 mt-1 flex flex-col space-y-1">
                                {child.children.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    className={`px-3 py-1 rounded-md text-sm
                                      ${pathname.startsWith(sub.href)
                                        ? "bg-blue-400 text-white"
                                        : "text-gray-600 hover:bg-blue-100"}`}
                                  >
                                    {!collapsedEffective && <span>{sub.name}</span>}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      /** Normal Child */
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`${collapsedEffective
                            ? "flex justify-center py-3"
                            : "px-3 py-1"} rounded-md text-sm
                            ${pathname.startsWith(child.href)
                              ? "bg-blue-500 text-white"
                              : "text-gray-600 hover:bg-blue-100"}`}
                        >
                          {!collapsedEffective && <span>{child.name}</span>}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          /** SIMPLE LINK ITEM */
          return (
            <Link
              key={item.name}
              href={item.href!}
              className={`${collapsedEffective
                ? "flex justify-center p-3 rounded-lg"
                : "flex items-center gap-3 px-4 py-2 rounded-lg"} 
                transition-all ${isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-100"}`}
            >
              <Icon className={`${collapsedEffective ? "h-6 w-6" : "h-5 w-5"}`} />
              {!collapsedEffective && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
