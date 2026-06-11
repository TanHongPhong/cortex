/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  UserPlus,
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  ShoppingCart,
  Clock,
  CheckSquare,
  Award,
  Star,
  Bell,
  ArrowRight,
  User,
  AlertTriangle,
  Image,
  FileText,
  FileBadge,
  QrCode,
  LayoutGrid,
  Calendar,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Student, Submission } from '../types';

interface OverviewProps {
  onNavigate: (tab: string, params?: any) => void;
  students: Student[];
  submissions: Submission[];
  onToggleSidebar?: () => void;
}

/**
 * Overview component renders the primary control panel with operational metrics and real-time alerts.
 */
export default function Overview({ onNavigate, students, submissions, onToggleSidebar }: OverviewProps) {
  // Extract latest 5 pending submissions
  const pendingSubmissions = submissions
    .filter(s => s.status === 'Chờ duyệt')
    .slice(0, 5);

  // Extract certificate activity from students
  const certActivity = students
    .flatMap(student =>
      (student.certificates || []).map(cert => ({
        studentName: student.name,
        avatarClass: student.avatarClass,
        avatarText: student.avatar,
        email: student.email,
        certName: cert.name,
        certId: cert.code,
        date: cert.date,
        status: 'valid' as const
      }))
    )
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <PageHeader
        title="Admin Dashboard"
        subtitle="Overview of Blueprint operational metrics and KPIs."
        onToggleSidebar={onToggleSidebar}
        
      />
      {/* KPI Matrix Row 1 (Core Business Metrics) */}
      <section className="kpi-row-1">
        {[
          { label: 'Leads', value: '32', trend: '+12', up: true, icon: UserPlus, tab: 'Leads' },
          { label: 'Students', value: '1,248', trend: '+8%', up: true, icon: students.length > 0 ? Users : Users, tab: 'students' },
          { label: 'Enrollments', value: '2,842', trend: '+5%', up: true, icon: GraduationCap, tab: 'students' },
          { label: 'Courses', value: '126', trend: '+3', up: true, icon: BookOpen, tab: 'courses' },
          { label: 'Revenue', value: '$128,540', trend: '+10%', up: true, icon: DollarSign, tab: 'payments' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(kpi.tab)}
              className="kpi-card"
              style={{ cursor: 'pointer' }}
            >
              <div className="kpi-card-header">
                <div className="kpi-icon-box">
                  <Icon size={14} />
                </div>
                <span className="kpi-label">{kpi.label}</span>
              </div>
              <div className="kpi-value-container">
                <span className="kpi-value">{kpi.value}</span>
                <span className={`kpi-trend ${kpi.up ? 'trend-up' : 'trend-down'}`}>{kpi.trend}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* KPI Matrix Row 2 (Detailed Operations Metrics) */}
      <section className="kpi-row-2">
        {[
          { label: 'Paid Orders', value: '732', trend: '+11%', up: true, icon: ShoppingCart, tab: 'payments' },
          { label: 'Pending Orders', value: '41', trend: '-6%', up: false, icon: Clock, tab: 'payments' },
          { label: 'Submissions Pending', value: '27', trend: '+4', up: true, icon: CheckSquare, tab: 'submissions' },
          { label: 'Certificates Issued', value: '1,105', trend: '+21', up: true, icon: Award, tab: 'templates' },
          { label: 'Pending Reviews', value: '14', trend: '+2', up: true, icon: Star, tab: 'reviews' },
          { label: 'Failed Notif.', value: '7', trend: '-1', up: false, icon: Bell, tab: 'announcements' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(kpi.tab)}
              className="kpi-card"
              style={{ cursor: 'pointer' }}
            >
              <div className="kpi-card-header">
                <div className="kpi-icon-box">
                  <Icon size={13} />
                </div>
                <span className="kpi-label">{kpi.label}</span>
              </div>
              <div className="kpi-value-container">
                <span className="kpi-value">{kpi.value}</span>
                <span className={`kpi-trend ${kpi.up ? 'trend-up' : 'trend-down'}`}>{kpi.trend}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Two Column Dashboard Core Layout */}
      <section className="dashboard-grid overview-grid">
        {/* Left Hand side - Live tables */}
        <div className="grid-col-left">
          
          {/* Pending Submissions */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Pending Submissions</h2>
                <span className="panel-subtitle">(5 latest)</span>
              </div>
              <button
                onClick={() => onNavigate('Submissions')}
                className="panel-header-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>View all submissions</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Lesson</th>
                    <th>Type</th>
                    <th>Submitted at</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSubmissions.map((sub) => {
                    const initials = sub.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                    return (
                      <tr key={sub.id}>
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
                            {sub.type === 'Final Project' ? 'final_project' : 'assignment'}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>{sub.date}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => onNavigate('Submissions', { selectedId: sub.id })}
                            className="btn-small"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certificate Activity */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Certificate Activity</h2>
                <span className="panel-subtitle">(5 latest)</span>
              </div>
              <button
                onClick={() => onNavigate('templates', { selectedCertId: 'all' })}
                className="panel-header-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>View all certificates</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Certificate ID</th>
                    <th>Status</th>
                    <th>Issued at</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {certActivity.map((cert, idx) => (
                    <tr key={idx}>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span className="student-name" style={{ fontWeight: 600 }}>{cert.studentName}</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{cert.email}</span>
                        </div>
                      </td>
                      <td><span className="course-title">{cert.certName}</span></td>
                      <td><span className="cert-id">{cert.certId}</span></td>
                      <td>
                        <span className="badge badge-green">valid</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{cert.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => onNavigate('templates', { selectedCertId: cert.certId })}
                          className="btn-small"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {certActivity.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        No active certificates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Hand side - Commerce alerts & attention tags */}
        <div className="grid-col-right">
          
          {/* Commerce Alerts */}
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Commerce Alerts</h2>
              <button
                onClick={() => onNavigate('payments')}
                className="panel-header-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>View all alerts</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="alert-list">
              {[
                { title: 'Pending orders', count: '41', color: 'orange', icon: Clock, tab: 'payments', filterValue: 'pending' },
                { title: 'QR payment pending', count: '18', color: 'gray', icon: QrCode, tab: 'payments', filterValue: 'pending' },
                { title: 'Failed payments', count: '7', color: 'gray', icon: AlertTriangle, tab: 'payments', filterValue: 'failed' },
                { title: 'Invoice requested', count: '12', color: 'gray', icon: FileText, tab: 'payments', filterValue: 'issued' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => onNavigate(item.tab, { statusFilter: item.filterValue })}
                    className="alert-item"
                  >
                    <div className="alert-left">
                      <div className={`alert-icon ${item.color}`}>
                        <Icon size={15} />
                      </div>
                      <span className="alert-title">{item.title}</span>
                    </div>
                    <div className="alert-right">
                      <span className="alert-count">{item.count}</span>
                      <div className="alert-chevron">
                        <ChevronRight size={12} style={{ color: '#c4c1b5' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Needs Attention */}
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Needs Attention</h2>
              <button
                onClick={() => onNavigate('tasks')}
                className="panel-header-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>View all tasks</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="alert-list">
              {[
                { title: 'Students eligible for certificate', count: '15', icon: Award, tab: 'templates' },
                { title: 'Overdue submissions', count: '9', icon: Clock, tab: 'submissions' },
                { title: 'Courses without thumbnail', count: '6', icon: Image, tab: 'courses' },
                { title: 'Draft courses', count: '4', icon: FileText, tab: 'courses' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => onNavigate(item.tab)}
                    className="alert-item"
                  >
                    <div className="alert-left">
                      <div className="alert-icon gray">
                        <Icon size={15} />
                      </div>
                      <span className="alert-title">{item.title}</span>
                    </div>
                    <div className="alert-right">
                      <span className="alert-count">{item.count}</span>
                      <div className="alert-chevron">
                        <ChevronRight size={12} style={{ color: '#c4c1b5' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
