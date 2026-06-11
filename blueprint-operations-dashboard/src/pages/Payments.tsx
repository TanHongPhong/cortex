/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import {
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  TrendingUp,
  Search,
  Eye,
  X,
  FileCheck,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  AlertTriangle,
  User,
  CreditCard,
  Building,
  Image as ImageIcon,
  Copy,
  Plus,
  Calendar,
  ChevronDown,
  SlidersHorizontal,
  RotateCcw,
  Receipt,
  ShieldCheck,
  Clock,
  Banknote,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Student } from '../types';

interface PaymentItem {
  id: string;
  name: string;
  email: string;
  avatarClass: string;
  avatarText: string;
  course: string;
  courseCode: string;
  amount: number;
  method: 'bank_transfer' | 'momo' | 'onepay';
  methodName: string;
  status: 'success' | 'pending' | 'failed';
  statusName: string;
  date: string;
  proofUrl?: string;
  invoiceId?: string;
}

interface PaymentsProps {
  students: Student[];
  onEnrollStudent?: (studentEmail: string, courseId: string) => void;
  onToggleSidebar?: () => void;
}

/**
 * Payments manages core business financial transactions and invoices for LMS enrolments.
 */
export default function Payments({ students, onEnrollStudent, onToggleSidebar }: PaymentsProps) {
  // Master transactions list
  const [payments, setPayments] = useState<PaymentItem[]>([
    {
      id: "TX-9910283",
      name: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      avatarClass: "avatar-nv",
      avatarText: "NV",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      amount: 4500000,
      method: "bank_transfer",
      methodName: "Bank Transfer",
      status: "success",
      statusName: "Success",
      date: "08/06/2026 09:30",
      invoiceId: "INV-2026-0038"
    },
    {
      id: "TX-9910281",
      name: "Trần Thị Bình",
      email: "binh.tran@email.com",
      avatarClass: "avatar-tt",
      avatarText: "TT",
      course: "Web Automation with n8n",
      courseCode: "n8n",
      amount: 2800000,
      method: "momo",
      methodName: "MoMo Wallet",
      status: "success",
      statusName: "Success",
      date: "07/06/2026 14:15",
      invoiceId: "INV-2026-0037"
    },
    {
      id: "TX-9910290",
      name: "Lê Minh Châu",
      email: "chau.le@email.com",
      avatarClass: "avatar-lm",
      avatarText: "LM",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      amount: 4500000,
      method: "bank_transfer",
      methodName: "Bank Transfer",
      status: "pending",
      statusName: "Pending Review",
      date: "08/06/2026 11:20",
      proofUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "TX-9910271",
      name: "Phạm Hoàng Duy",
      email: "duy.pham@email.com",
      avatarClass: "avatar-ph",
      avatarText: "PH",
      course: "Web Automation with n8n",
      courseCode: "n8n",
      amount: 2800000,
      method: "onepay",
      methodName: "ATM / OnePay Card",
      status: "failed",
      statusName: "Failed",
      date: "05/06/2026 17:45"
    }
  ]);

  // Selected filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [methodFilter, setFilterMethod] = useState('');
  // Synchronize transaction status filter state with URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('statusFilter') || '';
  const setFilterStatus = (status: string) => {
    setSearchParams(prev => {
      if (status) {
        prev.set('statusFilter', status);
      } else {
        prev.delete('statusFilter');
      }
      return prev;
    }, { replace: true });
  };

  // Selected active elements
  const [activePaymentState, setActivePaymentState] = useState<PaymentItem | null>(null);
  const [lastSelectedPayment, setLastSelectedPayment] = useState<PaymentItem | null>(null);
  const activePayment = activePaymentState || lastSelectedPayment;

  const setActivePayment = (p: PaymentItem | null) => {
    setActivePaymentState(p);
    if (p) setLastSelectedPayment(p);
  };
  
  // Custom denial popup
  const [isDenialOpen, setIsDenialOpen] = useState(false);
  const [denialReason, setDenialReason] = useState('Transaction amount not received');
  const [denialExplanation, setDenialExplanation] = useState('');

  // Calculations
  const formatCurrency = (amt: number) => {
    return amt.toLocaleString('vi-VN') + ' đ';
  };

  const totalRevenue = payments
    .filter(p => p.status === 'success')
    .reduce((avg, cur) => avg + cur.amount, 118250000); // base offset load

  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const successCount = 142 + payments.filter(p => p.status === 'success').length - 2;

  const filteredPayments = payments.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = !methodFilter || p.method === methodFilter;
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const handleApprovePayment = (item: PaymentItem) => {
    setPayments(prev => prev.map(p => {
      if (p.id === item.id) {
        const generatedInvoice = `INV-2026-00${String(38 + prev.length).padStart(2, '0')}`;
        return {
          ...p,
          status: 'success' as const,
          statusName: 'Success',
          invoiceId: generatedInvoice
        };
      }
      return p;
    }));

    // Trigger CRM active enrollment allocation linkage callback
    if (onEnrollStudent) {
      onEnrollStudent(item.email, item.courseCode);
    }

    setActivePayment(null);
    alert(`Successfully verified transaction ${item.id}! Course has been auto-activated for student ${item.name}.`);
  };

  const handleOpenDeny = () => {
    setIsDenialOpen(true);
  };

  const handleConfirmDeny = () => {
    if (!activePayment) return;

    setPayments(prev => prev.map(p => {
      if (p.id === activePayment.id) {
        return {
          ...p,
          status: 'failed' as const,
          statusName: 'Failed'
        };
      }
      return p;
    }));

    setIsDenialOpen(false);
    setActivePayment(null);
    alert(`Declined review for transaction ${activePayment.id}. Reason: ${denialReason}.`);
  };

  const handleExportPayments = () => {
    // CSV Header
    const headers = ["Mã giao dịch", "Học viên", "Email", "Hình thức", "Số tiền", "Mã hóa đơn", "Trạng thái", "Ngày tạo"];
    
    // CSV Rows
    const rows = filteredPayments.map(p => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.email.replace(/"/g, '""')}"`,
      p.methodName,
      p.amount,
      p.invoiceId || "—",
      p.statusName,
      p.createdAt
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
    link.setAttribute("download", `payments_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      <style>{`
        .provider-cell {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }
        .provider-icon {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #fff;
        }
        .provider-vnpay { background-color: #005baa; }
        .provider-momo { background-color: #a50064; }
        .provider-bank { background-color: #16a34a; }
        
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
        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .timeline-title { font-weight: 600; color: var(--text-primary); }
        .timeline-time { font-size: 10px; color: var(--text-secondary); }
        .timeline-desc { color: var(--text-secondary); font-family: var(--font-mono); font-size: 11px; }
    
        .json-box {
          background-color: var(--bg-app);
          border: 1px dashed var(--border-passive);
          border-radius: 6px;
          padding: 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          max-height: 150px;
          overflow-y: auto;
          white-space: pre-wrap;
        }
        
        .btn-group-row {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
        .btn-group-row button {
          flex: 1;
        }
      `}</style>

      <PageHeader
        title="Theo dõi giao dịch thanh toán"
        subtitle="Theo dõi các giao dịch QR, đối soát webhook và trạng thái thanh toán."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              onClick={handleExportPayments}
              className="btn-black h-8 px-3 flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </>
        }
      />
      
      {/* Financial KPIs */}
      <section className="kpi-row-2 kpi-row-cols-6" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><Receipt size={16} /></div>
            <span className="kpi-label">Total Transactions</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value">{(1248 + payments.length - 4).toLocaleString('vi-VN')}</span>
            <span className="kpi-trend trend-up"><ArrowUpRight size={11} />+12%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với kỳ trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box" style={{ color: 'var(--color-green)' }}><ShieldCheck size={16} /></div>
            <span className="kpi-label">Successful</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value" style={{ color: 'var(--color-green)' }}>{successCount.toLocaleString('vi-VN')}</span>
            <span className="kpi-trend trend-up"><ArrowUpRight size={11} />+10%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Tỷ lệ thành công 74.7%</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box" style={{ color: 'var(--color-red)' }}><XCircle size={16} /></div>
            <span className="kpi-label">Failed</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value" style={{ color: 'var(--color-red)' }}>{(186 + payments.filter(p => p.status === 'failed').length - 1).toLocaleString('vi-VN')}</span>
            <span className="kpi-trend trend-down"><ArrowDownRight size={11} />-6%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Tỷ lệ thất bại 14.9%</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box" style={{ color: 'var(--color-orange)' }}><Clock size={16} /></div>
            <span className="kpi-label">Pending</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value" style={{ color: 'var(--color-orange)' }}>{(119 + payments.filter(p => p.status === 'pending').length).toLocaleString('vi-VN')}</span>
            <span className="kpi-trend trend-up"><ArrowUpRight size={11} />+8%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Đang chờ 9.6%</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box" style={{ color: 'var(--color-indigo)' }}><Banknote size={16} /></div>
            <span className="kpi-label">Total Amount</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value" style={{ color: 'var(--color-indigo)', fontSize: '18px' }}>{formatCurrency(totalRevenue)}</span>
            <span className="kpi-trend trend-up"><ArrowUpRight size={11} />+9%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Số tiền giao dịch</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon-box"><BarChart3 size={16} /></div>
            <span className="kpi-label">Average Amount</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value" style={{ fontSize: '18px' }}>{formatCurrency(Math.round(totalRevenue / successCount))}</span>
            <span className="kpi-trend trend-up"><ArrowUpRight size={11} />+4%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Trung bình giao dịch</span>
        </div>
      </section>

      {/* Primary transactions listing */}
      <section className={`dashboard-grid ${!activePaymentState ? 'drawer-closed' : ''}`} id="payment-grid">
        
        {/* LEFT COLUMN: Filters & Table */}
        <div className="grid-col-left">
          
          <div className="panel" style={{ padding: '14px 20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                
                {/* Search bar */}
                <div className="search-input-wrapper" style={{ position: 'relative', flex: '2', minWidth: '200px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="Tìm mã giao dịch, học viên, email..."
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
                {(methodFilter || statusFilter || searchQuery) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterMethod('');
                      setFilterStatus('');
                    }}
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
                    <select
                      value={methodFilter}
                      onChange={(e) => setFilterMethod(e.target.value)}
                      className="form-control form-select"
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                    >
                      <option value="">Tất cả provider</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="momo">MoMo Wallet</option>
                      <option value="onepay">ATM / OnePay Card</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                    <select
                      value={statusFilter}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="form-control form-select"
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                    >
                      <option value="">Tất cả trạng thái</option>
                      <option value="success">Success</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '120px' }}>
                    <input type="date" className="form-control" defaultValue="2026-05-02" style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }} />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '120px' }}>
                    <input type="date" className="form-control" defaultValue="2026-06-02" style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Danh sách giao dịch</h2>
                <span className="panel-subtitle">{filteredPayments.length} giao dịch</span>
              </div>
            </div>

            <div className="table-container">
              <table id="payments-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Payment Detail</th>
                    <th className="col-secondary">Provider transaction ID</th>
                    <th>Payment Channel</th>
                    <th className="text-right">Amount</th>
                    <th>Status</th>
                    <th className="col-secondary">Created at</th>
                    <th className="text-right pr-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => {
                    let methodBadge = 'badge-indigo';
                    if (p.method === 'momo') methodBadge = 'badge-red';
                    else if (p.method === 'onepay') methodBadge = 'badge-purple';

                    let statusClass = 'badge-green';
                    if (p.status === 'pending') statusClass = 'badge-orange';
                    else if (p.status === 'failed') statusClass = 'badge-red';

                    return (
                      <tr
                        key={p.id}
                        onClick={() => setActivePayment(p)}
                        className={`submission-row ${activePayment?.id === p.id ? 'selected-row' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <div className="col-student">
                            <div className="flex flex-col">
                              <span className="font-semibold text-[var(--text-primary)]">{p.name}</span>
                              <span className="text-[10px] text-gray-500">{p.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="font-medium text-[var(--text-primary)] max-w-[140px] truncate" title={p.course}>
                          {p.course}
                        </td>
                        <td className="font-mono font-bold text-gray-500 col-secondary">{p.id}</td>
                        <td>
                          <span className={`badge text-[10px] px-1.5 py-0.5 ${methodBadge}`}>{p.methodName}</span>
                        </td>
                        <td className="text-right font-bold text-[var(--text-primary)]">
                          {formatCurrency(p.amount)}
                        </td>
                        <td>
                          <span className={`badge text-[10px] px-1.5 py-0.5 ${statusClass}`}>{p.statusName}</span>
                        </td>
                        <td className="col-secondary text-[var(--text-secondary)]">{p.date}</td>
                        <td className="text-right pr-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setActivePayment(p)}
                              className="btn-secondary py-1 px-2.5 text-[11px] h-6.5"
                            >
                              Verify
                            </button>
                            {p.invoiceId && (
                              <button
                                onClick={() => alert(`Downloading electronic sales bill ${p.invoiceId}...`)}
                                className="btn-icon-only text-gray-500 hover:text-black"
                                title="Download Invoice"
                              >
                                <Download size={12} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pagination-container">
              <span>Hiển thị 1 - {filteredPayments.length} trong {payments.length} giao dịch</span>
              <div className="pagination-pages">
                <button className="page-btn" disabled>&larr;</button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled>&rarr;</button>
              </div>
              <select className="page-select-dropdown">
                <option>10 / trang</option>
              </select>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Detail Drawer */}
        <div className="grid-col-right">
          {activePayment && (
            <div className="panel" style={{ position: 'sticky', top: '16px' }}>
              <div className="student-profile-header" style={{ paddingBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="student-profile-name" style={{ fontSize: '15px' }}>Transaction Detail</span>
                  <span className="cert-id" id="drawer-event-id-title">{activePayment.id.replace('TX', 'EVENT')}</span>
                </div>
                <button className="btn-icon-only" onClick={() => setActivePayment(null)} style={{ position: 'absolute', right: 0, top: 0 }} title="Đóng panel">
                  <X size={14} />
                </button>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`badge ${activePayment.status === 'success' ? 'badge-green' : activePayment.status === 'pending' ? 'badge-orange' : 'badge-red'}`} id="drawer-status-badge">
                  {activePayment.statusName}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }} id="drawer-status-text">
                  {activePayment.status === 'success' ? 'Thanh toán thành công' : activePayment.status === 'pending' ? 'Đang chờ thanh toán' : 'Giao dịch thất bại'}
                </span>
              </div>

              {/* Order info */}
              <div className="detail-section-title">
                <span>Thông tin đơn hàng</span>
                <i data-lucide="shopping-bag" style={{ width: '13px', height: '13px' }}></i>
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Mã đơn hàng</span>
                  <span className="detail-value cert-id" id="drawer-order-code">{activePayment.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Khóa học</span>
                  <span className="detail-value" id="drawer-course-name" style={{ maxWidth: '180px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{activePayment.course}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Số tiền</span>
                  <span className="detail-value" id="drawer-order-amount" style={{ fontWeight: 700 }}>{formatCurrency(activePayment.amount)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Trạng thái đơn</span>
                  <span className={`badge ${activePayment.status === 'success' ? 'badge-green' : activePayment.status === 'pending' ? 'badge-orange' : 'badge-red'}`} id="drawer-order-status">
                    {activePayment.status === 'success' ? 'Paid' : activePayment.status === 'pending' ? 'Pending' : 'Failed'}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="detail-section-title">
                <span>Thông tin khách hàng</span>
                <i data-lucide="user" style={{ width: '13px', height: '13px' }}></i>
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Họ và tên</span>
                  <span className="detail-value" id="drawer-customer-name" style={{ fontWeight: 600 }}>{activePayment.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value" id="drawer-customer-email">{activePayment.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Số điện thoại</span>
                  <span className="detail-value" id="drawer-customer-phone">0912 345 678</span>
                </div>
              </div>

              {/* Transaction Info */}
              <div className="detail-section-title">
                <span>Thông tin giao dịch</span>
                <i data-lucide="receipt" style={{ width: '13px', height: '13px' }}></i>
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Provider</span>
                  <span className="detail-value" id="drawer-provider">{activePayment.methodName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Transaction ID</span>
                  <span className="detail-value cert-id">
                    <span id="drawer-transaction-id">{activePayment.id}</span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Event ID</span>
                  <span className="detail-value cert-id">
                    <span id="drawer-event-id">{activePayment.id.replace('TX', 'EVENT')}</span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Idempotency Key</span>
                  <span className="detail-value cert-id" id="drawer-idempotency" style={{ fontSize: '10.5px' }}>{`ord_${activePayment.id.toLowerCase()}_${activePayment.method}`}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Thời gian nhận</span>
                  <span className="detail-value" id="drawer-created-at">{activePayment.date}</span>
                </div>
              </div>

              {/* Webhook timeline */}
              <div className="detail-section-title">
                <span>Lịch sử đối soát Webhook</span>
                <i data-lucide="clock" style={{ width: '13px', height: '13px' }}></i>
              </div>
              <div className="timeline">
                <div className="timeline-item">
                  <div className={`timeline-dot ${activePayment.status === 'success' ? 'green' : ''}`}></div>
                  <div className="timeline-content">
                    <span className="timeline-title">{activePayment.status === 'success' ? 'Processed' : activePayment.status === 'pending' ? 'Pending Review' : 'Failed'}</span>
                    <span className="timeline-time" id="timeline-process-time">{activePayment.date}</span>
                    <span className="timeline-desc">{activePayment.status === 'success' ? 'HTTP 200 • Signature valid • Amount matched' : 'Awaiting confirmation'}</span>
                  </div>
                </div>
              </div>

              {/* Raw JSON */}
              <div className="detail-section-title">
                <span>Raw payload JSON</span>
                <i data-lucide="braces" style={{ width: '13px', height: '13px' }}></i>
              </div>
              <div className="json-box" id="drawer-raw-json">
                {JSON.stringify({
                  provider: activePayment.method,
                  transaction_id: activePayment.id,
                  amount: activePayment.amount,
                  status: activePayment.status,
                  event_id: activePayment.id.replace('TX', 'EVENT'),
                  verified_at: activePayment.date
                }, null, 2)}
              </div>

              <div className="btn-group-row">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(activePayment, null, 2));
                    alert('Copied raw payload JSON to clipboard!');
                  }}
                  className="btn-secondary"
                  id="drawer-copy-payload-btn"
                  style={{ fontSize: '11.5px', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}
                >
                  <Copy size={13} />
                  <span>Copy Payload</span>
                </button>
              </div>

              {/* Actions for Pending list checks */}
              {activePayment.status === 'pending' && (
                <div className="flex gap-2.5 pt-4 border-t border-[var(--border-passive)] justify-end text-xs mt-4">
                  <button
                    type="button"
                    onClick={handleOpenDeny}
                    className="btn-red-outline h-8 px-4 flex-1"
                  >
                    Reject Order
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprovePayment(activePayment)}
                    className="btn-success font-semibold h-8 px-5 flex-1"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* DISAPPROVAL EXPLANATION MODAL */}
      <AnimatePresence>
        {isDenialOpen && activePaymentState && (
          <motion.div
            className="modal-backdrop open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="modal-content text-xs"
              style={{ maxWidth: '420px' }}
            >
              <div className="modal-header">
                <span className="modal-title font-heading font-semibold text-red-600">Reject Transaction</span>
                <button onClick={() => setIsDenialOpen(false)} className="btn-icon-only">
                  <X size={14} />
                </button>
              </div>

              <div className="modal-body space-y-4">
                <div className="bg-[#fff5f5] p-3 rounded-lg border border-red-100 flex gap-2.5 text-red-900">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5 text-[var(--color-red)]" />
                  <p className="text-[11px] leading-relaxed">
                    This action will cancel the pending review and request the student to upload a valid transfer receipt.
                  </p>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label font-bold text-gray-500">Reason for Rejection <span className="required">*</span></label>
                  <select
                    value={denialReason}
                    onChange={(e) => setDenialReason(e.target.value)}
                    className="form-control form-select"
                  >
                    <option value="Transaction amount not received">Transaction amount not received (Bank yet to confirm)</option>
                    <option value="Incorrect amount">Incorrect amount (Sum transferred is lower than tuition)</option>
                    <option value="Forged transaction">Forged transaction (Edited screenshot or duplicated reference)</option>
                    <option value="Invalid transaction info">Invalid transaction info (Wrong syntax or reference code)</option>
                    <option value="Other">Other...</option>
                  </select>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label font-bold text-gray-500">Additional Explanative Feedback</label>
                  <textarea
                    value={denialExplanation}
                    onChange={(e) => setDenialExplanation(e.target.value)}
                    placeholder="E.g., Please transfer the exact amount of 4,500,000 ₫ specified in the billing..."
                    className="form-control form-textarea h-16"
                  />
                </div>
              </div>

              <div className="modal-footer pt-3 border-t border-[var(--border-passive)] flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsDenialOpen(false)}
                  className="btn-secondary h-8 py-1.5 px-4"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeny}
                  className="btn-danger font-semibold h-8 py-1.5 px-5"
                >
                  Reject Transaction
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
