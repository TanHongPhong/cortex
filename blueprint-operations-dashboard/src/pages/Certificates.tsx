/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import {
  Award,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  FileCheck,
  FileX,
  X,
  Copy,
  AlertOctagon,
  Trash2,
  BookOpen,
  Layout,
  Settings,
  ShieldAlert,
  Search,
  Check,
  AlertTriangle,
  GraduationCap,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { Student } from '../types';
import PageHeader from './PageHeader';

interface CertificateItem {
  id: string;
  name: string;
  email: string;
  avatarClass: string;
  avatarText: string;
  course: string;
  courseCode: string;
  issuedAt: string;
  status: 'valid' | 'revoked';
  statusName: string;
  template: string;
  pdfStatus: string;
  note?: string;
  revokedReason?: string;
  revokedNote?: string;
  revokedAt?: string;
  revokedBy?: string;
}

interface EligibleStudent {
  name: string;
  email: string;
  avatarClass: string;
  avatarText: string;
  course: string;
  courseCode: string;
  completedAt: string;
  progress: string;
  finalProject: string;
}

interface CertificatesProps {
  onNavigate: (tab: string, params?: any) => void;
  students: Student[];
  onToggleSidebar?: () => void;
}

/**
 * Certificates page handles course credential generation, digital signatures, and revocations.
 */
export default function Certificates({ onNavigate, students, onToggleSidebar }: CertificatesProps) {
  // Master lists
  const [certs, setCerts] = useState<CertificateItem[]>([
    {
      id: "CERT-20260601-000028",
      name: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      avatarClass: "avatar-nv",
      avatarText: "NV",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      issuedAt: "01/06/2026 10:30",
      status: "valid",
      statusName: "Active",
      template: "Minimal v1.0",
      pdfStatus: "Available",
      note: "Hoàn thành xuất sắc khóa học.",
      revokedReason: "",
      revokedNote: "",
      revokedAt: "",
      revokedBy: ""
    },
    {
      id: "CERT-20260528-000027",
      name: "Trần Thị Bình",
      email: "binh.tran@email.com",
      avatarClass: "avatar-tt",
      avatarText: "TT",
      course: "Web Automation with n8n",
      courseCode: "n8n",
      issuedAt: "28/05/2026 14:15",
      status: "valid",
      statusName: "Active",
      template: "Classic v1.2",
      pdfStatus: "Available",
      note: "",
      revokedReason: "",
      revokedNote: "",
      revokedAt: "",
      revokedBy: ""
    },
    {
      id: "CERT-20260520-000026",
      name: "Lê Minh Châu",
      email: "chau.le@email.com",
      avatarClass: "avatar-lm",
      avatarText: "LM",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      issuedAt: "20/05/2026 09:00",
      status: "valid",
      statusName: "Active",
      template: "Minimal v1.0",
      pdfStatus: "Available",
      note: "",
      revokedReason: "",
      revokedNote: "",
      revokedAt: "",
      revokedBy: ""
    },
    {
      id: "CERT-20260415-000012",
      name: "Phạm Hoàng Duy",
      email: "duy.pham@email.com",
      avatarClass: "avatar-ph",
      avatarText: "PH",
      course: "Web Automation with n8n",
      courseCode: "n8n",
      issuedAt: "15/04/2026 17:45",
      status: "revoked",
      statusName: "Revoked",
      template: "Classic v1.2",
      pdfStatus: "Unavailable",
      note: "",
      revokedReason: "Vi phạm quy định",
      revokedNote: "Học viên copy code từ nguồn khác cho bài final project.",
      revokedAt: "22/04/2026 11:20",
      revokedBy: "Admin User"
    }
  ]);

  const [eligibles, setEligibles] = useState<EligibleStudent[]>([
    {
      name: "Mai Lan",
      email: "lan.mai@email.com",
      avatarClass: "avatar-ml",
      avatarText: "ML",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      completedAt: "18/05/2026",
      progress: "100%",
      finalProject: "Approved"
    },
    {
      name: "Vũ Quang",
      email: "quang.vu@email.com",
      avatarClass: "avatar-vq",
      avatarText: "VQ",
      course: "Web Automation with n8n",
      courseCode: "n8n",
      completedAt: "05/06/2026",
      progress: "100%",
      finalProject: "Approved"
    },
    {
      name: "Hoàng Tú",
      email: "tu.hoang@email.com",
      avatarClass: "avatar-ht",
      avatarText: "HT",
      course: "AI Agent & Vibe Coding Bootcamp",
      courseCode: "ai",
      completedAt: "02/06/2026",
      progress: "100%",
      finalProject: "Approved"
    },
    {
      name: "Quỳnh Như",
      email: "nhu.quynh@email.com",
      avatarClass: "avatar-qn",
      avatarText: "QN",
      course: "Web Automation with n8n",
      courseCode: "n8n",
      completedAt: "25/05/2026",
      progress: "100%",
      finalProject: "Approved"
    }
  ]);

  // Filters
  const [courseFilter, setCourseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Drawers and Modals active states
  // Synchronize active certificate drawer state with URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const drawerCertId = searchParams.get('certId');
  const [lastSelectedCert, setLastSelectedCert] = useState<CertificateItem | null>(null);
  const drawerCert = certs.find(c => c.id === drawerCertId) || lastSelectedCert;

  React.useEffect(() => {
    const found = certs.find(c => c.id === drawerCertId);
    if (found) {
      setLastSelectedCert(found);
    }
  }, [drawerCertId, certs]);
  const setDrawerCert = (cert: CertificateItem | null) => {
    setSearchParams(prev => {
      if (cert) {
        prev.set('certId', cert.id);
      } else {
        prev.delete('certId');
      }
      return prev;
    }, { replace: true });
  };
  
  // Issue Modal fields
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [issueStudentName, setIssueStudentName] = useState('');
  const [issueCourse, setIssueCourse] = useState('');
  const [issueCourseCode, setIssueCourseCode] = useState('');
  const [issueCertId, setIssueCertId] = useState('');
  const [issueTemplate, setIssueTemplate] = useState('Classic v1.2');
  const [issueNote, setIssueNote] = useState('');

  // Revoke Modal fields
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<CertificateItem | null>(null);
  const [revokeReason, setRevokeReason] = useState('Vi phạm quy định');
  const [revokeNote, setRevokeNote] = useState('');
  const [revokeConfirm, setRevokeConfirm] = useState(false);

  // Computations
  const totalIssued = 1248 + certs.length - 4;
  const totalValid = 1235 + certs.filter(c => c.status === 'valid').length - 3;
  const totalRevoked = 13 + certs.filter(c => c.status === 'revoked').length - 1;
  const totalEligible = eligibles.length;

  const filteredCerts = certs.filter(c => {
    const matchesCourse = !courseFilter || c.courseCode === courseFilter;
    const matchesStatus = !statusFilter || c.status === statusFilter;
    const matchesQuery = !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesStatus && matchesQuery;
  });

  const filteredEligibles = eligibles.filter(e => {
    const matchesCourse = !courseFilter || e.courseCode === courseFilter;
    const matchesQuery = !searchQuery ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesQuery;
  });

  const handleExportCertificates = () => {
    // CSV Header
    const headers = ["Mã chứng chỉ", "Học viên", "Email", "Khóa học", "Mã khóa học", "Ngày cấp", "Trạng thái"];
    
    // CSV Rows
    const rows = filteredCerts.map(c => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${c.course.replace(/"/g, '""')}"`,
      c.courseCode,
      c.issuedDate,
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
    link.setAttribute("download", `certificates_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open Issue Modal
  const handleOpenIssue = (student?: EligibleStudent) => {
    if (student) {
      setIssueStudentName(student.name);
      setIssueCourse(student.course);
      setIssueCourseCode(student.courseCode);
    } else {
      if (eligibles.length > 0) {
        setIssueStudentName(eligibles[0].name);
        setIssueCourse(eligibles[0].course);
        setIssueCourseCode(eligibles[0].courseCode);
      } else {
        alert("No eligible students found for certificate issuance!");
        return;
      }
    }

    // Auto-generate Cert ID
    const year = new Date().getFullYear();
    const rdr = Math.floor(1000 + Math.random() * 9000);
    const countStr = String(certs.length + 1).padStart(6, '0');
    setIssueCertId(`CERT-${year}${rdr}-${countStr}`);
    
    setIssueTemplate('Classic v1.2');
    setIssueNote('');
    setIsIssueOpen(true);
  };

  const handleConfirmIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = eligibles.find(el => el.name === issueStudentName);
    if (!targetStudent) return;

    const newCert: CertificateItem = {
      id: issueCertId,
      name: targetStudent.name,
      email: targetStudent.email,
      avatarClass: targetStudent.avatarClass,
      avatarText: targetStudent.avatarText,
      course: targetStudent.course,
      courseCode: targetStudent.courseCode,
      issuedAt: new Date().toLocaleDateString('vi-VN') + ' 10:30',
      status: 'valid' as const,
      statusName: 'Active',
      template: issueTemplate,
      pdfStatus: 'Available',
      note: issueNote
    };

    setCerts([newCert, ...certs]);
    setEligibles(eligibles.filter(el => el.name !== issueStudentName));
    setIsIssueOpen(false);
    alert(`Successfully issued certificate ${issueCertId} to student ${issueStudentName}!`);
  };

  // Open Revoke Modal
  const handleOpenRevoke = (cert: CertificateItem) => {
    setRevokeTarget(cert);
    setRevokeReason('Vi phạm quy định');
    setRevokeNote('');
    setRevokeConfirm(false);
    setIsRevokeOpen(true);
  };

  const handleConfirmRevoke = () => {
    if (!revokeTarget || !revokeConfirm) return;

    setCerts(prev => prev.map(c => {
      if (c.id === revokeTarget.id) {
        return {
          ...c,
          status: 'revoked' as const,
          statusName: 'Revoked',
          pdfStatus: 'Unavailable',
          revokedReason: revokeReason,
          revokedNote: revokeNote,
          revokedAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5),
          revokedBy: 'Admin User'
        };
      }
      return c;
    }));

    setIsRevokeOpen(false);
    setDrawerCert(null);
    alert(`Successfully revoked certificate ${revokeTarget.id} of student ${revokeTarget.name}.`);
  };

  const handleCopyVerifyUrl = (id: string) => {
    navigator.clipboard.writeText(`https://blueprint.vn/verify?id=${id}`).then(() => {
      alert("Copied public verification link to clipboard!");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      <style>{`
        /* Certificate specific styling */
        .quick-link-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-passive);
          color: var(--text-primary);
          text-decoration: none;
          font-size: 12px;
          transition: padding-left var(--transition-fast);
        }
        .quick-link-item:last-child {
          border-bottom: none;
        }
        .quick-link-item:hover {
          padding-left: 4px;
          color: var(--text-primary);
        }
        
        .pdf-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #ef4444;
          text-decoration: none;
          font-weight: 500;
        }
        .pdf-link:hover {
          text-decoration: underline;
        }
    
        /* Modal field layout styling */
        .form-group label {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 11px;
          margin-bottom: 4px;
          display: block;
        }
      `}</style>
      <PageHeader
        title="Quản lý chứng chỉ"
        subtitle="Cấp phát, xác thực, tải xuống và theo dõi lịch sử chứng chỉ của học viên."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              onClick={handleExportCertificates}
              className="btn-black h-[34px] px-3 flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </>
        }
      />

      {/* Metric Cards Grid */}
      <section className="kpi-row-1 kpi-row-cols-4" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Tổng đã cấp</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{totalIssued.toLocaleString('vi-VN')}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}><ArrowUpRight size={11} />+14%</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>tổng số chứng nhận</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Đang hoạt động</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-green)' }}>{totalValid.toLocaleString('vi-VN')}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}><ArrowUpRight size={11} />+98</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>chứng chỉ hợp lệ</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Đã thu hồi</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-red)' }}>{totalRevoked.toLocaleString('vi-VN')}</span>
            <span className="badge badge-red" style={{ fontSize: '9.5px', padding: '2px 4px' }}>Revoked</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>do hủy/gian lận</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Học viên đủ điều kiện</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{totalEligible}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '6px' }}>chờ cấp chứng nhận</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>đáp ứng quy tắc</span>
        </div>
      </section>

      {/* Filter and Content Lists */}
      <section className="dashboard-stack" id="certs-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
        
        {/* Filter Panel */}
        <div className="panel" style={{ padding: '14px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              
              {/* Search bar */}
              <div className="search-input-wrapper" style={{ position: 'relative', flex: '2', minWidth: '200px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Tìm học viên, email, mã chứng chỉ..."
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
              {(courseFilter || statusFilter || searchQuery) && (
                <button
                  onClick={() => {
                    setCourseFilter('');
                    setStatusFilter('');
                    setSearchQuery('');
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
                <div className="form-group" style={{ marginBottom: 0, minWidth: '180px' }}>
                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="form-control form-select"
                    style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                  >
                    <option value="">Tất cả khóa học</option>
                    <option value="ai">AI Agent & Vibe Coding Bootcamp</option>
                    <option value="n8n">Web Automation n8n nâng cao</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-control form-select"
                    style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                  >
                    <option value="">Tất cả trạng thái</option>
                    <option value="valid">Đang hoạt động</option>
                    <option value="revoked">Đã thu hồi</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TOP PANEL: Học viên đủ điều kiện cấp (Eligible students - Main) */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <h2 className="panel-title">Học viên đủ điều kiện cấp chứng chỉ</h2>
              <span className="panel-subtitle" id="eligible-count-label">{filteredEligibles.length} học viên</span>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Feature to view all eligible is coming soon..."); }} className="panel-header-link" id="view-all-eligible-btn">Xem tất cả</a>
          </div>

          <div className="table-container">
            <table id="eligible-table">
              <thead>
                <tr>
                  <th>Học viên</th>
                  <th>Khóa học</th>
                  <th style={{ textAlign: 'center' }}>Tiến trình</th>
                  <th style={{ textAlign: 'center' }}>Final Project</th>
                  <th>Ngày hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {filteredEligibles.map((student, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="col-student">
                        <div className="flex flex-col">
                          <span className="student-name">{student.name}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{student.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{student.course}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="badge badge-green" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>{student.progress}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="badge badge-green" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>{student.finalProject}</span>
                    </td>
                    <td>{student.completedAt}</td>
                  </tr>
                ))}
                {filteredEligibles.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      Tất cả học viên đủ điều kiện đã được cấp chứng chỉ.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginator */}
          <div className="pagination-container">
            <span id="eligible-pagination-label">Hiển thị 1 - {filteredEligibles.length} trong {filteredEligibles.length} học viên</span>
            <div className="pagination-pages">
              <button className="page-btn" disabled><ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn" disabled><ChevronRight size={14} /></button>
            </div>
            <select className="page-select-dropdown">
              <option>10 / trang</option>
            </select>
          </div>
        </div>

        {/* BOTTOM PANEL: Danh sách chứng chỉ đã cấp (Issued certificates - Secondary) */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <h2 className="panel-title">Danh sách chứng chỉ đã cấp</h2>
              <span className="panel-subtitle" id="certs-count-label">{filteredCerts.length} chứng chỉ</span>
            </div>
          </div>
          
          <div className="table-container">
            <table id="certs-table">
              <thead>
                <tr>
                  <th>Học viên</th>
                  <th>Khóa học</th>
                  <th>Mã chứng chỉ</th>
                  <th>Trạng thái</th>
                  <th>Ngày cấp</th>
                  <th style={{ textAlign: 'center' }}>File PDF</th>
                  <th>Mẫu thiết kế</th>
                  <th style={{ textAlign: 'right', paddingRight: '20px' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.map((cert) => (
                  <tr 
                    key={cert.id}
                    onClick={() => setDrawerCert(cert)}
                    className={drawerCertId === cert.id ? 'selected-row' : ''}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div className="col-student">
                        <div className="flex flex-col">
                          <span className="student-name">{cert.name}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{cert.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{cert.course}</td>
                    <td><span className="cert-id" style={{ fontSize: '12px', fontWeight: 600 }}>{cert.id}</span></td>
                    <td>
                      <span className={`badge ${cert.status === 'valid' ? 'badge-green' : 'badge-red'}`}>{cert.statusName}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{cert.issuedAt}</td>
                    <td style={{ textAlign: 'center' }}>
                      {cert.status === 'valid' ? (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="pdf-link"
                        >
                          <FileCheck size={14} style={{ color: '#ef4444' }} />
                          <span>PDF</span>
                        </a>
                      ) : (
                        <span style={{ color: '#d1d5db' }}>—</span>
                      )}
                    </td>
                    <td>{cert.template}</td>
                    <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDrawerCert(cert);
                          }}
                          className="btn-secondary py-1 px-3 text-[11px] h-6.5"
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Tải bản in chất lượng cao cho chứng nhận ${cert.id}...`);
                          }}
                          className="btn-secondary py-1 px-2.5 h-6.5"
                          disabled={cert.status !== 'valid'}
                          style={cert.status !== 'valid' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                        >
                          Tải PDF
                        </button>
                        {cert.status === 'valid' ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenRevoke(cert);
                            }}
                            className="btn-small text-[10.5px] py-1 px-2.5 text-[var(--color-red)] h-6.5"
                          >
                            Thu hồi
                          </button>
                        ) : (
                          <span className="text-[10.5px] text-gray-400 italic font-semibold px-2">Revoked</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginator */}
          <div className="pagination-container">
            <span id="certs-pagination-label">Hiển thị 1 - {filteredCerts.length} trong {filteredCerts.length} chứng chỉ</span>
            <div className="pagination-pages">
              <button className="page-btn" disabled><ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn" disabled><ChevronRight size={14} /></button>
            </div>
            <select className="page-select-dropdown">
              <option>10 / trang</option>
            </select>
          </div>
        </div>

        {/* ACCESSORY INFO ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Panel 1: Tools & Quick Links */}
          <div className="panel" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="panel-header" style={{ marginBottom: '8px', borderBottom: '1px solid var(--border-passive)', paddingBottom: '8px' }}>
              <h2 className="panel-title" style={{ fontSize: '13.5px' }}>Công cụ & Quick links</h2>
            </div>
            
            <a
              href="#tool-verify"
              onClick={(e) => { e.preventDefault(); alert("Tính năng Kiểm tra chứng chỉ công khai đang được phát triển..."); }}
              className="quick-link-item"
              id="tool-verify"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14.5} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: '12px' }}>Kiểm tra chứng chỉ công khai</span>
              </div>
              <ChevronRight size={14} style={{ color: '#c4c1b5' }} />
            </a>
            
            <a
              href="certificate-templates"
              onClick={(e) => { e.preventDefault(); onNavigate('Templates'); }}
              className="quick-link-item"
              id="tool-templates"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layout size={14.5} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: '12px' }}>Quản lý mẫu chứng chỉ</span>
              </div>
              <ChevronRight size={14} style={{ color: '#c4c1b5' }} />
            </a>

            <a
              href="#tool-rules"
              onClick={(e) => { e.preventDefault(); alert("Tính năng Cài đặt mặc định và quy tắc đang được phát triển..."); }}
              className="quick-link-item"
              id="tool-rules"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={14.5} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: '12px' }}>Cài đặt mặc định và quy tắc</span>
              </div>
              <ChevronRight size={14} style={{ color: '#c4c1b5' }} />
            </a>
          </div>

          {/* Panel 2: Need Help Box */}
          <div className="panel" style={{ backgroundColor: 'var(--bg-app)', borderStyle: 'dashed', padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Cần hỗ trợ?</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Xem tài liệu hướng dẫn quy trình cấp phát, ký số bảo mật SHA-256 và cách thu hồi chứng chỉ học viên khi phát hiện vi phạm.
                </span>
              </div>
              <BookOpen size={24} style={{ color: 'var(--text-secondary)', opacity: 0.6, flexShrink: 0, marginTop: '2px' }} />
            </div>
            <button
              onClick={() => alert("Loading documentation guide...")}
              className="btn-secondary"
              id="help-docs-btn"
              style={{ marginTop: '14px', width: '100%', fontSize: '12px', height: '32px', justifyContent: 'center' }}
            >
              <span>Xem hướng dẫn</span>
            </button>
          </div>
        </div>
      </section>

      {/* ISSUE CERTIFICATE MODAL */}
      <AnimatePresence>
        {isIssueOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="modal-backdrop open"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="modal-content text-xs"
            >
              <div className="modal-header">
                <span className="modal-title font-heading font-semibold text-sm">Cấp chứng chỉ mới</span>
                <button onClick={() => setIsIssueOpen(false)} className="btn-icon-only">
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleConfirmIssue} className="modal-body space-y-4">
                <div className="form-group mb-0">
                  <label className="form-label">Chọn học viên đủ điều kiện <span className="required">*</span></label>
                  <select
                    value={issueStudentName}
                    onChange={(e) => {
                      const studentName = e.target.value;
                      setIssueStudentName(studentName);
                      const student = eligibles.find(el => el.name === studentName);
                      if (student) {
                        setIssueCourse(student.course);
                        setIssueCourseCode(student.courseCode);
                      }
                    }}
                    className="form-control form-select"
                    required
                  >
                    {eligibles.map((el, i) => (
                      <option key={i} value={el.name}>{el.name} ({el.email})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Khóa học</label>
                  <input
                    type="text"
                    value={issueCourse}
                    className="form-control bg-[var(--bg-app)] cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Mã chứng chỉ (Tự động sinh)</label>
                  <input
                    type="text"
                    value={issueCertId}
                    className="form-control font-mono font-bold bg-[var(--bg-app)] text-indigo-700"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group mb-0">
                    <label className="form-label">Ngày cấp</label>
                    <input type="date" className="form-control" defaultValue="2026-06-08" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Mẫu thiết kế (Template)</label>
                    <select
                      value={issueTemplate}
                      onChange={(e) => setIssueTemplate(e.target.value)}
                      className="form-control form-select"
                    >
                      <option value="Classic v1.2">Classic v1.2</option>
                      <option value="Minimal v1.0">Minimal v1.0</option>
                      <option value="Dark v1.0">Dark v1.0</option>
                    </select>
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Ghi chú nội bộ</label>
                  <textarea
                    value={issueNote}
                    onChange={(e) => setIssueNote(e.target.value)}
                    placeholder="Ghi chú thêm về xếp loại, Capstone score..."
                    className="form-control form-textarea h-16"
                  />
                </div>

                <div className="modal-footer pt-3 border-t border-[var(--border-passive)] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsIssueOpen(false)}
                    className="btn-secondary h-8 py-1.5 px-4"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="btn-black h-8 py-1.5 px-5"
                  >
                    Xác nhận cấp
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVOKE CERTIFICATE MODAL */}
      <AnimatePresence>
        {isRevokeOpen && revokeTarget && (
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
              style={{ maxWidth: '460px', borderTop: '4px solid var(--color-red)' }}
            >
              <div className="modal-header" style={{ paddingBottom: '12px' }}>
                <span className="modal-title font-heading font-semibold text-sm text-[var(--color-red)]">Xác nhận thu hồi chứng chỉ</span>
                <button onClick={() => setIsRevokeOpen(false)} className="btn-icon-only">
                  <X size={14} />
                </button>
              </div>

              <div className="modal-body space-y-4 pt-2">
                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '12px 14px', borderRadius: '8px', display: 'flex', gap: '10px' }}>
                  <AlertTriangle size={16} style={{ color: 'var(--color-red)', flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontWeight: 600, fontSize: '12px', color: 'var(--color-red)' }}>Cảnh báo hành động thu hồi</span>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      Hành động này sẽ hủy hiệu lực của chứng chỉ ngay lập tức. Trang tra cứu công khai sẽ hiển thị trạng thái "Đã thu hồi" và các chi tiết vi phạm.
                    </p>
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--bg-app)', borderRadius: '8px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--border-passive)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Học viên:</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12px' }}>{revokeTarget.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Mã chứng chỉ:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-red)', fontSize: '11.5px' }}>{revokeTarget.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Khóa học:</span>
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{revokeTarget.course}</span>
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label font-semibold" style={{ marginBottom: '6px' }}>Lý do thu hồi <span className="required">*</span></label>
                  <select
                    value={revokeReason}
                    onChange={(e) => setRevokeReason(e.target.value)}
                    className="form-control form-select"
                    style={{ height: '34px', fontSize: '12px' }}
                  >
                    <option value="Cấp nhầm">Cấp nhầm (Sai học viên / Sai khóa học)</option>
                    <option value="Thông tin sai">Thông tin sai (Sai tên, sai ngày cấp)</option>
                    <option value="Vi phạm quy định">Vi phạm quy định (Gian lận project / Bài nộp copy)</option>
                    <option value="Admin thao tác lỗi">Admin thao tác lỗi</option>
                    <option value="Khác">Lý do khác...</option>
                  </select>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label font-semibold" style={{ marginBottom: '6px' }}>Ghi chú chi tiết</label>
                  <textarea
                    value={revokeNote}
                    onChange={(e) => setRevokeNote(e.target.value)}
                    placeholder="Viết chi tiết lý do (sẽ hiển thị ở trang tra cứu công khai sau khi thu hồi ví dụ: Bài tập tuần 5 sao chép...)"
                    className="form-control form-textarea h-20"
                    style={{ padding: '8px 10px', fontSize: '12px' }}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', userSelect: 'none', marginTop: '6px' }}>
                  <input
                    type="checkbox"
                    checked={revokeConfirm}
                    onChange={(e) => setRevokeConfirm(e.target.checked)}
                    className="accent-red-600"
                    style={{ marginTop: '3px', accentColor: 'var(--color-red)' }}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    Tôi xác nhận muốn thu hồi chứng chỉ này và đồng ý kết chuyển trạng thái hủy trên Blockchain/Ledger.
                  </span>
                </label>
              </div>

              <div className="modal-footer pt-3 border-t border-[var(--border-passive)] flex justify-end gap-2" style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsRevokeOpen(false)}
                  className="btn-secondary h-8 py-1.5 px-4"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRevoke}
                  disabled={!revokeConfirm}
                  style={!revokeConfirm ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  className="btn-danger h-8 py-1.5 px-5 font-semibold"
                >
                  Thu hồi chứng chỉ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAIL SIDE-DRAWER */}
      <div className={`detail-drawer ${drawerCertId ? '' : 'drawer-closed'}`} id="cert-detail-drawer">
        <div className="drawer-header">
          <h3 className="drawer-title">Chi tiết chứng chỉ</h3>
          <button onClick={() => setDrawerCert(null)} className="drawer-close-btn" id="close-detail-drawer-btn"><X size={14} /></button>
        </div>
        
        {drawerCert && (
          <div className="drawer-body" style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Status Box */}
            <div id="drawer-status-box" style={{
              padding: '12px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 600,
              backgroundColor: drawerCert.status === 'valid' ? 'rgba(22, 163, 74, 0.05)' : 'rgba(239, 68, 68, 0.05)',
              color: drawerCert.status === 'valid' ? 'var(--color-green)' : 'var(--color-red)',
              border: drawerCert.status === 'valid' ? '1px solid rgba(22, 163, 74, 0.1)' : '1px solid rgba(239, 68, 68, 0.1)'
            }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase' }}>Trạng thái</span>
              <span id="drawer-status-badge" className={`badge ${drawerCert.status === 'valid' ? 'badge-green' : 'badge-red'}`}>{drawerCert.statusName}</span>
            </div>

            {/* Section: Student info */}
            <div className="drawer-section">
              <span className="drawer-section-title">Thông tin học viên</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'var(--bg-app)', padding: '10px', borderRadius: '6px' }}>
                <div className={`avatar ${drawerCert.avatarClass}`} id="drawer-student-avatar" style={{ width: '32px', height: '32px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  {drawerCert.avatarText}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span id="drawer-student-name" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{drawerCert.name}</span>
                  <span id="drawer-student-email" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{drawerCert.email}</span>
                </div>
              </div>
            </div>

            {/* Section: Course info */}
            <div className="drawer-section">
              <span className="drawer-section-title">Khóa học</span>
              <div style={{ padding: '10px', border: '1px solid var(--border-passive)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span id="drawer-course-title" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{drawerCert.course}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Blueprint Academy Course</span>
              </div>
            </div>

            {/* Section: Certificate details */}
            <div className="drawer-section">
              <span className="drawer-section-title">Thông tin chứng chỉ</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-passive)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Mã chứng chỉ:</span>
                  <span id="drawer-cert-code" style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{drawerCert.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-passive)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Ngày cấp:</span>
                  <span id="drawer-issued-date" style={{ color: 'var(--text-primary)' }}>{drawerCert.issuedAt}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-passive)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Mẫu thiết kế:</span>
                  <span id="drawer-template-version" style={{ color: 'var(--text-primary)' }}>{drawerCert.template}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-passive)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Cấp bởi:</span>
                  <span style={{ color: 'var(--text-primary)' }}>Admin User (Mã: ADM-001)</span>
                </div>
                {drawerCert.status === 'revoked' && (
                  <div id="drawer-revocation-row" style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px dashed var(--border-passive)', paddingBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-red)', fontWeight: 600 }}>Lý do thu hồi:</span>
                      <span id="drawer-revoked-reason" style={{ color: 'var(--color-red)', fontWeight: 600 }}>{drawerCert.revokedReason}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', backgroundColor: 'var(--color-red-light)', padding: '6px', borderRadius: '4px', marginTop: '4px', border: '1px solid var(--color-red-light)' }} id="drawer-revoked-note">
                      {drawerCert.revokedNote}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section: Verification */}
            <div className="drawer-section">
              <span className="drawer-section-title">Xác thực công khai</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'var(--bg-app)', padding: '8px', borderRadius: '6px' }}>
                  <div className="w-9 h-9 bg-white border border-[var(--border-passive)] p-0.5 rounded flex items-center justify-center shrink-0">
                    <div className="w-7 h-7 border border-black flex flex-wrap p-0.5 justify-between">
                      <div className="w-2.5 h-2.5 bg-black"></div><div className="w-2.5 h-2.5 bg-black"></div>
                      <div className="w-2.5 h-2.5 bg-black"></div><div className="w-2.5 h-2.5 border border-black"></div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} id="drawer-verify-url">
                      https://blueprint.vn/verify?id={drawerCert.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyVerifyUrl(drawerCert.id)}
                      style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--text-primary)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Copy size={10} />
                      <span>Sao chép link xác thực</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="drawer-actions" style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-passive)' }}>
              <button
                onClick={() => alert(`Đang in tệp PDF chứng chỉ: ${drawerCert.id}...`)}
                disabled={drawerCert.status !== 'valid'}
                className="btn-black"
                style={{ flex: 1, fontSize: '11.5px', height: '32px', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '6px', opacity: drawerCert.status !== 'valid' ? 0.5 : 1, cursor: drawerCert.status !== 'valid' ? 'not-allowed' : 'pointer' }}
              >
                <Download size={13} />
                <span>Tải file PDF</span>
              </button>
              <button
                onClick={() => handleOpenRevoke(drawerCert)}
                disabled={drawerCert.status !== 'valid'}
                className="btn-secondary"
                style={{ flex: 1, fontSize: '11.5px', height: '32px', color: 'var(--color-red)', borderColor: 'var(--border-passive)', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '6px', opacity: drawerCert.status !== 'valid' ? 0.5 : 1, cursor: drawerCert.status !== 'valid' ? 'not-allowed' : 'pointer' }}
              >
                <AlertOctagon size={13} />
                <span>Thu hồi</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
