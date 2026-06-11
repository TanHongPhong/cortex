/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Calendar,
  Search,
  Download,
  Share2,
  X,
  User,
  ShoppingBag,
  RefreshCw,
  Ban,
  RotateCcw,
  SlidersHorizontal,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface InvoiceItem {
  id: string;
  orderCode: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentAddress: string;
  course: string;
  courseCode: string;
  issuedDate: string;
  totalRaw: string;
  discount: string;
  amount: string;
  status: 'issued' | 'canceled';
  statusName: string;
  paymentMethod: string;
  hasTaxRequest: boolean;
  companyName?: string;
  taxCode?: string;
  fileSize: string;
}

interface InvoicesProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

export default function Invoices({ courses, onToggleSidebar }: InvoicesProps) {
  // Master invoices mock data matching invoices.html
  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: "INV-2026-001085",
      orderCode: "MAY-ORD-2026-0001",
      studentName: "Phạm Đức Trí",
      studentEmail: "tri@email.com",
      studentPhone: "0987 654 321",
      studentAddress: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      issuedDate: "21/05/2026 14:35",
      totalRaw: "2.990.000đ",
      discount: "-300.000đ",
      amount: "2.690.000đ",
      status: "issued",
      statusName: "Đã phát hành",
      paymentMethod: "VNPay",
      hasTaxRequest: true,
      companyName: "Công ty TNHH Công nghệ AI Việt Nam",
      taxCode: "0109827364",
      fileSize: "152 KB"
    },
    {
      id: "INV-2026-001081",
      orderCode: "MAY-ORD-2026-0005",
      studentName: "Đỗ Hoàng Anh",
      studentEmail: "anhdo@gmail.com",
      studentPhone: "0912 345 678",
      studentAddress: "456 Trần Hưng Đạo, Quận 5, TP. Hồ Chí Minh",
      course: "Python for Data Analysis",
      courseCode: "python",
      issuedDate: "18/05/2026 16:40",
      totalRaw: "990.000đ",
      discount: "0đ",
      amount: "990.000đ",
      status: "canceled",
      statusName: "Đã hủy",
      paymentMethod: "Momo QR",
      hasTaxRequest: false,
      fileSize: "148 KB"
    },
    {
      id: "INV-2026-001080",
      orderCode: "MAY-ORD-2026-0008",
      studentName: "Nguyễn Thu Hà",
      studentEmail: "ha.nguyen@gmail.com",
      studentPhone: "0934 567 890",
      studentAddress: "789 Lê Lợi, Quận Hải Châu, Đà Nẵng",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      issuedDate: "16/05/2026 18:30",
      totalRaw: "2.990.000đ",
      discount: "-300.000đ",
      amount: "2.690.000đ",
      status: "issued",
      statusName: "Đã phát hành",
      paymentMethod: "Chuyển khoản trực tiếp",
      hasTaxRequest: true,
      companyName: "Công ty TNHH Giải pháp Phần mềm Đà Nẵng",
      taxCode: "0401827392",
      fileSize: "155 KB"
    },
    {
      id: "INV-2026-001078",
      orderCode: "MAY-ORD-2026-0002",
      studentName: "Trần Thị Bình",
      studentEmail: "binh.tran@email.com",
      studentPhone: "0909 123 456",
      studentAddress: "12 Lý Tự Trọng, Quận Hoàn Kiếm, Hà Nội",
      course: "Starter Mini Course",
      courseCode: "starter",
      issuedDate: "14/05/2026 10:45",
      totalRaw: "590.000đ",
      discount: "0đ",
      amount: "590.000đ",
      status: "issued",
      statusName: "Đã phát hành",
      paymentMethod: "VNPay",
      hasTaxRequest: false,
      fileSize: "120 KB"
    }
  ]);

  // Filters State
  const [fromDate, setFromDate] = useState('2026-05-02');
  const [toDate, setToDate] = useState('2026-06-02');
  const [statusFilter, setStatusFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Selected Detail View
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [lastSelectedInvoice, setLastSelectedInvoice] = useState<InvoiceItem | null>(null);
  const selectedInvoice = invoices.find(inv => inv.id === selectedInvoiceId) || lastSelectedInvoice;

  React.useEffect(() => {
    const found = invoices.find(inv => inv.id === selectedInvoiceId);
    if (found) {
      setLastSelectedInvoice(found);
    }
  }, [selectedInvoiceId, invoices]);

  // Computations
  const totalCount = 1085;
  const issuedCount = invoices.filter(inv => inv.status === 'issued').length + 932;
  const canceledCount = invoices.filter(inv => inv.status === 'canceled').length + 40;
  const totalAmountVal = 121580;

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = !statusFilter || inv.status === statusFilter;
    const matchesCourse = !courseFilter || inv.courseCode === courseFilter;
    const matchesQuery = !searchQuery || 
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCourse && matchesQuery;
  });

  const handleRowClick = (id: string) => {
    setSelectedInvoiceId(id === selectedInvoiceId ? null : id);
  };

  const handleResetFilters = () => {
    setFromDate('2026-05-02');
    setToDate('2026-06-02');
    setStatusFilter('');
    setCourseFilter('');
    setSearchQuery('');
  };

  const handleCancelInvoice = (id: string) => {
    if (confirm(`Bạn có chắc chắn muốn hủy hóa đơn ${id}?`)) {
      setInvoices(prev => prev.map(inv => inv.id === id ? { 
        ...inv, 
        status: 'canceled', 
        statusName: 'Đã hủy', 
        issuedDate: new Date().toLocaleString('vi-VN').split(',')[0] + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5)
      } : inv));
      alert(`Đã hủy thành công hóa đơn ${id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        .pdf-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 2px 6px;
          border: 1px solid #fee2e2;
          background-color: #fef2f2;
          color: #ef4444;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }
        .pdf-badge:hover {
          background-color: #fca5a5;
          color: #b91c1c;
        }
        
        .file-attachment-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          padding: 6px 10px;
          background-color: var(--bg-app);
          margin-top: 4px;
        }
        
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }
        .timeline-item {
          display: flex;
          gap: 10px;
          font-size: 11.5px;
          position: relative;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 14px;
          bottom: -16px;
          width: 1px;
          background-color: var(--border-passive);
        }
        .timeline-item:last-child::before {
          display: none;
        }
        .timeline-dot {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background-color: var(--bg-card);
          border: 2px solid var(--border-passive);
          z-index: 1;
          margin-top: 1px;
          flex-shrink: 0;
        }
        .timeline-dot.green { border-color: var(--color-green); background-color: var(--color-green); }
        .timeline-dot.red { border-color: var(--color-red); background-color: var(--color-red); }
        .timeline-dot.blue { border-color: var(--color-indigo); background-color: var(--color-indigo); }
        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .timeline-title { font-weight: 600; color: var(--text-primary); }
        .timeline-time { font-size: 10px; color: var(--text-secondary); }
        .timeline-desc { color: var(--text-secondary); font-size: 11px; }

        .action-grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 14px;
        }
      `}</style>

      <PageHeader
        title="Quản lý hóa đơn / biên nhận"
        subtitle="Tạo, phát hành, hủy và tải biên nhận / hóa đơn dựa trên đơn hàng đã thanh toán."
        onToggleSidebar={onToggleSidebar}
      />

      {/* KPI GRID ROW (4 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-4" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><FileText size={12} /></div>
            <span className="kpi-label">Tổng hóa đơn</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px' }}>{totalCount.toLocaleString()}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><FileText size={12} /></div>
            <span className="kpi-label">Đã phát hành</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px', color: 'var(--color-green)' }}>{issuedCount.toLocaleString()}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><FileText size={12} /></div>
            <span className="kpi-label">Đã hủy</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px', color: 'var(--color-red)' }}>{canceledCount.toLocaleString()}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><FileText size={12} /></div>
            <span className="kpi-label">Doanh thu (Đã xuất HD)</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '6px' }}>
            <span className="kpi-value" style={{ fontSize: '18px', color: 'var(--color-indigo)' }}>${totalAmountVal.toLocaleString()}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>
      </section>

      {/* Filters Panel */}
      <div className="panel" style={{ padding: '14px 20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            
            {/* Search bar */}
            <div className="search-input-wrapper" style={{ position: 'relative', flex: '2', minWidth: '200px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Tìm mã hóa đơn, tên, email..."
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
            {(statusFilter || searchQuery || fromDate !== '2026-05-02' || toDate !== '2026-06-02') && (
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px dashed var(--border-passive)' }}>
              <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '160px' }}>
                <select
                  className="form-control form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="issued">Đã phát hành (Issued)</option>
                  <option value="canceled">Đã hủy (Canceled)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main List and Side Drawer */}
      <section 
        className={`dashboard-grid ${selectedInvoiceId ? '' : 'drawer-closed'}`} 
        id="invoice-grid"
      >
        {/* LEFT COLUMN: Invoices Table */}
        <div className="grid-col-left">
          <div className="panel">
            <div className="panel-header" style={{ marginBottom: '12px' }}>
              <div className="flex items-center justify-between w-full">
                <div>
                  <h3 className="panel-title">Danh sách hóa đơn</h3>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Quản lý hóa đơn chứng từ lớp học.</p>
                </div>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Mã hóa đơn</th>
                    <th className="col-secondary">Order code</th>
                    <th>Học viên</th>
                    <th className="col-secondary">Khóa học</th>
                    <th className="col-secondary">Ngày phát hành</th>
                    <th>Số tiền</th>
                    <th>Trạng thái</th>
                    <th className="col-secondary">File</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv, index) => {
                    let statusClass = 'badge-green';
                    if (inv.status === 'canceled') statusClass = 'badge-red';

                    return (
                      <tr
                        key={inv.id}
                        onClick={() => handleRowClick(inv.id)}
                        className={selectedInvoiceId === inv.id ? 'highlight-row' : ''}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="cert-id" style={{ fontWeight: 600 }}>{inv.id}</td>
                        <td className="col-secondary cert-id">{inv.orderCode}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 500 }}>{inv.studentName}</span>
                            <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{inv.studentEmail}</span>
                          </div>
                        </td>
                        <td className="col-secondary">{inv.course}</td>
                        <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{inv.issuedDate}</td>
                        <td style={{ fontWeight: 600 }}>{inv.amount}</td>
                        <td><span className={`badge ${statusClass}`}>{inv.statusName}</span></td>
                        <td className="col-secondary" onClick={(e) => e.stopPropagation()}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("Đang tải xuống tệp PDF hóa đơn...");
                            }}
                            className="pdf-badge"
                          >
                            <FileText size={10} />
                            <span>PDF</span>
                          </a>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              onClick={() => handleRowClick(inv.id)}
                              className="btn-icon-only view-details-btn"
                              title="Xem chi tiết"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => alert("Hành động khác cho hóa đơn...")}
                              className="btn-icon-only"
                              title="Hành động khác"
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
              <span id="pagination-label">Hiển thị 1 - {filteredInvoices.length} trong {filteredInvoices.length} hóa đơn</span>
              <div className="pagination-pages">
                <button className="page-btn" disabled><ChevronLeft size={14} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={14} /></button>
              </div>
              <select className="page-select-dropdown" defaultValue="10 / trang">
                <option value="10 / trang">10 / trang</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Invoice Detail */}
        <div className="grid-col-right">
          {selectedInvoice && (
            <div className="panel space-y-5" style={{ position: 'sticky', top: '16px' }}>
              <div className="panel-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '12px' }}>
                <div>
                  <h2 className="panel-title">Chi tiết hóa đơn</h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {selectedInvoice.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedInvoiceId(null)}
                  className="btn-icon-only"
                  title="Đóng"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className={`badge ${selectedInvoice.status === 'issued' ? 'badge-green' : 'badge-red'}`}>
                  {selectedInvoice.statusName.toUpperCase()}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  Phiên bản: 1 • Ngày phát hành: {selectedInvoice.issuedDate}
                </span>
              </div>

              {/* Order info */}
              <div className="detail-section-title">
                <span>Thông tin đơn hàng</span>
                <ShoppingBag size={13} />
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Mã đơn hàng</span>
                  <span className="detail-value cert-id">{selectedInvoice.orderCode}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ngày thanh toán</span>
                  <span className="detail-value">{selectedInvoice.issuedDate.split(' ')[0]} 14:32</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phương thức</span>
                  <span className="detail-value">{selectedInvoice.paymentMethod}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Số tiền</span>
                  <span className="detail-value">{selectedInvoice.amount}</span>
                </div>
              </div>

              {/* Buyer info */}
              <div className="detail-section-title">
                <span>Thông tin người mua</span>
                <User size={13} />
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Họ tên</span>
                  <span className="detail-value">{selectedInvoice.studentName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{selectedInvoice.studentEmail}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Số điện thoại</span>
                  <span className="detail-value">{selectedInvoice.studentPhone}</span>
                </div>
                <div className="detail-item" style={{ alignItems: 'flex-start' }}>
                  <span className="detail-label">Địa chỉ</span>
                  <span className="detail-value" style={{ maxWidth: '180px', lineHeight: 1.3, textAlign: 'right' }}>{selectedInvoice.studentAddress}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Yêu cầu hóa đơn</span>
                  <span className={`badge ${selectedInvoice.hasTaxRequest ? 'badge-green' : 'badge-gray'}`}>
                    {selectedInvoice.hasTaxRequest ? 'Có' : 'Không'}
                  </span>
                </div>
                {selectedInvoice.hasTaxRequest && selectedInvoice.companyName && (
                  <>
                    <div className="detail-item">
                      <span className="detail-label">Công ty</span>
                      <span className="detail-value" style={{ maxWidth: '180px', textAlign: 'right' }}>{selectedInvoice.companyName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Mã số thuế</span>
                      <span className="detail-value cert-id">{selectedInvoice.taxCode}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Financial breakdown */}
              <div className="detail-section-title">
                <span>Thông tin hóa đơn</span>
                <FileText size={13} />
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Khóa học</span>
                  <span className="detail-value" style={{ maxWidth: '180px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{selectedInvoice.course}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tổng tiền</span>
                  <span className="detail-value">{selectedInvoice.totalRaw}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Giảm giá</span>
                  <span className="detail-value" style={{ color: 'var(--color-red)' }}>{selectedInvoice.discount}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Thuế (0%)</span>
                  <span className="detail-value">0đ</span>
                </div>
                <div className="detail-item" style={{ borderTop: '1px solid var(--border-passive)', paddingTop: '6px', marginTop: '4px' }}>
                  <span className="detail-label" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Tổng thanh toán</span>
                  <span className="detail-value" style={{ fontWeight: 700, fontSize: '14px' }}>{selectedInvoice.amount}</span>
                </div>
              </div>

              {/* PDF download box */}
              <div className="file-attachment-card">
                <div className="flex items-center gap-2">
                  <span className="pdf-badge">
                    <FileText size={10} />
                    <span>PDF</span>
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-gray-700 text-xs">{selectedInvoice.id}-v1.pdf</span>
                    <span className="text-[9.5px] text-gray-400">{selectedInvoice.fileSize}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert("Đang tải hóa đơn PDF...")}
                    className="btn-secondary h-7 px-2.5 text-[11px] flex items-center gap-1"
                  >
                    <Download size={11} />
                    <span>Tải xuống</span>
                  </button>
                  <button
                    onClick={() => alert(`Đã sao chép liên kết chia sẻ hóa đơn ${selectedInvoice.id}`)}
                    className="btn-secondary h-7 px-2.5 text-[11px] flex items-center gap-1"
                  >
                    <Share2 size={11} />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>

              {/* Log Timeline */}
              <div className="space-y-2 text-xs mt-4">
                <span className="font-bold text-[var(--text-secondary)] uppercase text-[9.5px] tracking-wider block">Lịch sử hóa đơn</span>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className={`timeline-dot ${selectedInvoice.status === 'issued' ? 'green' : 'red'}`} />
                    <div className="timeline-content">
                      <span className="timeline-title">{selectedInvoice.status === 'issued' ? 'Đã phát hành' : 'Đã hủy hóa đơn'}</span>
                      <span className="timeline-time">{selectedInvoice.issuedDate}</span>
                      <span className="timeline-desc">Tác nhân: Admin User</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot blue" />
                    <div className="timeline-content">
                      <span className="timeline-title">Đã tạo bản nháp</span>
                      <span className="timeline-time">{selectedInvoice.issuedDate.split(' ')[0]} 14:32</span>
                      <span className="timeline-desc">Tự động phát sinh bởi thanh toán đơn hàng thành công</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action trigger row */}
              <div className="flex justify-end gap-2 border-t pt-4">
                {selectedInvoice.status === 'issued' && (
                  <>
                    <button
                      onClick={() => alert("Chức năng tạo phiên bản mới của hóa đơn...")}
                      className="btn-secondary h-8 px-3 flex items-center gap-1"
                    >
                      <RefreshCw size={11} />
                      <span>Tạo phiên bản mới</span>
                    </button>
                    <button
                      onClick={() => handleCancelInvoice(selectedInvoice.id)}
                      className="btn-red-outline h-8 px-4 flex items-center gap-1"
                    >
                      <Ban size={11} />
                      <span>Hủy hóa đơn</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedInvoiceId(null)}
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
