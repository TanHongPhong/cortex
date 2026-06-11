/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Pencil,
  MoreHorizontal,
  Info,
  X,
  Plus,
  Download,
  Calendar,
  ChevronDown
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface CouponItem {
  code: string;
  name: string;
  type: 'percentage' | 'fixed';
  typeName: string;
  value: string;
  scope: string;
  duration: string;
  redemptions: string;
  status: 'active' | 'paused' | 'expired' | 'archived';
  desc?: string;
  maxDiscount?: string;
  minSpend?: string;
  limitTotal?: string;
  limitUser?: string;
  startDate?: string;
  endDate?: string;
  scopeTarget?: string;
  stack?: boolean;
}

interface CouponsProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

export default function Coupons({ courses, onToggleSidebar }: CouponsProps) {
  // Mock Data matching coupons.html
  const [coupons, setCoupons] = useState<CouponItem[]>([
    {
      code: "WELCOME10",
      name: "Welcome 10%",
      type: "percentage",
      typeName: "Percentage",
      value: "10%",
      scope: "All Courses",
      duration: "01/05/2026 - 31/05/2026",
      redemptions: "128 / 300",
      status: "active",
      desc: "Mã giảm giá chào mừng học viên mới.",
      maxDiscount: "200000",
      minSpend: "0",
      limitTotal: "300",
      limitUser: "1",
      startDate: "2026-05-01",
      endDate: "2026-05-31",
      scopeTarget: "",
      stack: false
    },
    {
      code: "VIP100K",
      name: "Giảm 100K cho Core",
      type: "fixed",
      typeName: "Fixed Amount",
      value: "100.000đ",
      scope: "Core Level",
      duration: "01/05/2026 - 30/06/2026",
      redemptions: "32 / 200",
      status: "active",
      desc: "Mã giảm giá áp dụng cho học viên học các khóa Core.",
      maxDiscount: "",
      minSpend: "500000",
      limitTotal: "200",
      limitUser: "1",
      startDate: "2026-05-01",
      endDate: "2026-06-30",
      scopeTarget: "core",
      stack: true
    },
    {
      code: "ADVANCE15",
      name: "Advanced 15%",
      type: "percentage",
      typeName: "Percentage",
      value: "15%",
      scope: "Advanced Level",
      duration: "01/03/2026 - 31/05/2026",
      redemptions: "88 / 150",
      status: "paused",
      desc: "Ưu đãi khóa học nâng cao.",
      maxDiscount: "500000",
      minSpend: "1000000",
      limitTotal: "150",
      limitUser: "1",
      startDate: "2026-03-01",
      endDate: "2026-05-31",
      scopeTarget: "advanced",
      stack: false
    },
    {
      code: "SUMMER30",
      name: "Summer Sale 30%",
      type: "percentage",
      typeName: "Percentage",
      value: "30%",
      scope: "All Courses",
      duration: "01/04/2026 - 01/05/2026",
      redemptions: "420 / 500",
      status: "expired",
      desc: "Khuyến mãi chào hè 2026.",
      maxDiscount: "300000",
      minSpend: "0",
      limitTotal: "500",
      limitUser: "1",
      startDate: "2026-04-01",
      endDate: "2026-05-01",
      scopeTarget: "",
      stack: false
    },
    {
      code: "STUDENT30",
      name: "Student Discount 30%",
      type: "percentage",
      typeName: "Percentage",
      value: "30%",
      scope: "Starter Level",
      duration: "01/02/2026 - 28/02/2026",
      redemptions: "75 / 100",
      status: "archived",
      desc: "Giảm giá dành riêng cho học sinh sinh viên.",
      maxDiscount: "150000",
      minSpend: "0",
      limitTotal: "100",
      limitUser: "1",
      startDate: "2026-02-01",
      endDate: "2026-02-28",
      scopeTarget: "starter",
      stack: false
    }
  ]);

  // Selected filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [scopeFilter, setScopeFilter] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Active drawer variables
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [hasOpenedEditor, setHasOpenedEditor] = useState(false);

  React.useEffect(() => {
    if (isEditorOpen) {
      setHasOpenedEditor(true);
    }
  }, [isEditorOpen]);

  // Form input variables
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'paused' | 'expired' | 'archived'>('active');
  const [formType, setFormType] = useState<'percentage' | 'fixed'>('percentage');
  const [formValue, setFormValue] = useState<string>('');
  const [formMaxDiscount, setFormMaxDiscount] = useState<string>('');
  const [formMinSpend, setFormMinSpend] = useState<string>('');
  const [formLimitTotal, setFormLimitTotal] = useState<string>('');
  const [formLimitUser, setFormLimitUser] = useState<string>('1');
  const [formStartDate, setFormStartDate] = useState('2026-06-02');
  const [formEndDate, setFormEndDate] = useState('2026-07-02');
  const [formScope, setFormScope] = useState('all');
  const [formScopeTarget, setFormScopeTarget] = useState('');
  const [formStack, setFormStack] = useState(false);

  const openDrawerForCreate = () => {
    setEditingIndex(-1);
    setFormCode('');
    setFormName('');
    setFormDesc('');
    setFormStatus('active');
    setFormType('percentage');
    setFormValue('');
    setFormMaxDiscount('');
    setFormMinSpend('');
    setFormLimitTotal('');
    setFormLimitUser('1');
    setFormStartDate('2026-06-02');
    setFormEndDate('2026-07-02');
    setFormScope('all');
    setFormScopeTarget('');
    setFormStack(false);
    setIsEditorOpen(true);
  };

  const openDrawerForEdit = (item: CouponItem, index: number) => {
    setEditingIndex(index);
    setFormCode(item.code);
    setFormName(item.name);
    setFormDesc(item.desc || "Mã giảm giá áp dụng cho chiến dịch quảng bá.");
    setFormStatus(item.status);
    setFormType(item.type);
    
    // Parse the numeric value
    const numericVal = item.value.replace(/[^0-9]/g, '');
    setFormValue(numericVal);
    
    setFormMaxDiscount(item.maxDiscount || '');
    setFormMinSpend(item.minSpend || '');
    setFormLimitTotal(item.limitTotal || '');
    setFormLimitUser(item.limitUser || '1');

    if (item.startDate) setFormStartDate(item.startDate);
    if (item.endDate) setFormEndDate(item.endDate);
    
    setFormScope(item.scopeTarget ? 'selected' : 'all');
    setFormScopeTarget(item.scopeTarget || '');
    setFormStack(item.stack || false);
    setIsEditorOpen(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode || !formName || !formValue) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }

    const valueDisplay = formType === 'percentage' ? `${formValue}%` : `${Number(formValue).toLocaleString('vi-VN')}đ`;
    const typeLabel = formType === 'percentage' ? 'Percentage' : 'Fixed Amount';
    let scopeDisplay = 'All Courses';
    if (formScope === 'selected') {
      scopeDisplay = formScopeTarget === 'core' ? 'Core Level' : formScopeTarget === 'advanced' ? 'Advanced Level' : 'Selected Courses';
    }

    const durationDisplay = `${formatDateForDisplay(formStartDate)} - ${formatDateForDisplay(formEndDate)}`;

    const updatedItem: CouponItem = {
      code: formCode.toUpperCase().trim(),
      name: formName.trim(),
      type: formType,
      typeName: typeLabel,
      value: valueDisplay,
      scope: scopeDisplay,
      duration: durationDisplay,
      redemptions: editingIndex >= 0 ? coupons[editingIndex].redemptions : `0 / ${formLimitTotal || '∞'}`,
      status: formStatus,
      desc: formDesc,
      maxDiscount: formMaxDiscount,
      minSpend: formMinSpend,
      limitTotal: formLimitTotal,
      limitUser: formLimitUser,
      startDate: formStartDate,
      endDate: formEndDate,
      scopeTarget: formScopeTarget,
      stack: formStack
    };

    if (editingIndex >= 0) {
      // update
      setCoupons(prev => prev.map((c, idx) => idx === editingIndex ? updatedItem : c));
    } else {
      // create
      setCoupons(prev => [updatedItem, ...prev]);
    }

    setIsEditorOpen(false);
    setEditingIndex(-1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setTypeFilter('');
    setScopeFilter('');
  };

  const formatDateForDisplay = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  // Filter coupons
  const filteredCoupons = coupons.filter(item => {
    const matchesSearch = item.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesType = !typeFilter || item.type === typeFilter;
    
    let matchesScope = true;
    if (scopeFilter) {
      if (scopeFilter === 'all') matchesScope = item.scope === 'All Courses';
      else if (scopeFilter === 'core') matchesScope = item.scope.includes('Core');
      else if (scopeFilter === 'advanced') matchesScope = item.scope.includes('Advanced');
    }

    return matchesSearch && matchesStatus && matchesType && matchesScope;
  });

  const handleExportCoupons = () => {
    // CSV Header
    const headers = ["Mã Coupon", "Tên chương trình", "Phân loại", "Mức giảm", "Phạm vi áp dụng", "Thời hạn", "Đã dùng", "Tối đa", "Trạng thái"];
    
    // CSV Rows
    const rows = filteredCoupons.map(c => [
      c.code,
      `"${c.name.replace(/"/g, '""')}"`,
      c.typeName,
      c.value,
      `"${c.scope.replace(/"/g, '""')}"`,
      `"${c.duration.replace(/"/g, '""')}"`,
      c.redemptionsUsed,
      c.redemptionsMax,
      c.status
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
    link.setAttribute("download", `coupons_export_${new Date().toISOString().slice(0, 10)}.csv`);
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
        .kpi-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }
        .indicator-green { background-color: var(--color-green); }
        .indicator-brown { background-color: #8b5a2b; }
        .indicator-orange { background-color: var(--color-orange); }
        .indicator-red { background-color: var(--color-red); }
        .indicator-purple { background-color: var(--color-indigo); }
        
        .form-section-title {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 14px;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--border-passive);
          padding-bottom: 4px;
        }
        
        .toggle-switch-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
        }
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 34px;
          height: 20px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: var(--border-passive);
          transition: .2s;
          border-radius: 20px;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .2s;
          border-radius: 50%;
        }
        .toggle-switch input:checked + .toggle-slider {
          background-color: var(--text-primary);
        }
        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(14px);
        }
      `}</style>

      <PageHeader
        title="Quản lý mã giảm giá"
        subtitle="Tạo, quản lý và theo dõi hiệu quả của các mã giảm giá."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              onClick={handleExportCoupons}
              className="btn-black h-8 px-3 flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={openDrawerForCreate}
              className="btn-black"
            >
              <Plus size={12} />
              <span>Tạo coupon mới</span>
            </button>
          </>
        }
      />

      {/* KPI GRID ROW (5 Cards) */}
      <section class="kpi-row-1 kpi-row-cols-5" style={{ marginBottom: '20px' }}>
        <div class="kpi-card" style={{ padding: '12px 14px' }}>
          <span class="kpi-label" style={{ marginBottom: '4px' }}>Active Coupons</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
            <span class="kpi-value" style={{ fontSize: '20px' }}>{coupons.filter(c => c.status === 'active').length}</span>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span class="kpi-indicator-dot indicator-green"></span>
              <span>Đang hoạt động</span>
            </div>
          </div>
        </div>

        <div class="kpi-card" style={{ padding: '12px 14px' }}>
          <span class="kpi-label" style={{ marginBottom: '4px' }}>Total Redemptions</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
            <span class="kpi-value" style={{ fontSize: '20px' }}>1,248</span>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span class="kpi-indicator-dot indicator-brown"></span>
              <span>Tổng lượt áp dụng</span>
            </div>
          </div>
        </div>

        <div class="kpi-card" style={{ padding: '12px 14px' }}>
          <span class="kpi-label" style={{ marginBottom: '4px' }}>Revenue from Coupons</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
            <span class="kpi-value" style={{ fontSize: '20px' }}>$128,540</span>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span class="kpi-indicator-dot indicator-green"></span>
              <span>Từ đơn hàng paid</span>
            </div>
          </div>
        </div>

        <div class="kpi-card" style={{ padding: '12px 14px' }}>
          <span class="kpi-label" style={{ marginBottom: '4px' }}>Discount Given</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
            <span class="kpi-value" style={{ fontSize: '20px' }}>$18,760</span>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span class="kpi-indicator-dot indicator-orange"></span>
              <span>Tổng giá trị giảm</span>
            </div>
          </div>
        </div>

        <div class="kpi-card" style={{ padding: '12px 14px' }}>
          <span class="kpi-label" style={{ marginBottom: '4px' }}>Expiring Soon</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
            <span class="kpi-value" style={{ fontSize: '20px', color: 'var(--color-orange-dark)' }}>5</span>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span class="kpi-indicator-dot indicator-red"></span>
              <span>Hết hạn trong 7 ngày</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section
        className={`dashboard-grid ${isEditorOpen ? '' : 'drawer-closed'}`}
        id="coupons-grid"
      >
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
                    placeholder="Tìm theo code, tên coupon..."
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
                {(statusFilter || typeFilter || scopeFilter || searchQuery) && (
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
                    <select
                      className="form-control form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                    >
                      <option value="">Tất cả trạng thái</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="expired">Expired</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '130px' }}>
                    <select
                      className="form-control form-select"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                    >
                      <option value="">Tất cả loại</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                    <select
                      className="form-control form-select"
                      value={scopeFilter}
                      onChange={(e) => setScopeFilter(e.target.value)}
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                    >
                      <option value="">Tất cả scope</option>
                      <option value="all">All Courses</option>
                      <option value="core">Core Level</option>
                      <option value="advanced">Advanced Level</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Danh sách mã giảm giá</h2>
                <span className="panel-subtitle">{filteredCoupons.length} coupons</span>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Tên coupon</th>
                    <th className="col-secondary">Loại giảm</th>
                    <th>Giảm giá</th>
                    <th className="col-secondary">Phạm vi áp dụng</th>
                    <th className="col-secondary">Thời gian hiệu lực</th>
                    <th className="col-secondary">Lượt dùng</th>
                    <th>Trạng thái</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                        Không tìm thấy mã giảm giá nào khớp
                      </td>
                    </tr>
                  ) : (
                    filteredCoupons.map((item, index) => {
                      let statusClass = 'badge-gray';
                      if (item.status === 'active') statusClass = 'badge-green';
                      else if (item.status === 'paused') statusClass = 'badge-orange';
                      else if (item.status === 'expired') statusClass = 'badge-red';

                      return (
                        <tr
                          key={item.code}
                          style={{ cursor: 'pointer' }}
                          className={editingIndex === index ? 'highlight-row' : ''}
                          onClick={() => openDrawerForEdit(item, index)}
                        >
                          <td className="cert-id" style={{ fontWeight: 600 }}>{item.code}</td>
                          <td style={{ fontWeight: 500 }}>{item.name}</td>
                          <td className="col-secondary">{item.typeName}</td>
                          <td style={{ fontWeight: 600 }}>{item.value}</td>
                          <td className="col-secondary">{item.scope}</td>
                          <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{item.duration}</td>
                          <td className="col-secondary">
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <span>{item.redemptions}</span>
                              <Info style={{ width: '12px', height: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }} />
                            </div>
                          </td>
                          <td><span className={`badge ${statusClass}`}>{item.status.toUpperCase()}</span></td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={(e) => e.stopPropagation()}>
                              <button className="btn-icon-only" title="Chỉnh sửa" onClick={() => openDrawerForEdit(item, index)}>
                                <Pencil size={12} />
                              </button>
                              <button className="btn-icon-only" title="Hành động khác">
                                <MoreHorizontal size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginator */}
            <div className="pagination-container">
              <span>Hiển thị 1 đến {filteredCoupons.length} của {filteredCoupons.length} coupon</span>
              <div className="pagination-pages">
                <button className="page-btn" disabled><ChevronLeft size={14} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={14} /></button>
              </div>
              <select className="page-select-dropdown">
                <option>10 / trang</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Drawer */}
        <div className="grid-col-right">
          {hasOpenedEditor && (
            <div className="panel" style={{ position: 'sticky', top: '16px' }}>
              <div className="student-profile-header" style={{ paddingBottom: '10px', marginBottom: '12px' }}>
                <span className="student-profile-name" style={{ fontSize: '15px' }}>
                  {editingIndex >= 0 ? "Chỉnh sửa coupon" : "Tạo coupon mới"}
                </span>
                <button
                  className="btn-icon-only"
                  style={{ position: 'absolute', right: 0, top: 0 }}
                  title="Đóng panel"
                  onClick={() => {
                    setIsEditorOpen(false);
                    setEditingIndex(-1);
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleSaveCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
                {/* Section 1 */}
                <div className="form-section-title" style={{ marginTop: 0 }}>Thông tin cơ bản</div>
                <div className="form-group">
                  <label className="form-label">Code <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-control cert-id"
                    placeholder="Nhập mã coupon (WELCOME10)"
                    required
                    style={{ textTransform: 'uppercase' }}
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    disabled={editingIndex >= 0}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tên coupon <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên coupon"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mô tả</label>
                  <textarea
                    className="form-control form-textarea"
                    placeholder="Mô tả ngắn về coupon..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Trạng thái</label>
                  <select
                    className="form-control form-select"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Section 2 */}
                <div className="form-section-title">Quy tắc giảm giá</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Loại giảm <span className="required">*</span></label>
                    <select
                      className="form-control form-select"
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (đ)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giá trị giảm <span className="required">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0"
                      required
                      min="1"
                      value={formValue}
                      onChange={(e) => setFormValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Giảm tối đa</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Không giới hạn"
                      value={formMaxDiscount}
                      onChange={(e) => setFormMaxDiscount(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Đơn tối thiểu</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0"
                      value={formMinSpend}
                      onChange={(e) => setFormMinSpend(e.target.value)}
                    />
                  </div>
                </div>

                {/* Section 3 */}
                <div className="form-section-title">Quy tắc sử dụng</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Giới hạn tổng</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Không giới hạn"
                      value={formLimitTotal}
                      onChange={(e) => setFormLimitTotal(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giới hạn/User</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="1"
                      value={formLimitUser}
                      onChange={(e) => setFormLimitUser(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Bắt đầu <span className="required">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      value={formStartDate}
                      onChange={(e) => setFormStartDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hết hạn <span className="required">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      value={formEndDate}
                      onChange={(e) => setFormEndDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Section 4 */}
                <div className="form-section-title">Phạm vi áp dụng</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Áp dụng cho <span class="required">*</span></label>
                    <select
                      className="form-control form-select"
                      value={formScope}
                      onChange={(e) => setFormScope(e.target.value)}
                    >
                      <option value="all">All Courses</option>
                      <option value="selected">Selected Courses</option>
                      <option value="levels">Selected Levels</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Khóa học / Level</label>
                    <select
                      className="form-control form-select"
                      value={formScopeTarget}
                      onChange={(e) => setFormScopeTarget(e.target.value)}
                      disabled={formScope === 'all'}
                    >
                      <option value="">Tất cả</option>
                      {formScope === 'selected' ? (
                        <>
                          <option value="ai">AI Agent & Vibe Coding Bootcamp</option>
                          <option value="starter">Starter Mini Course</option>
                          <option value="python">Python for Data Analysis</option>
                        </>
                      ) : formScope === 'levels' ? (
                        <>
                          <option value="core">Core Level</option>
                          <option value="advanced">Advanced Level</option>
                          <option value="premium">Premium Level</option>
                        </>
                      ) : null}
                    </select>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="form-section-title">Cài đặt khác</div>
                <div className="toggle-switch-container">
                  <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 500 }}>Cho phép stack với coupon khác</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={formStack}
                      onChange={(e) => setFormStack(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </form>

              {/* Redemption History List */}
              {editingIndex >= 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div className="form-section-title">Lịch sử áp dụng coupon</div>
                  <div className="table-container" style={{ maxHeight: '160px', overflowY: 'auto', fontSize: '11px', marginTop: '8px', border: '1px solid var(--border-passive)', borderRadius: '4px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-app)', borderBottom: '1px solid var(--border-passive)', color: 'var(--text-secondary)' }}>
                          <th style={{ padding: '6px 8px', fontWeight: 600 }}>Học viên</th>
                          <th style={{ padding: '6px 8px', fontWeight: 600 }}>Đơn hàng</th>
                          <th style={{ padding: '6px 8px', fontWeight: 600 }}>Giảm giá</th>
                          <th style={{ padding: '6px 8px', fontWeight: 600 }}>Ngày dùng</th>
                          <th style={{ padding: '6px 8px', fontWeight: 600 }}>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-passive)' }}>
                          <td style={{ padding: '6px 8px' }}>Phạm Hoàng Duy</td>
                          <td style={{ padding: '6px 8px' }} className="cert-id">MAY-ORD-2026-0001</td>
                          <td style={{ padding: '6px 8px', fontWeight: 600 }}>
                            {formType === 'percentage' ? `-${formValue}%` : `-${Number(formValue).toLocaleString('vi-VN')}đ`}
                          </td>
                          <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>06/06/2026 21:15</td>
                          <td style={{ padding: '6px 8px' }}><span className="badge badge-green">Paid</span></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-passive)' }}>
                          <td style={{ padding: '6px 8px' }}>Nguyễn Văn An</td>
                          <td style={{ padding: '6px 8px' }} className="cert-id">MAY-ORD-2026-0002</td>
                          <td style={{ padding: '6px 8px', fontWeight: 600 }}>
                            {formType === 'percentage' ? `-${formValue}%` : `-${Number(formValue).toLocaleString('vi-VN')}đ`}
                          </td>
                          <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>05/06/2026 10:30</td>
                          <td style={{ padding: '6px 8px' }}><span className="badge badge-green">Paid</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="panel-footer" style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-passive)', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setIsEditorOpen(false);
                    setEditingIndex(-1);
                  }}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn-black"
                  onClick={handleSaveCoupon}
                >
                  Lưu coupon
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
