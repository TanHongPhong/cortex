/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  GripVertical,
  Plus,
  Trash2,
  Copy,
  Pencil,
  Check,
  Eye,
  Settings,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  BookOpen,
  ArrowLeft,
  Calendar,
  ChevronLeft,
  MoreVertical,
  Search
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface LessonsProps {
  courses: Course[];
  selectedCourseId?: string;
  onToggleSidebar?: () => void;
}

interface Module {
  id: string;
  title: string;
  lessonsCount: number;
  status: 'Published' | 'Draft';
}

interface Lesson {
  id: string;
  moduleId: string;
  indexStr: string;
  title: string;
  type: 'Video' | 'Resource' | 'Assignment';
  isRequired: boolean;
  status: 'Published' | 'Draft';
  order: number;
  desc?: string;
  duration?: number;
}

/**
 * Lessons component allows instructors to build curriculum modules, write lesson content,
 * define completion requirements, and manage drafting/publishing states.
 */
export default function Lessons({ courses, selectedCourseId, onToggleSidebar }: LessonsProps) {
  const navigate = useNavigate();
  // Select active course
  // Synchronize active course curriculum state with URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCourseId = searchParams.get('courseId') || 'course_ai_agent_bootcamp';
  const setActiveCourseId = (id: string) => {
    setSearchParams(prev => {
      prev.set('courseId', id);
      return prev;
    }, { replace: true });
  };
  
  // Track active course node
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  // Static mock modules database linked by course
  const [modules, setModules] = useState<Module[]>([
    { id: "mod_1", title: "1. Giới thiệu khóa học", lessonsCount: 3, status: "Published" },
    { id: "mod_2", title: "2. Vibe Coding Basics", lessonsCount: 5, status: "Published" },
    { id: "mod_3", title: "3. AI Tools & Workflow", lessonsCount: 6, status: "Published" },
    { id: "mod_4", title: "4. Xây dựng Web với AI", lessonsCount: 7, status: "Published" },
    { id: "mod_5", title: "5. Backend & Database", lessonsCount: 5, status: "Draft" },
    { id: "mod_6", title: "6. Deploy & Hosting", lessonsCount: 4, status: "Draft" },
    { id: "mod_7", title: "7. Final Project", lessonsCount: 6, status: "Draft" },
    { id: "mod_8", title: "8. Bonus", lessonsCount: 6, status: "Draft" }
  ]);

  // Track selected module
  const [activeModuleId, setActiveModuleId] = useState("mod_1");

  // Static mock lessons database linked by module
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: "les_1", moduleId: "mod_1", indexStr: "1.1", title: "Chào mừng đến với khóa học", type: "Video", isRequired: true, status: "Published", order: 1, desc: "Giới thiệu tổng quan về khóa học, mục tiêu và những gì bạn sẽ đạt được.", duration: 8 },
    { id: "les_2", moduleId: "mod_1", indexStr: "1.2", title: "Lộ trình học tập & kết quả đầu ra", type: "Video", isRequired: true, status: "Published", order: 2, desc: "Bản đồ chi tiết các bài học và mốc kỹ năng cần hoàn tất.", duration: 15 },
    { id: "les_3", moduleId: "mod_1", indexStr: "1.3", title: "Cách học hiệu quả", type: "Resource", isRequired: false, status: "Published", order: 3, desc: "Một số hướng dẫn, mẹo chuẩn bị tâm lý và thiết bị để học tập trơn tru.", duration: 5 },
    
    { id: "les_4", moduleId: "mod_2", indexStr: "2.1", title: "Vibe Coding là gì?", type: "Video", isRequired: true, status: "Published", order: 1, desc: "Định nghĩa và triết lý làm việc tốc độ cao với AI Coders.", duration: 12 },
    { id: "les_5", moduleId: "mod_2", indexStr: "2.2", title: "Thiết lập môi trường Vibe Coding", type: "Video", isRequired: true, status: "Published", order: 2, desc: "Cài đặt các extension, Node environment và tokens API.", duration: 20 },
    { id: "les_6", moduleId: "mod_2", indexStr: "2.3", title: "Viết prompt layout đầu tiên", type: "Assignment", isRequired: true, status: "Published", order: 3, desc: "Sử dụng prompt mẫu để AI generate layout HTML/CSS sạch.", duration: 30 }
  ]);

  const [lessonSearchQuery, setLessonSearchQuery] = useState('');

  // Filter lessons belonging to selected module
  const moduleLessons = lessons.filter(l => {
    const matchesModule = l.moduleId === activeModuleId;
    const matchesSearch = !lessonSearchQuery || 
      l.title.toLowerCase().includes(lessonSearchQuery.toLowerCase()) ||
      l.indexStr.toLowerCase().includes(lessonSearchQuery.toLowerCase()) ||
      l.type.toLowerCase().includes(lessonSearchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  // Track currently selected lesson to edit in form
  const [activeLessonId, setActiveLessonId] = useState("les_1");
  const activeLesson = lessons.find(l => l.id === activeLessonId) || moduleLessons[0] || lessons[0];

  // Editor states
  const [editTitle, setEditTitle] = useState(activeLesson?.title || '');
  const [editType, setEditType] = useState<'Video' | 'Resource' | 'Assignment'>(activeLesson?.type || 'Video');
  const [editDesc, setEditDesc] = useState(activeLesson?.desc || '');
  const [editOrder, setEditOrder] = useState<number>(activeLesson?.order || 1);
  const [editRequired, setEditRequired] = useState<boolean>(activeLesson?.isRequired || false);
  const [editStatus, setEditStatus] = useState<'Published' | 'Draft'>(activeLesson?.status || 'Published');
  const [editDuration, setEditDuration] = useState<number>(activeLesson?.duration || 5);
  
  // Track Editor Tabs
  const [activeEditorTab, setActiveEditorTab] = useState<'basic' | 'content' | 'resources' | 'advanced'>('basic');

  // Trigger form state loads whenever selected lesson changes
  useEffect(() => {
    if (activeLesson) {
      setEditTitle(activeLesson.title);
      setEditType(activeLesson.type);
      setEditDesc(activeLesson.desc || '');
      setEditOrder(activeLesson.order);
      setEditRequired(activeLesson.isRequired);
      setEditStatus(activeLesson.status);
      setEditDuration(activeLesson.duration || 5);
    }
  }, [activeLessonId]);

  // Handle saving the modified lesson fields back to mock database
  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    setLessons(prev => prev.map(l => {
      if (l.id === activeLessonId) {
        return {
          ...l,
          title: editTitle,
          type: editType,
          desc: editDesc,
          order: editOrder,
          isRequired: editRequired,
          status: editStatus,
          duration: editDuration
        };
      }
      return l;
    }));
    alert(`Successfully saved changes for lesson "${editTitle}"!`);
  };

  const handleAddModule = () => {
    const titlePrompt = prompt('Enter a title for the new module:');
    if (titlePrompt) {
      const newMod: Module = {
        id: `mod_${modules.length + 1}`,
        title: `${modules.length + 1}. ${titlePrompt}`,
        lessonsCount: 0,
        status: 'Draft'
      };
      setModules([...modules, newMod]);
    }
  };

  const handleAddLesson = () => {
    const titlePrompt = prompt('Enter a title for the new lesson:');
    if (titlePrompt) {
      const activeModule = modules.find(m => m.id === activeModuleId);
      const modPrefix = activeModule ? activeModule.title.split('.')[0] : "1";
      const newIndexStr = `${modPrefix}.${moduleLessons.length + 1}`;
      
      const newLes: Lesson = {
        id: `les_${lessons.length + 1}`,
        moduleId: activeModuleId,
        indexStr: newIndexStr,
        title: titlePrompt,
        type: 'Video',
        isRequired: true,
        status: 'Draft',
        order: moduleLessons.length + 1,
        desc: 'Mô tả bài học đang được biên soạn...',
        duration: 10
      };

      setLessons([...lessons, newLes]);
      setActiveLessonId(newLes.id);

      // Increment lesson count on module
      setModules(prev => prev.map(m => m.id === activeModuleId ? { ...m, lessonsCount: m.lessonsCount + 1 } : m));
    }
  };

  const handleDuplicateLesson = (lesson: Lesson, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicated: Lesson = {
      ...lesson,
      id: `les_${lessons.length + 1}`,
      title: `${lesson.title} (Copy)`,
      order: moduleLessons.length + 1,
      indexStr: `${lesson.indexStr}b`
    };
    setLessons([...lessons, duplicated]);
    setModules(prev => prev.map(m => m.id === lesson.moduleId ? { ...m, lessonsCount: m.lessonsCount + 1 } : m));
  };

  const handleDeleteLesson = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this lesson from the module?')) {
      const lessonToDelete = lessons.find(l => l.id === lessonId);
      setLessons(prev => prev.filter(l => l.id !== lessonId));
      if (lessonToDelete) {
        setModules(prev => prev.map(m => m.id === lessonToDelete.moduleId ? { ...m, lessonsCount: Math.max(0, m.lessonsCount - 1) } : m));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        /* Specific overrides for lesson editor layout */
        .filter-row-panel {
          background-color: var(--bg-card);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .filter-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .filter-value {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .lessons-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .btn-icon-only {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          transition: all var(--transition-fast);
        }
        
        .btn-icon-only:hover {
          background-color: var(--bg-app);
          color: var(--text-primary);
        }
        
        .btn-icon-only svg {
          width: 16px;
          height: 16px;
        }
    
        .checkmark-icon {
          color: var(--color-green);
          display: inline-flex;
          align-items: center;
        }
        
        .checkmark-icon svg {
          width: 15px;
          height: 15px;
          stroke-width: 2.5px;
        }
    
        .lessons-layout {
          display: grid;
          grid-template-columns: minmax(320px, 3.4fr) minmax(0, 6.6fr);
          gap: 20px;
          align-items: start;
        }
    
        .lesson-list-panel .panel-header,
        .lesson-editor-panel .panel-header {
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
        }
    
        .lesson-list-panel .panel-title,
        .lesson-editor-panel .panel-title {
          line-height: 1.25;
        }
    
        .lesson-list-table {
          width: 100%;
          table-layout: fixed;
        }
    
        .lesson-title-cell {
          display: block;
          max-width: 100%;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
    
        .lesson-row-actions {
          display: inline-flex;
          gap: 2px;
          justify-content: flex-end;
          flex-wrap: nowrap;
        }
    
        .lesson-editor-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-left: auto;
        }
    
        .lesson-editor-body {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(220px, 0.95fr);
          gap: 20px;
        }
    
        .lesson-editor-main,
        .lesson-editor-side {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
    
        .lesson-settings-card {
          background-color: var(--bg-app);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 14px;
        }
    
        .lesson-editor-main .form-control,
        .lesson-editor-side .form-control {
          min-width: 0;
        }
    
        .form-tabs {
          flex-wrap: wrap;
          row-gap: 10px;
        }
    
        @media (max-width: 1320px) {
          .lessons-layout {
            grid-template-columns: 1fr;
          }
    
          .lesson-editor-body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <PageHeader
        title="Quản lý module & bài học"
        subtitle="Tạo nội dung học, bài tập và project cho từng khóa."
        onToggleSidebar={onToggleSidebar}
        showDateFilter={false}
        actions={
          <>
            <a className="btn-secondary" href="/courses" style={{ height: '32px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ChevronLeft size={13} />
              <span>Quay lại Courses</span>
            </a>
            <button 
              onClick={handleAddModule}
              className="btn-black"
              style={{ height: '32px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={12} />
              <span>Thêm module</span>
            </button>
          </>
        }
      />
      {/* Header Filter Panel */}
      <section className="filter-row-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div className="filter-item">
            <span className="filter-label">Khóa học</span>
            <div style={{ position: 'relative', display: 'inline-block', width: '260px', marginTop: '4px' }}>
              <select
                value={activeCourseId}
                onChange={(e) => setActiveCourseId(e.target.value)}
                className="form-control form-select"
                style={{ padding: '6px 30px 6px 10px', fontWeight: 500 }}
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-item">
            <span className="filter-label">Status</span>
            <span className="filter-value" style={{ marginTop: '6px' }}>
              <span className="w-1.5 h-1.5 bg-[var(--color-green)] rounded-full"></span>
              <span>Published</span>
            </span>
          </div>

          <div className="filter-item">
            <span className="filter-label">Level</span>
            <span style={{ marginTop: '4px' }}>
              <span className="badge badge-purple">
                {activeCourse?.level || 'Core'}
              </span>
            </span>
          </div>

          <div className="filter-item">
            <span className="filter-label">Tổng số module</span>
            <span className="filter-value" style={{ marginTop: '6px' }}>{modules.length}</span>
          </div>

          <div className="filter-item">
            <span className="filter-label">Tổng số lesson</span>
            <span className="filter-value" style={{ marginTop: '6px' }}>38</span>
          </div>
        </div>

        <div>
          <button
            onClick={() => alert(`Redirecting to details of: ${activeCourse.name}`)}
            className="btn-secondary"
            style={{ fontSize: '11.5px', padding: '5px 10px' }}
          >
            <span>Edit Course Info</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </section>

      {/* Main split dashboard layout */}
      <section className="lessons-layout">
        {/* Left Hand: Modules List Panel (1/3) */}
        <div className="grid-col-left">
          <div className="panel lesson-list-panel">
            <div className="panel-header" style={{ marginBottom: '14px' }}>
              <h2 className="panel-title">Module list</h2>
              <button
                onClick={handleAddModule}
                className="btn-secondary"
                style={{ fontSize: '11px', padding: '4px 8px' }}
              >
                <Plus size={11} />
                <span>Thêm module</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`module-list-item ${activeModuleId === mod.id ? 'selected' : ''}`}
                >
                  <div className="module-item-content">
                    <span className="drag-handle" style={{ cursor: 'grab' }}>
                      <GripVertical size={13} />
                    </span>
                    <div>
                      <div className="module-item-title">{mod.title}</div>
                      <div className="module-item-subtitle">{mod.lessonsCount} lessons</div>
                    </div>
                  </div>
                  <div className="module-actions">
                    <span className={`badge ${mod.status === 'Published' ? 'badge-green' : 'badge-gray'}`}>
                      {mod.status}
                    </span>
                    <MoreVertical size={14} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="lesson-settings-card" style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <Lightbulb size={14} className="text-[#d97706] shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-[var(--text-secondary)] leading-relaxed">
                Drag and drop to rearrange module sequence. Rearranging will update students' learning sequence.
              </p>
            </div>
          </div>
        </div>

        {/* Right Hand: Lessons List & Detail Editor Panel (2/3) */}
        <div className="grid-col-right">
          
          {/* Module active lesson list */}
          <div className="panel">
            <div className="panel-header" style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div className="panel-title-group">
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lessons Catalogue</span>
                <h3 className="panel-title" style={{ marginTop: '2px' }}>
                  Module: {modules.find(m => m.id === activeModuleId)?.title || 'Unknown'}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="search-input-wrapper" style={{ position: 'relative', width: '180px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '7.5px', color: 'var(--text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="Search lessons..."
                    value={lessonSearchQuery}
                    onChange={(e) => setLessonSearchQuery(e.target.value)}
                    className="form-control"
                    style={{ paddingLeft: '32px', height: '28px', fontSize: '11px', width: '100%' }}
                  />
                </div>
                <button
                  onClick={handleAddLesson}
                  className="btn-black"
                  style={{ height: '28px', fontSize: '11px', padding: '0 12px' }}
                >
                  <Plus size={12} />
                  <span>Add Lesson</span>
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="lesson-list-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>#</th>
                    <th>Lesson Title</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Type</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Required</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Status</th>
                    <th style={{ width: '60px', textAlign: 'center' }}>Order</th>
                    <th style={{ textAlign: 'right', width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {moduleLessons.map((l) => (
                    <tr
                      key={l.id}
                      onClick={() => setActiveLessonId(l.id)}
                      className={activeLessonId === l.id ? 'highlight-row' : ''}
                    >
                      <td style={{ textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{l.indexStr}</td>
                      <td>
                        <span className="lesson-title-cell" style={{ fontWeight: 600 }}>{l.title}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`badge ${
                          l.type === 'Video' ? 'badge-indigo' : l.type === 'Assignment' ? 'badge-orange' : 'badge-purple'
                        }`}>
                          {l.type}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {l.isRequired ? (
                          <span className="checkmark-icon"><Check size={14} /></span>
                        ) : (
                          <span style={{ color: '#d1d5db' }}>—</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`badge ${l.status === 'Published' ? 'badge-green' : 'badge-gray'}`}>
                          {l.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{l.order}</td>
                      <td>
                        <div className="lesson-row-actions" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => setActiveLessonId(l.id)}
                            className="btn-icon-only"
                            title="Edit details"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={(e) => handleDuplicateLesson(l, e)}
                            className="btn-icon-only"
                            title="Duplicate lesson"
                          >
                            <Copy size={12} />
                          </button>
                          <button
                            onClick={(e) => handleDeleteLesson(l.id, e)}
                            className="btn-icon-only hover:text-red-500"
                            title="Delete lesson"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {moduleLessons.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        No lessons inside this module yet. Click "Add lesson" to construct one!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
 
          {/* Form Editor panel */}
          {moduleLessons.length > 0 && (
            <div className="panel lesson-editor-panel" style={{ marginTop: '20px' }}>
              <div style={{ borderBottom: '1px solid var(--border-passive)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <h4 className="panel-title" style={{ fontSize: '13px' }}>
                    Edit Lesson: {activeLesson?.indexStr} • {activeLesson?.title}
                  </h4>
                  <div className="lesson-editor-actions">
                    <button
                      type="button"
                      onClick={() => alert(`Phát động thử nghiệm xem trước cho bài: ${activeLesson.title}`)}
                      className="btn-secondary"
                      style={{ height: '28px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Eye size={12} />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Đặt lại tất cả các thay đổi trên form bài học này?')) {
                          setActiveLessonId(activeLesson.id);
                        }
                      }}
                      className="btn-secondary"
                      style={{ height: '28px', fontSize: '11px' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveLesson}
                      className="btn-black"
                      style={{ height: '28px', fontSize: '11px' }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
 
                {/* Sub-tabs list */}
                <div className="flex gap-4 mt-4" style={{ borderBottom: '1px solid var(--border-passive)', paddingBottom: '4px' }}>
                  {[
                    { id: 'basic' as const, label: 'Basic Info' },
                    { id: 'content' as const, label: 'Content' },
                    { id: 'resources' as const, label: 'Resources & Assets' },
                    { id: 'advanced' as const, label: 'Advanced Settings' }
                  ].map(tab => (
                    <span
                      key={tab.id}
                      onClick={() => setActiveEditorTab(tab.id)}
                      className={`text-xs font-semibold pb-1 cursor-pointer transition-colors border-b-2 ${
                        activeEditorTab === tab.id
                          ? 'border-[var(--text-primary)] text-[var(--text-primary)] font-bold'
                          : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                      style={{ borderBottomWidth: '2px' }}
                    >
                      {tab.label}
                    </span>
                  ))}
                </div>
              </div>
 
              {/* Editorial sub-fields inside tab viewports */}
              {activeEditorTab === 'basic' ? (
                <form className="lesson-editor-body" onSubmit={handleSaveLesson}>
                  <div className="lesson-editor-main">
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" style={{ fontSize: '11.5px' }}>Lesson Title <span className="required">*</span></label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
 
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" style={{ fontSize: '11.5px' }}>Lesson Type <span className="required">*</span></label>
                      <select
                        value={editType}
                        onChange={(e) => setEditType(e.target.value as any)}
                        className="form-control form-select"
                        required
                      >
                        <option value="Video">Video</option>
                        <option value="Resource">Resource</option>
                        <option value="Assignment">Assignment</option>
                      </select>
                    </div>
 
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <label className="form-label" style={{ fontSize: '11.5px' }}>Brief Description</label>
                        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{editDesc.length} / 255</span>
                      </div>
                      <textarea
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="form-control form-textarea"
                        style={{ height: '70px' }}
                        maxLength={255}
                      />
                    </div>
 
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" style={{ fontSize: '11.5px' }}>Order Sequence <span className="required">*</span></label>
                      <input
                        type="number"
                        value={editOrder}
                        onChange={(e) => setEditOrder(parseInt(e.target.value) || 1)}
                        className="form-control"
                        required
                        min={1}
                      />
                    </div>
                  </div>
 
                  <div className="lesson-editor-side">
                    {/* Checkbox card widget */}
                    <div className="lesson-settings-card">
                      <span className="form-label" style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Completion status</span>
                      <label style={{ display: 'flex', alignItems: 'start', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={editRequired}
                          onChange={(e) => setEditRequired(e.target.checked)}
                          className="accent-black"
                          style={{ marginTop: '3px' }}
                        />
                        <div style={{ fontSize: '12px' }}>
                          <span className="student-name" style={{ display: 'block' }}>This lesson is required</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px', lineHeight: 1.4 }}>
                            Students must complete this lesson to satisfy course requirements and obtain certification.
                          </span>
                        </div>
                      </label>
                    </div>
 
                    <div className="form-group" style={{ marginBottom: '12px', marginTop: '12px' }}>
                      <label className="form-label" style={{ fontSize: '11.5px' }}>Publishing Status <span className="required">*</span></label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as any)}
                        className="form-control form-select"
                        required
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
 
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" style={{ fontSize: '11.5px' }}>Duration (Minutes)</label>
                      <input
                        type="number"
                        value={editDuration}
                        onChange={(e) => setEditDuration(parseInt(e.target.value) || 0)}
                        className="form-control"
                        min={0}
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px', border: '1px dashed var(--border-passive)', borderRadius: '8px' }}>
                  <Settings className="text-gray-400 stroke-1" size={24} style={{ margin: '0 auto 8px auto', display: 'block' }} />
                  <span>This sub-tab is loading configuration assets... You can manage standard information within the <strong>Basic Info</strong> tab.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
