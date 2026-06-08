/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Award,
  FileText,
  ShoppingCart,
  MessageSquare,
  Megaphone,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

export interface NotificationItem {
  id: string;
  title: string;
  type: "certificate" | "assignment" | "payment" | "qa" | "general";
  typeText: string;
  description: string;
  timeText: string;
  isUnread: boolean;
  
  // Extended fields for rich details view modal
  sender: string;
  deliveryStatus: "success" | "failed";
  targetTypeText: string;
  targetId?: string;
  targetUrl?: string;
  targetMenu?: string;
  targetTab?: string;
  actionText?: string;
}

interface NotificationsViewProps {
  onUpdateUnreadCount?: (count: number) => void;
  onNavigateToTab?: (menu: string, tab?: string, targetId?: string) => void;
}

export default function NotificationsView({ onUpdateUnreadCount, onNavigateToTab }: NotificationsViewProps) {
  // 5 pristine notifications from the screenshot with rich details fields
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "Chứng chỉ đã được cấp",
      type: "certificate",
      typeText: "Chứng chỉ",
      description: "Chúc mừng! Bạn đã nhận được chứng chỉ cho khóa học “AI Agent & Vibe Coding Bootcamp”.",
      timeText: "10 phút trước",
      isUnread: true,
      sender: "Hội đồng đào tạo Blueprint",
      deliveryStatus: "success",
      targetTypeText: "Chứng nhận tốt nghiệp",
      targetId: "CERT-20260234-000001",
      targetUrl: "/my-certificates",
      targetMenu: "certificates",
      actionText: "Tải chứng chỉ"
    },
    {
      id: "notif-2",
      title: "Bài nộp đã được chấm điểm",
      type: "assignment",
      typeText: "Bài nộp",
      description: "Bài nộp “Final Project: AI Landing Page” của bạn đã được giảng viên chấm điểm.",
      timeText: "30 phút trước",
      isUnread: true,
      sender: "Giảng viên n8n & AI Agent",
      deliveryStatus: "success",
      targetTypeText: "Bài nộp thực hành",
      targetId: "2.3",
      targetUrl: "/learn",
      targetMenu: "learn",
      targetTab: "content",
      actionText: "Xem bài tập"
    },
    {
      id: "notif-3",
      title: "Đơn hàng đã thanh toán thành công",
      type: "payment",
      typeText: "Thanh toán",
      description: "Đơn hàng ORD-20260521-000123 của bạn đã thanh toán thành công.",
      timeText: "1 giờ trước",
      isUnread: true,
      sender: "Cổng thanh toán Blueprint",
      deliveryStatus: "success",
      targetTypeText: "Biên nhận / Hóa đơn",
      targetId: "ORD-20260521-000123",
      targetUrl: "/my-orders",
      targetMenu: "orders",
      actionText: "Xem hóa đơn"
    },
    {
      id: "notif-4",
      title: "Giảng viên đã trả lời câu hỏi của bạn",
      type: "qa",
      typeText: "Q&A",
      description: "Giảng viên đã trả lời câu hỏi trong bài “2.3 Build your first AI landing page”.",
      timeText: "3 giờ trước",
      isUnread: true,
      sender: "Trợ giảng Minh Đức",
      deliveryStatus: "success",
      targetTypeText: "Diễn đàn Q&A",
      targetId: "2.3",
      targetUrl: "/learn",
      targetMenu: "learn",
      targetTab: "qa",
      actionText: "Xem câu hỏi"
    },
    {
      id: "notif-5",
      title: "Thông báo mới từ Blueprint",
      type: "general",
      typeText: "Thông báo chung",
      description: "Blueprint ra mắt Workshop mới: “AI Automation for Productivity”.",
      timeText: "Hôm qua",
      isUnread: true,
      sender: "Hệ thống Blueprint",
      deliveryStatus: "success",
      targetTypeText: "Khóa học / Workshop",
      targetId: "ANN-301",
      targetUrl: "/courses",
      targetMenu: "courses",
      actionText: "Xem khóa học"
    }
  ]);

  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // Let's configure custom count updating if parents need it
  const cascadeUnreadChanged = (updatedList: NotificationItem[]) => {
    if (onUpdateUnreadCount) {
      const count = updatedList.filter((n) => n.isUnread).length;
      onUpdateUnreadCount(count);
    }
  };

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isUnread: false }));
    setNotifications(updated);
    cascadeUnreadChanged(updated);
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notifications.map((n) => {
      if (n.id === id) {
        return { ...n, isUnread: !n.isUnread };
      }
      return n;
    });
    setNotifications(updated);
    cascadeUnreadChanged(updated);
  };

  const handleItemClick = (id: string) => {
    // Standard LMS behavior: clicking item marks it as read
    const updated = notifications.map((n) => {
      if (n.id === id) {
        return { ...n, isUnread: false };
      }
      return n;
    });
    setNotifications(updated);
    cascadeUnreadChanged(updated);

    const clicked = notifications.find((n) => n.id === id);
    if (clicked) {
      setSelectedNotification({ ...clicked, isUnread: false });
    }
  };

  // Filter list matching selected category
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return n.isUnread;
    if (activeTab === "course") return n.type === "certificate"; // certificate is course category
    if (activeTab === "payment") return n.type === "payment";
    if (activeTab === "assignment") return n.type === "assignment";
    if (activeTab === "certificate") return n.type === "certificate";
    if (activeTab === "qa") return n.type === "qa";
    if (activeTab === "general") return n.type === "general";
    return true;
  });

  const getIconAndColors = (type: string) => {
    switch (type) {
      case "certificate":
        return {
          icon: Award,
          bg: "bg-green-50 text-green-600 border border-green-100/50",
          tagBg: "bg-green-50 text-green-600 hover:bg-green-100/60"
        };
      case "assignment":
        return {
          icon: FileText,
          bg: "bg-blue-50 text-blue-600 border border-blue-100/50",
          tagBg: "bg-blue-50 text-blue-600 hover:bg-blue-100/60"
        };
      case "payment":
        return {
          icon: ShoppingCart,
          bg: "bg-orange-50 text-orange-600 border border-orange-100/50",
          tagBg: "bg-orange-50 text-orange-600 hover:bg-orange-100/60"
        };
      case "qa":
        return {
          icon: MessageSquare,
          bg: "bg-purple-50 text-purple-600 border border-purple-100/50",
          tagBg: "bg-purple-50 text-purple-600 hover:bg-purple-100/60"
        };
      case "general":
        return {
          icon: Megaphone,
          bg: "bg-amber-50 text-amber-600 border border-amber-100/50",
          tagBg: "bg-amber-50 text-amber-600 hover:bg-amber-100/60"
        };
      default:
        return {
          icon: Megaphone,
          bg: "bg-gray-55/60 text-gray-600 border border-gray-100",
          tagBg: "bg-gray-50 text-gray-600"
        };
    }
  };

  const tabsList = [
    { id: "all", label: `Tất cả (${notifications.length})` },
    { id: "unread", label: `Chưa đọc (${unreadCount})`, showDot: unreadCount > 0 },
    { id: "course", label: "Khóa học" },
    { id: "payment", label: "Thanh toán" },
    { id: "assignment", label: "Bài nộp" },
    { id: "certificate", label: "Chứng chỉ" },
    { id: "qa", label: "Q&A" },
    { id: "general", label: "Thông báo chung" }
  ];

  return (
    <div className="space-y-6 font-sans text-left selection:bg-blue-100 pb-12 animate-fade-in">
      
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-950 tracking-tight">
            Thông báo của tôi
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            Xem tất cả thông báo và cập nhật mới nhất.
          </p>
        </div>

        {/* Mark all as read action button */}
        <button
          onClick={handleMarkAllAsRead}
          className="flex items-center space-x-1.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-98 shadow-4xs cursor-pointer"
        >
          <Check size={14} className="text-gray-500" />
          <span>Đánh dấu tất cả đã đọc</span>
        </button>
      </div>

      {/* 2. Menu Category Tabs with Badge indicator Dot */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-1.5 border-b border-gray-100 scrollbar-none select-none">
        {tabsList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-150 relative cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-3xs"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-55/50"
            }`}
          >
            <span>{tab.label}</span>
            {tab.showDot && (
              <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* 3. Outer list container - Making them tightly styled and smaller as explicitly requested! */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white border border-gray-150/70 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-3xs select-none">
          <div className="w-12 h-12 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center">
            <Megaphone size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-gray-800">Không có thông báo nào</h4>
            <p className="text-xs text-gray-400 font-medium">Bạn đã cập nhật hết tất cả thông tin mới rồi.</p>
          </div>
        </div>
      ) : (
        <div className="border border-gray-100/80 bg-white rounded-3xl overflow-hidden divide-y divide-gray-50 shadow-3xs">
          {filteredNotifications.map((n) => {
            const styles = getIconAndColors(n.type);
            const IconComponent = styles.icon;

            return (
              <div
                key={n.id}
                onClick={() => handleItemClick(n.id)}
                className={`flex items-center justify-between gap-3 text-xs py-3 px-4 hover:bg-gray-50/70 cursor-pointer transition-all duration-150 group relative ${
                  n.isUnread ? "bg-blue-50/[0.08]" : ""
                }`}
              >
                {/* 1. Left hand columns bundle */}
                <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                  
                  {/* Blue unread dot mark indicator on the extreme left */}
                  <div className="w-1.5 flex justify-center flex-shrink-0">
                    {n.isUnread && (
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Compact stylized Square box background wrapping vector icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${styles.bg}`}>
                    <IconComponent size={15} />
                  </div>

                  {/* Middle core content description block */}
                  <div className="text-left space-y-0.5 min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <h4 className={`font-bold transition-colors group-hover:text-blue-650 ${
                        n.isUnread ? "text-gray-900 font-extrabold" : "text-gray-700"
                      } text-[13px] tracking-tight leading-snug`}>
                        {n.title}
                      </h4>
                      
                      {/* Compact Rounded Category Badge */}
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold ${styles.tagBg}`}>
                        {n.typeText}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 font-normal leading-relaxed truncate max-w-lg md:max-w-2xl select-text">
                      {n.description}
                    </p>
                  </div>
                </div>

                {/* 2. Right hand column: time and arrow */}
                <div className="flex items-center space-x-4 flex-shrink-0 select-none">
                  {/* Time label and click-to-toggle read-status button */}
                  <div className="text-right flex flex-col items-end space-y-0.5">
                    <span className="text-[10px] text-gray-400 font-semibold font-mono tracking-wide">
                      {n.timeText}
                    </span>
                    <button
                      onClick={(e) => handleToggleRead(n.id, e)}
                      className="text-[9px] font-bold text-gray-400 hover:text-blue-600 underline hover:no-underline transition-colors cursor-pointer"
                    >
                      {n.isUnread ? "Đánh dấu đã đọc" : "Đánh dấu chưa đọc"}
                    </button>
                  </div>

                  {/* Right directional arrow button */}
                  <div className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 bg-white shadow-4xs group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all">
                    <ChevronRight size={12} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 4. Elegant custom pagination block at the base */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 pt-2 select-none border-t border-gray-100">
        <div>
          Hiển thị 1–{filteredNotifications.length} trong {filteredNotifications.length} thông báo
        </div>

        {/* Interactive mock numbers row */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            disabled
            className="w-7 h-7 rounded-lg border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          
          <button className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-4xs">
            1
          </button>

          <button
            type="button"
            disabled
            className="w-7 h-7 rounded-lg border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 5. Elegant Detailed Notification Modal overlay */}
      {selectedNotification && createPortal(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4 select-none">
          <div className="bg-white border border-gray-100 rounded-3xl w-full max-w-md p-6 relative shadow-2xl animate-scale-up text-left space-y-4">
            
            {/* Header info with Icon and Category */}
            <div className="flex items-center space-x-3 select-none">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconAndColors(selectedNotification.type).bg}`}>
                {React.createElement(getIconAndColors(selectedNotification.type).icon, { size: 18 })}
              </div>
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold ${getIconAndColors(selectedNotification.type).tagBg}`}>
                  {selectedNotification.typeText}
                </span>
                <p className="text-[10px] text-gray-400 font-semibold font-mono tracking-wide mt-0.5">
                  {selectedNotification.timeText}
                </p>
              </div>
            </div>

            {/* Core notification details */}
            <div className="space-y-2">
              <h3 className="text-base md:text-[17px] font-extrabold text-gray-900 leading-snug tracking-tight">
                {selectedNotification.title}
              </h3>
              <p className="text-[13px] text-gray-650 leading-relaxed font-semibold select-text">
                {selectedNotification.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100 text-xs font-semibold select-none">
              <div className="space-y-0.5">
                <span className="text-[10px] text-gray-450 uppercase tracking-wide block">Người gửi</span>
                <span className="text-gray-800 block">{selectedNotification.sender}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-gray-455 uppercase tracking-wide block">Trạng thái gửi</span>
                <span className="flex items-center space-x-1 text-green-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>{selectedNotification.deliveryStatus === 'success' ? 'Thành công' : 'Thất bại'}</span>
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-gray-455 uppercase tracking-wide block">Loại đối tượng</span>
                <span className="text-gray-800 block">{selectedNotification.targetTypeText}</span>
              </div>
              {selectedNotification.targetId && (
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-455 uppercase tracking-wide block">Mã tham chiếu</span>
                  <span className="text-blue-600 font-mono font-bold block">{selectedNotification.targetId}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2 text-xs font-bold">
              {selectedNotification.targetUrl && (
                <button
                  onClick={() => {
                    if (onNavigateToTab) {
                      onNavigateToTab(
                        selectedNotification.targetMenu || 'learn', 
                        selectedNotification.targetTab,
                        selectedNotification.targetId
                      );
                    }
                    setSelectedNotification(null);
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all cursor-pointer shadow-3xs active:scale-98 text-center flex items-center justify-center space-x-1"
                >
                  <span>{selectedNotification.actionText || 'Xử lý ngay'}</span>
                  <ChevronRight size={13} />
                </button>
              )}
              <button
                onClick={() => setSelectedNotification(null)}
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer text-center"
              >
                Đóng lại
              </button>
            </div>

            {/* Top right close trigger mark */}
            <button
              onClick={() => setSelectedNotification(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 text-lg font-bold leading-none cursor-pointer transition-colors"
            >
              &times;
            </button>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
