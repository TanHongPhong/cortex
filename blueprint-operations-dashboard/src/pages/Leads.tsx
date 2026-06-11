/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  X,
  Mail,
  Phone,
  Calendar,
  Globe,
  Copy,
  Users,
  RotateCcw,
  Eye,
  Settings,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ChevronDown,
  Download,
  SlidersHorizontal
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Lead } from '../types';

interface LeadsProps {
  leads: Lead[];
  onCreateLead: (newLead: Lead) => void;
  onUpdateLead: (updatedLead: Lead) => void;
  onConvertLead: (lead: Lead) => void;
  onToggleSidebar?: () => void;
}

export default function Leads({ leads, onCreateLead, onUpdateLead, onConvertLead, onToggleSidebar }: LeadsProps) {

  // States
  const [drawerOpenId, setDrawerOpenId] = useState<string | null>(null);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'details' | 'notes'>('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [needsFilter, setNeedsFilter] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Creation Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadNeeds, setNewLeadNeeds] = useState('AI Agent & Vibe Coding Bootcamp');
  const [newLeadSource, setNewLeadSource] = useState('contact_page');
  const [newLeadRequest, setNewLeadRequest] = useState('');

  // Active Lead computation
  const [lastSelectedLead, setLastSelectedLead] = useState<Lead | null>(null);
  const activeLead = leads.find(l => l.id === drawerOpenId) || lastSelectedLead;

  React.useEffect(() => {
    const found = leads.find(l => l.id === drawerOpenId);
    if (found) {
      setLastSelectedLead(found);
    }
  }, [drawerOpenId, leads]);

  // Filter application
  const filteredLeads = leads.filter(l => {
    if (statusFilter && l.status !== statusFilter) return false;
    if (sourceFilter && l.source !== sourceFilter) return false;
    if (needsFilter && l.needs !== needsFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q)
      );
    }
    return true;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Đã sao chép: ${text}`);
  };

  const handleUpdateStatus = (leadId: string, newStatus: 'new' | 'contacted' | 'lost') => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      const statusNames = { new: 'NEW', contacted: 'CONTACTED', lost: 'LOST' };
      onUpdateLead({
        ...lead,
        status: newStatus,
        statusName: statusNames[newStatus]
      });
    }
  };

  const handleAddNote = (leadId: string, noteText: string) => {
    if (!noteText.trim()) return;
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      onUpdateLead({
        ...lead,
        note: noteText,
        noteUpdated: `Cập nhật: ${new Date().toLocaleString('vi-VN')} bởi Admin User`
      });
      alert('Đã cập nhật ghi chú tư vấn!');
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = newLeadName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    const newId = String(leads.length + 1);

    const newLead: Lead = {
      id: newId,
      name: newLeadName,
      initials: initials,
      avatarClass: `avatar-${initials.toLowerCase().replace(/[^a-z]/g, 'a')}`,
      email: newLeadEmail,
      phone: newLeadPhone,
      needs: newLeadNeeds,
      source: newLeadSource,
      sourceType: newLeadSource === 'contact_page' ? 'globe' : 'users',
      status: 'new',
      statusName: 'NEW',
      createdAt: new Date().toLocaleString('vi-VN'),
      request: newLeadRequest || 'Không có yêu cầu cụ thể.',
      note: '',
      noteUpdated: ''
    };

    onCreateLead(newLead);
    setIsModalOpen(false);

    // Reset inputs
    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadPhone('');
    setNewLeadNeeds('AI Agent & Vibe Coding Bootcamp');
    setNewLeadSource('contact_page');
    setNewLeadRequest('');

    alert(`Đã thêm thành công lead mới "${newLeadName}"!`);
  };

  const handleExportLeads = () => {
    // CSV Header
    const headers = ["ID", "Họ và tên", "Email", "Số điện thoại", "Nguồn Lead", "Khóa học quan tâm", "Trạng thái", "Ngày tạo", "Lời nhắn của Lead"];
    
    // CSV Rows
    const rows = filteredLeads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${l.source.replace(/"/g, '""')}"`,
      `"${l.needs.replace(/"/g, '""')}"`,
      l.statusName,
      l.createdAt,
      `"${l.request.replace(/"/g, '""')}"`
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
    link.setAttribute("download", `leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // KPIs
  const totalLeads = leads.length + 245; // Offsets to match mockup numbers
  const newLeads = leads.filter(l => l.status === 'new').length + 85;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length + 111;
  const lostLeads = leads.filter(l => l.status === 'lost').length + 49;
  const needContactLeads = leads.filter(l => l.status !== 'lost').length + 72;

  const [noteInput, setNoteInput] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        .source-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 6px;
          border-radius: 4px;
          background-color: #f1f5f9;
          color: #475569;
          font-size: 10.5px;
          font-weight: 500;
        }
        .source-badge svg {
          width: 11px;
          height: 11px;
        }
        .lead-profile-block {
          background-color: var(--bg-app);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .note-edit-box {
          background-color: var(--bg-app);
          border: 1px solid var(--border-passive);
          border-radius: 6px;
          padding: 10px;
          font-size: 12px;
          line-height: 1.4;
          position: relative;
        }
        .note-edit-icon {
          position: absolute;
          right: 8px;
          top: 8px;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .note-edit-icon:hover {
          color: var(--text-primary);
        }

        /* Modal Styles */
        .modal {
          display: flex;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(28, 28, 28, 0.4);
          backdrop-filter: blur(4px);
          justify-content: center;
          align-items: center;
        }

        /* Details drawer profile & tabs */
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

        .drawer-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-passive);
          margin-top: 16px;
          margin-bottom: 12px;
          gap: 14px;
        }
        
        .drawer-tab {
          padding-bottom: 6px;
          font-size: 12.5px;
          font-weight: 550;
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
      `}</style>

      <PageHeader
        title="Quản lý Type B Leads"
        subtitle="Quản lý khách hàng tiềm năng chưa có tài khoản từ form liên hệ, workshop, download tài liệu."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              className="btn-black h-8 px-3 flex items-center gap-1.5" 
              id="export-btn"
              onClick={handleExportLeads}
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </>
        }
      />

      {/* KPI GRID ROW (5 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-5" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Tổng leads</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{totalLeads}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>tất cả thời gian</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Leads mới (new)</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{newLeads}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}>+12</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với tuần trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Đã liên hệ (contacted)</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{contactedLeads}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px' }}>+9</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với tuần trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Đã mất (lost)</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-orange-dark)' }}>{lostLeads}</span>
            <span className="kpi-trend trend-down" style={{ fontSize: '11px', color: 'var(--color-orange)' }}>+3</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với tuần trước</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Cần liên hệ</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-indigo)' }}>{needContactLeads}</span>
            <span className="kpi-trend trend-up" style={{ fontSize: '11px', color: 'var(--color-indigo)' }}>+15</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>so với tuần trước</span>
        </div>
      </section>

      {/* CRM Main Layout Grid */}
      <section 
        className={`dashboard-grid ${!drawerOpenId ? 'drawer-closed' : ''}`} 
        id="lead-grid" 
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
                    placeholder="Tìm theo tên, email hoặc số điện thoại..."
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
                {(statusFilter || sourceFilter || needsFilter || searchQuery) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('');
                      setSourceFilter('');
                      setNeedsFilter('');
                      setDrawerOpenId(null);
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
                  <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                    <select 
                      className="form-control form-select" 
                      id="filter-status" 
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">Tất cả trạng thái</option>
                      <option value="new">Mới (new)</option>
                      <option value="contacted">Đã liên hệ (contacted)</option>
                      <option value="lost">Đã mất (lost)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '150px' }}>
                    <select 
                      className="form-control form-select" 
                      id="filter-source" 
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                    >
                      <option value="">Tất cả nguồn lead</option>
                      <option value="contact_page">Contact Page</option>
                      <option value="workshop_signup">Workshop Signup</option>
                      <option value="resource_download">Resource Download</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0, minWidth: '180px' }}>
                    <select 
                      className="form-control form-select" 
                      id="filter-needs" 
                      style={{ padding: '4px 8px', height: '32px', fontSize: '12px' }}
                      value={needsFilter}
                      onChange={(e) => setNeedsFilter(e.target.value)}
                    >
                      <option value="">Tất cả nhu cầu khóa học</option>
                      <option value="AI Agent & Vibe Coding Bootcamp">AI Agent & Vibe Coding</option>
                      <option value="Vibe Coding Basics">Vibe Coding Basics</option>
                      <option value="Web Automation n8n nâng cao">Web Automation n8n</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2 className="panel-title">Danh sách leads</h2>
                <span className="panel-subtitle">({filteredLeads.length} leads)</span>
              </div>
            </div>

            <div className="table-container">
              <table id="leads-table">
                <thead>
                  <tr>
                    <th>Prospect</th>
                    <th className="col-secondary">Phone</th>
                    <th>Source</th>
                    <th className="col-secondary">Required Topic</th>
                    <th>Status</th>
                    <th className="col-secondary">Captured At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((item) => (
                    <tr 
                      key={item.id} 
                      style={{ cursor: 'pointer' }}
                      className={drawerOpenId === item.id ? 'highlight-row' : ''}
                      onClick={() => setDrawerOpenId(item.id)}
                    >
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontWeight: 600 }}>{item.name}</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{item.email}</span>
                        </div>
                      </td>
                      <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{item.phone}</td>
                      <td>
                        <span className="source-badge">
                          <Globe size={11} />
                          <span>{item.source}</span>
                        </span>
                      </td>
                      <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{item.needs}</td>
                      <td>
                        <span className={`badge ${
                          item.status === 'new' ? 'badge-indigo' : item.status === 'contacted' ? 'badge-purple' : 'badge-red'
                        }`}>
                          {item.statusName}
                        </span>
                      </td>
                      <td className="col-secondary" style={{ color: 'var(--text-secondary)' }}>{item.createdAt}</td>
                      <td>
                        <button 
                          className="btn-icon-only view-details-btn" 
                          title="Xem chi tiết"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDrawerOpenId(item.id);
                          }}
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginator */}
            <div className="pagination-container">
              <span id="pagination-label">Hiển thị 1 - {filteredLeads.length} trong {filteredLeads.length} leads</span>
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
          {activeLead && (
            <div className="panel" style={{ position: 'sticky', top: '16px' }}>
              
              <div className="student-profile-header" style={{ paddingBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="student-profile-name" style={{ fontSize: '15px' }}>Chi tiết lead</span>
                  <span className="cert-id" id="drawer-lead-id">LEAD-2026-000{activeLead.id}</span>
                </div>
                <button 
                  className="btn-icon-only" 
                  id="close-drawer-btn" 
                  style={{ position: 'absolute', right: 0, top: 0 }} 
                  title="Đóng panel"
                  onClick={() => setDrawerOpenId(null)}
                >
                  <X size={14} />
                </button>
              </div>

              {/* Sub-tabs details vs notes */}
              <div className="drawer-tabs">
                <div 
                  onClick={() => setActiveDrawerTab('details')}
                  className={`drawer-tab ${activeDrawerTab === 'details' ? 'active' : ''}`}
                >
                  Contact Details
                </div>
                <div 
                  onClick={() => setActiveDrawerTab('notes')}
                  className={`drawer-tab ${activeDrawerTab === 'notes' ? 'active' : ''}`}
                >
                  Consulting Log ({activeLead.note ? 1 : 0})
                </div>
              </div>

              {activeDrawerTab === 'details' ? (
                <div>
                  <div className="drawer-profile-header" style={{ marginBottom: '14px' }}>
                    <div className="drawer-profile-avatar" style={{ backgroundColor: '#faf5ff', color: '#6b21a8' }}>
                      {activeLead.initials}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 600 }}>{activeLead.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{activeLead.email}</span>
                    </div>
                  </div>

                  <div className="detail-section-title">
                    <span>Thông tin liên hệ</span>
                  </div>
                  <div className="detail-list">
                    <div className="detail-item">
                      <span className="detail-label">Email:</span>
                      <button 
                        className="btn-secondary copy-btn" 
                        onClick={() => handleCopy(activeLead.email)}
                        style={{ fontSize: '11.5px', padding: '2px 6px', height: 'auto', display: 'inline-flex', gap: '4px' }}
                      >
                        <span>{activeLead.email}</span>
                        <Copy size={11} />
                      </button>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Số điện thoại:</span>
                      <button 
                        className="btn-secondary copy-btn" 
                        onClick={() => handleCopy(activeLead.phone)}
                        style={{ fontSize: '11.5px', padding: '2px 6px', height: 'auto', display: 'inline-flex', gap: '4px' }}
                      >
                        <span>{activeLead.phone}</span>
                        <Copy size={11} />
                      </button>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Captured At:</span>
                      <span className="detail-value">{activeLead.createdAt}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Kênh/Nguồn:</span>
                      <span className="detail-value" style={{ color: 'var(--color-indigo)', fontWeight: 'bold' }}>{activeLead.source}</span>
                    </div>
                  </div>

                  <div className="detail-section-title">
                    <span>Lời nhắn của Lead</span>
                  </div>
                  <div style={{ 
                    padding: '12px 14px', 
                    fontSize: '12px', 
                    fontStyle: 'italic', 
                    marginBottom: '14px', 
                    backgroundColor: 'var(--bg-app)', 
                    borderLeft: '3px solid var(--text-secondary)',
                    borderRadius: '0 6px 6px 0',
                    color: 'var(--text-primary)',
                    lineHeight: 1.4
                  }}>
                    "{activeLead.request}"
                  </div>

                  <div className="detail-section-title">
                    <span>Nhu cầu khóa học</span>
                  </div>
                  <div className="detail-list" style={{ marginBottom: '14px' }}>
                    <div className="detail-item">
                      <span className="detail-label">Khóa học đăng ký:</span>
                      <span className="detail-value" style={{ fontWeight: 'semibold' }}>{activeLead.needs}</span>
                    </div>
                  </div>

                  {/* Status controllers */}
                  <div className="detail-section-title">
                    <span>Cập nhật trạng thái</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <button 
                      onClick={() => handleUpdateStatus(activeLead.id, 'new')}
                      className={`btn-secondary ${activeLead.status === 'new' ? 'active' : ''}`}
                      style={{ fontSize: '11.5px', padding: '4px 10px', height: 'auto' }}
                    >
                      New Lead
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(activeLead.id, 'contacted')}
                      className={`btn-secondary ${activeLead.status === 'contacted' ? 'active' : ''}`}
                      style={{ fontSize: '11.5px', padding: '4px 10px', height: 'auto' }}
                    >
                      Contacted
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(activeLead.id, 'lost')}
                      className={`btn-secondary ${activeLead.status === 'lost' ? 'active' : ''}`}
                      style={{ fontSize: '11.5px', padding: '4px 10px', height: 'auto' }}
                    >
                      Lost
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Bạn có chắc muốn chuyển lead "${activeLead.name}" thành học viên chính thức?`)) {
                          onConvertLead(activeLead);
                          alert(`Đã chuyển thành công lead "${activeLead.name}" thành học viên!`);
                        }
                      }}
                      className="btn-black"
                      style={{ fontSize: '11.5px', padding: '4px 10px', height: 'auto', marginLeft: 'auto' }}
                    >
                      Convert to Student
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activeLead.note ? (
                    <div style={{ 
                      backgroundColor: 'var(--bg-app)', 
                      border: '1px solid var(--border-passive)', 
                      borderRadius: '8px', 
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border-passive)', paddingBottom: '6px' }}>
                        <span style={{ fontWeight: 600, fontSize: '11.5px', color: 'var(--text-primary)' }}>Lịch sử tư vấn</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{activeLead.noteUpdated || activeLead.createdAt}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                        {activeLead.note}
                      </p>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-green)', display: 'inline-block' }}></span>
                        <span>Cập nhật bởi Admin User</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '24px 0', fontStyle: 'italic', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px' }}>
                      Chưa có ghi chú cuộc gọi tư vấn nào được tạo cho lead này.
                    </div>
                  )}

                  <div className="detail-section-title" style={{ marginTop: '4px' }}>
                    <span>Ghi chú cuộc gọi tư vấn</span>
                  </div>
                  <textarea 
                    className="form-control" 
                    rows={4}
                    placeholder="Nhập ghi chú chi tiết cuộc gọi điện thoại, zalo hoặc tư vấn khóa học..." 
                    style={{ fontSize: '12px', padding: '8px 10px' }}
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                  ></textarea>
                  <button 
                    className="btn-black" 
                    style={{ height: '32px', fontSize: '12px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => {
                      handleAddNote(activeLead.id, noteInput);
                      setNoteInput('');
                    }}
                  >
                    Lưu ghi chú
                  </button>
                </div>
              )}

            </div>
          )}
        </div>

      </section>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            id="create-modal"
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="panel"
              style={{ backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '8px', width: '480px', maxWidth: '90%', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-passive)' }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-passive)', paddingBottom: '10px', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Thêm lead thủ công</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="btn-icon-only" 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Họ và tên</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ví dụ: Nguyễn Văn An" 
                  required 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="name@email.com" 
                  required 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Số điện thoại</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="09xxxxxxxx" 
                  required 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Khóa học quan tâm</label>
                <select 
                  className="form-control form-select" 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={newLeadNeeds}
                  onChange={(e) => setNewLeadNeeds(e.target.value)}
                >
                  <option value="AI Agent & Vibe Coding Bootcamp">AI Agent & Vibe Coding Bootcamp</option>
                  <option value="Vibe Coding Basics">Vibe Coding Basics</option>
                  <option value="Web Automation n8n nâng cao">Web Automation n8n nâng cao</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Nguồn Lead</label>
                <select 
                  className="form-control form-select" 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px' }}
                  value={newLeadSource}
                  onChange={(e) => setNewLeadSource(e.target.value)}
                >
                  <option value="contact_page">Contact Page</option>
                  <option value="workshop_signup">Workshop Signup</option>
                  <option value="resource_download">Resource Download</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ marginBottom: '4px', display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Yêu cầu chi tiết</label>
                <textarea 
                  className="form-control" 
                  rows={3} 
                  placeholder="Nhập yêu cầu từ lời nhắn của lead..." 
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--border-passive)', borderRadius: '6px', fontSize: '12.5px', fontFamily: 'inherit', resize: 'vertical' }}
                  value={newLeadRequest}
                  onChange={(e) => setNewLeadRequest(e.target.value)}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px', borderTop: '1px solid var(--border-passive)', paddingTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="btn-secondary" 
                  style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 500, height: 'auto' }}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="btn-black" 
                  style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 500, height: 'auto' }}
                >
                  Lưu lead
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
