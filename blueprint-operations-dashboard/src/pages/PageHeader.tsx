/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Menu, Calendar, ChevronDown, Check, Sun, Moon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  onToggleSidebar?: () => void;
  showDateFilter?: boolean;
}

const PRESET_RANGES: Record<string, { label: string; range: string }> = {
  "7days": { label: "7 ngày qua", range: "02/06/2026 – 08/06/2026" },
  "30days": { label: "30 ngày qua", range: "10/05/2026 – 08/06/2026" },
  "this_month": { label: "Tháng này", range: "01/06/2026 – 30/06/2026" },
  "last_month": { label: "Tháng trước", range: "01/05/2026 – 31/05/2026" },
  "all": { label: "Tất cả thời gian", range: "Tất cả số liệu" }
};

export default function PageHeader({ title, subtitle, actions, onToggleSidebar, showDateFilter = true }: PageHeaderProps) {
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return localStorage.getItem('blueprint_global_date_range') || '7days';
  });
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem('themeMode') || 'dark';
  });

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.themeMode) {
        setCurrentTheme(detail.themeMode);
      }
    };
    window.addEventListener('themeModeChanged', handleThemeChange);
    return () => window.removeEventListener('themeModeChanged', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'warm' : 'dark';
    setCurrentTheme(nextTheme);
    localStorage.setItem('themeMode', nextTheme);
    window.dispatchEvent(new CustomEvent('themeModeChanged', { detail: { themeMode: nextTheme } }));
  };

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPreset = (key: string) => {
    setSelectedKey(key);
    localStorage.setItem('blueprint_global_date_range', key);
    
    // Dispatch custom event to notify all listening components
    window.dispatchEvent(
      new CustomEvent('globalDateRangeChanged', { 
        detail: { key, ...PRESET_RANGES[key] } 
      })
    );
    
    setIsOpen(false);
  };

  const activeRange = PRESET_RANGES[selectedKey] || PRESET_RANGES["7days"];

  return (
    <section className="dashboard-header" style={{ position: 'relative' }}>
      <style>{`
        .global-date-selector-container {
          position: relative;
          display: inline-block;
        }
        
        .global-date-selector-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          width: 220px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-passive);
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          z-index: 500;
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          backdrop-filter: blur(8px);
          transform-origin: top right;
          animation: scaleIn 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .global-date-preset-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all var(--transition-fast);
        }
        
        .global-date-preset-item:hover {
          background-color: var(--bg-app);
          color: var(--text-primary);
        }
        
        .global-date-preset-item.active {
          color: var(--text-primary);
          background-color: var(--sidebar-active-bg);
          font-weight: 600;
        }
        
        .global-date-preset-label-group {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }
        
        .global-date-preset-range {
          font-size: 9.5px;
          opacity: 0.7;
          font-weight: normal;
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="menu-toggle" 
            style={{ display: 'inline-flex' }}
            aria-label="Toggle Sidebar"
          >
            <Menu size={16} />
          </button>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 className="dashboard-title">{title}</h1>
          <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{subtitle}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {/* Central Global Date Filter Selector */}
        {showDateFilter && (
          <div className="global-date-selector-container" ref={containerRef}>
            <div 
              className="date-selector" 
              onClick={() => setIsOpen(!isOpen)}
              style={{ height: '32px' }}
            >
              <Calendar size={13} className="text-gray-400" />
              <span>{activeRange.label} ({activeRange.range})</span>
              <ChevronDown size={13} className="chevron text-gray-400" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </div>

            {isOpen && (
              <div className="global-date-selector-dropdown">
                {Object.entries(PRESET_RANGES).map(([key, item]) => {
                  const isActive = key === selectedKey;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`global-date-preset-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelectPreset(key)}
                    >
                      <div className="global-date-preset-label-group">
                        <span>{item.label}</span>
                        <span className="global-date-preset-range">{item.range}</span>
                      </div>
                      {isActive && <Check size={12} style={{ color: 'var(--text-primary)' }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}



        {actions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
