/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Shield,
  Lock,
  ArrowRight,
  Info,
  Lightbulb,
  Camera,
  Check,
  Edit2,
  X,
  Sparkles,
  Target,
  FileText,
  Sliders,
  ChevronRight,
  ShieldAlert,
  Award,
  Wallet,
  ShoppingCart,
  Coins
} from "lucide-react";

export default function ProfileView() {
  const [profile, setProfile] = useState({
    name: "Trí Nguyễn",
    phone: "0987 654 321",
    email: "tri@example.com",
    joinedDate: "21/05/2026",
    dob: "01/01/2000",
    address: "TP. Hồ Chí Minh",
    industry: "Công nghệ thông tin / Phần mềm",
    studyDemand: "AI Agent & Vibe Coding Bootcamp",
    currentLevel: "Đã từng dùng AI để học/làm việc",
    studyGoal: "Xây AI Agent/chatbot, Tự động hóa công việc",
    statusText: "Đang hoạt động",
    activeCourses: 2,
    balance: "₫ 0",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
  });

  // Modal State
  const [activeModal, setActiveModal] = useState<"personal" | "study" | "password" | null>(null);
  
  // Local Edit Fields Drafts
  const [draftName, setDraftName] = useState("");
  const [draftPhone, setDraftPhone] = useState("");
  const [draftDob, setDraftDob] = useState("");
  const [draftAddress, setDraftAddress] = useState("");
  const [draftIndustry, setDraftIndustry] = useState("");
  const [draftDemand, setDraftDemand] = useState("");
  const [draftLevel, setDraftLevel] = useState("");
  const [draftGoal, setDraftGoal] = useState("");
  
  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const openPersonalModal = () => {
    setDraftName(profile.name);
    setDraftPhone(profile.phone);
    setDraftDob(profile.dob);
    setDraftAddress(profile.address);
    setDraftIndustry(profile.industry);
    setActiveModal("personal");
  };

  const openStudyModal = () => {
    setDraftDemand(profile.studyDemand);
    setDraftLevel(profile.currentLevel);
    setDraftGoal(profile.studyGoal);
    setActiveModal("study");
  };

  const savePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      name: draftName,
      phone: draftPhone,
      dob: draftDob,
      address: draftAddress,
    }));
    setActiveModal(null);
    triggerToast("Cập nhật thông tin cá nhân thành công!");
  };

  const saveStudy = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      studyDemand: draftDemand,
      currentLevel: draftLevel,
      studyGoal: draftGoal
    }));
    setActiveModal(null);
    triggerToast("Cập nhật hồ sơ học tập thành công!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      triggerToast("Mật khẩu mới không trùng khớp!");
      return;
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setActiveModal(null);
    triggerToast("Thay đổi mật khẩu thành công!");
  };

  const handleAvatarChange = () => {
    const urls = [
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    ];
    // Random rotate avatars
    const nextIdx = Math.floor(Math.random() * urls.length);
    setProfile(prev => ({
      ...prev,
      avatar: urls[nextIdx]
    }));
    triggerToast("Đã thay đổi ảnh đại diện hoàn tất.");
  };

  return (
    <div className="space-y-4 font-sans text-left selection:bg-blue-100 pb-4 animate-fade-in" id="profile-container">
      
      {/* Toast alert popup */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-950 border border-gray-800 text-white rounded-2xl px-5 py-4 shadow-xl text-xs font-semibold flex items-center space-x-2.5 animate-fade-in">
          <Sparkles size={14} className="text-blue-400 animate-spin" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header breadcrumb & title area matching screenshot design */}
      <div className="space-y-0.5 select-none text-left">
        <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
          Hồ sơ cá nhân
        </h1>
        <p className="text-gray-400 font-semibold text-[11px] leading-snug">
          Quản lý thông tin cá nhân, tài khoản và tùy chỉnh trải nghiệm học tập.
        </p>
      </div>

      {/* BANNER CARD: Avatar and Core statistics section with Wave Vector background */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-50/20 via-[#f0f4ff]/50 to-indigo-50/30 border border-blue-100/40 p-4 md:py-4 md:px-6 overflow-hidden flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between shadow-xs">
        
        {/* Soft floating background light shapes */}
        <div className="absolute top-1/4 -left-16 w-32 h-32 rounded-full bg-blue-300/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-16 w-36 h-36 rounded-full bg-indigo-300/10 blur-xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

        {/* Left: Interactive avatar picture & name tags details */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 relative z-10 w-full sm:w-auto text-center sm:text-left">
          
          <div className="relative group shrink-0">
            <img
              src={profile.avatar}
              alt="Profile Avatar"
              className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md bg-gray-100 transition-transform group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={handleAvatarChange}
              title="Đổi ảnh đại diện ngẫu nhiên"
              className="absolute bottom-0 right-0 w-5 h-5 bg-white hover:bg-gray-50 text-gray-650 border border-gray-150 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
            >
              <Camera size={9} className="text-gray-650" />
            </button>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="space-y-0.5">
              <h2 className="text-base font-black text-gray-900 tracking-tight leading-tight">
                {profile.name}
              </h2>
              <div className="flex items-center justify-center sm:justify-start space-x-1 text-[11px] text-gray-500 font-semibold leading-none">
                <Mail size={11} className="text-gray-400 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
            </div>

            <div className="pt-0.5 flex flex-col items-center sm:items-start gap-1.5">
              <span className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-600 font-bold text-[9px] uppercase tracking-wider rounded border border-blue-100 select-none">
                Học viên
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold leading-none">
                <Calendar size={9} className="shrink-0" />
                Tham gia từ {profile.joinedDate}
              </span>
            </div>
          </div>

        </div>

        {/* Right side: Số dư + CTAs */}
        <div className="flex flex-col items-stretch gap-3 w-full md:w-auto md:min-w-[300px] relative z-10">

          {/* Stat: Số dư nội bộ */}
          <div className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 shadow-3xs hover:border-gray-150 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Wallet size={15} strokeWidth={2.2} />
            </div>
            <div className="text-left font-sans leading-tight flex-1">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400 block mb-0.5">
                Số dư nội bộ
              </span>
              <span className="text-[11px] font-black text-gray-800 font-mono">
                {profile.balance}
              </span>
            </div>
          </div>

          {/* Action buttons row */}
          <div className="flex items-stretch gap-2">

            {/* Mua khóa học */}
            <button
              onClick={() => triggerToast("Đang chuyển đến trang mua khóa học...")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold transition-all duration-200 active:scale-[0.96] hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 text-[10px] tracking-wide relative overflow-hidden animate-pulse-subtle group"
            >
              <div className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 animate-shine" />
              <ShoppingCart size={11} className="shrink-0 group-hover:scale-110 transition-transform" />
              <span>Mua khóa học</span>
            </button>

            {/* Nạp tiền */}
            <button
              onClick={() => triggerToast("Đang kết nối cổng thanh toán để nạp tiền...")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-extrabold transition-all duration-200 active:scale-[0.96] hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 text-[10px] tracking-wide relative overflow-hidden animate-pulse-subtle group"
            >
              <div className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 animate-shine-secondary" />
              <Coins size={11} className="shrink-0 group-hover:rotate-12 transition-transform fill-white/10" />
              <span>Nạp tiền</span>
            </button>

          </div>

        </div>

      </div>

      {/* CORE 2-COLUMN PROFILE CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Card 1: Thông tin cá nhân */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between text-left">
          
          <div className="space-y-3">
            {/* Box Header row */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider select-none leading-none">
                Thông tin cá nhân
              </h3>
              <button 
                onClick={openPersonalModal}
                className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer select-none"
              >
                <Edit2 size={10} />
                <span>Chỉnh sửa</span>
              </button>
            </div>

            {/* Fields list */}
            <div className="divide-y divide-gray-50 text-xs">
              
              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>👤</span> Họ và tên
                </span>
                <span className="text-gray-800 font-bold text-right">{profile.name}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>📞</span> Số điện thoại / Zalo
                </span>
                <span className="text-gray-800 font-bold font-mono text-right">{profile.phone}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>📍</span> Địa chỉ
                </span>
                <span className="text-gray-800 font-bold text-right">{profile.address}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>🎂</span> Ngày sinh
                </span>
                <span className="text-gray-800 font-bold font-mono text-right">{profile.dob}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>🖼️</span> Ảnh đại diện
                </span>
                <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 border border-green-150/25 rounded-full font-bold text-[9px] uppercase tracking-wide leading-none select-none">
                  Đã cập nhật
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Card 2: Hồ sơ học tập */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between text-left">
          
          <div className="space-y-3">
            {/* Box Header row */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider select-none leading-none">
                Hồ sơ học tập
              </h3>
              <button 
                onClick={openStudyModal}
                className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer select-none"
              >
                <Edit2 size={10} />
                <span>Chỉnh sửa</span>
              </button>
            </div>

            {/* Fields List */}
            <div className="divide-y divide-gray-50 text-xs">

              <div className="py-2.5 flex items-center justify-between gap-3">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>🏻️</span> Ngành / Lĩnh vực
                </span>
                <span className="text-gray-800 font-bold text-right truncate max-w-xs" title={profile.industry}>{profile.industry}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-3">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>🪄</span> Nhu cầu học
                </span>
                <span className="text-gray-800 font-bold text-right truncate max-w-xs" title={profile.studyDemand}>
                  {profile.studyDemand}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-3">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>📊</span> Mức độ hiện tại
                </span>
                <span className="text-gray-800 font-bold text-right">{profile.currentLevel}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-3">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>🎯</span> Mục tiêu học
                </span>
                <span className="text-gray-800 font-bold text-right truncate max-w-xs" title={profile.studyGoal}>
                  {profile.studyGoal}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Card 3: Thông tin tài khoản */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between text-left">
          
          <div className="space-y-3">
            {/* Box Header row */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider select-none leading-none">
                Thông tin tài khoản
              </h3>
            </div>

            {/* Fields list */}
            <div className="divide-y divide-gray-50 text-xs">
              
              <div className="py-2.5 flex items-center justify-between gap-2 animate-pulse-slow">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>✉️</span> Email
                </span>
                <span className="text-gray-800 font-bold font-mono text-right select-all">{profile.email}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>📅</span> Ngày tạo tài khoản
                </span>
                <span className="text-gray-800 font-bold font-mono text-right">{profile.joinedDate}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-2">
                <span className="text-gray-400 font-semibold flex items-center gap-2 select-none shrink-0">
                  <span>🛡️</span> Trạng thái tài khoản
                </span>
                <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 border border-green-150/25 rounded-full font-bold text-[9px] uppercase tracking-wide leading-none select-none">
                  {profile.statusText}
                </span>
              </div>

            </div>

            {/* Bubble help footer info matching image style */}
            <div className="bg-blue-50/20 border border-blue-100/20 rounded-xl py-2 px-3 flex items-center gap-2 text-xs select-none">
              <Info size={11} className="text-blue-500 shrink-0" />
              <span className="text-[10px] text-blue-700 font-bold leading-none">
                Email và trạng thái tài khoản không thể thay đổi.
              </span>
            </div>

          </div>

        </div>

        {/* Card 4: Bảo mật đổi mật khẩu */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between text-left">
          
          <div className="space-y-3 w-full">
            {/* Box Header */}
            <div className="border-b border-gray-50 pb-2">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider select-none leading-none">
                Bảo mật tài khoản
              </h3>
            </div>

            {/* Password edit prompt container matching image */}
            <div className="bg-gray-50/20 hover:bg-gray-50/40 border border-gray-100/65 rounded-xl p-3 text-center flex flex-col items-center justify-center space-y-2 transition-colors select-none">
              
              {/* Double ambient blue lock container circles */}
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100/40 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-blue-100/40 flex items-center justify-center text-blue-600 shadow-3xs">
                  <Lock size={14} strokeWidth={2.5} />
                </div>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[11px] font-black text-gray-900 tracking-tight leading-none uppercase tracking-wider">
                  Đổi mật khẩu
                </h4>
                <p className="text-[10px] text-gray-400 font-bold max-w-xs leading-none">
                  Cập nhật mật khẩu để bảo vệ tài khoản của bạn.
                </p>
              </div>

              <button
                onClick={() => setActiveModal("password")}
                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-weight-900 font-bold text-[10px] rounded-lg active:scale-97 transition-all cursor-pointer shadow-3xs"
              >
                <span>Đổi mật khẩu</span>
                <ArrowRight size={11} strokeWidth={2.5} />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER BAR: Attention alert panel matching image details */}
      <div className="relative rounded-2xl bg-amber-50/15 border border-amber-200/20 p-3.5 md:py-3.5 md:px-5 flex flex-col sm:flex-row items-center gap-3.5 text-left shadow-5xs overflow-hidden">
        
        {/* Soft yellow pattern background */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/10 rounded-full blur-xl pointer-events-none" />

        {/* Lamp icon */}
        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 shadow-3xs select-none">
          <Lightbulb size={16} className="fill-amber-50/40" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-0.5 flex-1 select-none">
          <h4 className="text-[11px] font-black text-gray-800 leading-tight">
            Thông tin của bạn được sử dụng để cá nhân hoá trải nghiệm học tập và cấp chứng chỉ.
          </h4>
          <p className="text-[10px] text-gray-400 font-bold leading-snug">
            Vui lòng cập nhật chính xác để đảm bảo quyền lợi của bạn.
          </p>
        </div>

        {/* Beautiful safety shield illustration details matching image */}
        <div className="shrink-0 select-none hidden md:block">
          <div className="w-10 h-10 rounded-xl bg-amber-100/20 flex items-center justify-center border border-amber-200/20 shadow-4xs animate-pulse-slow">
            <Award size={20} className="text-amber-500 fill-amber-100/5" strokeWidth={1.8} />
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 1. Modal: Edit Personal Information */}
      {activeModal === "personal" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
            
            {/* Header */}
            <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-gray-900 leading-tight">Chỉnh sửa thông tin cá nhân</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cập nhật danh tính học viên</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 hover:bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={savePersonal} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Họ và tên đầy đủ</label>
                <input
                  type="text"
                  required
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Ví dụ: Trí Nguyễn"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Số điện thoại / Zalo</label>
                <input
                  type="text"
                  required
                  value={draftPhone}
                  onChange={(e) => setDraftPhone(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Ví dụ: 0987 654 321"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Tỉnh / Thành phố</label>
                <select
                  value={draftAddress}
                  onChange={(e) => setDraftAddress(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">-- Chọn tỉnh / thành phố --</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                  <option>Cần Thơ</option>
                  <option>Hải Phòng</option>
                  <option>Bình Dương</option>
                  <option>Đồng Nai</option>
                  <option>Bà Rịa - Vũng Tàu</option>
                  <option>Nha Trang (Khánh Hòa)</option>
                  <option>Huế (Thừa Thiên Huế)</option>
                  <option>An Giang</option>
                  <option>Tỉnh khác</option>
                  <option>Nước ngoài</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Ngày / Tháng / Năm sinh</label>
                <input
                  type="date"
                  value={draftDob ? draftDob.split("/").reverse().join("-") : ""}
                  onChange={(e) => {
                    const parts = e.target.value.split("-");
                    setDraftDob(parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : e.target.value);
                  }}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 hover:bg-gray-50 border border-gray-205 text-gray-750 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-3xs"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 2. Modal: Edit Study Information */}
      {activeModal === "study" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
            
            {/* Header */}
            <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-gray-900 leading-tight">Chỉnh sửa hồ sơ học tập</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cập nhật nhu cầu & mục tiêu</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 hover:bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={saveStudy} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Nhu cầu học tập</label>
                <select
                  value={draftDemand}
                  onChange={(e) => setDraftDemand(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">-- Chọn nhu cầu học --</option>
                  <option>Workshop miễn phí</option>
                  <option>Starter mini course</option>
                  <option>AI Agent &amp; Vibe Coding Bootcamp</option>
                  <option>Advanced AI Agent Automation</option>
                  <option>Mentoring 1:1 / Portfolio coaching</option>
                  <option>B2B training</option>
                  <option>Chưa biết, cần tư vấn</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Mức độ hiện tại</label>
                <select
                  value={draftLevel}
                  onChange={(e) => setDraftLevel(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">-- Chọn mức độ --</option>
                  <option>Mới bắt đầu, chưa biết nhiều về AI</option>
                  <option>Đã dùng ChatGPT/AI tools cơ bản</option>
                  <option>Đã từng dùng AI để học/làm việc</option>
                  <option>Biết một ít coding</option>
                  <option>Đã từng làm automation/workflow</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Mục tiêu học (Ngắn gọn)</label>
                <input
                  type="text"
                  required
                  value={draftGoal}
                  onChange={(e) => setDraftGoal(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Ví dụ: Xây AI Agent, chatbots và automation tools..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Ngành học / Lĩnh vực nghiên cứu</label>
                <select
                  value={draftIndustry}
                  onChange={(e) => setDraftIndustry(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">-- Chọn lĩnh vực --</option>
                  <option>Công nghệ thông tin / Phần mềm</option>
                  <option>Kinh doanh / Quản trị</option>
                  <option>Marketing / Truyền thông</option>
                  <option>Thiết kế / Sáng tạo</option>
                  <option>Giáo dục / Đào tạo</option>
                  <option>Tài chính / Kế toán</option>
                  <option>Y tế / Sức khỏe</option>
                  <option>Kỹ thuật / Xây dựng</option>
                  <option>Khoa học / Nghiên cứu</option>
                  <option>Tự do / Freelance</option>
                  <option>Sinh viên</option>
                  <option>Lĩnh vực khác</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 hover:bg-gray-55 border border-gray-205 text-gray-750 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-3xs"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 3. Modal: Security password conversion */}
      {activeModal === "password" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-xs animate-fade-in text-left">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
            
            {/* Header */}
            <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-gray-900 leading-tight">Cập nhật mật khẩu tài khoản</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Đảm bảo an toàn bảo mật</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 hover:bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePasswordSubmit} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Mật khẩu cũ hiện thời</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Mật khẩu mới bảo mật</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Ít nhất 6 ký tự"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Xác nhận lại mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 hover:bg-gray-55 border border-gray-250 text-gray-750 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-3xs"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
