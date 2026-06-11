/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileBadge,
  Layout,
  Plus,
  ArrowRight,
  Eye,
  Pencil,
  X,
  Code,
  Save,
  Grid,
  ChevronDown,
  Calendar,
  Search
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface TemplateItem {
  id: string;
  name: string;
  scope: string;
  scopeName: string;
  version: string;
  author: string;
  theme: 'light' | 'dark' | 'mono-blue' | 'deep-ocean';
  layout: string;
  status: 'active' | 'draft' | 'archived';
  statusName: string;
  updatedAt: string;
}

interface TemplatesProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

/**
 * Templates component handles vector design templates used for certificate generation,
 * rendering layout structures dynamically depending on operational themes.
 */
export default function Templates({ courses, onToggleSidebar }: TemplatesProps) {
  // Master templates state
  const [templates, setTemplates] = useState<TemplateItem[]>([
    {
      id: "1",
      name: "Mono Blue Classic",
      scope: "global",
      scopeName: "Global (All Courses)",
      version: "v1.2",
      author: "Admin User",
      theme: "mono-blue",
      layout: '{\n  "border": "solid",\n  "color": "#2b6cb0",\n  "signature": "SHA256"\n}',
      status: "active",
      statusName: "Active",
      updatedAt: "07/06/2026 15:30"
    },
    {
      id: "2",
      name: "Ocean Deep Tech",
      scope: "ai",
      scopeName: "AI Agent & Vibe Coding Bootcamp",
      version: "v1.1",
      author: "Admin User",
      theme: "deep-ocean",
      layout: '{\n  "border": "double",\n  "color": "#38bdf8",\n  "signature": "ECDSA"\n}',
      status: "active",
      statusName: "Active",
      updatedAt: "07/06/2026 15:35"
    },
    {
      id: "3",
      name: "Cyan Minimalist Slate",
      scope: "n8n",
      scopeName: "Web Automation with n8n",
      version: "v2.0-beta",
      author: "Admin User",
      theme: "mono-blue",
      layout: '{\n  "border": "none",\n  "color": "#1e3a8a",\n  "signature": "SHA256"\n}',
      status: "draft",
      statusName: "Draft",
      updatedAt: "07/06/2026 15:40"
    }
  ]);

  // Sidebar editor open state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTempId, setActiveTempId] = useState<string | null>(null);

  // Form states matching metadata fields
  const [formName, setFormName] = useState('');
  const [formScope, setFormScope] = useState('global');
  const [formVersion, setFormVersion] = useState('v1.0');
  const [formTheme, setFormTheme] = useState<'light' | 'dark' | 'mono-blue' | 'deep-ocean'>('light');
  const [formLayout, setFormLayout] = useState('');
  const [formIsActive, setFormIsActive] = useState(false);

  // Load selection fields to editor form
  const handleSelectTemplate = (item: TemplateItem) => {
    setActiveTempId(item.id);
    setFormName(item.name);
    setFormScope(item.scope);
    setFormVersion(item.version);
    setFormTheme(item.theme);
    setFormLayout(item.layout);
    setFormIsActive(item.status === 'active');
    setIsEditorOpen(true);
  };

  const handleOpenCreate = () => {
    setActiveTempId(null);
    setFormName('');
    setFormScope('global');
    setFormVersion('v1.0');
    setFormTheme('light');
    setFormLayout('{\n  "border": "double",\n  "color": "#1c1c1c",\n  "signature": "SHA256"\n}');
    setFormIsActive(false);
    setIsEditorOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) {
      alert("Please enter a template name!");
      return;
    }

    const scopeLabel = formScope === 'global' ? 'Global (All Courses)' : courses.find(c => c.id === formScope)?.name || 'Custom Specific';
    const statusVal = formIsActive ? 'active' as const : 'draft' as const;
    const statusLabel = statusVal === 'active' ? 'Active' : 'Draft';
    const dateStr = new Date().toLocaleDateString('en-US') + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5);

    // If making active, deactivate others of same scope
    let nextTemplates = [...templates];
    if (formIsActive) {
      nextTemplates = nextTemplates.map(t => t.scope === formScope ? { ...t, status: 'draft' as const, statusName: 'Draft' } : t);
    }

    if (activeTempId) {
      // Edit existing
      nextTemplates = nextTemplates.map(t => {
        if (t.id === activeTempId) {
          return {
            ...t,
            name: formName,
            scope: formScope,
            scopeName: scopeLabel,
            version: formVersion,
            theme: formTheme,
            layout: formLayout,
            status: statusVal,
            statusName: statusLabel,
            updatedAt: dateStr
          };
        }
        return t;
      });
    } else {
      // Create new
      const newId = String(templates.length + 1);
      nextTemplates.unshift({
        id: newId,
        name: formName,
        scope: formScope,
        scopeName: scopeLabel,
        version: formVersion,
        author: 'Admin User',
        theme: formTheme,
        layout: formLayout,
        status: statusVal,
        statusName: statusLabel,
        updatedAt: dateStr
      });
    }

    setTemplates(nextTemplates);
    setIsEditorOpen(false);
    alert("Layout template saved successfully!");
  };

  // Toggle archive status
  const handleToggleArchive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTemplates(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'archived' ? 'draft' as const : 'archived' as const;
        const nextLabel = nextStatus === 'archived' ? 'Archived' : 'Draft';
        return { ...t, status: nextStatus, statusName: nextLabel };
      }
      return t;
    }));
    alert("Archive status updated successfully.");
  };

  const [searchQuery, setSearchQuery] = useState('');

  // Computations
  const filteredTemplates = templates.filter(t => {
    const query = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(query) ||
      t.scopeName.toLowerCase().includes(query) ||
      t.version.toLowerCase().includes(query) ||
      t.author.toLowerCase().includes(query)
    );
  });

  const totalCount = templates.length;
  const activeCount = templates.filter(t => t.status === 'active').length;
  const draftCount = templates.filter(t => t.status === 'draft').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      <style>{`
        .template-card-preview {
          aspect-ratio: 1.414;
          width: 100%;
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          margin-top: 10px;
          position: relative;
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        
        .cert-mock-border {
          position: absolute;
          top: 10px; bottom: 10px; left: 10px; right: 10px;
          border: 2px double #d4af37;
          border-radius: 4px;
          pointer-events: none;
        }
        
        .cert-mock-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        
        .cert-mock-sub {
          font-size: 8px;
          color: var(--text-secondary);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        
        .cert-mock-recipient {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
          border-bottom: 1px solid var(--border-passive);
          padding-bottom: 4px;
          min-width: 150px;
          text-align: center;
        }
        
        .cert-mock-course {
          font-size: 10px;
          font-weight: 600;
          color: var(--color-indigo);
          margin-bottom: 16px;
        }
        
        .cert-mock-meta {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 7px;
          color: var(--text-secondary);
          margin-top: auto;
          padding: 0 10px;
        }
    
        .theme-dark-cert {
          background-color: #1c1c1c !important;
          color: #fff !important;
        }
        .theme-dark-cert .cert-mock-title { color: #d4af37 !important; }
        .theme-dark-cert .cert-mock-recipient { color: #fff !important; border-color: rgba(255,255,255,0.1) !important; }
        .theme-dark-cert .cert-mock-course { color: #a5b4fc !important; }
        .theme-dark-cert .cert-mock-sub { color: #a3a3a3 !important; }
    
        .json-box {
          background-color: var(--bg-app);
          border: 1px dashed var(--border-passive);
          border-radius: 6px;
          padding: 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          max-height: 120px;
          overflow-y: auto;
          white-space: pre-wrap;
        }
    
        /* Custom Grid Layout override for certificate-templates */
        #templates-grid.dashboard-grid {
          grid-template-columns: 1fr !important;
          gap: 24px;
        }
        
        #templates-grid.editor-closed .grid-col-right {
          display: none !important;
        }
    
        .editor-layout {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 32px;
          margin-top: 12px;
        }
        
        .editor-inputs-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .editor-preview-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }
    
        /* Override mockup max width for center layout */
        .template-card-preview {
          max-width: 480px;
          margin: 10px auto 0 auto;
        }
    
        /* Mono Blue Theme styling for certificate preview */
        .theme-mono-blue-cert {
          background-color: #f0f4f8 !important;
          color: #0f2d59 !important;
          border: 1px solid #c9d6e4 !important;
        }
        .theme-mono-blue-cert .cert-mock-border {
          border: 2px solid #2b6cb0 !important;
        }
        .theme-mono-blue-cert .cert-mock-title {
          color: #2b6cb0 !important;
        }
        .theme-mono-blue-cert .cert-mock-recipient {
          color: #0f2d59 !important;
          border-color: #cbd5e0 !important;
        }
        .theme-mono-blue-cert .cert-mock-course {
          color: #3182ce !important;
        }
        .theme-mono-blue-cert .cert-mock-sub {
          color: #4a5568 !important;
        }
        .theme-mono-blue-cert .cert-mock-meta {
          color: #718096 !important;
        }
    
        /* Deep Ocean Theme styling for certificate preview */
        .theme-deep-ocean-cert {
          background-color: #0f172a !important;
          color: #e2e8f0 !important;
          border: 1px solid #1e293b !important;
        }
        .theme-deep-ocean-cert .cert-mock-border {
          border: 2px double #38bdf8 !important;
        }
        .theme-deep-ocean-cert .cert-mock-title {
          color: #38bdf8 !important;
        }
        .theme-deep-ocean-cert .cert-mock-recipient {
          color: #ffffff !important;
          border-color: rgba(56, 189, 248, 0.2) !important;
        }
        .theme-deep-ocean-cert .cert-mock-course {
          color: #0ea5e9 !important;
        }
        .theme-deep-ocean-cert .cert-mock-sub {
          color: #94a3b8 !important;
        }
        /* Force secondary table columns to display since this grid stacks vertically */
        #templates-grid table th.col-secondary,
        #templates-grid table td.col-secondary {
          display: table-cell !important;
        }
      `}</style>

      <PageHeader
        title="Quản lý mẫu chứng chỉ"
        subtitle="Thiết kế, preview và cấu hình template cấp phát chứng nhận Blueprint."
        onToggleSidebar={onToggleSidebar}
        showDateFilter={false}
        actions={
          <>
            <button 
              onClick={handleOpenCreate}
              className="btn-black text-xs h-8 flex items-center gap-1"
            >
              <Plus size={12} />
              <span>Tạo mẫu mới</span>
            </button>
          </>
        }
      />

      {/* KPI Row (4 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-4" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Tổng số mẫu</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{totalCount}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>thiết kế được lưu</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Đang sử dụng (Active)</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-green)' }}>{activeCount}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>mẫu tự động cấp phát</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Bản nháp (Draft)</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-orange)' }}>{draftCount}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>đang thiết kế dở</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">Lịch sử cấp phát</span>
          </div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>1,248</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>chứng chỉ đã ký số</span>
        </div>
      </section>

      {/* Main Layout split drawer */}
      <section className={`dashboard-grid ${!isEditorOpen ? 'editor-closed' : ''}`} id="templates-grid">
        
        {/* LEFT COLUMN: Templates Table */}
        <div className="grid-col-left">
          <div className="panel">
            <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div className="panel-title-group">
                <h2 className="panel-title">Mẫu thiết kế chứng chỉ</h2>
                <span className="panel-subtitle" id="templates-count-label">{filteredTemplates.length} mẫu</span>
              </div>
              <div className="search-input-wrapper" style={{ position: 'relative', width: '200px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Tìm mẫu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '32px', height: '32px', fontSize: '12px', width: '100%' }}
                />
              </div>
            </div>

            <div className="table-container">
              <table id="templates-table">
                <thead>
                  <tr>
                    <th>Tên template</th>
                    <th className="col-secondary">Khóa áp dụng</th>
                    <th className="col-secondary">Phiên bản</th>
                    <th className="col-secondary">Giờ chỉnh sửa</th>
                    <th className="col-secondary">Người tạo</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTemplates.map((temp) => (
                    <tr
                      key={temp.id}
                      onClick={() => handleSelectTemplate(temp)}
                      className={`submission-row ${activeTempId === temp.id ? 'selected-row' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <td><strong>{temp.name}</strong></td>
                      <td className="col-secondary"><span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{temp.scopeName}</span></td>
                      <td className="col-secondary"><span className="cert-id" style={{ fontSize: '11.5px' }}>{temp.version}</span></td>
                      <td className="col-secondary"><span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{temp.updatedAt || '—'}</span></td>
                      <td className="col-secondary"><span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{temp.author}</span></td>
                      <td>
                        <span className={`badge ${
                          temp.status === 'active' ? 'badge-green' : temp.status === 'draft' ? 'badge-orange' : 'badge-red'
                        }`}>
                          {temp.statusName}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button className="btn-small" onClick={() => handleSelectTemplate(temp)} style={{ padding: '2px 6px' }}>Sửa</button>
                          <button className="btn-small" onClick={(e) => handleToggleArchive(temp.id, e)} style={{ padding: '2px 6px', color: 'var(--color-red)' }}>
                            {temp.status === 'archived' ? 'Mở lại' : 'Lưu trữ'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination-container">
              <span id="pagination-label">Hiển thị 1 - {templates.length} trong {templates.length} mẫu</span>
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

        {/* RIGHT COLUMN: Detail Drawer / Previewer */}
        <div className="grid-col-right">
          {isEditorOpen && (
            <div className="panel" id="template-editor-panel" style={{ position: 'sticky', top: '16px' }}>
              <div className="panel-header" style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-passive)', paddingBottom: '8px', position: 'relative' }}>
                <h2 className="panel-title" id="editor-title" style={{ fontSize: '13.5px' }}>{activeTempId ? `Chỉnh sửa: ${formName}` : 'Tạo mẫu thiết kế mới'}</h2>
                <button type="button" className="btn-icon-only" onClick={() => setIsEditorOpen(false)} style={{ position: 'absolute', right: 0, top: 0 }} title="Đóng panel">
                  <X size={14} />
                </button>
              </div>
              
              <form onSubmit={handleSaveForm} id="template-form">
                <div className="editor-layout">
                  {/* Left Column: Inputs & Actions */}
                  <div className="editor-inputs-col">
                    
                    <div className="form-row-2col">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="template-name">Tên template</label>
                        <input
                          type="text"
                          className="form-control"
                          id="template-name"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Ví dụ: Minimalist White Theme"
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="template-scope">Áp dụng cho khóa học</label>
                        <select
                          value={formScope}
                          onChange={(e) => setFormScope(e.target.value)}
                          className="form-control form-select"
                          id="template-scope"
                        >
                          <option value="global">Toàn bộ khóa học (Global)</option>
                          {courses.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-row-2col">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="template-version">Phiên bản</label>
                        <input
                          type="text"
                          className="form-control"
                          id="template-version"
                          value={formVersion}
                          onChange={(e) => setFormVersion(e.target.value)}
                          placeholder="v1.0"
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="template-theme">Theme visual style</label>
                        <select
                          value={formTheme}
                          onChange={(e) => setFormTheme(e.target.value as any)}
                          className="form-control form-select"
                          id="template-theme"
                        >
                          <option value="light">Light Theme (Warm White)</option>
                          <option value="dark">Dark Theme (Deep Slate)</option>
                          <option value="mono-blue">Mono Blue (Minimalist Slate Blue)</option>
                          <option value="deep-ocean">Deep Ocean (Modern dark-blue neon)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="template-layout">Cấu hình Layout JSON</label>
                      <textarea
                        className="form-control"
                        id="template-layout"
                        value={formLayout}
                        onChange={(e) => setFormLayout(e.target.value)}
                        style={{ height: '120px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}
                        placeholder='{ "border": "double", "signature": "SHA256" }'
                      />
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 }}>
                      <input
                        type="checkbox"
                        id="template-active"
                        checked={formIsActive}
                        onChange={(e) => setFormIsActive(e.target.checked)}
                      />
                      <label htmlFor="template-active" style={{ fontSize: '12.5px', fontWeight: 500, cursor: 'pointer', userSelect: 'none' }}>Đặt làm template hoạt động</label>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                      <button type="button" className="btn-secondary" onClick={() => setIsEditorOpen(false)} style={{ flex: 1, height: '36px', fontSize: '13px' }}>Hủy</button>
                      <button type="submit" className="btn-black" style={{ flex: 1, height: '36px', fontSize: '13px' }}>Lưu mẫu</button>
                    </div>
                  </div>

                  {/* Right Column: Live Preview */}
                  <div className="editor-preview-col">
                    <span className="form-label" style={{ alignSelf: 'flex-start', marginBottom: '4px' }}>Xem trước mẫu (Preview Mockup)</span>
                    <div
                      className={`template-card-preview ${
                        formTheme === 'dark' 
                          ? 'theme-dark-cert' 
                          : formTheme === 'mono-blue'
                          ? 'theme-mono-blue-cert'
                          : formTheme === 'deep-ocean'
                          ? 'theme-deep-ocean-cert'
                          : ''
                      }`}
                      id="preview-box"
                    >
                      <div className="cert-mock-border"></div>
                      <div className="cert-mock-title" id="mock-title">CERTIFICATE</div>
                      <div className="cert-mock-sub">OF COMPLETION</div>
                      <div className="cert-mock-recipient">NGUYỄN VĂN AN</div>
                      <div className="cert-mock-sub" style={{ marginBottom: '2px' }}>has successfully completed</div>
                      <div className="cert-mock-course" id="mock-course">
                        {formScope === 'global' ? 'Toàn bộ khóa học (Global)' : courses.find(c => c.id === formScope)?.name || 'Khóa học'}
                      </div>
                      <div className="cert-mock-meta">
                        <div>Issued: 07 Jun 2026</div>
                        <div>Signature ID: SHA256-HASH-SECURE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

      </section>
    </motion.div>
  );
}
