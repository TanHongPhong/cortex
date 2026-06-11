/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  RotateCcw,
  ArrowRight,
  SlidersHorizontal,
  KeyRound,
  Lock,
  Unlock,
  X,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  ArrowLeft,
  Users,
  Shield,
  GraduationCap,
  Info
} from 'lucide-react';
import { Course } from '../types';
import PageHeader from './PageHeader';

interface SystemUser {
  name: string;
  email: string;
  role: 'admin' | 'instructor';
  status: 'active' | 'blocked';
  phone: string;
  courses: string;
  permissions: string[];
  lastLogin: string;
  avatar: string;
  avatarClass: string;
}

interface SystemUsersProps {
  courses: Course[];
  onNavigate: (tab: string, params?: any) => void;
  onToggleSidebar?: () => void;
}

export default function SystemUsers({ courses, onNavigate, onToggleSidebar }: SystemUsersProps) {
  // Master users list state matching mockup data
  const [users, setUsers] = useState<SystemUser[]>([
    {
      name: 'Nguyễn Minh Anh',
      email: 'admin@blueprint.vn',
      role: 'admin',
      status: 'active',
      phone: '0901 112 233',
      courses: 'All system',
      permissions: ['Full admin'],
      lastLogin: 'Today 09:12',
      avatar: 'NM',
      avatarClass: 'avatar-nv'
    },
    {
      name: 'Trần Hoài Nam',
      email: 'ops@blueprint.vn',
      role: 'admin',
      status: 'active',
      phone: '0902 556 677',
      courses: 'All system',
      permissions: ['Operations', 'Finance', 'Audit'],
      lastLogin: 'Yesterday',
      avatar: 'TN',
      avatarClass: 'avatar-tt'
    },
    {
      name: 'Lê Quang Huy',
      email: 'huy.instructor@blueprint.vn',
      role: 'instructor',
      status: 'active',
      phone: '0912 345 678',
      courses: 'AI Agent Bootcamp',
      permissions: ['Review', 'Progress', 'Content edit'],
      lastLogin: 'Today 08:45',
      avatar: 'LH',
      avatarClass: 'avatar-lm'
    },
    {
      name: 'Phạm Thu Hà',
      email: 'ha.instructor@blueprint.vn',
      role: 'instructor',
      status: 'active',
      phone: '0938 200 101',
      courses: 'Prompt Starter',
      permissions: ['Review', 'Progress'],
      lastLogin: 'Jun 6, 2026',
      avatar: 'PH',
      avatarClass: 'avatar-ph'
    },
    {
      name: 'Đỗ Gia Bảo',
      email: 'bao.instructor@blueprint.vn',
      role: 'instructor',
      status: 'blocked',
      phone: '0919 998 887',
      courses: 'No active course',
      permissions: ['Paused'],
      lastLogin: 'May 28, 2026',
      avatar: 'DB',
      avatarClass: 'avatar-vt'
    },
    {
      name: 'Vũ Thanh Linh',
      email: 'linh.instructor@blueprint.vn',
      role: 'instructor',
      status: 'active',
      phone: '0922 880 991',
      courses: 'n8n Automation',
      permissions: ['Review', 'Content edit'],
      lastLogin: 'Jun 5, 2026',
      avatar: 'VL',
      avatarClass: 'avatar-ml'
    }
  ]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'instructor'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStatus, setNewStatus] = useState<'active' | 'blocked'>('active');
  const [newRole, setNewRole] = useState<'admin' | 'instructor' | ''>('');
  const [tempPassword, setTempPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Instructor Section allocation
  const [assignedCourseCode, setAssignedCourseCode] = useState('');
  const [permView, setPermView] = useState(true);
  const [permSubmissions, setPermSubmissions] = useState(true);
  const [permProgress, setPermProgress] = useState(true);
  const [permContentEdit, setPermContentEdit] = useState(false);

  // Email existence checking helper
  const isEmailTaken = users.some(u => u.email.toLowerCase() === newEmail.trim().toLowerCase());

  // Descriptions for Roles
  const roleDescriptions = {
    admin: '<strong>Admin:</strong> Toàn quyền vận hành hệ thống, bao gồm tài chính, học viên, chứng chỉ, announcement, audit và phân quyền.',
    instructor: '<strong>Instructor:</strong> Xử lý khóa được phân công. Quyền content edit chỉ bật theo từng course assignment.'
  };

  // Computations
  const totalCount = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const instructorCount = users.filter(u => u.role === 'instructor').length;
  const blockedCount = users.filter(u => u.status === 'blocked').length;

  const filteredUsers = users.filter(user => {
    const matchesQuery = !searchQuery || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesQuery && matchesRole && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleResetForm();
  };

  const handleResetForm = () => {
    setNewFullName('');
    setNewEmail('');
    setNewPhone('');
    setNewStatus('active');
    setNewRole('');
    setTempPassword('');
    setShowPassword(false);
    setAssignedCourseCode('');
    setPermView(true);
    setPermSubmissions(true);
    setPermProgress(true);
    setPermContentEdit(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFullName.trim()) { alert('Vui lòng nhập họ và tên.'); return; }
    if (!newEmail.trim()) { alert('Vui lòng nhập email.'); return; }
    if (isEmailTaken) { alert('Email này đã tồn tại trong hệ thống.'); return; }
    if (!newRole) { alert('Vui lòng chọn vai trò.'); return; }
    if (!tempPassword || tempPassword.length < 10) { alert('Mật khẩu phải có tối thiểu 10 ký tự.'); return; }

    const courseMapping: Record<string, string> = {
      'ai': 'AI Agent Bootcamp',
      'n8n': 'n8n Automation',
      'prompt': 'Prompt Starter'
    };
    const courseLabel = courseMapping[assignedCourseCode] || 'No active course';

    const permissionsList: string[] = [];
    if (newRole === 'admin') {
      permissionsList.push('Full admin');
    } else {
      if (permView) permissionsList.push('Review');
      if (permProgress) permissionsList.push('Progress');
      if (permContentEdit) permissionsList.push('Content edit');
    }

    const newUser: SystemUser = {
      name: newFullName.trim(),
      email: newEmail.trim().toLowerCase(),
      role: newRole,
      status: newStatus,
      phone: newPhone.trim() || '-',
      courses: newRole === 'admin' ? 'All system' : (assignedCourseCode ? courseLabel : 'No active course'),
      permissions: permissionsList.length > 0 ? permissionsList : ['Paused'],
      lastLogin: 'Never',
      avatar: newFullName.trim().split(' ').slice(-2).map(part => part.charAt(0)).join('').toUpperCase() || 'SU',
      avatarClass: newRole === 'admin' ? 'avatar-nv' : 'avatar-tt'
    };

    setUsers(prev => [newUser, ...prev]);
    alert(`Tạo tài khoản ${newRole} thành công cho ${newUser.name}!`);
    handleCloseModal();
  };

  const handleToggleBlock = (email: string) => {
    setUsers(prev => prev.map(u => {
      if (u.email === email) {
        const nextStatus = u.status === 'active' ? 'blocked' : 'active';
        alert(`Đã cập nhật trạng thái của ${u.name} thành ${nextStatus === 'active' ? 'Hoạt động' : 'Đã khóa'}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleResetPassword = (name: string) => {
    alert(`Đã tạo liên kết đặt lại mật khẩu tạm thời cho ${name} và gửi về hòm thư.`);
  };

  const handleEditPermissions = (name: string) => {
    alert(`Chức năng chỉnh sửa phân quyền nâng cao cho ${name} đang được phát triển.`);
  };

  const badgeColorClass = (val: string) => {
    if (val === 'admin') return 'badge-purple';
    if (val === 'instructor') return 'badge-indigo';
    if (val === 'active') return 'badge-green';
    if (val === 'blocked') return 'badge-red';
    if (val === 'Content edit' || val === 'Full admin') return 'badge-orange';
    return 'badge-gray';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        .system-users-shell {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .toolbar-panel {
          background-color: var(--bg-card);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .toolbar-left,
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .search-input-wrapper {
          position: relative;
          min-width: 280px;
        }

        .search-input-wrapper svg {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 14px;
          color: var(--text-secondary);
        }

        .search-input-wrapper input {
          padding-left: 32px;
        }

        .segmented-filter {
          display: inline-flex;
          align-items: center;
          background-color: var(--bg-app);
          border: 1px solid var(--border-passive);
          border-radius: 7px;
          padding: 2px;
          gap: 2px;
          flex-shrink: 0;
        }

        .segment-btn {
          height: 28px;
          border: 0;
          border-radius: 5px;
          background: transparent;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 11.5px;
          font-weight: 600;
          padding: 0 10px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .segment-btn.active {
          background-color: var(--bg-card);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 220px;
        }

        .user-main {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .user-name {
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: 11px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .permission-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          max-width: 260px;
        }

        .action-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
        }

        .icon-action {
          width: 28px;
          height: 28px;
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          background-color: var(--bg-card);
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .icon-action:hover {
          border-color: var(--border-interactive);
          background-color: var(--bg-app);
          color: var(--text-primary);
        }

        .icon-action svg {
          width: 14px;
          height: 14px;
        }

        .role-description-box {
          background-color: var(--bg-app);
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          padding: 12px;
          margin-top: 8px;
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .permission-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 8px;
        }

        .permission-checkbox-row {
          min-height: 32px;
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          padding: 7px 9px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-primary);
          background-color: var(--bg-card);
          cursor: pointer;
        }

        .security-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background-color: var(--bg-app);
          border: 1px dashed var(--border-interactive);
          border-radius: 8px;
          padding: 12px 14px;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.6;
        }

        .security-note svg {
          width: 16px;
          height: 16px;
          color: var(--color-indigo);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .form-divider {
          border: none;
          border-top: 1px solid var(--border-passive);
          margin: 18px 0;
        }
      `}</style>

      <PageHeader
        title="System Users"
        subtitle="Quản lý tài khoản admin và instructor nội bộ."
        onToggleSidebar={onToggleSidebar}
        showDateFilter={false}
        actions={
          <>
            <button 
              onClick={() => onNavigate('settings')}
              className="btn-secondary"
              style={{ textDecoration: 'none', height: '32px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={13} />
              <span>Settings</span>
            </button>
            <button 
              onClick={handleOpenModal}
              className="btn-black"
              style={{ height: '32px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <UserPlus size={13} />
              <span>Tạo tài khoản</span>
            </button>
          </>
        }
      />

      {/* KPI stats section */}
      <section className="kpi-row-1 kpi-row-cols-4">
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Tổng tài khoản</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value">{totalCount}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}>+1</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Admin</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value">{adminCount}</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Instructor</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value">{instructorCount}</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Blocked</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value">{blockedCount}</span>
          </div>
        </div>
      </section>

      <div className="system-users-shell">
        <section className="toolbar-panel">
          <div className="toolbar-left">
            <div className="search-input-wrapper">
              <Search />
              <input
                type="search"
                className="form-control"
                placeholder="Tìm theo tên hoặc email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="segmented-filter" aria-label="Role filter">
              <button
                type="button"
                className={`segment-btn ${roleFilter === 'all' ? 'active' : ''}`}
                onClick={() => setRoleFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`segment-btn ${roleFilter === 'admin' ? 'active' : ''}`}
                onClick={() => setRoleFilter('admin')}
              >
                Admin
              </button>
              <button
                type="button"
                className={`segment-btn ${roleFilter === 'instructor' ? 'active' : ''}`}
                onClick={() => setRoleFilter('instructor')}
              >
                Instructor
              </button>
            </div>
          </div>
          <div className="toolbar-right">
            <select
              className="form-control form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{ height: '32px', minWidth: '140px' }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            <button type="button" className="btn-secondary" onClick={handleResetFilters} style={{ height: '32px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <span className="panel-title">Tài khoản nội bộ</span>
              <span className="panel-subtitle">{filteredUsers.length} users</span>
            </div>
            <button
              onClick={() => onNavigate('audits')}
              className="panel-header-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Audit logs</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="col-secondary">Assigned courses</th>
                  <th className="col-secondary">Permissions</th>
                  <th className="col-secondary">Last login</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '34px', color: 'var(--text-secondary)' }}>
                      Không tìm thấy tài khoản phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="user-cell">
                          <div className="user-main">
                            <span className="user-name">{user.name}</span>
                            <span className="user-email">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className={`badge ${badgeColorClass(user.role)}`}>{user.role}</span></td>
                      <td><span className={`badge ${badgeColorClass(user.status)}`}>{user.status}</span></td>
                      <td className="col-secondary">{user.courses}</td>
                      <td className="col-secondary">
                        <div className="permission-stack">
                          {user.permissions.map((p, pIdx) => (
                            <span key={pIdx} className={`badge ${badgeColorClass(p)}`}>{p}</span>
                          ))}
                        </div>
                      </td>
                      <td className="col-secondary">{user.lastLogin}</td>
                      <td>
                        <div className="action-row">
                          <button
                            type="button"
                            className="icon-action"
                            title="Edit permissions"
                            onClick={() => handleEditPermissions(user.name)}
                          >
                            <SlidersHorizontal />
                          </button>
                          <button
                            type="button"
                            className="icon-action"
                            title="Reset password"
                            onClick={() => handleResetPassword(user.name)}
                          >
                            <KeyRound />
                          </button>
                          <button
                            type="button"
                            className="icon-action"
                            title={user.status === 'active' ? 'Block user' : 'Unblock user'}
                            onClick={() => handleToggleBlock(user.email)}
                          >
                            {user.status === 'active' ? <Lock /> : <Unlock />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="security-note">
          <ShieldCheck />
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>Quy tắc phân quyền:</strong> chỉ admin được tạo tài khoản nội bộ. Instructor chỉ chỉnh content khi có <code>can_edit_course_content</code> trên từng khóa được phân công; các quyền tài chính, học viên, certificate, announcement, audit và phân quyền vẫn là admin-only.
          </div>
        </div>
      </div>

      {/* Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', zIndex: 100, inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content system-user-modal"
              style={{ backgroundColor: 'var(--bg-card)', borderRadius: '8px', overflow: 'hidden' }}
            >
              <div className="modal-header">
                <div>
                  <div className="modal-title">Tạo tài khoản nội bộ</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>Chỉ dùng khi cần thêm admin hoặc instructor mới.</div>
                </div>
                <button type="button" className="drawer-close-btn" aria-label="Close create account modal" onClick={handleCloseModal}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <div className="modal-grid">
                    <div className="form-group">
                      <label className="form-label">Họ và tên <span style={{ color: 'var(--color-red)' }}>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="Nguyễn Văn A"
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span style={{ color: 'var(--color-red)' }}>*</span></label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        placeholder="example@blueprint.vn"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        style={{ borderColor: isEmailTaken ? 'var(--color-red)' : '' }}
                      />
                      {isEmailTaken && (
                        <span style={{ fontSize: '11px', color: 'var(--color-red)', display: 'block', marginTop: '4px' }}>Email này đã tồn tại trong hệ thống.</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="0912 345 678"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Trạng thái ban đầu</label>
                      <select
                        className="form-control form-select"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as any)}
                      >
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </div>
                  </div>

                  <hr className="form-divider" />

                  <div className="modal-grid">
                    <div className="form-group">
                      <label className="form-label">Vai trò <span style={{ color: 'var(--color-red)' }}>*</span></label>
                      <select
                        className="form-control form-select"
                        required
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value as any)}
                      >
                        <option value="">Chọn vai trò</option>
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                      </select>
                      {newRole && (
                        <div className="role-description-box show" dangerouslySetInnerHTML={{ __html: roleDescriptions[newRole] }} />
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mật khẩu tạm thời <span style={{ color: 'var(--color-red)' }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          required
                          placeholder="Tối thiểu 10 ký tự"
                          value={tempPassword}
                          onChange={(e) => setTempPassword(e.target.value)}
                          style={{ paddingRight: '40px' }}
                        />
                        <button
                          type="button"
                          className="icon-action"
                          style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)' }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {newRole === 'instructor' && (
                    <div className="instructor-section show">
                      <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Phân công khóa học ban đầu</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>Có thể bỏ trống và phân công sau trong course detail.</div>
                      <div className="modal-grid">
                        <div className="form-group">
                          <label className="form-label">Khóa học phân công</label>
                          <select
                            className="form-control form-select"
                            value={assignedCourseCode}
                            onChange={(e) => setAssignedCourseCode(e.target.value)}
                          >
                            <option value="">Chưa phân công</option>
                            <option value="ai">AI Agent & Vibe Coding Bootcamp</option>
                            <option value="n8n">Web Automation n8n nâng cao</option>
                            <option value="prompt">Prompt Engineering Starter</option>
                          </select>
                        </div>
                      </div>
                      {assignedCourseCode && (
                        <div id="permissions-block" style={{ display: 'block', marginTop: '12px' }}>
                          <label className="form-label" style={{ marginBottom: '8px' }}>Quyền trong khóa</label>
                          <div className="permission-grid">
                            <label className="permission-checkbox-row">
                              <input type="checkbox" checked={permView} onChange={(e) => setPermView(e.target.checked)} />
                              <span>Xem curriculum</span>
                            </label>
                            <label className="permission-checkbox-row">
                              <input type="checkbox" checked={permSubmissions} onChange={(e) => setPermSubmissions(e.target.checked)} />
                              <span>Duyệt submissions</span>
                            </label>
                            <label className="permission-checkbox-row">
                              <input type="checkbox" checked={permProgress} onChange={(e) => setPermProgress(e.target.checked)} />
                              <span>Xem tiến độ học viên</span>
                            </label>
                            <label className="permission-checkbox-row">
                              <input type="checkbox" checked={permContentEdit} onChange={(e) => setPermContentEdit(e.target.checked)} />
                              <span>Chỉnh content khóa học</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={handleResetForm}>Làm lại</button>
                  <button type="submit" className="btn-black" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <UserPlus size={14} />
                    <span>Tạo tài khoản</span>
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
