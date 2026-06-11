/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Calendar,
  Plus,
  ArrowRight,
  GripVertical,
  MoreHorizontal,
  Layers,
  Users,
  Search,
  CheckCircle,
  FileText,
  ChevronDown
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface CoursesProps {
  onNavigate: (tab: string, params?: any) => void;
  courses: Course[];
  onAddCourse?: (newCourse: Course) => void;
  onToggleSidebar?: () => void;
}

/**
 * Courses component outputs the curriculum directory alongside an interactive FAQ organizer.
 */
export default function Courses({ onNavigate, courses, onAddCourse, onToggleSidebar }: CoursesProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Local state for FAQs
  const [faqs, setFaqs] = useState([
    { id: 1, question: "What programming languages are covered in this bootcamp?", status: "Published", order: 1 },
    { id: 2, question: "Do I need prior coding experience to take this course?", status: "Published", order: 2 },
    { id: 3, question: "Will I get a certificate after completing the bootcamp?", status: "Draft", order: 3 }
  ]);

  // Core metrics calculation
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(c => c.status === 'Published').length;
  const draftCourses = courses.filter(c => c.status === 'Draft').length;
  const archivedCourses = courses.filter(c => c.status === 'Archived').length;
  const totalStudents = courses.reduce((sum, c) => sum + c.studentsCount, 0);
  const certsOn = courses.filter(c => c.hasCertificate).length;

  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFaqStatus = (id: number) => {
    setFaqs(prev => prev.map(faq => {
      if (faq.id === id) {
        const nextStatus = faq.status === 'Published' ? 'Draft' : 'Published';
        return { ...faq, status: nextStatus };
      }
      return faq;
    }));
  };

  const handleOrderChange = (id: number, val: string) => {
    const orderNum = parseInt(val) || 0;
    setFaqs(prev => prev.map(faq => faq.id === id ? { ...faq, order: orderNum } : faq));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        .badge-free { background-color: #eff6ff; color: #1e40af; }
        .badge-starter { background-color: #fff7ed; color: #c2410c; }
        .badge-core { background-color: #f5f3ff; color: #6d28d9; }
        .badge-advanced { background-color: #fef2f2; color: #b91c1c; }
        .badge-premium { background-color: #fdf2f8; color: #be185d; }
        .badge-b2b { background-color: #ecfdf5; color: #047857; }
        .badge-gray { background-color: #f3f4f6; color: #4b5563; }
        
        .actions-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          max-width: 250px;
        }
      `}</style>
      <PageHeader
        title="Course Management"
        subtitle="Create and manage Blueprint courses."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              onClick={() => alert("Creating new course...")}
              className="btn-black"
              style={{ height: '32px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={12} />
              <span>Create Course</span>
            </button>
          </>
        }
      />
      {/* Metrics Row */}
      <section className="kpi-row-1 kpi-row-cols-6" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Total Courses', value: totalCourses, trend: '—', up: true },
          { label: 'Published', value: publishedCourses, trend: '+1', up: true },
          { label: 'Draft', value: draftCourses, trend: '-1', up: false },
          { label: 'Archived', value: archivedCourses, trend: '—', up: true },
          { label: 'Total Students', value: totalStudents.toLocaleString(), trend: '+8%', up: true },
          { label: 'Certificates On', value: certsOn, trend: '+2', up: true }
        ].map((met, idx) => (
          <div key={idx} className="kpi-card">
            <div className="kpi-card-header">
              <span className="kpi-label">{met.label}</span>
            </div>
            <div className="kpi-value-container">
              <span className="kpi-value">{met.value}</span>
              {met.trend !== '—' && (
                <span className={`kpi-trend ${met.up ? 'trend-up' : 'trend-down'}`}>
                  {met.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Course List Section */}
      <div className="panel">
        <div className="panel-header" style={{ marginBottom: '12px' }}>
          <div className="panel-title-group">
            <h2 className="panel-title">Course Directory</h2>
            <span className="panel-subtitle">({filteredCourses.length} items out of {totalCourses})</span>
          </div>
          
          <div className="relative search-input-wrapper" style={{ minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search course title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '32px', height: '30px', fontSize: '12px' }}
            />
            <Search size={13} className="text-gray-400" style={{ position: 'absolute', left: '10px', top: '9px' }} />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th className="col-secondary">Level</th>
                <th>Price</th>
                <th>Status</th>
                <th className="col-secondary">Lessons</th>
                <th>Students</th>
                <th className="col-secondary">Certificate</th>
                <th className="col-secondary">Updated</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => (
                <tr
                  key={c.id}
                  className={c.id === 'course_ai_agent_bootcamp' ? 'highlight-row' : ''}
                >
                  <td>
                    <div className="col-student">
                      {c.thumbnail ? (
                        <img src={c.thumbnail} alt={c.name} className="course-thumbnail" />
                      ) : (
                        <div className="course-thumbnail" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-app)', color: 'var(--text-secondary)' }}>
                          <BookOpen size={14} />
                        </div>
                      )}
                      <span className="student-name">{c.name}</span>
                    </div>
                  </td>
                  <td className="col-secondary">
                    <span className={`badge ${c.levelClass}`}>
                      {c.level}
                    </span>
                  </td>
                  <td><span>{c.price}</span></td>
                  <td>
                    <span className={`badge ${
                      c.status === 'Published' ? 'badge-green' : c.status === 'Draft' ? 'badge-orange' : 'badge-gray'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{c.lessonsCount} lessons</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.studentsCount} students</td>
                  <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{c.hasCertificate ? 'Yes' : 'No'}</td>
                  <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{c.updatedAt}</td>
                  <td>
                    <div className="actions-cell">
                      <button
                        onClick={() => alert(`Editing course: ${c.name}`)}
                        className="btn-small"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onNavigate('Lessons', { selectedCourseId: c.id })}
                        className="btn-small"
                      >
                        Manage Lessons
                      </button>
                      <button
                        onClick={() => alert(`Previewing course: ${c.name}`)}
                        className="btn-small"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => alert("More options...")}
                        className="btn-icon-only"
                        title="More options"
                      >
                        <MoreHorizontal size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Control Deck */}
      <div className="panel" style={{ marginTop: '24px' }}>
        <div className="panel-header" style={{ marginBottom: '12px' }}>
          <div className="panel-title-group">
            <h2 className="panel-title">Quick FAQ Management</h2>
            <span className="panel-subtitle">({faqs.length} FAQs for AI Agent & Vibe Coding Bootcamp)</span>
          </div>
          <button
            onClick={() => alert('New FAQ model is under development')}
            className="btn-secondary"
            style={{ fontSize: '11px', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Plus size={12} />
            <span>Add FAQ</span>
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Question</th>
                <th className="col-secondary">Status</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Order</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {faq.question}
                  </td>
                  <td className="col-secondary">
                    <span className={`badge ${faq.status === 'Published' ? 'badge-green' : 'badge-orange'}`}>
                      {faq.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="number"
                      value={faq.order}
                      onChange={(e) => handleOrderChange(faq.id, e.target.value)}
                      className="form-control"
                      style={{ textAlign: 'center', width: '50px', height: '24px', fontSize: '11px', margin: '0 auto', padding: 0 }}
                    />
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        onClick={() => alert(`Editing FAQ: ${faq.id}`)}
                        className="btn-small"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleFaqStatus(faq.id)}
                        className="btn-small"
                      >
                        {faq.status === 'Published' ? 'Hide' : 'Publish'}
                      </button>
                      <span className="drag-handle" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', cursor: 'grab' }}>
                        <GripVertical size={13} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
