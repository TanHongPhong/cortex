/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Award,
  Download,
  CheckCircle,
  Clock,
  Share2,
  FileText,
  Printer,
  ChevronRight,
  ShieldCheck,
  Check,
  Eye,
  Trophy,
  Copy,
  Sparkles,
  Compass,
  ArrowUpRight,
  Info
} from "lucide-react";
import CourseCover from "./CourseCover";

// Structure of certificate objects
export interface MockCertificate {
  id: string;
  courseTitle: string;
  courseSubtitle: string;
  itemTitle: string;
  code: string;
  issueDate: string;
  status: "issued" | "in_progress";
  grade?: string;
  description: string;
  instructor: string;
  hours: number;
}

function MiniCertificatePreview({ cert }: { cert: MockCertificate }) {
  const isCompleted = cert.status === "issued";
  return (
    <div 
      className={`relative w-full h-full border-[5px] border-double ${
        isCompleted ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50/50"
      } p-3 rounded-lg flex flex-col items-center justify-between text-center select-none overflow-hidden aspect-[1.41/1]`}
      style={{
        backgroundImage: isCompleted ? "radial-gradient(#e5e7eb/50 1px, transparent 1px)" : "none",
        backgroundSize: "8px 8px"
      }}
    >
      {/* Corner Brackets */}
      {isCompleted && (
        <>
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-gray-400/50 pointer-events-none" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-gray-400/50 pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-gray-400/50 pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gray-400/50 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <div className="space-y-0.5 leading-none">
        <span className="font-mono text-[5px] tracking-wider text-gray-400 uppercase block font-black scale-90">
          Blueprint Academy
        </span>
        <h4 className="font-serif italic font-extrabold text-[8px] text-gray-900 leading-none">
          {isCompleted ? "CHỨNG CHỈ TỐT NGHIỆP" : "CHỨNG CHỈ ĐANG HỌC"}
        </h4>
      </div>

      {/* Recipient */}
      <div className="space-y-0.5 my-0.5 leading-none">
        <p className="text-[5px] text-gray-400 italic font-serif leading-none scale-90">Trao tặng cho:</p>
        <h5 className="text-[10px] font-bold font-serif text-gray-900 leading-none capitalize border-b border-gray-250 pb-0.5 px-2 inline-block">
          Nguyễn Minh Trí
        </h5>
      </div>

      {/* Course Title */}
      <div className="max-w-[85%] mx-auto leading-tight">
        <p className="text-[7.5px] font-extrabold text-gray-800 uppercase tracking-tight line-clamp-2 leading-none">
          {cert.courseTitle} {cert.courseSubtitle}
        </p>
      </div>

      {/* Footer details */}
      <div className="w-full flex justify-between items-end border-t border-gray-150 pt-0.5 px-0.5 leading-none">
        <div className="text-left leading-none scale-75 origin-left">
          <span className="font-serif italic text-[6px] font-extrabold text-gray-800 block">Le Anh Tuan</span>
          <span className="text-[4px] text-gray-400 font-extrabold uppercase font-mono tracking-wider">Blueprint LMS</span>
        </div>
        
        {isCompleted ? (
          <div className="w-3.5 h-3.5 rounded-full bg-gray-50 border border-gray-300 flex items-center justify-center shadow-3xs scale-75">
            <Award size={6} className="text-gray-500" />
          </div>
        ) : (
          <div className="text-[4px] text-gray-450 font-bold uppercase font-mono italic scale-95">
            PENDING
          </div>
        )}

        <div className="text-right leading-none scale-75 origin-right">
          <span className="font-mono text-[5.5px] font-extrabold text-gray-700 block select-all">
            {cert.code.split("-").slice(-1)[0]}
          </span>
          <span className="text-[4px] text-gray-400 font-extrabold uppercase font-mono tracking-wider">VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

interface CertificatesViewProps {
  onNavigateToTab?: (menu: string, tab?: string) => void;
}

export default function CertificatesView({ onNavigateToTab }: CertificatesViewProps) {
  const [selectedCert, setSelectedCert] = useState<MockCertificate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Responsive scale for fixed-size certificate modal on small screens
  // Modal card is fixed at 700px wide; scale it down to fit viewport with 24px padding on each side
  const [certModalScale, setCertModalScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth - 48; // 24px padding each side
      setCertModalScale(Math.min(1, availableWidth / 700));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const mockCertificates: MockCertificate[] = [
    {
      id: "cert-1",
      courseTitle: "AI AGENT &",
      courseSubtitle: "VIBE CODING BOOTCAMP",
      itemTitle: "AI Agent & Vibe Coding Bootcamp Certificate",
      code: "CERT-20261895-000001",
      issueDate: "21/05/2026",
      status: "issued",
      grade: "A+ Excellent (9.8/10)",
      description: "Chương trình chuyên sâu huấn luyện tư duy Vibe Coding, thiết lập các AI Agent hỗ trợ tối ưu mã nguồn ứng dụng, tự động hoá qui trình kiểm thử và deploy sản phẩm.",
      instructor: "Hội Đồng Học Thuật Blueprint",
      hours: 45
    },
    {
      id: "cert-2",
      courseTitle: "HTML & CSS",
      courseSubtitle: "FOUNDATION WORKSHOP",
      itemTitle: "HTML & CSS Foundation Certificate",
      code: "CERT-20253942-000002",
      issueDate: "14/12/2025",
      status: "issued",
      grade: "Passed with Honors (9.2/10)",
      description: "Đã hoàn thành xuất sắc các module thiết kế dựng giao diện ứng dụng chuẩn responsive từ bản phác thảo của hệ thống thiết kế Blueprint.",
      instructor: "Hội Đồng Học Thuật Blueprint",
      hours: 24
    },
    {
      id: "cert-3",
      courseTitle: "ADVANCED",
      courseSubtitle: "AGENT AUTOMATION",
      itemTitle: "Advanced AI Agent Automation",
      code: "CERT-20268574-000003",
      issueDate: "Dự kiến: 30/06/2026",
      status: "in_progress",
      description: "Chuyên đề tích hợp sâu hệ thống Zapier, Make, n8n và LangChain để phát triển chuỗi tác vụ AI tự động hóa doanh nghiệp không chạm.",
      instructor: "Hội Đồng Học Thuật Blueprint",
      hours: 32
    }
  ];

  const handleSelectCert = (cert: MockCertificate) => {
    setSelectedCert(cert);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast("Đã sao chép mã số xác minh chứng chỉ vào bộ nhớ tạm!");
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDownloadPdf = (cert: MockCertificate) => {
    if (isDownloading) return;
    setIsDownloading(true);
    showToast("Hệ thống đang xuất bản in chứng chỉ định dạng PDF...");
    setTimeout(() => {
      setIsDownloading(false);
      showToast(`Tải xuống thành công tệp Blueprint_${cert.code}.pdf!`);
    }, 2000);
  };

  const handleShareCert = (cert: MockCertificate) => {
    navigator.clipboard.writeText(`https://blueprint.edu.vn/verify/${cert.code}`);
    showToast("Đã copy liên kết xác thực công khai của chứng nhận!");
  };

  const filteredCerts = mockCertificates;

  return (
    <div className="space-y-6 font-sans text-left selection:bg-blue-100 pb-12 relative" id="certs-root">
      
      {/* Toast system notification popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-950 text-white rounded-2xl px-4 py-3 border border-gray-800 shadow-2xl text-[11px] font-bold flex items-center space-x-2 animate-scale-up">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and statistics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1 text-left">
          <h1 className="text-xl md:text-2xl font-black text-gray-950 tracking-tight leading-none pt-0.5">
            Chứng chỉ & Chứng nhận
          </h1>
          <p className="text-gray-400 font-semibold text-xs leading-snug">
            Danh sách các chứng chỉ đào tạo đã được Hội đồng học thuật Blueprint kiểm định và ban hành chính thức.
          </p>
        </div>

        <button
          onClick={() => onNavigateToTab && onNavigateToTab("orders")}
          className="inline-flex items-center space-x-1 px-3 py-2 border border-gray-200 hover:bg-gray-55 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-5xs shrink-0 self-start sm:self-auto"
        >
          <Compass size={13} className="text-gray-500" />
          <span>Tìm hiểu khóa học khác</span>
          <ArrowUpRight size={12} className="text-gray-400" />
        </button>
      </div>



      {/* Certificates Directory Rows */}
      <div className="space-y-6 pt-1">
        {filteredCerts.map((cert) => {
          const isCompleted = cert.status === "issued";

          return (
            <div
              key={cert.id}
              onClick={() => isCompleted && handleSelectCert(cert)}
              className={`group relative bg-white border rounded-3xl p-5 flex flex-col md:flex-row gap-6 justify-between transition-all duration-200 ${
                isCompleted 
                  ? "border-gray-100 hover:border-gray-250 cursor-pointer hover:shadow-2xs"
                  : "border-gray-200 border-dashed bg-gray-50/25 opacity-80"
              }`}
            >
              {/* Left Column: Certificate Preview */}
              <div className="w-full md:w-64 lg:w-72 shrink-0 relative overflow-hidden rounded-2xl shadow-6xs aspect-[1.41/1]">
                <MiniCertificatePreview cert={cert} />

                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="bg-white/95 text-gray-900 rounded-full px-3.5 py-1.5 text-[10px] font-black flex items-center gap-1.5 shadow-md">
                      <Eye size={12} className="text-gray-500" />
                      <span>Xem chứng chỉ</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Info Details */}
              <div className="flex-1 flex flex-col justify-between text-left py-0.5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2 leading-none">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                      CHỨNG NHẬN • {cert.hours} GIỜ HỌC
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200/50 text-[9px] font-bold uppercase shadow-sm">
                        <CheckCircle size={9} />
                        <span>Sẵn sàng</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50 text-[9px] font-bold uppercase shadow-sm">
                        <Clock size={9} />
                        <span>Đang học / Checkpoint</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                      <h3 className="font-extrabold text-base md:text-lg text-gray-900 leading-snug group-hover:text-gray-955 transition-colors">
                        {cert.itemTitle}
                      </h3>
                      {isCompleted && (
                        <span className="text-[10px] text-gray-800 font-extrabold flex items-center gap-0.5 shrink-0 bg-gray-50 border border-gray-150 px-2 py-0.5 rounded-lg leading-none">
                          <Award size={11} className="text-gray-500" />
                          <span>Xếp loại: {cert.grade?.split(" ")[0]}</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-mono font-bold">
                      <span>Mã số xác minh: {cert.code}</span>
                      <span>•</span>
                      <span>{isCompleted ? `Cấp ngày: ${cert.issueDate}` : cert.issueDate}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-550 font-medium leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Footer action bar */}
                <div className="mt-5 pt-3.5 border-t border-gray-50 flex items-center justify-end gap-3 select-none">
                  {isCompleted ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCert(cert);
                        }}
                        className="px-4.5 py-2.5 border border-blue-200 hover:bg-blue-50/40 text-blue-600 bg-white rounded-xl cursor-pointer flex items-center gap-1 font-extrabold text-xs active:scale-[0.98] transition-all duration-150 shadow-7xs"
                      >
                        <Eye size={12} className="text-blue-500" />
                        <span>Xem bản in</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPdf(cert);
                        }}
                        disabled={isDownloading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl active:scale-[0.98] transition-all duration-150 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-md shadow-blue-500/10 hover:shadow-blue-500/25"
                      >
                        <Download size={12} />
                        <span>{isDownloading ? "Đang tải..." : "Tải PDF"}</span>
                      </button>
                    </>
                  ) : (
                    <div className="w-full bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-455 font-semibold italic flex items-center justify-center gap-1.5">
                      <Clock size={12} className="text-gray-400" />
                      <span>Học phần đang triển khai... Vui lòng hoàn thành khóa học để nhận chứng nhận.</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Simple CTA Banner to Buy More Courses */}
      {onNavigateToTab && (
        <div 
          onClick={() => onNavigateToTab("orders")}
          className="w-full bg-gray-50 rounded-2xl p-3.5 px-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4.5 cursor-pointer select-none mt-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-750">
            <Sparkles size={14} className="text-blue-500 shrink-0" />
            <span>Nâng tầm hồ sơ lập trình với các Chứng chỉ Excellence chuyên sâu từ Blueprint Pro.</span>
          </div>
          <span className="text-xs font-black text-blue-600 hover:text-blue-700 transition-colors shrink-0">
            Mua khóa học ngay &rarr;
          </span>
        </div>
      )}

      {/* Aesthetic Policy and Certificate Guidelines Note at the Bottom */}
      <div className="bg-blue-50/20 rounded-2xl p-4 max-w-full flex items-start gap-3 select-none mt-6">
        <Info size={15} className="text-blue-500 shrink-0 mt-0.5" />
        <div className="text-left space-y-1 font-sans">
          <span className="text-[10.5px] font-black text-blue-700 block leading-tight">Hướng dẫn ràng buộc & Xếp loại Chứng chỉ tốt nghiệp</span>
          <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
            • <strong className="text-gray-800 font-extrabold">Cách sử dụng & Bảo mật:</strong> Chứng chỉ được cấp dưới dạng số hóa có đính kèm Mã xác minh tra cứu Blockchain LMS công khai, hỗ trợ sao chép liên kết chia sẻ trực tuyến hoặc xuất file PDF in ấn độ phân giải cao. Để bảo mật thông tin cá nhân (Privacy Policy), email và số điện thoại học viên sẽ không hiển thị trên phôi chứng chỉ.
          </p>
          <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
            • <strong className="text-gray-800 font-extrabold">Ràng buộc xét cấp:</strong> Chỉ tự động cấp phát khi học viên thỏa mãn đồng thời 5 điều kiện của học vụ: (1) Đăng ký khóa học hợp lệ; (2) Hoàn thành đầy đủ các bài học bắt buộc; (3) Được duyệt toàn bộ các bài tập (assignments) bắt buộc; (4) Được Hội đồng chuyên môn phê duyệt Đồ án tốt nghiệp (Final Project); (5) Ban quản lý/Hệ thống chính thức phê duyệt cấp phát.
          </p>
          <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
            • <strong className="text-gray-800 font-extrabold">Mức độ xếp loại:</strong> Xếp loại dựa trên thang điểm Checkpoint trung bình của học viên (Excellence: &ge; 9.5/10 | Passed with Honors: 8.5 &rarr; 9.4/10 | Passed: 7.0 &rarr; 8.4/10).
          </p>
        </div>
      </div>

      {/* Printable Certificate Modal Component - SINGLE PRISTINE WHITE STYLE */}
      {selectedCert && (
        <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in font-sans overflow-auto"
          style={{ padding: certModalScale < 1 ? `${Math.max(12, 24 * certModalScale)}px 24px` : "24px" }}
        >
          
          <div
            className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-2xl animate-scale-up text-left flex flex-col relative my-auto"
            style={{
              width: "700px",
              flexShrink: 0,
              transform: `scale(${certModalScale})`,
              transformOrigin: "top center",
              // Compensate for height collapse caused by scale transform
              marginBottom: certModalScale < 1 ? `calc((1 - ${certModalScale}) * -100%)` : undefined,
            }}
          >
            
            {/* Modal header action strip */}
            <div className="p-4 px-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3 select-none shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-600 border border-green-200">
                    <ShieldCheck size={11} strokeWidth={2.5} />
                  </span>
                  <h3 className="text-xs font-black text-gray-950 uppercase tracking-widest">
                    Xác thực Chứng chỉ Điện tử
                  </h3>
                </div>
                <p className="text-[10px] text-gray-400 font-bold leading-tight">
                  Công bố & lưu trữ chính xác trên hệ thống học vụ của Blueprint.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center font-bold text-lg cursor-pointer transition-colors border border-gray-200/50"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Pristine Master White Certificate Sheet Canvas */}
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-center shrink-0">
              
              <div 
                className="relative border-[10px] border-double border-gray-300 rounded-xl flex flex-col items-center justify-between text-center bg-white text-gray-900 select-none shadow-sm overflow-hidden"
                style={{
                  width: "640px",
                  height: "452px",
                  padding: "26px 32px",
                  backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                  backgroundSize: "12.8px 12.8px",
                  fontSize: "13px",
                  flexShrink: 0
                }}
              >
                {/* Thin Elegant Minimal Corner Borders */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gray-400/60 pointer-events-none" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gray-400/60 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gray-400/60 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gray-400/60 pointer-events-none" />

                {/* Academic Header section */}
                <div className="space-y-[0.3em] z-10">
                  <div className="flex justify-center items-center gap-[0.5em] opacity-80">
                    <div className="h-[1px] bg-gray-300 w-[2em]" />
                    <span className="font-mono text-[0.65em] tracking-[0.15em] text-gray-500 font-extrabold uppercase">
                      Hội Đồng Học Thuật Blueprint
                    </span>
                    <div className="h-[1px] bg-gray-300 w-[2em]" />
                  </div>

                  <h2 className="font-serif italic font-extrabold text-[2.1em] text-gray-900 tracking-wide mt-[0.2em] leading-none">
                    CHỨNG CHỈ TỐT NGHIỆP
                  </h2>
                  <p className="text-[0.65em] font-bold text-gray-400 tracking-[0.1em] uppercase font-mono mt-[0.1em] block">
                    CERTIFICATE OF PROFESSIONAL ACHIEVEMENT
                  </p>
                </div>

                {/* Recipient area */}
                <div className="space-y-[0.8em] z-10 my-[0.5em]">
                  <p className="text-[0.8em] text-gray-400 italic font-serif leading-none">
                    Chứng nhận hoàn thành chương trình đào tạo chính thức được trao tặng cho:
                  </p>
                  
                  <div className="space-y-[0.2em]">
                    <h3 className="text-[2.2em] font-bold font-serif text-gray-900 tracking-wide capitalize border-b border-gray-250 pb-[0.2em] px-[1.5em] inline-block leading-none">
                      Nguyễn Minh Trí
                    </h3>
                    <p className="text-[0.7em] text-gray-450 font-mono tracking-[0.1em] uppercase leading-none">
                      HỌC VIÊN XUẤT SẮC | BLUEPRINT LMS
                    </p>
                  </div>

                  <div className="space-y-[0.4em] max-w-[85%] mx-auto px-[1em]">
                    <p className="text-[0.8em] text-gray-650 leading-snug font-serif">
                      Vì đã hoàn thành đầy đủ các bài học bắt buộc, hoàn thiện các bài tập thực tế và bảo vệ thành công đồ án tốt nghiệp của khóa học:
                    </p>
                    <h4 className="text-[1.15em] font-black text-gray-900 uppercase tracking-tight font-sans leading-none">
                      {selectedCert.courseTitle} {selectedCert.courseSubtitle}
                    </h4>
                  </div>

                  <div className="flex justify-center items-center gap-[0.5em]">
                    <span className="px-[0.8em] py-[0.25em] bg-gray-100 text-gray-655 rounded-full font-mono text-[0.7em] font-extrabold border border-gray-200/50 leading-none">
                      Xếp loại: {selectedCert.grade || "Xuất sắc"}
                    </span>
                    <span className="w-[0.35em] h-[0.35em] rounded-full bg-gray-300" />
                    <span className="px-[0.8em] py-[0.25em] bg-gray-100 text-gray-655 rounded-full font-mono text-[0.7em] font-extrabold border border-gray-200/50 leading-none">
                      Thời lượng: {selectedCert.hours} Giờ học bổ trợ
                    </span>
                  </div>
                </div>

                {/* Signature, Authority details */}
                <div className="w-full flex justify-between items-end pt-[0.6em] border-t border-gray-200 z-10 px-[1.5em] text-left leading-none">
                  
                  {/* Left Signature */}
                  <div className="flex flex-col items-start space-y-[0.2em] leading-none">
                    <span className="font-serif italic text-[1.1em] font-extrabold text-gray-900 select-none leading-none tracking-wide">
                      Le Anh Tuan
                    </span>
                    <div className="h-[1px] bg-gray-300 w-[7em]" />
                    <span className="text-[0.6em] text-gray-400 font-bold uppercase font-mono tracking-wider">
                      Phòng Đào Tạo Blueprint
                    </span>
                  </div>

                  {/* Clean Gray Medallion in the middle */}
                  <div className="flex flex-col items-center justify-center leading-none">
                    <div className="w-[2.4em] h-[2.4em] rounded-full bg-gray-50 border border-gray-300 flex items-center justify-center relative shadow-3xs">
                      <Award className="text-gray-500" style={{ width: "1.2em", height: "1.2em" }} />
                    </div>
                    <span className="text-[0.55em] text-gray-400 font-bold mt-[0.3em] font-serif select-none">VERIFIED LMS</span>
                  </div>

                  {/* Right Serial Verification info */}
                  <div className="flex flex-col items-end space-y-[0.2em] leading-none">
                    <span className="font-mono text-[0.7em] font-extrabold text-gray-700 select-all leading-none">
                      MÃ SỐ: {selectedCert.code}
                    </span>
                    <div className="h-[1px] bg-gray-300 w-[8em]" />
                    <span className="text-[0.6em] text-gray-400 font-bold uppercase font-mono tracking-wider">
                      Tra cứu Blockchain LMS
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Modal footer control bar - Aligned button interactions */}
            <div className="p-4 px-6 border-t border-gray-150 flex flex-col md:flex-row justify-between items-center gap-3 bg-gray-50/50 select-none shrink-0">
              
              <div className="text-xs text-gray-500 font-semibold text-center md:text-left flex flex-wrap items-center justify-center md:justify-start gap-1">
                <span>Mã số xác minh:</span>
                <span 
                  onClick={() => handleCopyCode(selectedCert.code)}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-gray-800 bg-white hover:bg-gray-100 hover:text-blue-600 px-2.5 py-1 rounded-lg cursor-pointer transition-all border border-gray-200 select-all font-bold"
                  title="Nhấp để copy mã"
                >
                  <span>{selectedCert.code}</span>
                  {copiedCode === selectedCert.code ? (
                    <Check size={10} className="text-green-600 shrink-0" />
                  ) : (
                    <Copy size={9} className="text-gray-400 shrink-0" />
                  )}
                </span>
              </div>

              {/* Action Buttons styled like high quality minimalist custom cards */}
              <div className="flex items-center space-x-2 w-full md:w-auto justify-end text-xs font-bold">
                <button
                  type="button"
                  onClick={() => handleShareCert(selectedCert)}
                  className="px-4.5 py-2.5 border border-blue-200 hover:bg-blue-50/40 text-blue-600 bg-white rounded-xl cursor-pointer hover:shadow-7xs active:scale-[0.98] transition-all flex items-center gap-1.5 font-bold text-xs shadow-7xs"
                >
                  <Share2 size={12} />
                  <span>Sao chép Liên kết</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadPdf(selectedCert)}
                  disabled={isDownloading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl active:scale-[0.98] transition-all duration-150 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-md shadow-blue-500/10 hover:shadow-blue-500/25"
                >
                  <Printer size={12} />
                  <span>{isDownloading ? "Đang xuất..." : "Tải bản in PDF"}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
