/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  Palette,
  CreditCard,
  Key,
  Shield,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface SettingsProps {
  courses: Course[];
  onToggleSidebar?: () => void;
  themeMode?: string;
  setThemeMode?: (theme: string) => void;
}

export default function Settings({ courses, onToggleSidebar, themeMode = 'dark', setThemeMode }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'theme' | 'payments' | 'api' | 'security'>('general');

  // Form States
  // General Tab
  const [platformName, setPlatformName] = useState('Blueprint Learning Platform');
  const [domain, setDomain] = useState('https://blueprint.edu.vn');
  const [supportEmail, setSupportEmail] = useState('support@blueprint.edu.vn');
  const [contactPhone, setContactPhone] = useState('+84 24 1234 5678');
  const [copyrightText, setCopyrightText] = useState('© 2026 Blueprint. All rights reserved.');

  // Theme Tab
  const [themeModeState, setThemeModeState] = useState(themeMode);
  const [primaryFont, setPrimaryFont] = useState('plus');
  const [layoutDensity, setLayoutDensity] = useState('compact');

  useEffect(() => {
    setThemeModeState(themeMode);
  }, [themeMode]);

  const handleThemeModeChange = (val: string) => {
    setThemeModeState(val);
    if (setThemeMode) {
      setThemeMode(val);
    } else {
      localStorage.setItem('themeMode', val);
      window.dispatchEvent(new CustomEvent('themeModeChanged', { detail: { themeMode: val } }));
    }
  };

  // Payments Tab
  const [momoPartner, setMomoPartner] = useState('MOMO_PARTNER_2026');
  const [momoSecret, setMomoSecret] = useState('momo_secret_key_placeholder');
  const [showMomoSecret, setShowMomoSecret] = useState(false);
  const [vnpayTmn, setVnpayTmn] = useState('VNPAY_TMN_9988');
  const [vnpaySecret, setVnpaySecret] = useState('vnpay_secret_key_placeholder');
  const [showVnpaySecret, setShowVnpaySecret] = useState(false);
  const [currency, setCurrency] = useState('vnd');

  // API Tab
  const [leadSyncHook, setLeadSyncHook] = useState('https://n8n.blueprint.sh/webhook/c3a0df1e-8e42-491b-b461-a083f2bc90fa');
  const [certGenHook, setCertGenHook] = useState('https://n8n.blueprint.sh/webhook/cert-gen-7bf83bc81');
  const [idempotencyTimeout, setIdempotencyTimeout] = useState(86400);

  // Security Tab
  const [bruteForceLimit, setBruteForceLimit] = useState(5);
  const [sessionLifetime, setSessionLifetime] = useState('12h');
  const [pwMinLength] = useState(true); // read-only disabled
  const [pwUpperAndDigit, setPwUpperAndDigit] = useState(true);
  const [pwSpecialChar, setPwSpecialChar] = useState(false);

  const handleSave = () => {
    alert('Đã lưu tất cả thay đổi cấu hình hệ thống thành công!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        /* Settings layout specifics */
        .settings-container {
          display: grid;
          grid-template-columns: 3fr 9fr;
          gap: 24px;
          margin-top: 10px;
        }
        
        .settings-sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .settings-tab-btn {
          background: none;
          border: none;
          text-align: left;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: 6px;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .settings-tab-btn:hover {
          background-color: var(--border-passive);
          color: var(--text-primary);
        }
        .settings-tab-btn.active {
          background-color: var(--sidebar-active-bg);
          color: var(--text-primary);
          font-weight: 600;
        }
        .settings-tab-btn svg {
          width: 15px;
          height: 15px;
        }
        
        .settings-content-panel {
          min-height: 450px;
        }
        
        .settings-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-passive);
          padding-bottom: 10px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .settings-title svg {
          width: 18px;
          height: 18px;
        }
      `}</style>

      <PageHeader
        title="Cấu hình hệ thống"
        subtitle="Quản lý thiết lập chung, giao diện hiển thị, cổng thanh toán và khóa API."
        onToggleSidebar={onToggleSidebar}
        showDateFilter={false}
        actions={
          <button
            onClick={handleSave}
            className="btn-black"
            style={{ height: '32px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Save size={13} />
            <span>Lưu cấu hình</span>
          </button>
        }
      />

      {/* Settings Layout */}
      <div className="settings-container">
        
        {/* Left Sub-Menu tabs */}
        <div className="settings-sidebar-menu">
          <button
            className={`settings-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <Sliders />
            <span>Thông tin chung</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
            onClick={() => setActiveTab('theme')}
          >
            <Palette />
            <span>Giao diện & Theme</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <CreditCard />
            <span>Cổng thanh toán</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'api' ? 'active' : ''}`}
            onClick={() => setActiveTab('api')}
          >
            <Key />
            <span>n8n & Webhooks</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield />
            <span>Bảo mật & Phân quyền</span>
          </button>
        </div>

        {/* Right Content Tab panels */}
        <div className="settings-content-panel">
          
          {/* TAB 1: General Settings */}
          {activeTab === 'general' && (
            <div className="panel tab-panel-content" id="panel-general">
              <h2 className="settings-title">
                <Sliders />
                <span>Thông tin chung</span>
              </h2>
              
              <div className="form-group">
                <label className="form-label">Tên nền tảng (Platform Name)</label>
                <input
                  type="text"
                  className="form-control"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  style={{ padding: '6px 10px' }}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Domain chính thức</label>
                <input
                  type="text"
                  className="form-control"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  style={{ padding: '6px 10px' }}
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Email hỗ trợ khách hàng</label>
                  <input
                    type="email"
                    className="form-control"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    style={{ padding: '6px 10px' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Số điện thoại liên hệ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    style={{ padding: '6px 10px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Footer Copyright Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={copyrightText}
                  onChange={(e) => setCopyrightText(e.target.value)}
                  style={{ padding: '6px 10px' }}
                />
              </div>
            </div>
          )}

          {/* TAB 2: Theme Settings */}
          {activeTab === 'theme' && (
            <div className="panel tab-panel-content" id="panel-theme">
              <h2 className="settings-title">
                <Palette />
                <span>Giao diện & Theme</span>
              </h2>
              
              <div className="form-group">
                <label className="form-label">Theme hiển thị mặc định</label>
                <select
                  className="form-control form-select"
                  value={themeModeState}
                  onChange={(e) => handleThemeModeChange(e.target.value)}
                  style={{ padding: '6px 10px' }}
                >
                  <option value="warm">Warm Operational System (Lovable Theme)</option>
                  <option value="dark">Sleek Dark Mode</option>
                  <option value="system">Theo cấu hình hệ điều hành (Auto)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Phông chữ hiển thị chính</label>
                <select
                  className="form-control form-select"
                  value={primaryFont}
                  onChange={(e) => setPrimaryFont(e.target.value)}
                  style={{ padding: '6px 10px' }}
                >
                  <option value="plus">Plus Jakarta Sans & Inter (Mặc định)</option>
                  <option value="outfit">Outfit & Roboto</option>
                  <option value="system">System Sans-Serif Stack</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Mật độ bố cục bảng (Table layout density)</label>
                <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="density"
                      value="compact"
                      checked={layoutDensity === 'compact'}
                      onChange={() => setLayoutDensity('compact')}
                    />
                    <span>Compact (Khuyên dùng cho admin)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="density"
                      value="comfortable"
                      checked={layoutDensity === 'comfortable'}
                      onChange={() => setLayoutDensity('comfortable')}
                    />
                    <span>Comfortable (Thoải mái)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Payment Settings */}
          {activeTab === 'payments' && (
            <div className="panel tab-panel-content" id="panel-payments">
              <h2 className="settings-title">
                <CreditCard />
                <span>Cổng thanh toán QR Code</span>
              </h2>
              
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Cổng Momo QR Code</span>
                  <span className="badge badge-green">ĐANG HOẠT ĐỘNG</span>
                </label>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginTop: '6px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Partner Code"
                    value={momoPartner}
                    onChange={(e) => setMomoPartner(e.target.value)}
                    style={{ padding: '6px 10px' }}
                  />
                  <div className="relative" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type={showMomoSecret ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Secret Key"
                      value={momoSecret}
                      onChange={(e) => setMomoSecret(e.target.value)}
                      style={{ padding: '6px 40px 6px 10px', width: '100%' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowMomoSecret(!showMomoSecret)}
                      className="absolute right-2 text-gray-400 hover:text-gray-600"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {showMomoSecret ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ borderTop: '1px solid var(--border-passive)', paddingTop: '14px', marginTop: '16px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Cổng VNPay QR Code</span>
                  <span className="badge badge-indigo">TEST MODE</span>
                </label>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginTop: '6px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="TmnCode"
                    value={vnpayTmn}
                    onChange={(e) => setVnpayTmn(e.target.value)}
                    style={{ padding: '6px 10px' }}
                  />
                  <div className="relative" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type={showVnpaySecret ? 'text' : 'password'}
                      className="form-control"
                      placeholder="HashSecret Key"
                      value={vnpaySecret}
                      onChange={(e) => setVnpaySecret(e.target.value)}
                      style={{ padding: '6px 40px 6px 10px', width: '100%' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowVnpaySecret(!showVnpaySecret)}
                      className="absolute right-2 text-gray-400 hover:text-gray-600"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {showVnpaySecret ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Đơn vị tiền tệ hiển thị mặc định</label>
                <select
                  className="form-control form-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ padding: '6px 10px', maxWidth: '150px' }}
                >
                  <option value="vnd">VND (đ)</option>
                  <option value="usd">USD ($)</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 4: API & Webhooks */}
          {activeTab === 'api' && (
            <div className="panel tab-panel-content" id="panel-api">
              <h2 className="settings-title">
                <Key />
                <span>n8n Webhook & API Integrations</span>
              </h2>
              
              <div className="form-group">
                <label className="form-label">n8n Lead Sync Endpoint (contact-form webhook)</label>
                <input
                  type="text"
                  className="form-control"
                  value={leadSyncHook}
                  onChange={(e) => setLeadSyncHook(e.target.value)}
                  style={{ padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}
                />
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Trigger gửi dữ liệu leads Type B khi có contact form submission.</span>
              </div>

              <div className="form-group" style={{ borderTop: '1px solid var(--border-passive)', paddingTop: '14px', marginTop: '16px' }}>
                <label className="form-label">n8n Course Completion & Certificate Generation Hook</label>
                <input
                  type="text"
                  className="form-control"
                  value={certGenHook}
                  onChange={(e) => setCertGenHook(e.target.value)}
                  style={{ padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}
                />
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Webhook n8n tự động phát sinh và ký chứng chỉ PDF khi học viên xong 100% khóa.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Idempotency Key validation timeout (seconds)</label>
                <input
                  type="number"
                  className="form-control"
                  value={idempotencyTimeout}
                  onChange={(e) => setIdempotencyTimeout(Number(e.target.value))}
                  style={{ padding: '6px 10px', maxWidth: '120px' }}
                />
                <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Thời gian chặn duplicate transaction khi trùng Idempotency-Key. Default: 24h.</span>
              </div>
            </div>
          )}

          {/* TAB 5: Security Settings */}
          {activeTab === 'security' && (
            <div className="panel tab-panel-content" id="panel-security">
              <h2 className="settings-title">
                <Shield />
                <span>Bảo mật & Phân quyền</span>
              </h2>
              
              <div className="form-group">
                <label className="form-label">Ngưỡng cảnh báo Brute-force (Brute-force lockout threshold)</label>
                <input
                  type="number"
                  className="form-control"
                  value={bruteForceLimit}
                  onChange={(e) => setBruteForceLimit(Number(e.target.value))}
                  style={{ padding: '6px 10px', maxWidth: '120px' }}
                />
                <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Tự động block IP tạm thời khi đăng nhập sai quá số lần này.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Hiệu lực Session của Admin/Giảng viên (Session Lifetime)</label>
                <select
                  className="form-control form-select"
                  value={sessionLifetime}
                  onChange={(e) => setSessionLifetime(e.target.value)}
                  style={{ padding: '6px 10px', maxWidth: '200px' }}
                >
                  <option value="2h">2 tiếng (An toàn cao)</option>
                  <option value="12h">12 tiếng (Thông thường)</option>
                  <option value="7d">7 ngày (Ghi nhớ đăng nhập)</option>
                </select>
              </div>

              <div className="form-group" style={{ borderTop: '1px solid var(--border-passive)', paddingTop: '14px', marginTop: '16px' }}>
                <label className="form-label">Quy tắc đặt mật khẩu của học viên</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'not-allowed', color: 'var(--text-secondary)' }}>
                    <input type="checkbox" checked={pwMinLength} disabled style={{ cursor: 'not-allowed' }} />
                    <span>Mật khẩu tối thiểu 8 ký tự</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={pwUpperAndDigit}
                      onChange={(e) => setPwUpperAndDigit(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>Yêu cầu có ít nhất 1 chữ hoa, 1 chữ số</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={pwSpecialChar}
                      onChange={(e) => setPwSpecialChar(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>Yêu cầu có ít nhất 1 ký tự đặc biệt (@, #, $, ...)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
}
