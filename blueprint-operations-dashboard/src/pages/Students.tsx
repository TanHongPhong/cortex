/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Download,
  Plus,
  Eye,
  MoreVertical,
  X,
  Copy,
  Lock,
  Unlock,
  MessageSquare,
  Save,
  Check,
  ChevronLeft,
  ChevronRight,
  Book,
  User,
  Activity,
  FileText,
  Award,
  Wallet,
  Calendar
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Student } from '../types';

interface StudentsProps {
  onNavigate: (tab: string, params?: any) => void;
  students: Student[];
  onUpdateStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  selectedStudentId?: string;
  onToggleSidebar?: () => void;
}

/**
 * Students page handles CRM operations, wallet ledger auditing, and individual profile tabs.
 */
export default function Students({ onNavigate, students, onUpdateStudents, selectedStudentId, onToggleSidebar }: StudentsProps) {
  // Synchronize active student drawer state with URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const drawerOpenId = searchParams.get('studentId');
  const setDrawerOpenId = (id: string | null) => {
    setSearchParams(prev => {
      if (id) {
        prev.set('studentId', id);
      } else {
        prev.delete('studentId');
      }
      return prev;
    }, { replace: true });
  };
  const [activeDrawerTab, setActiveDrawerTab] = useState<'tong-quan' | 'tien-do' | 'bai-nop' | 'chung-chi' | 'so-du' | 'ghi-chu'>('tong-quan');

  // Search and batch selection
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Create Student Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('AI Agent & Vibe Coding Bootcamp');
  const [newStudentStatus, setNewStudentStatus] = useState<'Active' | 'Blocked'>('Active');

  const [lastSelectedStudent, setLastSelectedStudent] = useState<Student | null>(null);
  const activeStudent = students.find(s => s.id === drawerOpenId) || lastSelectedStudent;

  React.useEffect(() => {
    const found = students.find(s => s.id === drawerOpenId);
    if (found) {
      setLastSelectedStudent(found);
    }
  }, [drawerOpenId, students]);

  // Statistics
  const totalCount = students.length;
  const activeCount = students.filter(s => s.status === 'Active').length;
  const blockedCount = students.filter(s => s.status === 'Blocked').length;
  const completedCount = students.filter(s => s.status === 'Completed').length;

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.phone.includes(searchQuery)
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredStudents.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(x => x !== id));
    }
  };

  // Lock / Unlock Student Account
  const handleToggleLock = (studentId: string) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        const nextStatus = s.status === 'Blocked' ? 'Active' as const : 'Blocked' as const;
        const nextClass = nextStatus === 'Active' ? 'badge-green' : 'badge-red';
        return { ...s, status: nextStatus, statusClass: nextClass, updatedAt: new Date().toLocaleDateString('vi-VN') };
      }
      return s;
    });
    onUpdateStudents(updated);
    alert(`Đã thay đổi trạng thái tài khoản cho học viên.`);
  };

  // Reset Wallet balance and append log
  const handleResetBalance = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student || (student.accountBalance || 0) === 0) return;

    if (confirm(`Bạn có chắc chắn muốn tất toán số dư ${student.accountBalance?.toLocaleString('vi-VN')}đ của học viên ${student.name} về 0đ?`)) {
      const refundAmt = student.accountBalance || 0;
      const updated = students.map(s => {
        if (s.id === studentId) {
          const newLedger = [
            {
              id: `TX-RESET-${Math.floor(1000 + Math.random() * 9000)}`,
              type: "Debit (Tất toán)",
              amount: `-${refundAmt.toLocaleString('vi-VN')}đ`,
              desc: "Tất toán số dư offline (Admin thực hiện)",
              time: new Date().toLocaleString('vi-VN')
            },
            ...(s.ledgerTransactions || [])
          ];
          return { ...s, accountBalance: 0, ledgerTransactions: newLedger };
        }
        return s;
      });
      onUpdateStudents(updated);
      alert("Đã kết chuyển tất toán ví thành công!");
    }
  };

  const handleSaveNotes = (studentId: string, notesText: string) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        return { ...s, notes: notesText };
      }
      return s;
    });
    onUpdateStudents(updated);
    alert("Đã lưu ghi chú học viên thành công!");
  };

  const handleExportStudents = () => {
    // CSV Header
    const headers = ["ID", "Học viên", "Email", "Phone / Zalo", "Số khóa học", "Khóa hiện tại", "Tiến độ", "Trạng thái", "Ngày tạo"];
    
    // CSV Rows
    const rows = filteredStudents.map(s => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.phone.replace(/"/g, '""')}"`,
      s.courses.length,
      `"${s.needCourse.replace(/"/g, '""')}"`,
      `${s.courses[0]?.progress || 0}%`,
      s.status,
      s.createdAt
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
    link.setAttribute("download", `students_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Create Student
  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail || !newStudentPhone) {
      alert("Vui lòng nhập đầy đủ họ tên, email và số đthoại!");
      return;
    }

    const initials = newStudentName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    const newId = String(students.length + 1);

    const newStudent: Student = {
      id: newId,
      name: newStudentName,
      email: newStudentEmail,
      phone: newStudentPhone,
      status: newStudentStatus,
      statusClass: newStudentStatus === 'Active' ? 'badge-green' : 'badge-red',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toLocaleDateString('vi-VN'),
      avatar: initials,
      avatarClass: `avatar-${initials.toLowerCase().replace(/[^a-z]/g, 'a')}`,
      needCourse: newStudentCourse !== 'None' ? newStudentCourse : 'Chưa định hướng',
      needLevel: 'Chưa xác định',
      needGoal: 'Tự học với AI',
      needNote: 'Đăng ký thủ công từ dashboard admin.',
      courses: newStudentCourse !== 'None' ? [
        { name: newStudentCourse, status: newStudentStatus, statusClass: newStudentStatus === 'Active' ? 'badge-green' : 'badge-red', progress: 0, progressClass: 'gray', date: new Date().toLocaleDateString('vi-VN') }
      ] : [],
      lessons: '0 bài học',
      quiz: '—',
      time: '0 phút',
      exercises: '0 bài tập',
      submissions: [],
      certificates: [],
      notes: '',
      accountBalance: 0,
      ledgerTransactions: []
    };

    onUpdateStudents([newStudent, ...students]);
    setIsModalOpen(false);

    // Reset inputs
    setNewStudentName('');
    setNewStudentEmail('');
    setNewStudentPhone('');
    setNewStudentCourse('AI Agent & Vibe Coding Bootcamp');
    setNewStudentStatus('Active');

    alert(`Đã thêm thành công học viên mới "${newStudentName}"!`);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone).then(() => {
      alert(`Đã copy số điện thoại: ${phone}`);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        /* Specific styles for student management layout */
        .search-filter-row {
          background-color: var(--bg-card);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 10px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          gap: 16px;
        }
        
        .search-input-wrapper {
          position: relative;
          flex: 1;
          max-width: 320px;
        }
        
        .search-input-wrapper svg {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          width: 14px;
          height: 14px;
        }
        
        .search-input-wrapper input {
          padding-left: 32px;
        }
        
        /* Highlight cell details */
        .student-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .student-cell .avatar {
          width: 28px;
          height: 28px;
          font-size: 11px;
        }
        
        /* Details drawer */
        .drawer-profile-header {
          background-color: var(--bg-app);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }
        
        .drawer-profile-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
        }
        
        .drawer-profile-avatar:not([class*="avatar-"]) {
          background-color: #e2e8f0;
          color: var(--text-primary);
        }
        
        .drawer-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-passive);
          margin-top: 16px;
          margin-bottom: 12px;
          gap: 14px;
        }
        
        .drawer-tab {
          padding-bottom: 6px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all var(--transition-fast);
        }
        
        .drawer-tab.active {
          color: var(--text-primary);
          border-bottom-color: var(--text-primary);
          font-weight: 600;
        }
        
        .drawer-section {
          background-color: var(--bg-card);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 16px;
        }
        
        .drawer-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border-passive);
          padding-bottom: 6px;
        }
        
        .drawer-section-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .drawer-info-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .drawer-info-item {
          display: grid;
          grid-template-columns: 4fr 8fr;
          font-size: 12px;
          align-items: baseline;
        }
        
        .drawer-info-label {
          color: var(--text-secondary);
        }
        
        .drawer-info-value {
          color: var(--text-primary);
          font-weight: 500;
        }
        
        .drawer-footer-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 16px;
        }
        
        /* When the details drawer is open, hide some columns and let name, number of courses, status, created date, and actions display cleanly */
        #student-grid:not(.drawer-closed) .grid-col-left table th:nth-child(1),
        #student-grid:not(.drawer-closed) .grid-col-left table td:nth-child(1),
        #student-grid:not(.drawer-closed) .grid-col-left table th:nth-child(3),
        #student-grid:not(.drawer-closed) .grid-col-left table td:nth-child(3),
        #student-grid:not(.drawer-closed) .grid-col-left table th:nth-child(5),
        #student-grid:not(.drawer-closed) .grid-col-left table td:nth-child(5),
        #student-grid:not(.drawer-closed) .grid-col-left table th:nth-child(6),
        #student-grid:not(.drawer-closed) .grid-col-left table td:nth-child(6) {
          display: none !important;
        }
      `}</style>
      <PageHeader
        title="Quản lý học viên"
        subtitle="Theo dõi thông tin, tiến độ học và trạng thái học viên."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              onClick={handleExportStudents}
              className="btn-black h-8 px-3 flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </>
        }
      />

      {/* KPI GRID ROW (4 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-4" style={{ marginBottom: '20px' }}>
        {/* Card 1: Total Students */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Tổng học viên</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value">{totalCount}</span>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>Tất cả thời gian</span>
        </div>

        {/* Card 2: Active Students */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Học viên đang hoạt động</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value">{activeCount}</span>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>Học viên có ít nhất 1 khóa active</span>
        </div>

        {/* Card 3: Blocked Students */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Học viên bị khóa</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value" style={{ color: 'var(--color-red)' }}>{blockedCount}</span>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>Tài khoản bị khóa</span>
        </div>

        {/* Card 4: Completed Students */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Học viên hoàn thành</span>
          </div>
          <div className="kpi-value-container">
            <span className="kpi-value">{completedCount}</span>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>Đã kết khóa chương trình</span>
        </div>
      </section>

      {/* Main Container layout with Drawer collapse triggers */}
      <section 
        className={`dashboard-grid ${drawerOpenId ? '' : 'drawer-closed'}`} 
        id="student-grid" 
      >
        {/* LEFT COLUMN: Search & Table */}
        <div className="grid-col-left">
          <div className="panel">
            {/* Search & Filters */}
            <div className="search-filter-row">
              <div className="search-input-wrapper">
                <Search size={13} />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email hoặc số điện thoại..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                />
              </div>

              <button
                onClick={() => alert("Bộ lọc nâng cao...")}
                className="btn-secondary"
                style={{ fontSize: '11.5px', padding: '6px 12px' }}
              >
                <SlidersHorizontal size={12} style={{ marginRight: '4px' }} />
                <span>Bộ lọc</span>
                <ChevronDown size={11} style={{ marginLeft: '4px' }} />
              </button>
            </div>

            {/* Table container */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Học viên</th>
                    <th>Phone / Zalo</th>
                    <th style={{ textAlign: 'center', width: '70px' }}>Khóa học</th>
                    <th>Khóa hiện tại</th>
                    <th>Tiến độ</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th style={{ width: '80px', textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => {
                    const isSelected = selectedIds.includes(s.id);
                    return (
                      <tr
                        key={s.id}
                        onClick={() => setDrawerOpenId(s.id)}
                        className={drawerOpenId === s.id ? 'highlight-row' : ''}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span className="student-name" style={{ fontWeight: 600 }}>{s.name}</span>
                            <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{s.email}</span>
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>{s.phone}</td>
                        <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{s.courses.length}</td>
                        <td>{s.needCourse}</td>
                        <td>
                          <div className="progress-container">
                            <div className="progress-bar-track">
                              <div
                                className={`progress-bar-fill ${
                                  (s.courses[0]?.progress || 0) >= 70 ? 'green' : 'orange'
                                }`}
                                style={{ width: `${s.courses[0]?.progress || 0}%` }}
                              ></div>
                            </div>
                            <span className="progress-value">{s.courses[0]?.progress || 0}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${s.statusClass}`}>{s.status}</span>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>{s.createdAt}</td>
                        <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'inline-flex', gap: '4px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => setDrawerOpenId(s.id)}
                              className="btn-icon-only view-details-btn"
                              title="Xem chi tiết"
                            >
                              <Eye size={12} />
                            </button>
                            <button
                              onClick={() => handleToggleLock(s.id)}
                              className="btn-icon-only"
                              title={s.status === 'Blocked' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                            >
                              {s.status === 'Blocked' ? <Unlock size={12} /> : <Lock size={12} />}
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
              <span id="pagination-label">Hiển thị 1 - {filteredStudents.length} trong {filteredStudents.length} học viên</span>
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

        {/* RIGHT COLUMN: Student Details Drawer */}
        <div className="grid-col-right">
          {activeStudent && (
            <div className="panel" style={{ position: 'sticky', top: '16px' }}>
              <div className="panel-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '14px' }}>
                <h2 className="panel-title">Chi tiết học viên</h2>
                <button className="btn-icon-only" onClick={() => setDrawerOpenId(null)} title="Đóng"><X size={14} /></button>
              </div>
              
              {/* Profile Overview Header */}
              <div className="drawer-profile-header">
                <div className={`drawer-profile-avatar ${activeStudent.avatarClass}`}>{activeStudent.avatar}</div>
                <div className="student-profile-info">
                  <div className="student-profile-name">{activeStudent.name}</div>
                  <div className="student-profile-email">{activeStudent.email}</div>
                  <div className="student-profile-meta">
                    <span>{activeStudent.phone}</span>
                    <button className="copy-btn" onClick={() => handleCopyPhone(activeStudent.phone)} title="Copy"><Copy size={11} /></button>
                  </div>
                </div>
                <span className={`badge ${activeStudent.statusClass}`} style={{ position: 'absolute', right: '16px', top: '16px' }}>{activeStudent.status}</span>
              </div>
              
              {/* Drawer Tabs */}
              <div className="drawer-tabs">
                {[
                  { id: 'tong-quan' as const, label: 'Tổng quan' },
                  { id: 'tien-do' as const, label: 'Tiến độ' },
                  { id: 'bai-nop' as const, label: 'Bài nộp' },
                  { id: 'chung-chi' as const, label: 'Chứng chỉ' },
                  { id: 'so-du' as const, label: 'Số dư & Giao dịch' },
                  { id: 'ghi-chu' as const, label: 'Ghi chú' }
                ].map(dTab => (
                  <span
                    key={dTab.id}
                    onClick={() => setActiveDrawerTab(dTab.id)}
                    className={`drawer-tab ${activeDrawerTab === dTab.id ? 'active' : ''}`}
                  >
                    {dTab.label}
                  </span>
                ))}
              </div>

              {/* Drawer Tab Content Wrapper */}
              <div style={{ padding: '12px 0' }}>
                {/* Tab 1: Tổng quan */}
                {activeDrawerTab === 'tong-quan' && (
                  <div className="tab-pane active">
                    <div className="drawer-section">
                      <div className="drawer-section-header">
                        <span className="drawer-section-title">Thông tin tài khoản</span>
                      </div>
                      <div className="drawer-info-grid">
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Điện thoại / Zalo:</span>
                          <span className="drawer-info-value">{activeStudent.phone}</span>
                        </div>
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Trạng thái:</span>
                          <span className="drawer-info-value"><span className={`badge ${activeStudent.statusClass}`}>{activeStudent.status}</span></span>
                        </div>
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Khóa hiện tại:</span>
                          <span className="drawer-info-value">{activeStudent.needCourse}</span>
                        </div>
                      </div>
                    </div>

                    <div className="drawer-section">
                      <div className="drawer-section-header">
                        <span className="drawer-section-title">Nhu cầu & Định hướng</span>
                      </div>
                      <div className="drawer-info-grid">
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Trình độ đầu vào:</span>
                          <span className="drawer-info-value">{activeStudent.needLevel}</span>
                        </div>
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Mục tiêu học:</span>
                          <span className="drawer-info-value">{activeStudent.needGoal}</span>
                        </div>
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Ghi chú nhu cầu:</span>
                          <span className="drawer-info-value" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>{activeStudent.needNote}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Tiến độ */}
                {activeDrawerTab === 'tien-do' && (
                  <div className="tab-pane active">
                    <div className="drawer-section">
                      <div className="drawer-section-header">
                        <span className="drawer-section-title">Chi tiết học tập</span>
                      </div>
                      <div className="drawer-info-grid">
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Bài học đã học:</span>
                          <span className="drawer-info-value">{activeStudent.lessons}</span>
                        </div>
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Điểm Quiz TB:</span>
                          <span className="drawer-info-value" style={{ color: 'var(--color-indigo)', fontWeight: 'bold' }}>{activeStudent.quiz}</span>
                        </div>
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Thời gian tự học:</span>
                          <span className="drawer-info-value">{activeStudent.time}</span>
                        </div>
                        <div className="drawer-info-item">
                          <span className="drawer-info-label">Project hoàn thành:</span>
                          <span className="drawer-info-value">{activeStudent.exercises}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Bài nộp */}
                {activeDrawerTab === 'bai-nop' && (
                  <div className="tab-pane active">
                    <div className="drawer-section">
                      <div className="drawer-section-header">
                        <span className="drawer-section-title">Bài tập & Project đã nộp</span>
                      </div>
                      {activeStudent.submissions && activeStudent.submissions.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {activeStudent.submissions.map((sub, sIdx) => (
                            <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-passive)', paddingBottom: '8px' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span style={{ fontWeight: 600, fontSize: '12px' }}>{sub.exercise}</span>
                                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Ngày nộp: {sub.date}</span>
                              </div>
                              <span className={`badge ${sub.statusClass}`}>{sub.status}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-secondary)', padding: '16px 0' }}>Không có lịch sử nộp bài.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 4: Chứng chỉ */}
                {activeDrawerTab === 'chung-chi' && (
                  <div className="tab-pane active">
                    <div className="drawer-section">
                      <div className="drawer-section-header">
                        <span className="drawer-section-title">Chứng chỉ đã cấp</span>
                      </div>
                      {activeStudent.certificates && activeStudent.certificates.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {activeStudent.certificates.map((cert, cIdx) => (
                            <div key={cIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px solid var(--border-passive)', paddingBottom: '8px' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span style={{ fontWeight: 600, fontSize: '12px' }}>{cert.name}</span>
                                <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{cert.code}</span>
                              </div>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Ngày cấp: {cert.date}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-secondary)', padding: '16px 0' }}>Học viên chưa được cấp chứng chỉ nào.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 5: Số dư & Giao dịch */}
                {activeDrawerTab === 'so-du' && (
                  <div className="tab-pane active">
                    <div className="drawer-section">
                      <div className="drawer-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="drawer-section-title">Ví học tập nội bộ</span>
                        <button
                          onClick={() => handleResetBalance(activeStudent.id)}
                          className="btn-red-outline"
                          style={{ padding: '3px 8px', fontSize: '10.5px' }}
                        >
                          Tất toán ví
                        </button>
                      </div>
                      <div className="drawer-info-grid">
                        <div className="drawer-info-item" style={{ gridTemplateColumns: '5fr 7fr' }}>
                          <span className="drawer-info-label">Số dư hiện tại:</span>
                          <span className="drawer-info-value" style={{ fontSize: '14px', color: 'var(--color-green)', fontWeight: 'bold' }}>
                            {(activeStudent.accountBalance || 0).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="drawer-section">
                      <div className="drawer-section-header">
                        <span className="drawer-section-title">Lịch sử giao dịch ví</span>
                      </div>
                      {activeStudent.ledgerTransactions && activeStudent.ledgerTransactions.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
                          {activeStudent.ledgerTransactions.map((tx, tIdx) => (
                            <div key={tIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px solid var(--border-passive)', paddingBottom: '6px' }}>
                              <div>
                                <span style={{ fontWeight: 600, fontSize: '11.5px', display: 'block' }}>{tx.type} • <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'normal', color: 'var(--text-secondary)' }}>{tx.id}</span></span>
                                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{tx.desc}</span>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontWeight: 600, color: tx.amount.startsWith('+') ? 'var(--color-green)' : 'var(--color-red)', fontSize: '11.5px' }}>{tx.amount}</span>
                                <span style={{ fontSize: '9.5px', color: 'var(--text-secondary)', display: 'block' }}>{tx.time.split(' ')[0]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-secondary)', padding: '16px 0' }}>Không có lịch sử giao dịch ví.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 6: Ghi chú */}
                {activeDrawerTab === 'ghi-chu' && (
                  <div className="tab-pane active">
                    <div className="drawer-section">
                      <div className="drawer-section-header">
                        <span className="drawer-section-title">Ghi chú vận hành hệ thống</span>
                      </div>
                      <textarea
                        id="interior-note-area"
                        defaultValue={activeStudent.notes}
                        placeholder="Nhập các thông tin ghi chú nội bộ về học viên..."
                        className="form-control form-textarea"
                        style={{ height: '100px', fontSize: '12px' }}
                      />
                      <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <button
                          onClick={() => {
                            const val = (document.getElementById('interior-note-area') as HTMLTextAreaElement)?.value || '';
                            handleSaveNotes(activeStudent.id, val);
                          }}
                          className="btn-black"
                          style={{ fontSize: '11px', padding: '4px 12px' }}
                        >
                          Lưu ghi chú
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="drawer-footer-actions">
                <button
                  onClick={() => alert(`Kết nối hỗ trợ trực tiếp với học viên ${activeStudent.name}`)}
                  className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <MessageSquare size={13} />
                  <span>Send Message</span>
                </button>
                <button
                  onClick={() => {
                    const nt = (document.getElementById('interior-note-area') as HTMLTextAreaElement)?.value || activeStudent.notes;
                    handleSaveNotes(activeStudent.id, nt);
                  }}
                  className="btn-black"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Save size={13} />
                  <span>Save Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CREATE STUDENT MODAL (Standard Backdrop widget) */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="modal-content"
            >
              <div className="modal-header">
                <span className="modal-title font-heading font-semibold text-sm">Add New Student</span>
                <button onClick={() => setIsModalOpen(false)} className="btn-icon-only">
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleCreateStudent} className="modal-body space-y-4 text-xs">
                <div className="form-group mb-0">
                  <label className="form-label">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nguyễn Văn Hải"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Email <span className="required">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="hai@gmail.com"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Phone / Zalo <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0912345678"
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Linked Course <span className="required">*</span></label>
                  <select
                    value={newStudentCourse}
                    onChange={(e) => setNewStudentCourse(e.target.value)}
                    className="form-control form-select"
                  >
                    <option value="Solidity & Smart Contract Auditing">Solidity & Smart Contract Auditing</option>
                    <option value="Advanced Web3 Frontend Development">Advanced Web3 Frontend Development</option>
                    <option value="Solidity Development Basics">Solidity Development Basics</option>
                  </select>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Status</label>
                  <select
                    value={newStudentStatus}
                    onChange={(e) => setNewStudentStatus(e.target.value as any)}
                    className="form-control form-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>

                <div className="modal-footer pt-3 border-t border-[var(--border-passive)] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-black"
                  >
                    Save Student
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
