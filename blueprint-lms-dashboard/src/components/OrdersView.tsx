/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  FileText,
  CreditCard,
  Download,
  Calendar,
  AlertCircle,
  HelpCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  MessageSquare,
  Receipt,
  ArrowLeft,
  ChevronRight,
  X,
  Wallet,
  Zap,
  TrendingUp,
  Shield,
  Award,
  Tag,
  Gem,
  RefreshCw,
  SlidersHorizontal,
  Coins
} from "lucide-react";

// Types represent orders nicely
export interface MockOrder {
  code: string;
  date: string;
  itemTitle: string;
  courseTitle: string;
  courseSubtitle: string;
  price: string;
  status: "paid" | "pending" | "failed" | "refunded" | "cancelled";
  statusText: string;
  dateSummary: string;
  orderTime: string;
  payTime: string;
  subtotal: string;
  discount: string;
  total: string;
  hasRefund: boolean;
  refundAmount?: string;
  refundDate?: string;
  paymentMethod?: string;
  transactionStatus?: string;
  transactionId?: string;
  buyerName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export const initialOrders: MockOrder[] = [
  {
    code: "ORD-20260521-000123",
    date: "21/05/2026 • 10:24",
    itemTitle: "AI Agent & Vibe Coding Bootcamp",
    courseTitle: "AI AGENT &",
    courseSubtitle: "VIBE CODING BOOTCAMP",
    price: "3.990.000 VND",
    status: "paid",
    statusText: "Đã thanh toán",
    dateSummary: "Đã thanh toán • 21/05/2026",
    orderTime: "21/05/2026 10:24",
    payTime: "21/05/2026 10:25",
    subtotal: "3.990.000 VND",
    discount: "-798.000 VND",
    total: "3.192.000 VND",
    hasRefund: false,
    paymentMethod: "MoMo Wallet",
    transactionStatus: "Thành công",
    transactionId: "MOMO_9582739501",
    buyerName: "Trí Nguyễn",
    phone: "0987 654 321",
    email: "tri@example.com",
    address: "123 Nguyễn Trãi, P. Bến Thành, Quận 1, TP. Hồ Chí Minh, Việt Nam"
  },
  {
    code: "ORD-20260518-000098",
    date: "18/05/2026 • 14:10",
    itemTitle: "Prompting + AI Tools Mini Course",
    courseTitle: "PROMPTING +",
    courseSubtitle: "AI MINI COURSE",
    price: "990.000 VND",
    status: "paid",
    statusText: "Đã thanh toán",
    dateSummary: "Đã thanh toán • 18/05/2026",
    orderTime: "18/05/2026 14:10",
    payTime: "18/05/2026 14:12",
    subtotal: "990.000 VND",
    discount: "0 VND",
    total: "990.000 VND",
    hasRefund: false,
    paymentMethod: "MoMo Wallet",
    transactionStatus: "Thành công",
    transactionId: "TCB_QR_857620485",
    buyerName: "Trí Nguyễn",
    phone: "0987 654 321",
    email: "tri@example.com",
    address: "123 Nguyễn Trãi, P. Bến Thành, Quận 1, TP. Hồ Chí Minh, Việt Nam"
  },
  {
    code: "ORD-20260515-000076",
    date: "15/05/2026 • 09:32",
    itemTitle: "Advanced AI Agent Automation",
    courseTitle: "ADVANCED",
    courseSubtitle: "AGENT AUTOMATION",
    price: "6.990.000 VND",
    status: "pending",
    statusText: "Chờ thanh toán",
    dateSummary: "Hạn thanh toán • 22/05/2026",
    orderTime: "15/05/2026 09:32",
    payTime: "--",
    subtotal: "6.990.000 VND",
    discount: "-1.398.000 VND",
    total: "5.592.000 VND",
    hasRefund: false,
    paymentMethod: "Chuyển khoản VietQR",
    transactionStatus: "Đang chờ chuyển khoản",
    transactionId: "VCB_PENDING_88574",
    buyerName: "Trí Nguyễn",
    phone: "0987 654 321",
    email: "tri@example.com",
    address: "123 Nguyễn Trãi, P. Bến Thành, Quận 1, TP. Hồ Chí Minh, Việt Nam"
  },
  {
    code: "ORD-20260510-000054",
    date: "10/05/2026 • 16:45",
    itemTitle: "AI Workshop for Beginners",
    courseTitle: "AI WORKSHOP",
    courseSubtitle: "FOR BEGINNERS",
    price: "299.000 VND",
    status: "failed",
    statusText: "Thất bại",
    dateSummary: "Thanh toán thất bại • 10/05/2026",
    orderTime: "10/05/2026 16:45",
    payTime: "--",
    subtotal: "299.000 VND",
    discount: "0 VND",
    total: "299.000 VND",
    hasRefund: false,
    paymentMethod: "Credit Card",
    transactionStatus: "Thất bại (Lỗi OTP)",
    transactionId: "VISA_FAIL_394857",
    buyerName: "Trí Nguyễn",
    phone: "0987 654 321",
    email: "tri@example.com",
    address: "123 Nguyễn Trãi, P. Bến Thành, Quận 1, TP. Hồ Chí Minh, Việt Nam"
  },
  {
    code: "ORD-20260501-000032",
    date: "01/05/2026 • 11:15",
    itemTitle: "AI Agent & Vibe Coding Bootcamp",
    courseTitle: "AI AGENT &",
    courseSubtitle: "VIBE CODING BOOTCAMP",
    price: "3.990.000 VND",
    status: "refunded",
    statusText: "Đã hoàn tiền",
    dateSummary: "Hoàn tiền (credit) • 05/05/2026",
    orderTime: "01/05/2026 11:15",
    payTime: "01/05/2026 11:18",
    subtotal: "3.990.000 VND",
    discount: "-798.000 VND",
    total: "3.192.000 VND",
    hasRefund: true,
    refundAmount: "3.192.000 VND",
    refundDate: "05/05/2026",
    paymentMethod: "MoMo Wallet",
    transactionStatus: "Đã hoàn trả thành công",
    transactionId: "MOMO_REFUND_33245",
    buyerName: "Trí Nguyễn",
    phone: "0987 654 321",
    email: "tri@example.com",
    address: "123 Nguyễn Trãi, P. Bến Thành, Quận 1, TP. Hồ Chí Minh, Việt Nam"
  }
];

const getPaymentPill = (code: string) => {
  switch (code) {
    case "ORD-20260521-000123":
      return {
        text: "Thanh toán bằng số dư",
        bg: "bg-blue-50 text-blue-600",
        icon: null
      };
    case "ORD-20260518-000098":
      return {
        text: "Nhận hoàn tiền 50.000",
        bg: "bg-green-50 text-green-600",
        icon: "↑"
      };
    case "ORD-20260515-000076":
      return {
        text: "Thanh toán bằng thẻ Visa •••• 4242",
        bg: "bg-blue-50 text-blue-600",
        icon: null
      };
    case "ORD-20260510-000054":
      return {
        text: "Thanh toán bằng số dư",
        bg: "bg-blue-50 text-blue-600",
        icon: null
      };
    case "ORD-20260501-000032":
      return {
        text: "Blueprint Credit đã dùng 320.000",
        bg: "bg-purple-50 text-purple-600",
        icon: "✦"
      };
    default:
      return null;
  }
};

// Helper component to display dynamic status colors
const getStatusColors = (status: string) => {
  switch (status) {
    case "paid":
      return {
        bg: "bg-green-50 text-green-700",
        dot: "bg-green-500",
        text: "Đã thanh toán"
      };
    case "pending":
      return {
        bg: "bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
        text: "Chờ thanh toán"
      };
    case "failed":
      return {
        bg: "bg-red-50 text-red-700",
        dot: "bg-red-500",
        text: "Thất bại"
      };
    case "refunded":
      return {
        bg: "bg-indigo-50 text-indigo-700",
        dot: "bg-indigo-500",
        text: "Đã hoàn tiền"
      };
    case "cancelled":
      return {
        bg: "bg-gray-50 text-gray-500",
        dot: "bg-gray-400",
        text: "Đã hủy"
      };
    default:
      return {
        bg: "bg-gray-50 text-gray-500",
        dot: "bg-gray-400",
        text: "Đã hủy"
      };
  }
};

interface OrdersViewProps {
  selectedOrderCode?: string | null;
  onSelectOrderCode?: (code: string | null) => void;
  onNavigateToTab?: (menu: string, tab?: string, targetId?: string) => void;
}

export default function OrdersView({ selectedOrderCode: propSelectedOrderCode, onSelectOrderCode, onNavigateToTab }: OrdersViewProps = {}) {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [localSelectedOrderCode, setLocalSelectedOrderCode] = useState<string | null>(null);
  
  const selectedOrderCode = propSelectedOrderCode !== undefined ? propSelectedOrderCode : localSelectedOrderCode;
  const setSelectedOrderCode = onSelectOrderCode || setLocalSelectedOrderCode;
  
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const subTabs = [
    { id: "all", label: "Tất cả" },
    { id: "pending", label: "Chờ thanh toán" },
    { id: "paid", label: "Đã thanh toán" },
    { id: "failed", label: "Thất bại" },
    { id: "refunded", label: "Đã hoàn tiền" },
    { id: "cancelled", label: "Đã hủy" }
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    showToast(`Đã sao chép mã đơn hàng ${code}!`);
  };

  const handleDownloadInvoice = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) return;
    setIsDownloading(code);
    showToast("Hệ thống đang xuất hóa đơn điện tử VAT...");
    setTimeout(() => {
      setIsDownloading(null);
      showToast(`Tải xuống hóa đơn Blueprint_${code}.pdf thành công!`);
    }, 1500);
  };

  // Filter orders based on tabs
  const filteredOrders = initialOrders.filter((order) => {
    if (activeSubTab === "all") return true;
    if (activeSubTab === "cancelled") return order.status === "cancelled";
    return order.status === activeSubTab;
  });

  // Calculate selected active order details only if selectedOrderCode is not null
  const activeOrder = selectedOrderCode ? (filteredOrders.find((o) => o.code === selectedOrderCode) || null) : null;

  return (
    <div className="space-y-6 font-sans text-left selection:bg-blue-100 pb-12 relative animate-fade-in" id="orders-container-root">
      
      {/* Toast notification overlay */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-950 text-white rounded-2xl px-4 py-3 border border-gray-800 shadow-2xl text-[11px] font-bold flex items-center space-x-2 animate-scale-up">
          <Sparkles size={13} className="text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Title and Subtitle, Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 select-none">
        
        {/* Title Block */}
        <div className="space-y-1.5 text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 animate-fade-in">
            Thanh toán
          </h1>
          <p className="text-gray-500 font-medium text-xs md:text-sm">
            Theo dõi lịch sử đơn hàng và chi tiết các giao dịch.
          </p>
        </div>

        {/* Action Buttons Block */}
        <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 text-xs select-none">
          <button className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-250 bg-white hover:bg-gray-50 text-gray-750 font-bold transition-all active:scale-[0.98] cursor-pointer">
            Rút credit
          </button>
          <button 
            onClick={() => showToast("Đang kết nối cổng thanh toán để nạp tiền...")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold transition-all duration-200 active:scale-[0.96] hover:scale-[1.03] cursor-pointer shadow-md hover:shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 text-[13px] tracking-wide relative overflow-hidden animate-pulse-subtle group"
          >
            <div className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 animate-shine" />
            <Coins size={14} className="fill-white shrink-0 group-hover:rotate-12 transition-transform" />
            <span>+ Nạp tiền</span>
          </button>
        </div>

      </div>

      {/* 4-Column Financial Statistics Dashboard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Số dư tài khoản */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div className="space-y-1.5 text-left flex-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Số dư tài khoản</span>
            <span className="text-lg md:text-xl font-black text-gray-900 block font-mono leading-none py-0.5">
              2.450.000 VND
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-7xs">
            <Wallet size={18} />
          </div>
        </div>

        {/* Card 2: Chi tiêu */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div className="space-y-1.5 text-left flex-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Chi tiêu</span>
            <span className="text-lg md:text-xl font-black text-gray-900 block font-mono leading-none py-0.5">
              11.880.000 VND
            </span>
            <span className="text-[10.5px] font-bold text-green-655 flex items-center gap-1 leading-none select-none">
              <span>↑ 18%</span>
              <span className="text-gray-400 font-medium text-[9.5px]">so với tháng trước</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 shadow-7xs">
            <Coins size={18} />
          </div>
        </div>

        {/* Card 3: Tiết kiệm / ưu đãi */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div className="space-y-1.5 text-left flex-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Tiết kiệm / ưu đãi</span>
            <span className="text-lg md:text-xl font-black text-gray-900 block font-mono leading-none py-0.5">
              680.000 VND
            </span>
            <span className="text-[10.5px] font-bold text-gray-400 leading-none block select-none">
              Từ combo, voucher và hoàn tiền
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-7xs">
            <Tag size={18} />
          </div>
        </div>

        {/* Card 4: Mua khóa học */}
        <div 
          onClick={() => {
            if (onNavigateToTab) {
              onNavigateToTab("courses");
            } else {
              showToast("Đang chuyển hướng đến danh sách khóa học...");
            }
          }}
          className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-600 bg-[size:200%_200%] animate-gradient-flow text-white rounded-3xl p-5 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 active:scale-[0.98] hover:scale-[1.02] group relative overflow-hidden select-none border-0 animate-aura-glow"
        >
          {/* Dynamic moving background light reflection */}
          <div className="absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine" />
          <div className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine-secondary" />
          
          {/* Decorative subtle background ring/radial glow */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
          
          <div className="space-y-1.5 text-left flex-1 relative z-10">
            <span className="text-[10px] font-bold text-blue-100 uppercase tracking-wider block">Ưu đãi học viên</span>
            <span className="text-base font-extrabold block leading-tight">
              Mua khóa học
            </span>
            <span className="text-[10px] text-blue-100/90 font-medium block">
              Nhận voucher giảm đến 20%
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/15 text-white flex items-center justify-center shrink-0 shadow-7xs group-hover:bg-white/25 transition-colors relative z-10">
            <Sparkles size={18} className="animate-pulse" />
          </div>
        </div>
      </div>

      {/* Horizontal tabs with filter buttons */}
      <div className="border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 pb-0.5">
        <div className="flex items-center space-x-7 overflow-x-auto scrollbar-none select-none">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id);
                  setSelectedOrderCode(null);
                }}
                className={`flex-shrink-0 pb-3.5 text-xs md:text-sm font-semibold transition-all duration-150 cursor-pointer relative ${
                  isActive
                    ? "text-blue-600 font-extrabold"
                    : "text-gray-500 hover:text-gray-850"
                }`}
              >
                {tab.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Right Controls */}
        <div className="flex items-center gap-2 pb-3.5 select-none shrink-0 self-start md:self-auto">
          <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-650 font-bold text-[11px] shadow-6xs transition-all active:scale-[0.98] cursor-pointer">
            <Calendar size={13} className="text-gray-400 shrink-0" />
            <span>Tất cả thời gian</span>
            <span className="text-[10px] text-gray-400/80">▼</span>
          </button>
          <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-650 font-bold text-[11px] shadow-6xs transition-all active:scale-[0.98] cursor-pointer">
            <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
            <span>Bộ lọc</span>
          </button>
        </div>
      </div>

      {/* Master Detail 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* LEFT COLUMN: List of orders inside a single cohesive borderless flat card list container */}
        <div className="lg:col-span-12 w-full">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center">
                <FileText size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs.5 text-gray-800">Không tìm thấy đơn hàng</h4>
                <p className="text-[11px] text-gray-400 font-bold">Hãy chọn bộ lọc hoặc trạng thái thanh toán khác.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl overflow-hidden divide-y divide-gray-100 shadow-sm border-0">
              {filteredOrders.map((order) => {
                const isSelected = activeOrder && order.code === activeOrder.code;
                const colors = getStatusColors(order.status);

                return (
                  <div
                    key={order.code}
                    onClick={() => setSelectedOrderCode(order.code)}
                    className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-150 text-left select-none relative ${
                      isSelected
                        ? "bg-slate-50/50"
                        : "hover:bg-slate-50/30"
                    }`}
                  >
                    {/* Active vertical accent bar indicator instead of harsh block outline */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md" />
                    )}

                    {/* Block A: Order Code and Dates */}
                    <div className="space-y-0.5 shrink-0 min-w-[130px]">
                      <span className="font-mono text-[13px] font-black text-gray-900 block tracking-tight">
                        {order.code}
                      </span>
                      <span className="text-[11px] text-gray-400 font-bold block">
                        {order.date}
                      </span>
                    </div>

                    {/* Block B: Course Title & Pricing information (NO IMAGE AVATARS - Clean and minimalistic text) */}
                    <div className="flex-1 min-w-0">
                      <div className="space-y-1 text-left min-w-0">
                        <h3 className="font-extrabold text-xs.5 md:text-sm text-gray-900 leading-snug">
                          {order.itemTitle}
                        </h3>
                        <div className="flex items-center flex-wrap gap-2 pt-0.5 select-none">
                          <span className="font-mono text-[11.5px] text-gray-550 font-bold block leading-none">
                            {order.price}
                          </span>
                          {getPaymentPill(order.code) && (
                            <>
                              <span className="text-gray-300 text-[10px] font-bold">•</span>
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-extrabold ${getPaymentPill(order.code)?.bg}`}>
                                {getPaymentPill(order.code)?.icon && (
                                  <span className="mr-0.5 font-black">{getPaymentPill(order.code)?.icon}</span>
                                )}
                                {getPaymentPill(order.code)?.text}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Block C: Status Badge and dates details */}
                    <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2 sm:text-right shrink-0 min-w-[125px]">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[9.5px] font-extrabold shadow-6xs ${colors.bg}`}>
                        <span className={`w-1 h-1 rounded-full mr-1.5 ${colors.dot}`} />
                        {colors.text}
                      </span>
                      <div className="text-[11px] text-gray-450 leading-none space-y-0.5 font-bold">
                        <span className="block">{order.dateSummary.split(" • ")[0]}</span>
                        <span className="block text-gray-400/90 text-[10px] font-semibold">{order.dateSummary.split(" • ")[1] || order.date.split(" • ")[0]}</span>
                      </div>
                    </div>

                    {/* Block D: Selected directional Chevron */}
                    <div className="hidden sm:flex shrink-0">
                      <div className={`w-7.5 h-7.5 rounded-xl flex items-center justify-center transition-all ${
                        isSelected 
                          ? "bg-blue-600 text-white shadow-sm" 
                          : "bg-gray-50 text-gray-400 hover:text-gray-600"
                      }`}>
                        <ChevronRight size={14} className="shrink-0" />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Dynamic display counts matches mockup perfectly */}
          {filteredOrders.length > 0 && (
            <div className="text-[11px] md:text-xs text-gray-400 font-bold select-none pt-3.5 pl-1 text-left">
              Hiển thị 1 – {filteredOrders.length} / {filteredOrders.length} đơn hàng
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Order detailed card modal overlay portal */}
      {selectedOrderCode && activeOrder && createPortal(
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4"
            onClick={() => setSelectedOrderCode(null)}
          >
            <div 
              className="bg-white border border-gray-100 rounded-3xl w-full max-w-xl p-6 md:p-7 relative shadow-2xl animate-scale-up text-left space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Title and Close X Button */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 select-none leading-none">
                <h2 className="font-extrabold text-sm md:text-base text-gray-900 tracking-tight">
                  Chi tiết đơn hàng
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedOrderCode(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-650 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                  aria-label="Đóng chi tiết"
                >
                  <X size={15} strokeWidth={2.5} />
                </button>
              </div>

              {/* Sub-header order information */}
              <div className="flex items-start justify-between gap-4 text-left">
                <div className="space-y-1.5">
                  <span onClick={(e) => handleCopyCode(activeOrder.code, e)} className="font-mono text-sm.5 md:text-base font-black text-gray-900 block hover:text-blue-600 cursor-copy leading-tight select-all">
                    {activeOrder.code}
                  </span>
                  <div className="space-y-0.5 text-[11px] text-gray-400 font-bold">
                    <p className="leading-none">Đặt hàng: {activeOrder.orderTime}</p>
                    <p className="leading-none">Thanh toán: {activeOrder.status === "paid" || activeOrder.status === "refunded" ? activeOrder.payTime : "--"}</p>
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold shadow-6xs ${getStatusColors(activeOrder.status).bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusColors(activeOrder.status).dot}`} />
                  {getStatusColors(activeOrder.status).text}
                </span>
              </div>

              {/* Selected Course details sub-box (NO IMAGE COVER - Ultra-flat minimalistic display) */}
              <div className="border-t border-gray-100 pt-4 text-left">
                <div className="bg-slate-50/60 p-4 rounded-2xl border-0">
                  <div className="space-y-1.5 leading-snug">
                    <span className="text-[10px] font-black tracking-widest text-[#2563eb] font-mono block uppercase">Khóa học</span>
                    <h4 className="font-extrabold text-xs.5 md:text-sm text-gray-900 leading-snug">
                      {activeOrder.itemTitle}
                    </h4>
                    <p className="font-mono text-[12px] text-[#2563eb] font-bold block leading-none pt-0.5">
                      {activeOrder.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ledger calculation sheet */}
              <div className="border-t border-gray-100/80 pt-4 space-y-2 text-[11px] md:text-xs text-gray-500 font-sans block text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-450">Tạm tính</span>
                  <span className="font-mono text-gray-900 font-bold">{activeOrder.subtotal}</span>
                </div>

                {activeOrder.discount !== "0 VND" && (
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-450">Mã giảm giá (WELCOME20)</span>
                    <span className="font-mono text-green-600 font-bold">{activeOrder.discount}</span>
                  </div>
                )}

                <div className="border-t border-dashed border-gray-150 pt-3 flex items-center justify-between text-gray-900">
                  <span className="font-extrabold text-xs.5">Tổng thanh toán</span>
                  <span className="font-mono font-black text-sm.5 md:text-base text-blue-600 leading-none">
                    {activeOrder.total}
                  </span>
                </div>
              </div>

              {/* Biographic user detail list */}
              <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                <h3 className="font-extrabold text-xs md:text-xs.5 text-gray-800 leading-none select-none">
                  Thông tin thanh toán
                </h3>

                <div className="grid grid-cols-12 gap-y-2.5 gap-x-2 text-[11px] md:text-xs leading-normal pb-0.5 font-sans">
                  <span className="col-span-4 text-gray-450 font-bold">Họ tên</span>
                  <span className="col-span-8 text-gray-800 font-extrabold select-all">{activeOrder.buyerName || "Trí Nguyễn"}</span>

                  <span className="col-span-4 text-gray-450 font-bold">Email</span>
                  <span className="col-span-8 text-gray-800 font-mono font-bold select-all">{activeOrder.email || "tri@example.com"}</span>

                  <span className="col-span-4 text-gray-450 font-bold">Số điện thoại</span>
                  <span className="col-span-8 text-gray-800 font-mono font-semibold select-all">{activeOrder.phone || "0987 654 321"}</span>

                  <span className="col-span-4 text-gray-450 font-bold leading-normal">Địa chỉ</span>
                  <span className="col-span-8 text-gray-650 font-medium leading-relaxed select-all">
                    {activeOrder.address || "123 Nguyễn Trãi, P. Bến Thành, Quận 1, TP. Hồ Chí Minh, Việt Nam"}
                  </span>
                </div>
              </div>

              {/* Actual Financial transactions table - Flat and borderless */}
              <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                <h3 className="font-extrabold text-xs md:text-xs.5 text-gray-800 leading-none select-none">
                  Giao dịch thanh toán
                </h3>

                <div className="overflow-x-auto border-0 bg-slate-50/40 rounded-2xl p-1.5">
                  <table className="w-full text-left border-collapse font-sans text-[10.5px] min-w-[380px]">
                    <thead>
                      <tr className="border-b border-gray-100/60 text-gray-400 font-bold select-none leading-none">
                        <th className="p-2 font-bold">Thời gian</th>
                        <th className="p-2 font-bold">Phương thức</th>
                        <th className="p-2 font-bold text-right">Số tiền</th>
                        <th className="p-2 font-bold text-center">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-gray-700 font-semibold align-middle">
                        <td className="p-2 font-mono leading-tight whitespace-nowrap">
                          {activeOrder.status === "paid" || activeOrder.status === "refunded" ? activeOrder.payTime : activeOrder.orderTime}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {activeOrder.paymentMethod}
                        </td>
                        <td className="p-2 text-right font-mono text-gray-950 font-bold whitespace-nowrap">
                          {activeOrder.total}
                        </td>
                        <td className="p-2 text-center whitespace-nowrap">
                          {activeOrder.status === "paid" || activeOrder.status === "refunded" ? (
                            <span className="inline-block bg-green-50 text-green-650 px-1.5 py-0.5 rounded font-extrabold text-[9px]">
                              Thành công
                            </span>
                          ) : activeOrder.status === "pending" ? (
                            <span className="inline-block bg-amber-50 text-amber-650 px-1.5 py-0.5 rounded font-extrabold text-[9px]">
                              Chờ xử lý
                            </span>
                          ) : (
                            <span className="inline-block bg-red-50 text-red-650 px-1.5 py-0.5 rounded font-extrabold text-[9px]">
                              Thất bại
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Actions button & Close button inline */}
                <div className="pt-1 select-none flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOrderCode(null)}
                    className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-gray-700 active:bg-slate-200/50 border-0 rounded-xl font-bold text-[11px] transition-colors cursor-pointer text-center"
                  >
                    Đóng lại
                  </button>
                  <button
                    type="button"
                    disabled={activeOrder.status !== "paid" && activeOrder.status !== "refunded"}
                    onClick={(e) => handleDownloadInvoice(activeOrder.code, e)}
                    className={`flex-[2] py-2.5 border-0 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors shadow-6xs cursor-pointer ${
                      activeOrder.status === "paid" || activeOrder.status === "refunded"
                        ? "bg-slate-50 hover:bg-slate-100 text-gray-700 active:bg-slate-100"
                        : "bg-gray-50/50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Download size={13} className="text-gray-400 shrink-0" />
                    <span>{isDownloading === activeOrder.code ? "Đang xử lý xuất hóa đơn..." : "Xem biên nhận / Hóa đơn"}</span>
                  </button>
                </div>
              </div>

              {/* Refund specific information notice (purple section) */}
              {activeOrder.hasRefund && (
                <div className="border-t border-gray-100 pt-4 text-left space-y-2.5 animate-scale-up">
                  <h3 className="font-extrabold text-xs text-gray-800 leading-none select-none">
                    Hoàn tiền (credit)
                  </h3>
                  
                  <div className="bg-[#f5f3ff]/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 text-left text-[11px] leading-relaxed text-gray-500">
                      <p className="font-semibold text-gray-700">Đơn hàng này đã được hoàn tiền vào số dư nội bộ.</p>
                      <p className="font-bold text-[#4f46e5]">Số tiền hoàn: {activeOrder.refundAmount || activeOrder.total}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">Đã cộng vào số dư ngày {activeOrder.refundDate}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast("Đã điều hướng tới trang ví số dư tài khoản học tập!")}
                      className="px-3.5 py-1.5 bg-white border border-gray-150 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-[10px] shadow-6xs active:scale-97 cursor-pointer shrink-0"
                    >
                      Xem số dư
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>,
          document.body
        )}



      {/* Instructional guidelines and FAQ matching professional footer standard */}
      <div className="bg-blue-50/20 rounded-2xl p-4 max-w-full flex items-start gap-3 select-none">
        <HelpCircle size={15} className="text-blue-500 shrink-0 mt-0.5" />
        <div className="text-left space-y-0.5 font-sans">
          <span className="text-[10.5px] font-black text-blue-700 block leading-tight">Hướng dẫn xuất hóa đơn giá trị gia tăng (VAT) doanh nghiệp</span>
          <p className="text-[10px] text-gray-450 font-normal leading-relaxed">
            Học viên cần cung cấp thông tin xuất hóa đơn VAT xin vui lòng cập nhật dữ liệu doanh nghiệp trong phần Hồ Sơ Cá Nhân hoặc gửi email trực tiếp đến hotro@blueprint.edu.vn kèm theo mã đối soát đơn hàng (ORD-...). Đội ngũ đối soát tài vụ Blueprint sẽ hoàn tất quy trình phát hành trong vòng 24h làm việc.
          </p>
        </div>
      </div>

    </div>
  );
}
