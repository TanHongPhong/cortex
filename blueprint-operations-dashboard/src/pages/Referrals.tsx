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
  X,
  User,
  SlidersHorizontal,
  RotateCcw,
  Search
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface ReferralCodeItem {
  id: string;
  owner: string;
  email: string;
  avatarText: string;
  code: string;
  rate: string;
  conversions: number;
  revenue: string;
  commission: string;
  status: 'active' | 'paused';
  statusName: string;
}

interface ConversionItem {
  id: string;
  referrerName: string;
  referrerEmail: string;
  referrerCode: string;
  referrerBank: string;
  referredName: string;
  referredEmail: string;
  referredCourse: string;
  orderCode: string;
  orderAmount: string;
  rewardAmount: string;
  date: string;
  status: 'pending' | 'approved' | 'cancelled';
  statusName: string;
}

interface ReferralsProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

export default function Referrals({ courses, onToggleSidebar }: ReferralsProps) {
  // Mock Referral Codes Data matching referrals.html
  const [codes, setCodes] = useState<ReferralCodeItem[]>([
    {
      id: "1",
      owner: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      avatarText: "NA",
      code: "AN10",
      rate: "10%",
      conversions: 8,
      revenue: "28,000,000đ",
      commission: "2,800,000đ",
      status: "active",
      statusName: "Đang chạy"
    },
    {
      id: "2",
      owner: "Trần Thị Bình",
      email: "binh.tran@email.com",
      avatarText: "TB",
      code: "BINH15",
      rate: "15%",
      conversions: 14,
      revenue: "56,000,000đ",
      commission: "8,400,000đ",
      status: "active",
      statusName: "Đang chạy"
    },
    {
      id: "3",
      owner: "Lê Minh Châu",
      email: "chau.le@email.com",
      avatarText: "LC",
      code: "CHAU20",
      rate: "20%",
      conversions: 3,
      revenue: "9,000,000đ",
      commission: "1,800,000đ",
      status: "paused",
      statusName: "Tạm dừng"
    }
  ]);

  // Mock Conversions Data matching referrals.html
  const [conversions, setConversions] = useState<ConversionItem[]>([
    {
      id: "101",
      referrerName: "Nguyễn Văn An",
      referrerEmail: "an.nguyen@email.com",
      referrerCode: "AN10",
      referrerBank: "Techcombank - 1903829182901 - NGUYEN VAN AN",
      referredName: "Phạm Hải Nam",
      referredEmail: "nam.pham@email.com",
      referredCourse: "AI Agent & Vibe Coding Bootcamp",
      orderCode: "ORD-992019",
      orderAmount: "3,500,000đ",
      rewardAmount: "350,000đ",
      date: "06/06/2026 11:20",
      status: "pending",
      statusName: "Chờ duyệt"
    },
    {
      id: "102",
      referrerName: "Trần Thị Bình",
      referrerEmail: "binh.tran@email.com",
      referrerCode: "BINH15",
      referrerBank: "Vietcombank - 001100298192 - TRAN THI BINH",
      referredName: "Hoàng Minh Đức",
      referredEmail: "duc.hoang@email.com",
      referredCourse: "Web Automation n8n nâng cao",
      orderCode: "ORD-991082",
      orderAmount: "2,000,000đ",
      rewardAmount: "300,000đ",
      date: "05/06/2026 15:45",
      status: "approved",
      statusName: "Đã duyệt & chi"
    },
    {
      id: "103",
      referrerName: "Lê Minh Châu",
      referrerEmail: "chau.le@email.com",
      referrerCode: "CHAU20",
      referrerBank: "MB Bank - 09819281928 - LE MINH CHAU",
      referredName: "Đỗ Bảo Trâm",
      referredEmail: "tram.do@email.com",
      referredCourse: "AI Agent & Vibe Coding Bootcamp",
      orderCode: "ORD-990022",
      orderAmount: "3,500,000đ",
      rewardAmount: "700,000đ",
      date: "02/06/2026 09:15",
      status: "cancelled",
      statusName: "Bị hủy (Refund)"
    }
  ]);

  // Selected conversion for details drawer
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [lastSelectedConv, setLastSelectedConv] = useState<ConversionItem | null>(null);
  const activeConversion = (selectedConvId ? conversions.find(c => c.id === selectedConvId) : null) || lastSelectedConv;

  React.useEffect(() => {
    if (selectedConvId) {
      const found = conversions.find(c => c.id === selectedConvId);
      if (found) {
        setLastSelectedConv(found);
      }
    }
  }, [selectedConvId, conversions]);

  // Search states
  const [searchQueryCodes, setSearchQueryCodes] = useState('');
  const [searchQueryConv, setSearchQueryConv] = useState('');

  const filteredCodes = codes.filter(c => {
    const query = searchQueryCodes.toLowerCase().trim();
    if (!query) return true;
    return (
      c.owner.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.code.toLowerCase().includes(query)
    );
  });

  const filteredConversions = conversions.filter(item => {
    const query = searchQueryConv.toLowerCase().trim();
    if (!query) return true;
    return (
      item.referrerName.toLowerCase().includes(query) ||
      item.referrerEmail.toLowerCase().includes(query) ||
      item.referrerCode.toLowerCase().includes(query) ||
      item.referredName.toLowerCase().includes(query) ||
      item.referredEmail.toLowerCase().includes(query) ||
      item.referredCourse.toLowerCase().includes(query) ||
      item.orderCode.toLowerCase().includes(query)
    );
  });

  const handleToggleCodeStatus = (id: string) => {
    setCodes(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'active' ? 'paused' as const : 'active' as const;
        const nextStatusName = nextStatus === 'active' ? 'Đang chạy' : 'Tạm dừng';
        return {
          ...item,
          status: nextStatus,
          statusName: nextStatusName
        };
      }
      return item;
    }));
  };

  const handleApproveReward = () => {
    if (!selectedConvId) return;
    if (confirm('Phê duyệt hoa hồng này và chuyển sang trạng thái Đã chi trả?')) {
      setConversions(prev => prev.map((item) => {
        if (item.id === selectedConvId) {
          return {
            ...item,
            status: 'approved',
            statusName: 'Đã duyệt & chi'
          };
        }
        return item;
      }));

      // Update conversions count in code list
      setCodes(prev => prev.map(c => {
        if (c.code === activeConversion?.referrerCode) {
          return {
            ...c,
            conversions: c.conversions + 1
          };
        }
        return c;
      }));

      setSelectedConvId(null);
      alert('Phê duyệt hoa hồng thành công.');
    }
  };

  const handleDeclineReward = () => {
    if (!selectedConvId) return;
    if (confirm('Hủy và đánh dấu giao dịch referral này là gian lận/hoàn tiền?')) {
      setConversions(prev => prev.map((item) => {
        if (item.id === selectedConvId) {
          return {
            ...item,
            status: 'cancelled',
            statusName: 'Bị hủy (Refund)'
          };
        }
        return item;
      }));
      setSelectedConvId(null);
      alert('Đã từ chối/hủy khoản hoa hồng này.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <PageHeader
        title="Quản lý chương trình giới thiệu (Referral)"
        subtitle="Theo dõi các mã giới thiệu và phê duyệt thanh toán hoa hồng affiliate."
        onToggleSidebar={onToggleSidebar}
        
      />

      {/* KPI Row (5 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-5" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Mã đang hoạt động</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px' }}>120</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Active referral codes</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Tổng lượt giới thiệu</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px' }}>450</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>click hoặc sử dụng link</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Đơn thành công (Paid)</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-green)' }}>210</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>đăng ký học paid thành công</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Thưởng chờ duyệt</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-orange)' }}>15</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>conversions cần đối soát</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Tổng hoa hồng đã phát</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-indigo)' }}>19,500,000đ</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>đã chuyển khoản</span>
        </div>
      </section>

      {/* Layout Grid */}
      <section
        className={`dashboard-grid ${activeConversion ? 'split-active' : ''}`}
        id="referrals-grid"
        style={{ gridTemplateColumns: '1fr', gap: '20px' }}
      >
        {/* LEFT COLUMN: Contains both tables stacked vertically */}
        <div className="grid-col-left" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Panel: Referral Codes */}
          <div className="panel">
            <div className="panel-header flex items-center justify-between" style={{ gap: '16px', flexWrap: 'wrap' }}>
              <div className="panel-title-group">
                <h2 className="panel-title">Danh sách mã giới thiệu (Referrals)</h2>
                <span className="panel-subtitle">Theo dõi mã chiết khấu cá nhân</span>
              </div>
              <div className="search-input-wrapper" style={{ position: 'relative', minWidth: '240px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm chủ mã, email hoặc mã..."
                  value={searchQueryCodes}
                  onChange={(e) => setSearchQueryCodes(e.target.value)}
                  style={{ paddingLeft: '30px', height: '32px', fontSize: '12px' }}
                />
                <Search size={13} className="text-gray-400" style={{ position: 'absolute', left: '10px', top: '9px' }} />
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Chủ mã (User)</th>
                    <th className="col-secondary">Mã referral</th>
                    <th>Tỉ lệ thưởng</th>
                    <th className="col-secondary">Đơn hàng thành công</th>
                    <th>Tổng doanh thu</th>
                    <th className="col-secondary">Hoa hồng tích lũy</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCodes.map((item) => {
                    const statusClass = item.status === 'active' ? 'badge-green' : 'badge-orange';
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="col-student">
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span className="student-name">{item.owner}</span>
                              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{item.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="col-secondary"><span className="cert-id" style={{ fontSize: '12px' }}>{item.code}</span></td>
                        <td><strong style={{ fontSize: '11.5px' }}>{item.rate}</strong></td>
                        <td className="col-secondary" style={{ fontWeight: 600, textAlign: 'center' }}>{item.conversions}</td>
                        <td style={{ fontSize: '11.5px' }}>{item.revenue}</td>
                        <td className="col-secondary" style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-indigo)' }}>{item.commission}</td>
                        <td><span className={`badge ${statusClass}`}>{item.statusName}</span></td>
                        <td>
                          <button
                            className="btn-small pause-code-btn"
                            style={{ padding: '2px 6px' }}
                            onClick={() => handleToggleCodeStatus(item.id)}
                          >
                            {item.status === 'active' ? 'Tạm dừng' : 'Chạy lại'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Panel: Conversions Table */}
          <div className="panel">
            <div className="panel-header flex items-center justify-between" style={{ gap: '16px', flexWrap: 'wrap' }}>
              <div className="panel-title-group">
                <h2 className="panel-title">Lịch sử conversions và đối soát hoa hồng</h2>
                <span className="panel-subtitle">Chi tiết từng giao dịch giới thiệu thành công</span>
              </div>
              <div className="search-input-wrapper" style={{ position: 'relative', minWidth: '240px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm người giới thiệu, học viên, mã đơn..."
                  value={searchQueryConv}
                  onChange={(e) => setSearchQueryConv(e.target.value)}
                  style={{ paddingLeft: '30px', height: '32px', fontSize: '12px' }}
                />
                <Search size={13} className="text-gray-400" style={{ position: 'absolute', left: '10px', top: '9px' }} />
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Người giới thiệu</th>
                    <th className="col-secondary">Học viên mới</th>
                    <th>Đơn hàng</th>
                    <th className="col-secondary">Giá trị đơn</th>
                    <th>Hoa hồng</th>
                    <th className="col-secondary">Ngày ghi nhận</th>
                    <th>Trạng thái thưởng</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConversions.map((item) => {
                    let statusClass = 'badge-orange';
                    if (item.status === 'approved') statusClass = 'badge-green';
                    if (item.status === 'cancelled') statusClass = 'badge-red';

                    return (
                      <tr
                        key={item.id}
                        style={{ cursor: 'pointer' }}
                        className={selectedConvId === item.id ? 'highlight-row' : ''}
                        onClick={() => setSelectedConvId(item.id)}
                      >
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="student-name">{item.referrerName}</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{item.referrerCode}</span>
                          </div>
                        </td>
                        <td className="col-secondary">
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600, fontSize: '11.5px' }}>{item.referredName}</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{item.referredEmail}</span>
                          </div>
                        </td>
                        <td><span className="cert-id" style={{ fontSize: '11.5px' }}>{item.orderCode}</span></td>
                        <td className="col-secondary" style={{ fontSize: '11.5px' }}>{item.orderAmount}</td>
                        <td style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-indigo)' }}>{item.rewardAmount}</td>
                        <td className="col-secondary" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.date}</td>
                        <td><span className={`badge ${statusClass}`}>{item.statusName}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* DETAIL SIDE-DRAWER */}
      <div className={`detail-drawer ${selectedConvId ? '' : 'drawer-closed'}`} id="conversion-drawer">
        <div className="drawer-header">
          <h3 className="drawer-title">Đối soát hoa hồng Referral</h3>
          <button
            className="drawer-close-btn"
            id="drawer-close"
            aria-label="Close drawer"
            onClick={() => setSelectedConvId(null)}
          >
            <X size={14} />
          </button>
        </div>

        {activeConversion && (
          <div className="drawer-body" style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Referrer Info */}
            <div className="drawer-section">
              <span className="drawer-section-title">Người giới thiệu (Referrer)</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                <div className="avatar avatar-tt" id="drawer-referrer-avatar" style={{ width: '36px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  {activeConversion.referrerName.split(' ').slice(-1)[0].substring(0,2).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600 }} id="drawer-referrer-name">{activeConversion.referrerName}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }} id="drawer-referrer-email">{activeConversion.referrerEmail}</span>
                </div>
              </div>
              <div style={{ marginTop: '10px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Mã code: <strong>{activeConversion.referrerCode}</strong></div>
                <div>Tài khoản ngân hàng: <strong>{activeConversion.referrerBank}</strong></div>
              </div>
            </div>

            {/* Referred Info */}
            <div className="drawer-section">
              <span className="drawer-section-title">Học viên mới mua (Referred)</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                <div className="avatar avatar-nv" id="drawer-referred-avatar" style={{ width: '36px', height: '36px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  {activeConversion.referredName.split(' ').slice(-1)[0].substring(0,2).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600 }} id="drawer-referred-name">{activeConversion.referredName}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }} id="drawer-referred-email">{activeConversion.referredEmail}</span>
                </div>
              </div>
              <div style={{ marginTop: '10px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Khóa đăng ký: <strong>{activeConversion.referredCourse}</strong></div>
                <div>Mã đơn hàng: <strong>{activeConversion.orderCode}</strong></div>
                <div>Trạng thái đơn: <span className="badge badge-green">Paid</span></div>
              </div>
            </div>

            {/* Payout Info */}
            <div className="drawer-section">
              <span className="drawer-section-title">Chi tiết hoa hồng đối soát</span>
              <div style={{ backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-passive)', borderRadius: '6px', padding: '12px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Giá trị đơn hàng:</span>
                  <strong>{activeConversion.orderAmount}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Tỉ lệ hoa hồng:</span>
                  <strong>{activeConversion.referrerCode.includes("15") ? "15%" : activeConversion.referrerCode.includes("20") ? "20%" : "10%"}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderTop: '1px solid var(--border-passive)', paddingTop: '6px', marginTop: '4px' }}>
                  <span>Số tiền thưởng:</span>
                  <strong style={{ color: 'var(--color-indigo)' }}>{activeConversion.rewardAmount}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {activeConversion.status === 'pending' && (
              <div className="drawer-actions" id="payout-actions-block" style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                <button
                  className="btn-secondary"
                  style={{ flex: 1, color: 'var(--color-red)', height: '36px' }}
                  onClick={handleDeclineReward}
                >
                  Hủy / Từ chối thưởng
                </button>
                <button
                  className="btn-black"
                  style={{ flex: 1, height: '36px' }}
                  onClick={handleApproveReward}
                >
                  Phê duyệt và chi trả
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
