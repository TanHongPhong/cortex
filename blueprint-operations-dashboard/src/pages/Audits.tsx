/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  ChevronDown,
  Download,
  RotateCcw,
  Search,
  Eye,
  X,
  Info,
  FileText,
  Code,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import PageHeader from './PageHeader';

interface AuditItem {
  id: string;
  time: string;
  actor: string;
  email: string;
  action: string;
  category: 'course' | 'student' | 'payment' | 'security' | 'settings';
  ip: string;
  desc: string;
  userAgent: string;
  meta: Record<string, any>;
}

interface AuditsProps {
  onToggleSidebar?: () => void;
}

export default function Audits({ onToggleSidebar }: AuditsProps) {
  // Master security trace records
  const [logs] = useState<AuditItem[]>([
    {
      id: "LOG-2026-0006",
      time: "08/06/2026 11:24:15",
      actor: "Tân Hồng Phong",
      email: "tanhongphong30@gmail.com",
      action: "CERT_REVOKE",
      category: "security",
      ip: "113.161.42.185",
      desc: "Thu hồi chứng chỉ số CERT-20260415-000012 của Nguyễn Văn An",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      meta: { cert_id: "CERT-20260415-000012", student_name: "Nguyễn Văn An", reason: "Phát hiện gian lận thi cử" }
    },
    {
      id: "LOG-2026-0007",
      time: "08/06/2026 09:30:42",
      actor: "Tân Hồng Phong",
      email: "tanhongphong30@gmail.com",
      action: "PAYMENT_APPROVE",
      category: "payment",
      ip: "113.161.42.185",
      desc: "Phê duyệt giao dịch rà soát TX-9910283 (học viên Nguyễn Văn An)",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      meta: { order_code: "TX-9910283", student_name: "Nguyễn Văn An", approved_by: "tanhongphong30@gmail.com" }
    },
    {
      id: "LOG-2026-0010",
      time: "08/06/2026 08:00:22",
      actor: "Tân Hồng Phong",
      email: "tanhongphong30@gmail.com",
      action: "SETTINGS_CHANGE",
      category: "settings",
      ip: "113.161.42.185",
      desc: "Đăng nhập hệ thống quản trị thành công",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      meta: { session_id: "sess_admin_901701", status: "success" }
    },
    {
      id: "LOG-2026-0008",
      time: "07/06/2026 15:30:11",
      actor: "Phan Văn Trị",
      email: "tri.phan@email.com",
      action: "SETTINGS_CHANGE",
      category: "settings",
      ip: "14.232.115.60",
      desc: "Tạo coupon chiến dịch VIPAGENT50 mức giảm 50%",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      meta: { coupon_code: "VIPAGENT50", discount_percent: 50, campaign: "VIPAGENT" }
    },
    {
      id: "LOG-2026-0001",
      time: "07/06/2026 10:45:12",
      actor: "Admin User",
      email: "admin@blueprint.edu",
      action: "COURSE_UPDATE",
      category: "course",
      ip: "113.23.45.167",
      desc: "Cập nhật nội dung bài học số 4 khóa AI Agent & Vibe Coding Bootcamp.",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      meta: {
        course_id: "course_ai_agent_bootcamp",
        lesson_id: "lesson_4",
        fields_changed: ["title", "short_desc"],
        old_values: { title: "Chấm điểm bài học", short_desc: "Hướng dẫn" },
        new_values: { title: "Tự động chấm điểm", short_desc: "Tự động hóa với LLM" }
      }
    },
    {
      id: "LOG-2026-0002",
      time: "06/06/2026 15:30:45",
      actor: "Admin User",
      email: "admin@blueprint.edu",
      action: "STUDENT_BAN",
      category: "student",
      ip: "113.23.45.167",
      desc: "Tạm khóa tài khoản học viên khanh.vo@email.com do vi phạm điều khoản sao chép mã nguồn.",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      meta: {
        student_id: "user_vt_0012",
        action: "ban",
        reason: "Source code plagiarism detected on submission #12",
        expiry_date: "2026-07-06T15:30:00Z"
      }
    },
    {
      id: "LOG-2026-0009",
      time: "06/06/2026 14:15:00",
      actor: "Nguyễn Thu Thảo",
      email: "thao.nguyen@email.com",
      action: "COURSE_UPDATE",
      category: "course",
      ip: "171.244.11.18",
      desc: "Cập nhật bài giảng 2.1 của Module 2 khóa n8n Automation",
      userAgent: "Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
      meta: { course: "n8n Automation", module: "Module 2", lesson: "2.1" }
    },
    {
      id: "LOG-2026-0003",
      time: "05/06/2026 09:12:01",
      actor: "Lê Văn Tám",
      email: "tam.le@blueprint.edu",
      action: "PAYMENT_APPROVE",
      category: "payment",
      ip: "27.72.100.85",
      desc: "Phê duyệt giao dịch thanh toán thủ công cho đơn hàng MAY-ORD-2026-0038.",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      meta: {
        order_code: "MAY-ORD-2026-0038",
        payment_provider: "manual_bank_transfer",
        amount: 2400000,
        approved_by: "tam.le@blueprint.edu"
      }
    },
    {
      id: "LOG-2026-0004",
      time: "03/06/2026 16:40:22",
      actor: "Admin User",
      email: "admin@blueprint.edu",
      action: "SETTINGS_CHANGE",
      category: "settings",
      ip: "113.23.45.167",
      desc: "Thay đổi thông tin cấu hình cổng tích hợp Momo API key.",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      meta: {
        integration: "momo_qr",
        changed_fields: ["api_endpoint", "partner_code"],
        api_endpoint_old: "https://test-payment.momo.vn",
        api_endpoint_new: "https://payment.momo.vn"
      }
    },
    {
      id: "LOG-2026-0005",
      time: "02/06/2026 23:55:10",
      actor: "Hệ thống bảo mật",
      email: "security-daemon@blueprint.sh",
      action: "SECURITY_ALERT",
      category: "security",
      ip: "185.220.101.4",
      desc: "Phát hiện số lượng lớn yêu cầu sai Token xác thực (Brute-force attempt) trên API endpoint /checkout/confirm.",
      userAgent: "python-requests/2.31.0",
      meta: {
        request_endpoint: "/api/v1/checkout/confirm",
        failures_count: 125,
        action_taken: "ip_temporary_blocked",
        blocked_duration_seconds: 3600
      }
    }
  ]);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIp, setSelectedIp] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  // Categories list
  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'course', label: 'Khóa học' },
    { value: 'student', label: 'Học viên' },
    { value: 'payment', label: 'Giao dịch' },
    { value: 'security', label: 'Bảo mật' },
    { value: 'settings', label: 'Cài đặt' },
  ];

  // Dynamic IP labels mapping
  const getIpLabel = (ip: string) => {
    if (ip === '113.23.45.167') return `${ip} (HN)`;
    if (ip === '27.72.100.85') return `${ip} (HCM)`;
    if (ip === '113.161.42.185') return `${ip} (HN)`;
    if (ip === '14.232.115.60') return `${ip} (ĐN)`;
    return ip;
  };

  // Get action badge style class
  const getActionBadgeClass = (category: string) => {
    if (category === 'course') return 'act-course';
    if (category === 'student') return 'act-student';
    if (category === 'payment') return 'act-payment';
    if (category === 'security') return 'act-security';
    return 'act-settings';
  };

  // Extract unique IPs from master logs list
  const uniqueIps: string[] = Array.from(new Set(logs.map(l => l.ip)));

  // Filter logic
  const filteredLogs = logs.filter(item => {
    // Category pill filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // IP filter
    if (selectedIp && item.ip !== selectedIp) {
      return false;
    }
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.actor.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const [lastSelectedLog, setLastSelectedLog] = useState<AuditItem | null>(null);
  const activeLog = logs.find(l => l.id === selectedLogId) || lastSelectedLog;

  React.useEffect(() => {
    const found = logs.find(l => l.id === selectedLogId);
    if (found) {
      setLastSelectedLog(found);
    }
  }, [selectedLogId, logs]);

  const handleExportAudits = () => {
    // CSV Header
    const headers = ["ID", "Thời gian", "Người thực hiện", "Email", "Hành động", "Phân loại", "IP", "Mô tả", "User Agent"];
    
    // CSV Rows
    const rows = filteredLogs.map(l => [
      l.id,
      l.time,
      `"${l.actor.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      l.action,
      l.category,
      l.ip,
      `"${l.desc.replace(/"/g, '""')}"`,
      `"${l.userAgent.replace(/"/g, '""')}"`
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
    link.setAttribute("download", `audits_export_${new Date().toISOString().slice(0, 10)}.csv`);
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
        .pill-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
          align-items: center;
        }
        .pill-btn {
          background-color: var(--bg-card);
          border: 1px solid var(--border-passive);
          border-radius: 9999px;
          padding: 5px 12px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .pill-btn:hover {
          border-color: var(--border-interactive);
          color: var(--text-primary);
        }
        .pill-btn.active {
          background-color: var(--sidebar-active-bg);
          border-color: var(--text-primary);
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .action-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
        }
        .act-course { background-color: #eff6ff; color: #1e40af; }
        .act-student { background-color: #ecfdf5; color: #065f46; }
        .act-payment { background-color: #fff7ed; color: #9a3412; }
        .act-security { background-color: #fef2f2; color: #991b1b; }
        .act-settings { background-color: #f3f4f6; color: #374151; }

        .json-box {
          background-color: #1c1c1a;
          color: #a3e635;
          padding: 12px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          line-height: 1.4;
          overflow-x: auto;
          margin-top: 8px;
          border: 1px solid var(--border-passive);
          white-space: pre-wrap;
          max-height: 250px;
        }
      `}</style>
      <PageHeader
        title="Lịch sử thao tác"
        subtitle="Nhật ký truy vết các thao tác vận hành của đội ngũ quản trị viên và giảng viên."
        onToggleSidebar={onToggleSidebar}
        showDateFilter={false}
        actions={
          <>
            <button 
              className="btn-black h-8 px-3 flex items-center gap-1.5" 
              id="export-logs-btn" 
              onClick={handleExportAudits}
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </>
        }
      />

      {/* Category Filter Pills */}
      <div className="pill-filters">
        {categories.map(cat => (
          <button 
            key={cat.value}
            className={`pill-btn ${selectedCategory === cat.value ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat.value);
              setSelectedLogId(null); // Close drawer on category change to prevent mismatch
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT GRID (2/3 Left, 1/3 Right Drawer) */}
      <section 
        className={`dashboard-grid ${!selectedLogId ? 'drawer-closed' : ''}`} 
        id="logs-grid"
      >
        {/* LEFT COLUMN: Search, Filters & Table */}
        <div className="grid-col-left">
          
          <div className="panel" style={{ padding: '14px 20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              
              <div className="form-group" style={{ marginBottom: 0, minWidth: '200px', flex: 2 }}>
                <div className="search-input-wrapper">
                  <Search size={14} />
                  <input 
                    type="text" 
                    className="form-control" 
                    id="search-actor" 
                    placeholder="Tìm theo tên hoặc email admin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '160px', flex: 1.2 }}>
                <select 
                  className="form-control form-select" 
                  id="filter-ip" 
                  style={{ padding: '4px 8px' }}
                  value={selectedIp}
                  onChange={(e) => setSelectedIp(e.target.value)}
                >
                  <option value="">Tất cả địa chỉ IP</option>
                  {uniqueIps.map(ip => (
                    <option key={ip} value={ip}>{getIpLabel(ip)}</option>
                  ))}
                </select>
              </div>

              <button 
                className="btn-secondary" 
                id="filter-reset-btn" 
                style={{ padding: '6px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px', height: '30px' }} 
                title="Reset filters"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIp('');
                  setSelectedCategory('all');
                  setSelectedLogId(null);
                }}
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Nhật ký vận hành</h2>
                <span className="panel-subtitle" id="logs-count-label">{filteredLogs.length} logs</span>
              </div>
            </div>

            <div className="table-container">
              <table id="logs-table">
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Người thực hiện</th>
                    <th>Thao tác</th>
                    <th className="col-secondary">Địa chỉ IP</th>
                    <th className="col-secondary">Chi tiết description</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <Search size={24} className="text-gray-400" />
                          <span>Không tìm thấy nhật ký thao tác nào khớp</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((item) => {
                      const isHighlighted = selectedLogId === item.id;
                      return (
                        <tr 
                          key={item.id} 
                          style={{ cursor: 'pointer' }}
                          className={isHighlighted ? 'highlight-row' : ''}
                          onClick={() => setSelectedLogId(item.id)}
                        >
                          <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{item.time}</td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 500 }}>{item.actor}</span>
                              <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{item.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className={`action-badge ${getActionBadgeClass(item.category)}`}>
                              {item.action}
                            </span>
                          </td>
                          <td className="col-secondary" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                            {item.ip}
                          </td>
                          <td className="col-secondary">
                            <div 
                              style={{ fontSize: '11.5px', maxWidth: '380px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} 
                              title={item.desc}
                            >
                              {item.desc}
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <button 
                                className="btn-icon-only view-details-btn" 
                                title="Xem chi tiết & Meta JSON"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedLogId(item.id);
                                }}
                              >
                                <Eye size={14} />
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
              <span id="pagination-label">
                {filteredLogs.length > 0 
                  ? `Hiển thị 1 - ${filteredLogs.length} trong ${filteredLogs.length} logs` 
                  : 'Hiển thị 0 - 0 trong 0 logs'}
              </span>
              <div className="pagination-pages">
                <button className="page-btn" disabled><ChevronLeft size={14} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={14} /></button>
              </div>
              <select className="page-select-dropdown" defaultValue="20 / trang">
                <option value="20 / trang">20 / trang</option>
              </select>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Detail Drawer */}
        <div className="grid-col-right">
          {activeLog && (
            <div className="panel" style={{ position: 'sticky', top: '16px' }}>
              
              <div className="student-profile-header" style={{ paddingBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="student-profile-name" style={{ fontSize: '15px' }}>Chi tiết log thao tác</span>
                  <span className="cert-id" id="drawer-log-id">{activeLog.id}</span>
                </div>
                <button 
                  className="btn-icon-only" 
                  id="close-drawer-btn" 
                  style={{ position: 'absolute', right: 0, top: 0 }} 
                  title="Đóng panel"
                  onClick={() => setSelectedLogId(null)}
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`action-badge ${getActionBadgeClass(activeLog.category)}`} id="drawer-action-badge">
                  {activeLog.action}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }} id="drawer-log-time">
                  Thời gian: {activeLog.time}
                </span>
              </div>

              {/* General info */}
              <div className="detail-section-title">
                <span>Thông tin vận hành</span>
                <Info size={13} />
              </div>
              
              <div className="detail-list">
                <div className="detail-item">
                  <span className="detail-label">Người thực hiện</span>
                  <span className="detail-value" id="drawer-actor" style={{ fontWeight: 600 }}>{activeLog.actor}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email tài khoản</span>
                  <span className="detail-value" id="drawer-email" style={{ fontFamily: 'var(--font-mono)' }}>{activeLog.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Địa chỉ IP</span>
                  <span className="detail-value" id="drawer-ip">{activeLog.ip}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">User Agent</span>
                  <span 
                    className="detail-value" 
                    id="drawer-user-agent" 
                    style={{ fontSize: '10.5px', maxWidth: '180px', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    title={activeLog.userAgent}
                  >
                    {activeLog.userAgent}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="detail-section-title">
                <span>Mô tả hoạt động</span>
                <FileText size={13} />
              </div>
              <div className="note-edit-box" id="drawer-desc" style={{ lineHeight: 1.4, padding: '12px', fontSize: '12px' }}>
                {activeLog.desc}
              </div>

              {/* Raw Metadata (JSON) */}
              <div className="detail-section-title">
                <span>Raw JSON Metadata</span>
                <Code size={13} />
              </div>
              <pre className="json-box" id="drawer-json">
                {JSON.stringify(activeLog.meta, null, 2)}
              </pre>

            </div>
          )}
        </div>

      </section>
    </motion.div>
  );
}
