/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wallet,
  BarChart2,
  CheckCircle,
  Clock,
  RotateCcw,
  Sliders,
  SlidersHorizontal,
  Calendar,
  Download,
  ChevronDown,
  Search,
  X,
  User,
  BookOpen,
  FileText,
  Copy,
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  MoreVertical,
  CreditCard
} from 'lucide-react';
import { Course } from '../types';
import PageHeader from './PageHeader';

interface OrderItem {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentId: string;
  courseName: string;
  courseId: string;
  courseTag: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Refunded' | 'Failed';
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  avatarClass: string;
  originalPrice: string;
  discount: string;
  couponCode: string;
  referralCode: string;
}

interface OrdersProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

export default function Orders({ courses, onToggleSidebar }: OrdersProps) {
  // Master orders mock data
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "MAY-ORD-2026-0001",
      studentName: "Phạm Đức Trí",
      studentEmail: "tri@email.com",
      studentPhone: "0987 654 321",
      studentId: "USR-2026-0001",
      courseName: "AI Agent & Vibe Coding Bootcamp",
      courseId: "ai",
      courseTag: "Core • Main product",
      amount: "2.690.000đ",
      status: "Paid",
      paidAt: "21/05/2026 14:32",
      createdAt: "21/05/2026 14:20",
      updatedAt: "21/05/2026 14:32",
      avatar: "PT",
      avatarClass: "avatar-pt",
      originalPrice: "2.990.000đ",
      discount: "-300.000đ",
      couponCode: "EARLY100",
      referralCode: "—"
    },
    {
      id: "MAY-ORD-2026-0002",
      studentName: "Nguyễn Thu Hà",
      studentEmail: "ha.nguyen@gmail.com",
      studentPhone: "0912 345 678",
      studentId: "USR-2026-0002",
      courseName: "Web Automation with n8n",
      courseId: "n8n",
      courseTag: "Core • Main product",
      amount: "1.290.000đ",
      status: "Paid",
      paidAt: "21/05/2026 10:11",
      createdAt: "21/05/2026 09:58",
      updatedAt: "21/05/2026 10:11",
      avatar: "NH",
      avatarClass: "avatar-nh",
      originalPrice: "1.590.000đ",
      discount: "-300.000đ",
      couponCode: "N8NVOL26",
      referralCode: "—"
    },
    {
      id: "MAY-ORD-2026-0003",
      studentName: "Lê Minh Châu",
      studentEmail: "chau.le@gmail.com",
      studentPhone: "0934 567 890",
      studentId: "USR-2026-0003",
      courseName: "UI/UX Design System Mastery",
      courseId: "uiux",
      courseTag: "Elective • Skills",
      amount: "1.990.000đ",
      status: "Pending",
      paidAt: "—",
      createdAt: "21/05/2026 09:45",
      updatedAt: "21/05/2026 09:45",
      avatar: "LC",
      avatarClass: "avatar-lm",
      originalPrice: "1.990.000đ",
      discount: "0đ",
      couponCode: "—",
      referralCode: "—"
    },
    {
      id: "MAY-ORD-2026-0004",
      studentName: "Trần Văn Nam",
      studentEmail: "nam.tran@gmail.com",
      studentPhone: "0909 123 456",
      studentId: "USR-2026-0004",
      courseName: "AI Agent & Vibe Coding Bootcamp",
      courseId: "ai",
      courseTag: "Core • Main product",
      amount: "2.990.000đ",
      status: "Paid",
      paidAt: "20/05/2026 22:18",
      createdAt: "20/05/2026 21:59",
      updatedAt: "20/05/2026 22:18",
      avatar: "TN",
      avatarClass: "avatar-nv",
      originalPrice: "2.990.000đ",
      discount: "0đ",
      couponCode: "—",
      referralCode: "—"
    },
    {
      id: "MAY-ORD-2026-0005",
      studentName: "Đỗ Hoàng Anh",
      studentEmail: "anhdo@gmail.com",
      studentPhone: "0919 998 887",
      studentId: "USR-2026-0005",
      courseName: "Python for Data Analysis",
      courseId: "python",
      courseTag: "Elective • Skills",
      amount: "990.000đ",
      status: "Refunded",
      paidAt: "18/05/2026 16:30",
      createdAt: "18/05/2026 15:40",
      updatedAt: "19/05/2026 11:20",
      avatar: "HA",
      avatarClass: "avatar-vq",
      originalPrice: "990.000đ",
      discount: "0đ",
      couponCode: "—",
      referralCode: "—"
    },
    {
      id: "MAY-ORD-2026-0006",
      studentName: "Vũ Thị Khánh",
      studentEmail: "khanh.vu@gmail.com",
      studentPhone: "0922 880 991",
      studentId: "USR-2026-0006",
      courseName: "Web Automation with n8n",
      courseId: "n8n",
      courseTag: "Core • Main product",
      amount: "1.290.000đ",
      status: "Pending",
      paidAt: "—",
      createdAt: "18/05/2026 10:22",
      updatedAt: "18/05/2026 10:22",
      avatar: "VK",
      avatarClass: "avatar-ht",
      originalPrice: "1.590.000đ",
      discount: "-300.000đ",
      couponCode: "N8NVOL26",
      referralCode: "—"
    },
    {
      id: "MAY-ORD-2026-0007",
      studentName: "Ngô Quốc Bảo",
      studentEmail: "bao.ngo@gmail.com",
      studentPhone: "0938 200 101",
      studentId: "USR-2026-0007",
      courseName: "Business Automation for SMEs",
      courseId: "sme",
      courseTag: "Premium • Enterprise",
      amount: "4.990.000đ",
      status: "Paid",
      paidAt: "17/05/2026 19:05",
      createdAt: "17/05/2026 18:50",
      updatedAt: "17/05/2026 19:05",
      avatar: "QB",
      avatarClass: "avatar-qn",
      originalPrice: "4.990.000đ",
      discount: "0đ",
      couponCode: "—",
      referralCode: "—"
    },
    {
      id: "MAY-ORD-2026-0008",
      studentName: "Phan Nhật Linh",
      studentEmail: "linh.phan@gmail.com",
      studentPhone: "0901 112 233",
      studentId: "USR-2026-0008",
      courseName: "UI/UX Design System Mastery",
      courseId: "uiux",
      courseTag: "Elective • Skills",
      amount: "1.990.000đ",
      status: "Failed",
      paidAt: "—",
      createdAt: "17/05/2026 14:16",
      updatedAt: "17/05/2026 14:20",
      avatar: "NL",
      avatarClass: "avatar-dt",
      originalPrice: "1.990.000đ",
      discount: "0đ",
      couponCode: "—",
      referralCode: "—"
    }
  ]);

  // Search & Filter State
  const [fromDate, setFromDate] = useState('2026-05-02');
  const [toDate, setToDate] = useState('2026-06-02');
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Selected Order for Detail View
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [lastSelectedOrder, setLastSelectedOrder] = useState<OrderItem | null>(null);
  const selectedOrder = orders.find(o => o.id === selectedOrderId) || lastSelectedOrder;

  React.useEffect(() => {
    const found = orders.find(o => o.id === selectedOrderId);
    if (found) {
      setLastSelectedOrder(found);
    }
  }, [selectedOrderId, orders]);

  // Stats computation
  const totalGross = 128540;
  const monthlyRevenue = 32450;
  const paidCount = orders.filter(o => o.status === 'Paid').length + 727; // Offset to match total stats
  const pendingCount = orders.filter(o => o.status === 'Pending').length + 39;
  const refundedCount = orders.filter(o => o.status === 'Refunded').length + 20;

  // Filter application
  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesCourse = courseFilter === 'All' || o.courseName === courseFilter;
    const matchesQuery = !searchQuery ||
      o.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCourse && matchesQuery;
  });

  const handleRowClick = (id: string) => {
    setSelectedOrderId(id === selectedOrderId ? null : id);
  };

  const handleResetFilters = () => {
    setFromDate('2026-05-02');
    setToDate('2026-06-02');
    setStatusFilter('All');
    setCourseFilter('All');
    setSearchQuery('');
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`Đã sao chép ${label}: ${text}`);
  };

  const handleRefundOrder = (id: string) => {
    if (confirm(`Bạn có chắc chắn muốn hoàn tiền cho đơn hàng ${id}?`)) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Refunded', updatedAt: new Date().toLocaleString('vi-VN') } : o));
      alert(`Đã cập nhật trạng thái đơn hàng ${id} thành hoàn tiền.`);
    }
  };

  const handleExportOrders = () => {
    // CSV Header
    const headers = ["Mã đơn hàng", "Học viên", "Email", "Khóa học", "Giá gốc", "Giảm giá", "Thực thu", "Trạng thái", "Ngày tạo"];
    
    // CSV Rows
    const rows = filteredOrders.map(o => [
      o.id,
      `"${o.studentName.replace(/"/g, '""')}"`,
      `"${o.studentEmail.replace(/"/g, '""')}"`,
      `"${o.courseName.replace(/"/g, '""')}"`,
      o.grossAmount,
      o.discountAmount,
      o.amount,
      o.status,
      o.createdAt
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");
    
    // Use UTF-8 BOM to ensure Excel opens Vietnamese characters correctly
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        /* Specific styles for orders dashboard */
        .filter-box-panel {
          background-color: var(--bg-card);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 14px 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr) auto;
          gap: 16px;
          align-items: end;
          margin-bottom: 20px;
        }
        
        .filter-box-panel .form-group {
          margin-bottom: 0;
        }
        
        .filter-box-panel .btn-secondary {
          height: 33px;
          padding: 0 14px;
        }
        
        .student-info-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
        }
        
        .student-info-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
        }
        
        .student-info-avatar:not([class*="avatar-"]) {
          background-color: #f1f5f9;
          color: #475569;
        }
        
        .drawer-section {
          background-color: var(--bg-app);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 12px 14px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .drawer-section-title {
          font-family: var(--font-heading);
          font-size: 10px;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 700;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-passive);
          padding-bottom: 6px;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
        }
        
        .course-detail-row {
          display: flex;
          gap: 10px;
          margin-top: 8px;
          align-items: flex-start;
        }
        
        .course-detail-thumbnail {
          width: 44px;
          height: 44px;
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid var(--border-passive);
        }
        
        .billing-summary-box {
          border-top: 1px solid var(--border-passive);
          border-bottom: 1px solid var(--border-passive);
          padding: 10px 0;
          margin: 10px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .billing-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
        }
        
        .btn-red-outline {
          background-color: var(--bg-card);
          color: var(--color-red);
          border: 1px solid var(--color-red);
          border-radius: 6px;
          padding: 6px 12px;
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        
        .btn-red-outline:hover {
          background-color: #fef2f2;
        }
        
        .export-btn-full {
          width: 100%;
          background-color: #f7f4ed;
          color: var(--text-primary);
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          padding: 8px 12px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all var(--transition-fast);
          margin-top: 10px;
        }
        
        .export-btn-full:hover {
          background-color: var(--sidebar-active-bg);
          border-color: var(--border-interactive);
        }
        
        button:disabled {
          opacity: 0.4 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
        }
      `}</style>
      <PageHeader
        title="Quản lý đơn hàng"
        subtitle="Theo dõi và quản lý tất cả đơn hàng, giao dịch và doanh thu."
        onToggleSidebar={onToggleSidebar}
        actions={
          <button 
            onClick={handleExportOrders}
            className="btn-black h-8 px-3 flex items-center gap-1.5"
            style={{ fontSize: '12.5px' }}
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        }
      />

      {/* KPI GRID ROW (6 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-6" style={{ marginBottom: '20px' }}>
        {/* Card 1: Total Revenue */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><Wallet size={12} /></div>
            <span className="kpi-label">Total Revenue</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px' }}>${totalGross.toLocaleString()}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '10.5px' }}>+10%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        {/* Card 2: Revenue This Month */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><BarChart2 size={12} /></div>
            <span className="kpi-label">Revenue This Month</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px' }}>${monthlyRevenue.toLocaleString()}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '10.5px' }}>+12%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với tháng trước</span>
        </div>

        {/* Card 3: Paid Orders */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><CheckCircle size={12} /></div>
            <span className="kpi-label">Paid Orders</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px' }}>{paidCount}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '10.5px' }}>+11%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        {/* Card 4: Pending Orders */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><Clock size={12} /></div>
            <span className="kpi-label">Pending Orders</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px' }}>{pendingCount}</span>
            <span className="kpi-trend trend-down" style={{ fontSize: '10.5px' }}>-6%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        {/* Card 5: Refunded Orders */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><RotateCcw size={12} /></div>
            <span className="kpi-label">Refunded Orders</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px' }}>{refundedCount}</span>
            <span className="kpi-trend trend-down" style={{ fontSize: '10.5px' }}>-3%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        {/* Card 6: Average Order Value */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><Sliders size={12} /></div>
            <span className="kpi-label">Average Order Value</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px' }}>$175.53</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '10.5px' }}>+4%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>
      </section>

      {/* Filters panel */}
      <div className="panel" style={{ padding: '14px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            
            {/* Search bar */}
            <div className="search-input-wrapper" style={{ position: 'relative', flex: '2', minWidth: '200px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Tìm mã đơn hàng, học viên, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '32px', height: '32px', fontSize: '12.5px', width: '100%' }}
              />
            </div>

            {/* Advanced Filters Toggle Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`btn-secondary ${showAdvancedFilters ? 'active' : ''}`}
              style={{ padding: '0 12px', height: '32px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
            >
              <SlidersHorizontal size={13} />
              <span>Bộ lọc</span>
            </button>

            {/* Reset button */}
            {(statusFilter !== 'All' || courseFilter !== 'All' || searchQuery || fromDate !== '2026-05-02' || toDate !== '2026-06-02') && (
              <button
                onClick={handleResetFilters}
                className="btn-secondary"
                style={{ padding: '0 10px', height: '32px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                title="Reset filters"
              >
                <RotateCcw size={12} />
                <span style={{ fontSize: '12px' }}>Đặt lại</span>
              </button>
            )}
          </div>

          {/* Collapsible Select Filters row */}
          {showAdvancedFilters && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', paddingTop: '14px', borderTop: '1px dashed var(--border-passive)' }}>
              <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                <label className="form-label" style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 600 }}>Từ ngày</label>
                <input
                  type="date"
                  className="form-control"
                  id="filter-date-from"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{ height: '32px', fontSize: '12px', padding: '4px 8px' }}
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                <label className="form-label" style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 600 }}>Đến ngày</label>
                <input
                  type="date"
                  className="form-control"
                  id="filter-date-to"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{ height: '32px', fontSize: '12px', padding: '4px 8px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '180px' }}>
                <label className="form-label" style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 600 }}>Trạng thái đơn hàng</label>
                <select
                  className="form-control form-select"
                  id="filter-status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ height: '32px', fontSize: '12px', padding: '4px 8px' }}
                >
                  <option value="All">Tất cả trạng thái</option>
                  <option value="Paid">Đã thanh toán (Paid)</option>
                  <option value="Pending">Chờ xử lý (Pending)</option>
                  <option value="Refunded">Đã hoàn tiền (Refunded)</option>
                  <option value="Failed">Thất bại (Failed)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '220px' }}>
                <label className="form-label" style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 600 }}>Khóa học liên kết</label>
                <select
                  className="form-control form-select"
                  id="filter-course"
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  style={{ height: '32px', fontSize: '12px', padding: '4px 8px' }}
                >
                  <option value="All">Tất cả khóa học</option>
                  {Array.from(new Set(orders.map(o => o.courseName))).map(cName => (
                    <option key={cName} value={cName}>{cName}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main List and Side Drawer */}
      <section 
        className={`dashboard-grid ${selectedOrderId ? '' : 'drawer-closed'}`} 
        id="order-grid"
      >
        {/* LEFT COLUMN: Orders Table */}
        <div className="grid-col-left">
          <div className="panel">
            <div className="panel-header" style={{ marginBottom: '12px' }}>
              <div className="panel-title-group">
                <h3 className="panel-title">Danh sách đơn hàng</h3>
                <span className="panel-subtitle" id="orders-count-label">({filteredOrders.length} đơn hàng)</span>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className="col-secondary">Order ID</th>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Final amount</th>
                    <th>Status</th>
                    <th className="col-secondary">Paid at</th>
                    <th className="col-secondary">Created at</th>
                    <th style={{ width: '80px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => {
                    let statusClass = 'badge-green';
                    if (o.status === 'Pending') statusClass = 'badge-orange';
                    else if (o.status === 'Refunded') statusClass = 'badge-red';
                    else if (o.status === 'Failed') statusClass = 'badge-gray';

                    return (
                      <tr
                        key={o.id}
                        onClick={() => handleRowClick(o.id)}
                        className={selectedOrderId === o.id ? 'highlight-row' : ''}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="col-secondary">
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 600 }}>{o.id}</span>
                        </td>
                        <td>
                          <div className="col-student">
                            <div>
                              <div className="student-name" style={{ fontWeight: 600 }}>{o.studentName}</div>
                              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{o.studentEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td>{o.courseName}</td>
                        <td><span style={{ fontWeight: 500 }}>{o.amount}</span></td>
                        <td><span className={`badge ${statusClass}`}>{o.status}</span></td>
                        <td className="col-secondary" style={{ color: 'var(--text-secondary)', fontSize: '11.5px' }}>{o.paidAt}</td>
                        <td className="col-secondary" style={{ color: 'var(--text-secondary)', fontSize: '11.5px' }}>{o.createdAt}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '4px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(o.id);
                              }}
                              className="btn-icon-only view-details-btn"
                              title="Xem chi tiết & Hóa đơn"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                alert("Thao tác khác cho đơn hàng...");
                              }}
                              className="btn-icon-only"
                              title="Thao tác"
                            >
                              <MoreVertical size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">
              <span id="pagination-label">Hiển thị 1 - {filteredOrders.length} trong {filteredOrders.length} đơn hàng</span>
              <div className="pagination-pages">
                <button className="page-btn" disabled><ChevronLeft size={14} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={14} /></button>
              </div>
              <select className="page-select-dropdown" defaultValue="10 / trang">
                <option value="10 / trang">10 / trang</option>
                <option value="25 / trang">25 / trang</option>
                <option value="50 / trang">50 / trang</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Detail */}
        <div className="grid-col-right">
          {selectedOrder && (
            <div className="panel" style={{ position: 'sticky', top: '16px' }}>
              <div className="panel-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '12px' }}>
                <div>
                  <h2 className="panel-title">Chi tiết đơn hàng</h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-secondary)' }} id="drawer-order-id">
                    {selectedOrder.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrderId(null)}
                  className="btn-icon-only"
                  title="Đóng"
                  id="close-drawer-btn"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Status Badge Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span className={`badge ${
                  selectedOrder.status === 'Paid' ? 'badge-green' : selectedOrder.status === 'Pending' ? 'badge-orange' : selectedOrder.status === 'Refunded' ? 'badge-red' : 'badge-gray'
                }`} id="drawer-status-badge">
                  {selectedOrder.status}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }} id="drawer-status-text">
                  {selectedOrder.status === 'Paid' ? 'Thanh toán thành công' : selectedOrder.status === 'Pending' ? 'Đang chờ xử lý giao dịch' : selectedOrder.status === 'Refunded' ? 'Đã hủy và hoàn lại học phí' : 'Giao dịch thất bại'}
                </span>
              </div>

              {/* Timing Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px', fontSize: '11px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Created at</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }} id="drawer-created-at">
                    {selectedOrder.createdAt}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Paid at</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }} id="drawer-paid-at">
                    {selectedOrder.paidAt}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Updated at</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }} id="drawer-updated-at">
                    {selectedOrder.updatedAt}
                  </span>
                </div>
              </div>

              {/* Student Information Section */}
              <div className="drawer-section" style={{ marginBottom: '14px' }}>
                <div className="drawer-section-header">
                  <span className="drawer-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={14} className="text-gray-400" />
                    <span>Thông tin học viên</span>
                  </span>
                </div>
                <div className="student-info-row">
                  <div className={`student-info-avatar ${selectedOrder.avatarClass}`} id="drawer-student-avatar">
                    {selectedOrder.avatar}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span className="student-name" style={{ fontSize: '13px', fontWeight: 600 }} id="drawer-student-name">
                      {selectedOrder.studentName}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }} id="drawer-student-email">
                      {selectedOrder.studentEmail}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                      <span id="drawer-student-phone">{selectedOrder.studentPhone}</span>
                      <button 
                        className="copy-btn" 
                        onClick={() => handleCopyText(selectedOrder.studentPhone, 'số điện thoại')}
                        id="drawer-copy-phone-btn"
                        style={{ display: 'inline-flex', alignSelf: 'center' }}
                      >
                        <Copy size={11} />
                      </button>
                    </span>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      User ID: <span id="drawer-student-id">{selectedOrder.studentId}</span>
                    </span>
                  </div>
                  <a className="btn-secondary" href="/students" style={{ fontSize: '11px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span>Xem hồ sơ</span>
                    <ArrowRight size={11} />
                  </a>
                </div>
              </div>

              {/* Course Section */}
              <div className="drawer-section" style={{ marginBottom: '14px' }}>
                <div className="drawer-section-header">
                  <span className="drawer-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={14} className="text-gray-400" />
                    <span>Khóa học đăng ký</span>
                  </span>
                </div>
                <div className="course-detail-row">
                  <div className="course-detail-thumbnail bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold" id="drawer-course-thumbnail">
                    Book
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span className="student-name" style={{ fontSize: '13px', fontWeight: 600 }} id="drawer-course-name">
                      {selectedOrder.courseName}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '1px' }} id="drawer-course-id">
                      ID: {selectedOrder.courseId}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }} id="drawer-course-tag">
                      {selectedOrder.courseTag}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Quyền học:</span>
                      <span className="badge badge-green" id="drawer-enrollment-status" style={{ fontSize: '9.5px', padding: '1px 4px' }}>
                        Active
                      </span>
                    </div>
                    <a className="btn-secondary" href="/courses" style={{ fontSize: '11px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', marginTop: '6px' }}>
                      <span>Xem khóa học</span>
                      <ArrowRight size={11} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Billing Information Section */}
              <div className="drawer-section" style={{ marginBottom: '14px' }}>
                <div className="drawer-section-header">
                  <span className="drawer-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={14} className="text-gray-400" />
                    <span>Chi tiết thanh toán & Hóa đơn</span>
                  </span>
                </div>
                <div className="billing-summary-box" style={{ margin: 0, border: 'none', padding: 0 }}>
                  <div className="billing-row">
                    <span style={{ color: 'var(--text-secondary)' }}>Giá gốc</span>
                    <span style={{ fontWeight: 500 }} id="drawer-subtotal">
                      {selectedOrder.originalPrice}
                    </span>
                  </div>
                  <div className="billing-row">
                    <span style={{ color: 'var(--text-secondary)' }}>Giảm giá</span>
                    <span style={{ fontWeight: 500, color: 'var(--color-red)' }} id="drawer-discount">
                      {selectedOrder.discount}
                    </span>
                  </div>
                  <div className="billing-row">
                    <span style={{ color: 'var(--text-secondary)' }}>Mã giảm giá</span>
                    <span style={{ fontWeight: 500, fontFamily: 'var(--font-mono)', fontSize: '11px' }} id="drawer-coupon">
                      {selectedOrder.couponCode}
                    </span>
                  </div>
                  <div className="billing-row">
                    <span style={{ color: 'var(--text-secondary)' }}>Mã giới thiệu (Referral)</span>
                    <span style={{ fontWeight: 500, fontFamily: 'var(--font-mono)', fontSize: '11px' }} id="drawer-referral">
                      {selectedOrder.referralCode}
                    </span>
                  </div>
                  <div className="billing-row" style={{ borderTop: '1px solid var(--border-passive)', paddingTop: '8px', marginTop: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Tổng thanh toán</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }} id="drawer-final-amount">
                      {selectedOrder.amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Information Section */}
              <div className="drawer-section" style={{ marginBottom: '14px' }}>
                <div className="drawer-section-header">
                  <span className="drawer-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} className="text-gray-400" />
                    <span>Thông tin giao dịch</span>
                  </span>
                </div>
                <div className="drawer-info-grid">
                  <div className="drawer-info-item">
                    <span className="drawer-info-label">Phương thức</span>
                    <span className="drawer-info-value" id="drawer-pay-method">
                      {selectedOrder.id.includes('0002') ? 'Momo QR' : (selectedOrder.id.includes('0003') || selectedOrder.id.includes('0006') ? '—' : 'VNPay')}
                    </span>
                  </div>
                  <div className="drawer-info-item">
                    <span className="drawer-info-label">Mã giao dịch</span>
                    <span className="drawer-info-value" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} id="drawer-pay-txid">
                      {selectedOrder.status === 'Paid' ? 'TX-9910283' : '—'}
                    </span>
                  </div>
                  <div className="drawer-info-item" style={{ gridColumn: 'span 2' }}>
                    <span className="drawer-info-label">Link thanh toán</span>
                    <span className="drawer-info-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                      <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', textDecoration: 'underline', overflow: 'hidden', textOverflow: 'ellipsis' }} id="drawer-pay-url">
                        {selectedOrder.status !== 'Failed' ? `https://sandbox.vnpayment.vn/payment/${selectedOrder.id.split('-').pop()}` : '—'}
                      </span>
                      {selectedOrder.status !== 'Failed' && (
                        <button 
                          className="copy-btn" 
                          title="Copy" 
                          onClick={() => handleCopyText(`https://sandbox.vnpayment.vn/payment/${selectedOrder.id.split('-').pop()}`, 'link thanh toán')}
                        >
                          <Copy size={11} />
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex justify-end gap-2 pt-4">
                {selectedOrder.status === 'Paid' && (
                  <button
                    onClick={() => handleRefundOrder(selectedOrder.id)}
                    className="btn-red-outline"
                  >
                    Hoàn tiền (Refund)
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrderId(null)}
                  className="btn-black h-8 px-4"
                >
                  Đóng chi tiết
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
