/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  ChevronDown,
  Download
} from 'lucide-react';
import PageHeader from './PageHeader';
import { Course } from '../types';

interface RevenueProps {
  courses: Course[];
  onToggleSidebar?: () => void;
}

export default function Revenue({ courses, onToggleSidebar }: RevenueProps) {
  // Date and values state simulation
  const [currentRangeLabel, setCurrentRangeLabel] = useState('7 ngày qua');
  const [gross, setGross] = useState('125,000,000đ');
  const [discounts, setDiscounts] = useState('15,000,000đ');
  const [net, setNet] = useState('110,000,000đ');
  const [ordersCount, setOrdersCount] = useState('220 đơn');
  const [refundTotal, setRefundTotal] = useState('5,000,000đ');

  // React to global date range selector changes
  useEffect(() => {
    // Sync initially with localStorage
    const savedKey = localStorage.getItem('blueprint_global_date_range') || '7days';
    const labelMap: Record<string, string> = {
      "7days": "7 ngày qua",
      "30days": "30 ngày qua",
      "this_month": "Tháng này",
      "last_month": "Tháng trước",
      "all": "Tất cả thời gian"
    };
    setCurrentRangeLabel(labelMap[savedKey] || '7 ngày qua');
    updateMockData(savedKey);

    const handleGlobalDateChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const key = customEvent.detail.key;
      const label = customEvent.detail.label;
      setCurrentRangeLabel(label);
      updateMockData(key);
    };

    window.addEventListener('globalDateRangeChanged', handleGlobalDateChange);
    return () => window.removeEventListener('globalDateRangeChanged', handleGlobalDateChange);
  }, []);

  const updateMockData = (key: string) => {
    if (key === '7days') {
      setGross('125,000,000đ');
      setDiscounts('15,000,000đ');
      setNet('110,000,000đ');
      setOrdersCount('220 đơn');
      setRefundTotal('5,000,000đ');
    } else if (key === '30days') {
      setGross('520,000,000đ');
      setDiscounts('62,000,000đ');
      setNet('458,000,000đ');
      setOrdersCount('924 đơn');
      setRefundTotal('18,000,000đ');
    } else if (key === 'this_month') {
      setGross('480,000,000đ');
      setDiscounts('55,000,000đ');
      setNet('425,000,000đ');
      setOrdersCount('850 đơn');
      setRefundTotal('12,000,000đ');
    } else if (key === 'last_month') {
      setGross('610,000,000đ');
      setDiscounts('75,000,000đ');
      setNet('535,000,000đ');
      setOrdersCount('1,050 đơn');
      setRefundTotal('22,000,000đ');
    } else {
      setGross('1,850,000,000đ');
      setDiscounts('210,000,000đ');
      setNet('1,640,000,000đ');
      setOrdersCount('3,240 đơn');
      setRefundTotal('65,000,000đ');
    }
  };

  // Chart hover states
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [hoveredCompareDay, setHoveredCompareDay] = useState<number | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Daily revenue trend mock data
  const dailyData = [
    { label: "T2", value: 15000000, display: "15M" },
    { label: "T3", value: 18000000, display: "18M" },
    { label: "T4", value: 12000000, display: "12M" },
    { label: "T5", value: 25000000, display: "25M" },
    { label: "T6", value: 20000000, display: "20M" },
    { label: "T7", value: 22000000, display: "22M" },
    { label: "CN", value: 13000000, display: "13M" }
  ];

  // Gross vs Net comparison mock data
  const comparisonData = [
    { label: "T2", gross: 15000000, net: 13000000 },
    { label: "T3", gross: 18000000, net: 15500000 },
    { label: "T4", gross: 12000000, net: 10500000 },
    { label: "T5", gross: 25000000, net: 22000000 },
    { label: "T6", gross: 20000000, net: 18000000 },
    { label: "T7", gross: 22000000, net: 19500000 },
    { label: "CN", gross: 13000000, net: 11500000 }
  ];

  // 6-Month growth mock data
  const monthlyData = [
    { label: "Tháng 1", value: 80000000 },
    { label: "Tháng 2", value: 95000000 },
    { label: "Tháng 3", value: 110000000 },
    { label: "Tháng 4", value: 105000000 },
    { label: "Tháng 5", value: 130000000 },
    { label: "Tháng 6", value: 125000000 }
  ];

  // Course Contribution Stats
  const courseStats = [
    { name: "AI Agent & Vibe Coding Bootcamp", revenue: "77,000,000đ", percentage: 70, fillClass: "indigo" },
    { name: "Web Automation n8n nâng cao", revenue: "33,000,000đ", percentage: 30, fillClass: "orange" }
  ];

  // Payment Method Contribution Stats
  const methodStats = [
    { name: "QR MoMo Pay", revenue: "52,800,000đ", percentage: 48, fillClass: "indigo" },
    { name: "QR VNPay", revenue: "35,200,000đ", percentage: 32, fillClass: "green" },
    { name: "Chuyển khoản trực tiếp", revenue: "22,000,000đ", percentage: 20, fillClass: "orange" }
  ];

  // Coupon sales stats
  const couponSales = [
    { code: "KHAIGIANGAI", usage: 18, discount: "6,300,000đ", net: "56,700,000đ" },
    { code: "N8NVOL26", usage: 10, discount: "3,000,000đ", net: "17,000,000đ" },
    { code: "WELCOMEBLUE", usage: 12, discount: "1,200,000đ", net: "22,800,000đ" }
  ];

  // Referral sales stats
  const referralSales = [
    { code: "BINH15", usage: 14, reward: "8,400,000đ", net: "47,600,000đ" },
    { code: "AN10", usage: 8, reward: "2,800,000đ", net: "25,200,000đ" },
    { code: "CHAU20", usage: 3, reward: "1,800,000đ", net: "7,200,000đ" }
  ];

  const handleExport = () => {
    // CSV Header
    const headers = ["Chỉ số", "Giá trị", "Chú thích"];
    
    // CSV Rows
    const rows = [
      ["Khoảng thời gian", `"${currentRangeLabel}"`, "Thời gian lọc báo cáo"],
      ["Tổng doanh thu (Gross)", `"${gross}"`, "Tổng giá trị hóa đơn gốc"],
      ["Tổng chiết khấu (Discounts)", `"${discounts}"`, "Tổng mã giảm giá và coupon đã áp dụng"],
      ["Doanh thu thuần (Net)", `"${net}"`, "Doanh số thực thu sau trừ chiết khấu"],
      ["Tổng đơn hàng", `"${ordersCount}"`, "Số lượng hóa đơn phát sinh"],
      ["Hoàn tiền (Refunds)", `"${refundTotal}"`, "Tổng số tiền đã hoàn trả cho học viên"]
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");
    
    // Use UTF-8 BOM to ensure Excel opens Vietnamese characters correctly
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `revenue_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <style>{`
        .analytics-progress-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 10px;
        }
        
        .analytics-progress-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .progress-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12.5px;
          font-weight: 500;
        }
        
        .progress-bar-bg {
          width: 100%;
          height: 8px;
          background-color: var(--border-passive);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-bar-fill {
          height: 100%;
          background-color: var(--text-primary);
          border-radius: 4px;
          transition: width var(--transition-normal);
        }
        
        .progress-bar-fill.indigo { background-color: var(--color-indigo); }
        .progress-bar-fill.green { background-color: var(--color-green); }
        .progress-bar-fill.orange { background-color: var(--color-orange); }

        .chart-layout-box {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .chart-layout-box {
            flex-direction: column;
            gap: 20px;
            align-items: stretch;
          }
          .donut-wrapper {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>

      <PageHeader
        title="Báo cáo doanh thu (Revenue)"
        subtitle="Thống kê số liệu doanh số bán khóa học, chiết khấu và hiệu quả kênh marketing."
        onToggleSidebar={onToggleSidebar}
        actions={
          <>
            <button 
              onClick={handleExport}
              className="btn-black h-8 px-3 flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </>
        }
      />

      {/* KPI Row (5 Cards) */}
      <section className="kpi-row-1 kpi-row-cols-5" style={{ marginBottom: '20px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Tổng doanh thu (Gross)</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px' }}>{gross}</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Tổng giá trị hóa đơn gốc</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Chiết khấu (Discounts)</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-orange)' }}>{discounts}</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Từ mã giảm giá / giới thiệu</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Doanh thu thuần (Net)</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-green)' }}>{net}</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Doanh thu thực nhận sau giảm giá</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Đơn hàng thành công</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}>
            <span className="kpi-value" style={{ fontSize: '20px' }}>{ordersCount}</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Số giao dịch đã hoàn tất</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header"><span className="kpi-label">Tổng số tiền hoàn (Refund)</span></div>
          <div className="kpi-value-container" style={{ marginTop: '2px' }}><span className="kpi-value" style={{ fontSize: '20px', color: 'var(--color-red)' }}>{refundTotal}</span></div>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>Giao dịch hủy và hoàn tiền</span>
        </div>
      </section>

      {/* Daily Revenue Trend Chart */}
      <div className="panel" style={{ marginBottom: '20px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 className="panel-title" style={{ fontSize: '13.5px' }}>Doanh thu hàng ngày (7 ngày qua)</h2>
            <p style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>Xu hướng doanh số bán hàng từ 02/06 đến 08/06</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 500 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-indigo)' }}></span>
              <span>Doanh thu khóa học</span>
            </span>
          </div>
        </div>

        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          {/* Tooltip Overlay */}
          {hoveredDay !== null && (
            <div
              style={{
                position: 'absolute',
                left: `${((50 + hoveredDay * (700 / 6)) / 800) * 100}%`,
                top: `${(170 - (dailyData[hoveredDay].value / 30000000) * 150) - 45}px`,
                transform: 'translateX(-50%)',
                backgroundColor: '#1e1f1c',
                color: '#f8f8f2',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: 600,
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 10,
                whiteSpace: 'nowrap',
                transition: 'left 0.1s ease, top 0.1s ease'
              }}
            >
              <div style={{ opacity: 0.7, fontSize: '9px', fontWeight: 500, marginBottom: '2px' }}>{dailyData[hoveredDay].label} (0{hoveredDay + 2}/06)</div>
              <div style={{ fontWeight: 700 }}>{dailyData[hoveredDay].value.toLocaleString('vi-VN')} đ</div>
            </div>
          )}

          {/* SVG Canvas */}
          <svg viewBox="0 0 800 200" width="100%" height="100%" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-indigo)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--color-indigo)" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="50" y1="20" x2="750" y2="20" stroke="var(--border-passive)" strokeDasharray="3 3" />
            <line x1="50" y1="70" x2="750" y2="70" stroke="var(--border-passive)" strokeDasharray="3 3" />
            <line x1="50" y1="120" x2="750" y2="120" stroke="var(--border-passive)" strokeDasharray="3 3" />
            <line x1="50" y1="170" x2="750" y2="170" stroke="var(--border-passive)" />

            {/* Y Axis Labels */}
            <text x="25" y="24" textAnchor="end" style={{ fontSize: '9px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>30M</text>
            <text x="25" y="74" textAnchor="end" style={{ fontSize: '9px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>20M</text>
            <text x="25" y="124" textAnchor="end" style={{ fontSize: '9px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>10M</text>
            <text x="25" y="174" textAnchor="end" style={{ fontSize: '9px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>0</text>

            {/* Area path */}
            <path
              d="M 50 95 L 166.7 80 L 283.3 110 L 400 45 L 516.7 70 L 633.3 60 L 750 105 L 750 170 L 50 170 Z"
              fill="url(#chartGradient)"
            />

            {/* Line path */}
            <path
              d="M 50 95 L 166.7 80 L 283.3 110 L 400 45 L 516.7 70 L 633.3 60 L 750 105"
              fill="none"
              stroke="var(--color-indigo)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Vertical Guidance Line */}
            {hoveredDay !== null && (
              <line
                x1={50 + hoveredDay * (700 / 6)}
                y1="20"
                x2={50 + hoveredDay * (700 / 6)}
                y2="170"
                stroke="var(--color-indigo)"
                strokeOpacity="0.4"
                strokeDasharray="2 2"
                strokeWidth="1.5"
                style={{ pointerEvents: 'none' }}
              />
            )}

            {/* Data Points */}
            {dailyData.map((d, idx) => {
              const cx = 50 + idx * (700 / 6);
              const cy = 170 - (d.value / 30000000) * 150;
              const isHovered = hoveredDay === idx;

              return (
                <g key={idx}>
                  {/* Outer glow circle on hover */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 8 : 0}
                    fill="var(--color-indigo)"
                    fillOpacity="0.2"
                    style={{ transition: 'r 0.15s ease', pointerEvents: 'none' }}
                  />
                  {/* Point circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 4.5 : 3.5}
                    fill="var(--bg-card)"
                    stroke="var(--color-indigo)"
                    strokeWidth="2.5"
                    style={{ transition: 'r 0.15s ease', pointerEvents: 'none' }}
                  />
                  {/* X Axis Labels */}
                  <text
                    x={cx}
                    y="190"
                    textAnchor="middle"
                    style={{
                      fontSize: '9px',
                      fill: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: isHovered ? 700 : 500,
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}

            {/* Invisible vertical trigger strips */}
            {dailyData.map((d, idx) => {
              const width = 700 / 6;
              const x = 50 + (idx - 0.5) * width;
              return (
                <rect
                  key={idx}
                  x={idx === 0 ? 50 : x}
                  y="20"
                  width={idx === 0 || idx === 6 ? width / 2 + width / 2 : width}
                  height="150"
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDay(idx)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <section className="dashboard-grid" id="analytics-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Chart 1: Gross vs Net comparison */}
        <div className="panel" style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 className="panel-title" style={{ fontSize: '13.5px' }}>Doanh thu Gross vs Net (7 ngày qua)</h2>
              <p style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>So sánh doanh thu gốc và thực nhận</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--color-indigo)' }}></span>
                <span>Gross</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--color-green)' }}></span>
                <span>Net</span>
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '180px' }}>
            {/* Tooltip */}
            {hoveredCompareDay !== null && (
              <div
                style={{
                  position: 'absolute',
                  left: `${((40 + hoveredCompareDay * 62.85 + 31.4) / 500) * 100}%`,
                  top: '10px',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#1e1f1c',
                  color: '#f8f8f2',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: 600,
                  pointerEvents: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                  lineHeight: '1.4'
                }}
              >
                <div style={{ opacity: 0.7, fontSize: '9px', fontWeight: 500, marginBottom: '2px' }}>{comparisonData[hoveredCompareDay].label} (0{hoveredCompareDay + 2}/06)</div>
                <div>Gross: <span style={{ color: '#a5b4fc', fontWeight: 700 }}>{comparisonData[hoveredCompareDay].gross.toLocaleString('vi-VN')} đ</span></div>
                <div>Net: <span style={{ color: '#86efac', fontWeight: 700 }}>{comparisonData[hoveredCompareDay].net.toLocaleString('vi-VN')} đ</span></div>
              </div>
            )}

            <svg viewBox="0 0 500 180" width="100%" height="100%" style={{ overflow: 'visible' }}>
              {/* Horizontal Grid lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-passive)" strokeDasharray="3 3" />
              <line x1="40" y1="65" x2="480" y2="65" stroke="var(--border-passive)" strokeDasharray="3 3" />
              <line x1="40" y1="110" x2="480" y2="110" stroke="var(--border-passive)" strokeDasharray="3 3" />
              <line x1="40" y1="155" x2="480" y2="155" stroke="var(--border-passive)" />

              {/* Y Axis Labels */}
              <text x="32" y="23" textAnchor="end" style={{ fontSize: '8.5px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>30M</text>
              <text x="32" y="68" textAnchor="end" style={{ fontSize: '8.5px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>20M</text>
              <text x="32" y="113" textAnchor="end" style={{ fontSize: '8.5px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>10M</text>
              <text x="32" y="158" textAnchor="end" style={{ fontSize: '8.5px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>0</text>

              {/* Bars */}
              {comparisonData.map((d, idx) => {
                const groupWidth = 440 / 7;
                const groupCenter = 40 + idx * groupWidth + groupWidth / 2;
                
                // Heights scaled to max 30M
                const grossHeight = (d.gross / 30000000) * 135;
                const netHeight = (d.net / 30000000) * 135;
                
                const grossY = 155 - grossHeight;
                const netY = 155 - netHeight;
                const isHovered = hoveredCompareDay === idx;

                return (
                  <g key={idx}>
                    {/* Gross Bar (Indigo) */}
                    <rect
                      x={groupCenter - 14}
                      y={grossY}
                      width="11"
                      height={grossHeight}
                      fill="var(--color-indigo)"
                      fillOpacity={isHovered ? 1 : 0.85}
                      rx="2"
                      style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                    />
                    {/* Net Bar (Green) */}
                    <rect
                      x={groupCenter + 2}
                      y={netY}
                      width="11"
                      height={netHeight}
                      fill="var(--color-green)"
                      fillOpacity={isHovered ? 1 : 0.85}
                      rx="2"
                      style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                    />
                    {/* X Axis label */}
                    <text
                      x={groupCenter}
                      y="170"
                      textAnchor="middle"
                      style={{
                        fontSize: '9px',
                        fill: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: isHovered ? 700 : 500,
                        fontFamily: 'var(--font-heading)'
                      }}
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}

              {/* Interaction zones */}
              {comparisonData.map((d, idx) => {
                const groupWidth = 440 / 7;
                const x = 40 + idx * groupWidth;
                return (
                  <rect
                    key={idx}
                    x={x}
                    y="10"
                    width={groupWidth}
                    height="150"
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredCompareDay(idx)}
                    onMouseLeave={() => setHoveredCompareDay(null)}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Chart 2: 6-Month Growth Trend */}
        <div className="panel" style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 className="panel-title" style={{ fontSize: '13.5px' }}>Xu hướng tăng trưởng (6 tháng qua)</h2>
              <p style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>Tổng hợp doanh thu thuần hàng tháng</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '10px', fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-purple)' }}></span>
                <span>Doanh thu thuần tháng</span>
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '180px' }}>
            {/* Tooltip */}
            {hoveredMonth !== null && (
              <div
                style={{
                  position: 'absolute',
                  left: `${((40 + hoveredMonth * 88) / 500) * 100}%`,
                  top: `${(155 - (monthlyData[hoveredMonth].value / 150000000) * 135) - 35}px`,
                  transform: 'translateX(-50%)',
                  backgroundColor: '#1e1f1c',
                  color: '#f8f8f2',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  pointerEvents: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 10,
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ opacity: 0.7, fontSize: '9px', fontWeight: 500, marginBottom: '2px' }}>{monthlyData[hoveredMonth].label}</div>
                <div style={{ fontWeight: 700 }}>{monthlyData[hoveredMonth].value.toLocaleString('vi-VN')} đ</div>
              </div>
            )}

            <svg viewBox="0 0 500 180" width="100%" height="100%" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-purple)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--color-purple)" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-passive)" strokeDasharray="3 3" />
              <line x1="40" y1="65" x2="480" y2="65" stroke="var(--border-passive)" strokeDasharray="3 3" />
              <line x1="40" y1="110" x2="480" y2="110" stroke="var(--border-passive)" strokeDasharray="3 3" />
              <line x1="40" y1="155" x2="480" y2="155" stroke="var(--border-passive)" />

              {/* Y Axis Labels */}
              <text x="32" y="23" textAnchor="end" style={{ fontSize: '8.5px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>150M</text>
              <text x="32" y="68" textAnchor="end" style={{ fontSize: '8.5px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>100M</text>
              <text x="32" y="113" textAnchor="end" style={{ fontSize: '8.5px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>50M</text>
              <text x="32" y="158" textAnchor="end" style={{ fontSize: '8.5px', fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>0</text>

              {/* Area path */}
              <path
                d={`M 40 83 L 128 69.5 L 216 56 L 304 60.5 L 392 38 L 480 42.5 L 480 155 L 40 155 Z`}
                fill="url(#purpleGradient)"
              />

              {/* Line path */}
              <path
                d={`M 40 83 L 128 69.5 L 216 56 L 304 60.5 L 392 38 L 480 42.5`}
                fill="none"
                stroke="var(--color-purple)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Vertical Line */}
              {hoveredMonth !== null && (
                <line
                  x1={40 + hoveredMonth * 88}
                  y1="20"
                  x2={40 + hoveredMonth * 88}
                  y2="155"
                  stroke="var(--color-purple)"
                  strokeOpacity="0.4"
                  strokeDasharray="2 2"
                  strokeWidth="1.5"
                  style={{ pointerEvents: 'none' }}
                />
              )}

              {/* Data Points */}
              {monthlyData.map((d, idx) => {
                const cx = 40 + idx * 88;
                const cy = 155 - (d.value / 150000000) * 135;
                const isHovered = hoveredMonth === idx;

                return (
                  <g key={idx}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 7 : 0}
                      fill="var(--color-purple)"
                      fillOpacity="0.2"
                      style={{ transition: 'r 0.15s ease', pointerEvents: 'none' }}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 4.5 : 3.5}
                      fill="var(--bg-card)"
                      stroke="var(--color-purple)"
                      strokeWidth="2.5"
                      style={{ transition: 'r 0.15s ease', pointerEvents: 'none' }}
                    />
                    <text
                      x={cx}
                      y="170"
                      textAnchor="middle"
                      style={{
                        fontSize: '9px',
                        fill: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: isHovered ? 700 : 500,
                        fontFamily: 'var(--font-heading)'
                      }}
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}

              {/* Invisible triggers */}
              {monthlyData.map((d, idx) => {
                const width = 88;
                const x = 40 + (idx - 0.5) * width;
                return (
                  <rect
                    key={idx}
                    x={idx === 0 ? 40 : x}
                    y="20"
                    width={idx === 0 || idx === 5 ? width / 2 + width / 2 : width}
                    height="135"
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredMonth(idx)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* Layout Grid */}
      <section className="dashboard-grid" id="revenue-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* LEFT COLUMN: Charts & Progress Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Revenue by Course */}
          <div className="panel">
            <div className="panel-header" style={{ borderBottom: '1px solid var(--border-passive)', paddingBottom: '8px' }}>
              <h2 className="panel-title" style={{ fontSize: '13.5px' }}>Doanh thu theo khóa học (Contribution)</h2>
            </div>
            
            <div className="chart-layout-box">
              {/* Donut Chart SVG */}
              <div className="donut-wrapper" style={{ width: '100px', height: '100px', position: 'relative', flexShrink: 0 }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  {/* Background ring */}
                  <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--border-passive)" strokeWidth="8" />
                  
                  {/* AI Agent (70%) Segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="var(--color-indigo)"
                    strokeWidth="8"
                    strokeDasharray="154 220"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  
                  {/* Web Automation (30%) Segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="var(--color-orange)"
                    strokeWidth="8"
                    strokeDasharray="66 220"
                    strokeDashoffset="-154"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                {/* Center text overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  pointerEvents: 'none'
                }}>
                  <div style={{ fontSize: '7.5px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Tổng</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: 700 }}>110M</div>
                </div>
              </div>

              {/* Progress list */}
              <div className="analytics-progress-container" id="course-progress-block" style={{ flex: 1, marginTop: 0 }}>
                {courseStats.map((item, idx) => (
                  <div className="analytics-progress-item" key={idx}>
                    <div className="progress-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: item.fillClass === 'indigo' ? 'var(--color-indigo)' : 'var(--color-orange)' }}></span>
                        {item.name}
                      </span>
                      <strong>{item.revenue}</strong>
                    </div>
                    <div className="progress-bar-bg">
                      <div className={`progress-bar-fill ${item.fillClass}`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Revenue by Payment Method */}
          <div className="panel">
            <div className="panel-header" style={{ borderBottom: '1px solid var(--border-passive)', paddingBottom: '8px' }}>
              <h2 className="panel-title" style={{ fontSize: '13.5px' }}>Doanh thu theo phương thức thanh toán</h2>
            </div>
            
            <div className="chart-layout-box">
              {/* Payment Donut Chart SVG */}
              <div className="donut-wrapper" style={{ width: '100px', height: '100px', position: 'relative', flexShrink: 0 }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  {/* Background ring */}
                  <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--border-passive)" strokeWidth="8" />
                  
                  {/* MoMo (48%) Segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="var(--color-indigo)"
                    strokeWidth="8"
                    strokeDasharray="105.6 220"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  
                  {/* VNPay (32%) Segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="var(--color-green)"
                    strokeWidth="8"
                    strokeDasharray="70.4 220"
                    strokeDashoffset="-105.6"
                    transform="rotate(-90 50 50)"
                  />

                  {/* Transfer (20%) Segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="var(--color-orange)"
                    strokeWidth="8"
                    strokeDasharray="44 220"
                    strokeDashoffset="-176"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                {/* Center text overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  pointerEvents: 'none'
                }}>
                  <div style={{ fontSize: '7.5px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Phương thức</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: 700 }}>3 Loại</div>
                </div>
              </div>

              {/* Progress list */}
              <div className="analytics-progress-container" id="method-progress-block" style={{ flex: 1, marginTop: 0 }}>
                {methodStats.map((item, idx) => (
                  <div className="analytics-progress-item" key={idx}>
                    <div className="progress-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '2px',
                          backgroundColor: item.fillClass === 'indigo' ? 'var(--color-indigo)' : (item.fillClass === 'green' ? 'var(--color-green)' : 'var(--color-orange)')
                        }}></span>
                        {item.name}
                      </span>
                      <strong>{item.revenue}</strong>
                    </div>
                    <div className="progress-bar-bg">
                      <div className={`progress-bar-fill ${item.fillClass}`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Marketing Channel Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 3: Coupon contribution */}
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title" style={{ fontSize: '13.5px' }}>Doanh thu từ mã giảm giá (Coupon Sales)</h2>
            </div>
            <div className="table-container">
              <table id="coupon-sales-table">
                <thead>
                  <tr>
                    <th>Mã coupon</th>
                    <th>Số lượt dùng</th>
                    <th>Tổng chiết khấu</th>
                    <th>Doanh thu thuần</th>
                  </tr>
                </thead>
                <tbody>
                  {couponSales.map((item, idx) => (
                    <tr key={idx}>
                      <td><span className="cert-id" style={{ fontSize: '11.5px' }}>{item.code}</span></td>
                      <td style={{ fontWeight: 600, textAlign: 'center' }}>{item.usage}</td>
                      <td style={{ color: 'var(--color-orange)', fontSize: '11.5px' }}>-{item.discount}</td>
                      <td style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-green)' }}>{item.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 4: Referral contribution */}
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title" style={{ fontSize: '13.5px' }}>Doanh thu từ giới thiệu (Referral Sales)</h2>
            </div>
            <div className="table-container">
              <table id="referral-sales-table">
                <thead>
                  <tr>
                    <th>Mã giới thiệu</th>
                    <th>Conversions</th>
                    <th>Hoa hồng đã trả</th>
                    <th>Doanh thu thuần</th>
                  </tr>
                </thead>
                <tbody>
                  {referralSales.map((item, idx) => (
                    <tr key={idx}>
                      <td><span className="cert-id" style={{ fontSize: '11.5px' }}>{item.code}</span></td>
                      <td style={{ fontWeight: 600, textAlign: 'center' }}>{item.usage}</td>
                      <td style={{ color: 'var(--color-indigo)', fontSize: '11.5px' }}>{item.reward}</td>
                      <td style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-green)' }}>{item.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </section>
    </motion.div>
  );
}
