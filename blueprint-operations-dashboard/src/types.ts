/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  name: string;
  level: 'Free' | 'Starter' | 'Core' | 'Advanced' | 'Premium' | 'B2B';
  levelClass: string;
  price: string;
  priceNum: number;
  status: 'Published' | 'Draft' | 'Archived';
  lessonsCount: number;
  studentsCount: number;
  hasCertificate: boolean;
  updatedAt: string;
  thumbnail?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Blocked' | 'Completed';
  statusClass: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  avatarClass: string;
  needCourse: string;
  needLevel: string;
  needGoal: string;
  needNote: string;
  courses: Array<{
    name: string;
    status: string;
    statusClass: string;
    progress: number;
    progressClass: string;
    date: string;
  }>;
  lessons: string;
  quiz: string;
  time: string;
  exercises: string;
  submissions: Array<{
    exercise: string;
    date: string;
    status: string;
    statusClass: string;
  }>;
  certificates: Array<{
    name: string;
    code: string;
    date: string;
  }>;
  notes: string;
  accountBalance?: number;
  ledgerTransactions?: Array<{
    id: string;
    type: string;
    amount: string;
    desc: string;
    time: string;
  }>;
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  avatarClass: string;
  course: string;
  lesson: string;
  type: 'Final Project' | 'Assignment';
  typeClass: string;
  status: 'Chờ duyệt' | 'Đã duyệt' | 'Yêu cầu chỉnh sửa' | 'Từ chối';
  statusClass: string;
  date: string;
  projTitle: string;
  projDesc: string;
  tech: string;
  learned: string;
  challenge: string;
  demoUrl: string;
  sourceUrl: string;
  fileName: string;
  fileSize: string;
  attempt_no?: number;
  tools_used?: string;
  reflection?: string;
  reviewed_by?: string;
  reviewed_at?: string;
}

export interface Invoice {
  id: string;
  orderCode: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentAddress: string;
  course: string;
  courseCode: string;
  issuedDate: string;
  totalRaw: string;
  discount: string;
  amount: string;
  status: 'issued' | 'canceled';
  statusName: string;
}

export interface Coupon {
  code: string;
  name: string;
  desc?: string;
  type: 'percentage' | 'fixed';
  typeName: string;
  value: string;
  scope: string;
  duration: string;
  redemptions: string;
  redemptionsUsed: number;
  redemptionsMax: number;
  status: 'active' | 'paused' | 'expired' | 'archived';
  maxDiscount?: number;
  minSpend?: number;
  limitUser?: number;
  stack?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  initials: string;
  avatarClass: string;
  email: string;
  phone: string;
  needs: string;
  source: string;
  sourceType: 'globe' | 'users';
  status: 'new' | 'contacted' | 'lost';
  statusName: string;
  createdAt: string;
  request: string;
  note: string;
  noteUpdated: string;
}

export interface Announcement {
  id: string;
  title: string;
  desc: string;
  scope: 'global' | 'course';
  scopeName: string;
  course: string;
  courseCode: string;
  priority: 'high' | 'medium' | 'low';
  priorityName: string;
  status: 'published' | 'draft' | 'failed';
  statusName: string;
  publishedAt: string;
  author: string;
  recipients: string;
  success: string;
  failed: string;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  avatarClass: string;
  avatarText: string;
  course: string;
  courseCode: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'hidden';
  statusName: string;
  date: string;
  reply: string;
  moderationLogs?: Array<{
    action: string;
    actor: string;
    time: string;
    note: string;
  }>;
}

export interface PaymentTransaction {
  orderCode: string;
  provider: 'vnpay' | 'momo' | 'bank';
  providerName: string;
  txId: string;
  eventId: string;
  amount: string;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  statusText: string;
  createdAt: string;
  course: string;
  idempotency: string;
  rawJson: string;
}

export interface AuditLog {
  id: string;
  time: string;
  actor: string;
  email: string;
  action: string;
  category: 'course' | 'student' | 'payment' | 'security' | 'settings';
  ip: string;
  desc: string;
  userAgent: string;
  meta: any;
}

export interface ReferralCode {
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

export interface ReferralConversion {
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

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
