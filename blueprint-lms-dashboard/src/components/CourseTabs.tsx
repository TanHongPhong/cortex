/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface CourseTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function CourseTabs({ activeTab, setActiveTab }: CourseTabsProps) {
  const tabs = [
    { id: "content", label: "Nội dung khóa học" },
    { id: "info", label: "Thông tin khóa học" },
    { id: "announcements", label: "Announcements (2)" },
    { id: "qa", label: "Hỏi đáp" },
  ];

  return (
    <div className="border-b border-gray-100 flex items-center font-sans">
      <div className="flex space-x-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-3 text-[14px] font-semibold transition-all duration-200 select-none ${
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full transition-all duration-300" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
