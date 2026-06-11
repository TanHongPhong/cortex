/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import {
  ClipboardCheck,
  CheckSquare,
  Clock,
  XCircle,
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Eye,
  MoreVertical,
  X,
  Plus,
  ExternalLink,
  Github,
  FileText,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
  Trash2,
  CornerDownRight,
  User
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Submission } from '../types';

interface SubmissionsProps {
  submissions: Submission[];
  onUpdateSubmissions: React.Dispatch<React.SetStateAction<Submission[]>>;
  selectedSubmissionId?: string;
  onToggleSidebar?: () => void;
}

/**
 * Submissions page renders the coursework examiner queue with inline review forms and navigation tools.
 */
export default function Submissions({ submissions, onUpdateSubmissions, selectedSubmissionId, onToggleSidebar }: SubmissionsProps) {
  // Synchronize active submission drawer state with URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSubId = searchParams.get('submissionId');
  const setActiveSubId = (id: string | null) => {
    setSearchParams(prev => {
      if (id) {
        prev.set('submissionId', id);
      } else {
        prev.delete('submissionId');
      }
      return prev;
    }, { replace: true });
  };
  
  // Filtering and Searching states
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [lessonFilter, setLessonFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Chờ duyệt'); // default is Chờ duyệt
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Custom grading inputs
  const [reviewComment, setReviewComment] = useState('');

  // Automatically scroll down to details/grading drawer when a submission is selected
  useEffect(() => {
    if (activeSubId) {
      const timer = setTimeout(() => {
        const el = document.getElementById('submission-detail-drawer');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeSubId]);

  const activeSubmission = submissions.find(s => s.id === activeSubId) || submissions[0];

  // Core metrics calculation
  const pendingCount = submissions.filter(s => s.status === 'Chờ duyệt').length;
  const approvedCount = submissions.filter(s => s.status === 'Đã duyệt').length;
  const revisionCount = submissions.filter(s => s.status === 'Yêu cầu chỉnh sửa').length;
  const rejectedCount = submissions.filter(s => s.status === 'Từ chối').length;

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.projTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.lesson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = !courseFilter || sub.course === courseFilter;
    const matchesLesson = !lessonFilter || sub.lesson === lessonFilter;
    const matchesType = !typeFilter || sub.type === typeFilter;
    const matchesStatus = !statusFilter || sub.status === statusFilter;
    return matchesSearch && matchesCourse && matchesLesson && matchesType && matchesStatus;
  });

  const handleOpenDetail = (subId: string) => {
    setActiveSubId(subId);
    setReviewComment('');
  };

  const handleCloseDetail = () => {
    setActiveSubId(null);
  };

  // Previous and Next submission iteration handlers
  const handleNavigateSubmission = (direction: 'prev' | 'next') => {
    const currentIndex = filteredSubmissions.findIndex(s => s.id === activeSubId);
    if (currentIndex === -1) return;

    let targetIndex = currentIndex;
    if (direction === 'prev' && currentIndex > 0) {
      targetIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < filteredSubmissions.length - 1) {
      targetIndex = currentIndex + 1;
    }

    const nextSub = filteredSubmissions[targetIndex];
    if (nextSub) {
      setActiveSubId(nextSub.id);
      setReviewComment('');
    }
  };

  const handleUpdateStatus = (subId: string, nextStatus: 'Đã duyệt' | 'Yêu cầu chỉnh sửa' | 'Từ chối') => {
    if ((nextStatus === 'Yêu cầu chỉnh sửa' || nextStatus === 'Từ chối') && !reviewComment.trim()) {
      alert(`Vui lòng nhập nhận xét/lý do chi tiết trước khi đặt trạng thái của bài nộp là "${nextStatus}".`);
      return;
    }

    const updated = submissions.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: nextStatus,
          statusClass: nextStatus === 'Đã duyệt' ? 'badge-green' : nextStatus === 'Yêu cầu chỉnh sửa' ? 'badge-orange' : 'badge-red',
          reviewed_by: 'Instructor Tuấn',
          reviewed_at: new Date().toLocaleString('vi-VN')
        };
      }
      return s;
    });

    onUpdateSubmissions(updated);
    alert(`Đã cập nhật trạng thái bài nộp thành "${nextStatus}" thành công!`);
    handleCloseDetail();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      <style>{`
        .sub-type-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 6px;
          border-radius: 4px;
          font-size: 10.5px;
          font-weight: 500;
        }
        .type-assignment { background-color: #fff7ed; color: #c2410c; }
        .type-project { background-color: #eff6ff; color: #1e40af; }
        
        .link-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 11.5px;
          margin-top: 6px;
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-fast);
          background-color: var(--bg-card);
        }
        .link-card:hover {
          border-color: var(--border-interactive);
          background-color: var(--bg-app);
        }
        .link-card svg {
          width: 14px;
          height: 14px;
          color: var(--text-secondary);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 12px;
          margin-top: 10px;
        }
        .submission-links {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 8px;
        }
        @media (max-width: 576px) {
          .submission-links {
            grid-template-columns: 1fr;
          }
        }
        .submission-link-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-fast);
          min-width: 0;
        }
        .submission-link-card:hover {
          border-color: var(--border-interactive);
          background-color: var(--sidebar-active-bg);
        }
        .link-card-icon {
          color: #6366f1;
          flex-shrink: 0;
        }
        .link-card-details {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
          min-width: 0;
        }
        .link-card-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .link-card-url {
          font-size: 11px;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <PageHeader
        title="Duyệt bài nộp"
        subtitle="Xem và đánh giá bài nộp assignment/final project của học viên."
        onToggleSidebar={onToggleSidebar}
      />

      {/* Stats Counters row (4 columns) */}
      <section className="stats-grid">
        {/* Card 1 */}
        <div className="stats-card">
          <div className="stats-icon-box document" style={{ backgroundColor: 'var(--color-indigo-light)', borderColor: 'var(--color-indigo-light)', color: 'var(--color-indigo)' }}>
            <ClipboardCheck size={20} className="stroke-[1.75]" />
          </div>
          <div className="stats-info">
            <span className="stats-label">Chờ duyệt</span>
            <span className="stats-value">{pendingCount}</span>
            <span className="stats-trend neutral">Cần bạn xử lý</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="stats-card">
          <div className="stats-icon-box document" style={{ backgroundColor: 'var(--color-green-light)', borderColor: 'var(--color-green-light)', color: 'var(--color-green)' }}>
            <CheckSquare size={20} className="stroke-[1.75]" />
          </div>
          <div className="stats-info">
            <span className="stats-label">Đã duyệt</span>
            <span className="stats-value">{approvedCount}</span>
            <span className="stats-trend neutral">Trong phạm vi khóa</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="stats-card">
          <div className="stats-icon-box document" style={{ backgroundColor: 'var(--color-orange-light)', borderColor: 'var(--color-orange-light)', color: 'var(--color-orange)' }}>
            <Clock size={20} className="stroke-[1.75]" />
          </div>
          <div className="stats-info">
            <span className="stats-label">Yêu cầu chỉnh sửa</span>
            <span className="stats-value">{revisionCount}</span>
            <span className="stats-trend neutral">Học viên cần cập nhật</span>
          </div>
        </div>
        {/* Card 4 */}
        <div className="stats-card">
          <div className="stats-icon-box document" style={{ backgroundColor: 'var(--color-red-light)', borderColor: 'var(--color-red-light)', color: 'var(--color-red)' }}>
            <XCircle size={20} className="stroke-[1.75]" />
          </div>
          <div className="stats-info">
            <span className="stats-label">Từ chối</span>
            <span className="stats-value">{rejectedCount}</span>
            <span className="stats-trend neutral">Đã từ chối</span>
          </div>
        </div>
      </section>

      {/* Filter Panel */}
      <div className="panel" style={{ padding: '14px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            
            {/* Search bar */}
            <div className="search-input-wrapper" style={{ position: 'relative', flex: '2', minWidth: '200px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Tìm theo tên học viên, tiêu đề project, email..."
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
            {(courseFilter || lessonFilter || typeFilter || statusFilter !== 'Chờ duyệt' || searchQuery) && (
              <button
                onClick={() => {
                  setCourseFilter('');
                  setLessonFilter('');
                  setTypeFilter('');
                  setStatusFilter('Chờ duyệt');
                  setSearchQuery('');
                  handleCloseDetail();
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px dashed var(--border-passive)' }}>
              <div className="form-group" style={{ marginBottom: 0, minWidth: '160px' }}>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="form-control form-select"
                  style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                >
                  <option value="">Tất cả khóa học</option>
                  {Array.from(new Set(submissions.map(s => s.course))).map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '160px' }}>
                <select
                  value={lessonFilter}
                  onChange={(e) => setLessonFilter(e.target.value)}
                  className="form-control form-select"
                  style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                >
                  <option value="">Tất cả bài học</option>
                  {Array.from(new Set(submissions.map(s => s.lesson))).map((l, i) => (
                    <option key={i} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '130px' }}>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="form-control form-select"
                  style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                >
                  <option value="">Tất cả loại bài</option>
                  <option value="Final Project">Final Project</option>
                  <option value="Assignment">Assignment</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '140px' }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-control form-select"
                  style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="Chờ duyệt">Chờ duyệt</option>
                  <option value="Đã duyệt">Đã duyệt</option>
                  <option value="Yêu cầu chỉnh sửa">Yêu cầu chỉnh sửa</option>
                  <option value="Từ chối">Từ chối</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0, minWidth: '220px' }}>
                <div className="date-range-picker" style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--border-passive)', borderRadius: '6px', padding: '0 8px', height: '32px', background: 'var(--bg-card)', fontSize: '12px' }}>
                  <Calendar size={13} style={{ color: 'var(--text-secondary)' }} />
                  <input type="text" defaultValue="01/05/2026" readOnly style={{ border: 'none', background: 'transparent', width: '70px', fontSize: '11.5px', color: 'var(--text-primary)', textAlign: 'center', outline: 'none' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>&rarr;</span>
                  <input type="text" defaultValue="21/05/2026" readOnly style={{ border: 'none', background: 'transparent', width: '70px', fontSize: '11.5px', color: 'var(--text-primary)', textAlign: 'center', outline: 'none' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout Stack */}
      <div className="submissions-stack">
        
        {/* TOP PANEL: Submissions Table */}
        <div className="panel">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Học viên</th>
                  <th>Khóa học</th>
                  <th>Bài học</th>
                  <th>Loại</th>
                  <th>Trạng thái</th>
                  <th className="col-secondary">Ngày nộp</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((sub) => {
                  const initials = sub.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  const isSelected = activeSubId === sub.id;
                  return (
                    <tr
                      key={sub.id}
                      onClick={() => handleOpenDetail(sub.id)}
                      className={`submission-row ${isSelected ? 'selected-row' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span className="student-name" style={{ fontWeight: 600 }}>{sub.name}</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{sub.email}</span>
                        </div>
                      </td>
                      <td><span className="course-title">{sub.course}</span></td>
                      <td><span className="lesson-name">{sub.lesson}</span></td>
                      <td>
                        <span className={`badge ${sub.type === 'Final Project' ? 'badge-indigo' : 'badge-orange'}`}>
                          {sub.type === 'Final Project' ? 'Final Project' : 'Assignment'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge submission-status-badge ${
                          sub.status === 'Đã duyệt' ? 'badge-green' :
                          sub.status === 'Yêu cầu chỉnh sửa' ? 'badge-orange' :
                          sub.status === 'Từ chối' ? 'badge-red' : 'badge-purple'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="col-secondary"><span className="time-stamp">{sub.date}</span></td>
                      <td><button className="btn-small" onClick={(e) => { e.stopPropagation(); handleOpenDetail(sub.id); }}>Xem</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            <span id="pagination-label">Hiển thị 1 - {filteredSubmissions.length} trong {submissions.length} bài nộp</span>
            <div className="pagination-pages">
              <button className="page-btn" disabled><ChevronLeft size={14} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn"><ChevronRight size={14} /></button>
            </div>
            <select className="page-select-dropdown" defaultValue="10 / trang">
              <option value="10 / trang">10 / trang</option>
              <option value="25 / trang">25 / trang</option>
              <option value="50 / trang">50 / trang</option>
            </select>
          </div>
        </div>

        {/* BOTTOM PANEL: Submission Detail Panel */}
        <div className={`detail-drawer ${!activeSubId ? 'drawer-closed' : ''}`} id="submission-detail-drawer">
          {activeSubmission && (
            <>
              <div className="drawer-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="drawer-title" style={{ fontSize: '16px', fontWeight: 600 }}>Chi tiết bài nộp</span>
                </div>
                <button className="drawer-close-btn" onClick={handleCloseDetail} aria-label="Close details">
                  <X size={15} />
                </button>
              </div>
              
              <div className="drawer-body">
                
                {/* Student Header Profile details */}
                <div className="student-profile-summary">
                  <div className="student-profile-left">
                    <div className={`student-profile-avatar ${activeSubmission.avatarClass || 'avatar-pt'}`} id="drawer-student-avatar">
                      {activeSubmission.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div className="student-profile-info">
                      <h3 className="student-profile-name" id="drawer-student-name">{activeSubmission.name}</h3>
                      <span className="student-profile-email" id="drawer-student-email">{activeSubmission.email}</span>
                    </div>
                  </div>
                  <span className="student-profile-date" id="drawer-student-date">
                    <span>Ngày nộp</span>
                    <span className="time-stamp">{activeSubmission.date}</span>
                  </span>
                </div>

                {/* Metadata table block */}
                <div className="metadata-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className="metadata-item">
                    <span className="metadata-label">Khóa học</span>
                    <span className="metadata-value" id="drawer-sub-course">{activeSubmission.course}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Bài học</span>
                    <span className="metadata-value" id="drawer-sub-lesson">{activeSubmission.lesson}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Lần nộp</span>
                    <span className="metadata-value" id="drawer-sub-attempt">Lần {activeSubmission.attempt_no || 1}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Loại bài nộp</span>
                    <span style={{ alignSelf: 'flex-start', marginTop: '2px' }}>
                      <span className={`badge ${activeSubmission.type === 'Final Project' ? 'badge-indigo' : 'badge-orange'}`} id="drawer-sub-type">
                        {activeSubmission.type === 'Final Project' ? 'Final Project' : 'Assignment'}
                      </span>
                    </span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Trạng thái hiện tại</span>
                    <span style={{ alignSelf: 'flex-start', marginTop: '2px' }}>
                      <span className={`badge ${
                        activeSubmission.status === 'Đã duyệt' ? 'badge-green' :
                        activeSubmission.status === 'Yêu cầu chỉnh sửa' ? 'badge-orange' :
                        activeSubmission.status === 'Từ chối' ? 'badge-red' : 'badge-purple'
                      }`} id="drawer-sub-status">
                        {activeSubmission.status}
                      </span>
                    </span>
                  </div>
                  <div className="metadata-item" id="drawer-sub-reviewer-container">
                    <span className="metadata-label">Người duyệt</span>
                    <span className="metadata-value" id="drawer-sub-reviewer">{activeSubmission.reviewed_by || '-'}</span>
                  </div>
                </div>

                {/* Submission Content Description */}
                <div className="drawer-section">
                  <span className="drawer-section-title">Nội dung bài nộp</span>
                  
                  <div className="submission-text-block">
                    <span className="submission-text-title">Tiêu đề project</span>
                    <h4 id="drawer-sub-title" style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{activeSubmission.projTitle}</h4>
                  </div>
                  
                  <div className="submission-text-block" style={{ marginTop: '10px' }}>
                    <span className="submission-text-title">Mô tả</span>
                    <p className="submission-text-content" id="drawer-sub-desc">{activeSubmission.projDesc}</p>
                  </div>

                  <div className="submission-text-block" style={{ marginTop: '10px' }}>
                    <span className="submission-text-title">Công cụ AI đã dùng</span>
                    <p className="submission-text-content" id="drawer-sub-tools">{activeSubmission.tools_used || 'Claude 3.5 Sonnet'}</p>
                  </div>

                  <div className="submission-text-block" style={{ marginTop: '10px' }}>
                    <span className="submission-text-title">Tự đánh giá & Bài học rút ra (Reflection)</span>
                    <p className="submission-text-content" id="drawer-sub-reflection">{activeSubmission.reflection || 'Không có'}</p>
                  </div>

                  <div className="submission-text-block" style={{ marginTop: '10px' }}>
                    <span className="submission-text-title">Công nghệ & công cụ</span>
                    <p className="submission-text-content" id="drawer-sub-tech" style={{ fontWeight: 500 }}>{activeSubmission.tech}</p>
                  </div>

                  <div className="submission-text-block" style={{ marginTop: '10px' }}>
                    <span className="submission-text-title">Điều học được</span>
                    <p className="submission-text-content" id="drawer-sub-learned">{activeSubmission.learned}</p>
                  </div>

                  <div className="submission-text-block" style={{ marginTop: '10px' }}>
                    <span className="submission-text-title">Thách thức gặp phải</span>
                    <p className="submission-text-content" id="drawer-sub-challenge">{activeSubmission.challenge}</p>
                  </div>
                </div>

                {/* Links & Attachments */}
                <div className="drawer-section">
                  <span className="drawer-section-title">Liên kết & tài liệu</span>
                  <div className="submission-links">
                    
                    {/* Demo Link */}
                    {activeSubmission.demoUrl && (
                      <a href={activeSubmission.demoUrl} className="submission-link-card" target="_blank" rel="noreferrer" id="drawer-demo-link-href">
                        <ExternalLink size={14} className="link-card-icon" />
                        <div className="link-card-details">
                          <span className="link-card-label">Demo URL</span>
                          <span className="link-card-url" id="drawer-demo-link">{activeSubmission.demoUrl}</span>
                        </div>
                      </a>
                    )}

                    {/* Source Link */}
                    {activeSubmission.sourceUrl && (
                      <a href={activeSubmission.sourceUrl} className="submission-link-card" target="_blank" rel="noreferrer" id="drawer-source-link-href">
                        <Github size={14} className="link-card-icon" />
                        <div className="link-card-details">
                          <span className="link-card-label">Source URL</span>
                          <span className="link-card-url" id="drawer-source-link">{activeSubmission.sourceUrl}</span>
                        </div>
                      </a>
                    )}

                    {/* Attachment file box */}
                    {activeSubmission.fileName && (
                      <div className="submission-link-card" style={{ cursor: 'pointer' }} onClick={() => alert('Đã bắt đầu tải xuống tài liệu bài nộp!')}>
                        <FileText size={14} className="link-card-icon" style={{ color: '#ef4444' }} />
                        <div className="link-card-details" style={{ flex: 1 }}>
                          <span className="link-card-label">Đính kèm (PDF)</span>
                          <span className="link-card-url" id="drawer-file-name">{activeSubmission.fileName} ({activeSubmission.fileSize})</span>
                        </div>
                        <Download size={13} className="text-gray-400" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                      </div>
                    )}

                  </div>
                </div>

                {/* Unified Grading and Review Block */}
                <div className="drawer-section grading-block" style={{ border: '1px solid var(--border-passive)', borderRadius: '12px', padding: '20px', backgroundColor: 'var(--sidebar-active-bg)', marginTop: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <span className="drawer-section-title" style={{ color: 'var(--text-primary)', display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '12px', borderBottom: 'none', paddingBottom: 0 }}>ĐÁNH GIÁ & CHẤM BÀI</span>
                  
                  <div className="editor-container" style={{ backgroundColor: 'var(--bg-card)' }}>
                    <div className="editor-toolbar">
                      <button className="editor-tool-btn" aria-label="Bold" type="button"><Bold size={13} /></button>
                      <button className="editor-tool-btn" aria-label="Italic" type="button"><Italic size={13} /></button>
                      <span className="editor-divider"></span>
                      <button className="editor-tool-btn" aria-label="Bullet list" type="button"><List size={13} /></button>
                      <button className="editor-tool-btn" aria-label="Numbered list" type="button"><ListOrdered size={13} /></button>
                      <span className="editor-divider"></span>
                      <button className="editor-tool-btn" aria-label="Link" type="button"><Link size={13} /></button>
                      <button className="editor-tool-btn" aria-label="Code" type="button"><Code size={13} /></button>
                      <button className="editor-tool-btn" aria-label="Quote" type="button"><Quote size={13} /></button>
                    </div>
                    <textarea
                      className="editor-textarea"
                      id="review-comment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Nhập nhận xét rõ ràng, cụ thể để giúp học viên cải thiện..."
                      style={{ minHeight: '120px' }}
                    />
                  </div>
                  <span className="editor-footer-hint" style={{ display: 'block', marginTop: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>Học viên sẽ nhận thông báo về kết quả đánh giá của bạn.</span>

                  {/* Inline grading action buttons inside the block */}
                  <div className="grading-actions-row" style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <button
                      className="btn-secondary close-drawer-action"
                      onClick={handleCloseDetail}
                      style={{ height: '36px', padding: '0 16px', fontSize: '12.5px', width: '130px', justifyContent: 'center', display: 'inline-flex', alignItems: 'center' }}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn-secondary"
                      id="btn-request-edit-sub"
                      onClick={() => handleUpdateStatus(activeSubmission.id, 'Yêu cầu chỉnh sửa')}
                      style={{ height: '36px', padding: '0 16px', fontSize: '12.5px', borderColor: 'var(--color-orange)', color: 'var(--color-orange)', backgroundColor: 'var(--color-orange-light)', width: '140px', justifyContent: 'center', display: 'inline-flex', alignItems: 'center' }}
                    >
                      Yêu cầu chỉnh sửa
                    </button>
                    <button
                      className="btn-success"
                      id="btn-approve-sub"
                      onClick={() => handleUpdateStatus(activeSubmission.id, 'Đã duyệt')}
                      style={{ height: '36px', padding: '0 16px', fontSize: '12.5px', width: '130px', justifyContent: 'center', display: 'inline-flex', alignItems: 'center' }}
                    >
                      Duyệt
                    </button>
                    <button
                      className="btn-danger"
                      id="btn-reject-sub"
                      onClick={() => handleUpdateStatus(activeSubmission.id, 'Từ chối')}
                      style={{ height: '36px', padding: '0 16px', fontSize: '12.5px', width: '130px', justifyContent: 'center', display: 'inline-flex', alignItems: 'center' }}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>

              </div>

              {/* Drawer footer containing only navigation */}
              <div className="drawer-footer" style={{ padding: '16px 20px', borderTop: '1px solid var(--border-passive)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <button
                  id="btn-prev-submission"
                  onClick={() => handleNavigateSubmission('prev')}
                  className="btn-secondary"
                  style={{ height: '36px', padding: '0 16px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ChevronLeft style={{ width: '16px', height: '16px' }} />
                  <span>Bài trước</span>
                </button>
                <button
                  id="btn-next-submission"
                  onClick={() => handleNavigateSubmission('next')}
                  className="btn-secondary"
                  style={{ height: '36px', padding: '0 16px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Bài tiếp</span>
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
