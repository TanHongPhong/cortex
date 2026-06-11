/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  CreditCard,
  Bell,
  User,
  Headphones,
  ArrowRight,
  ChevronDown,
  X
} from "lucide-react";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  onOpenSupport: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ activeMenu, setActiveMenu, onOpenSupport, isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Khóa học của tôi", icon: BookOpen },
    { id: "certificates", label: "Chứng chỉ của tôi", icon: Award },
    { id: "orders", label: "Thanh toán", icon: CreditCard },
    { id: "notifications", label: "Thông báo", icon: Bell, badge: 5 },
    { id: "profile", label: "Hồ sơ cá nhân", icon: User },
  ];

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    // Auto-close sidebar on mobile after navigation
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={[
        "w-60 flex-shrink-0 flex flex-col justify-between border-r border-gray-100 bg-white h-full px-4 py-5 select-none font-sans",
        // Mobile: fixed overlay sliding in/out from the left
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
        // Desktop (md+): static in-flow element, always visible
        "md:relative md:translate-x-0",
        // On mobile, show/hide via transform
        isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
      ].join(" ")}
    >
      {/* Top Section */}
      <div className="space-y-7">
        {/* Logo row — with mobile close button */}
        <div className="flex items-center justify-between px-1 py-1">
          <button
            type="button"
            onClick={() => handleMenuClick("dashboard")}
            className="flex items-center space-x-2.5 px-2 py-1 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Về Dashboard"
          >
            <div className="blueprint-brand-mark" aria-hidden="true" />
            <span className="font-sans font-black text-sm uppercase tracking-widest text-gray-900">
              Blueprint
            </span>
          </button>
          {/* Close button — only visible on mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Đóng menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu items */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id || (item.id === "courses" && activeMenu === "learn");
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-blue-50/70 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    size={18}
                    className={`transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                
                {isActive && (
                  <div className="absolute right-0 top-3 bottom-3 w-1.5 bg-blue-600 rounded-l-full" />
                )}

                {item.badge && (
                  <span className="flex items-center justify-center bg-red-500 font-sans font-bold text-[10px] text-white rounded-full w-5 h-5 leading-none shadow-sm mr-1 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 pt-3">
        {/* Support Card */}
        <div className="bg-gray-50/60 rounded-2xl p-4 border border-gray-100 flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-gray-800 font-semibold text-sm">
            <Headphones size={18} className="text-blue-600 animate-bounce" />
            <span>Cần hỗ trợ?</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed font-normal">
            Đội ngũ Blueprint luôn sẵn sàng hỗ trợ bạn.
          </p>
          <button
            onClick={() => { onOpenSupport(); if (onCloseMobile) onCloseMobile(); }}
            className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200/80 rounded-xl text-xs font-semibold text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:shadow-xs active:bg-gray-50 transition-all duration-200 group"
          >
            <span>Liên hệ hỗ trợ</span>
            <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150 cursor-pointer group">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?bg=f9f9f9&w=150&h=150&fit=crop"
                alt="Tri Nguyen"
                className="w-9 h-9 rounded-full object-cover border border-gray-100 bg-gray-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                Trí Nguyễn
              </span>
              <span className="font-sans text-[11px] text-gray-500">Học viên</span>
            </div>
          </div>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
