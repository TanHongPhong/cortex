/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lesson, LessonType, LessonStatus, Module, CourseInfo, ProjectAssignment } from "./types";

export const initialLessonsModule1: Lesson[] = [
  {
    id: "1.1",
    title: "Tổng quan về AI & Workflow",
    type: LessonType.VIDEO,
    duration: "12:45",
    status: LessonStatus.COMPLETED,
  },
  {
    id: "1.2",
    title: "Các công cụ AI cần biết",
    type: LessonType.VIDEO,
    duration: "18:30",
    status: LessonStatus.COMPLETED,
  },
  {
    id: "1.3",
    title: "Workflow cơ bản với ChatGPT",
    type: LessonType.VIDEO,
    duration: "22:15",
    status: LessonStatus.CURRENT,
  },
  {
    id: "1.4",
    title: "Tài liệu: Prompt Engineering Cheatsheet",
    type: LessonType.RESOURCE,
    duration: "PDF",
    status: LessonStatus.AVAILABLE,
  },
  {
    id: "1.5",
    title: "Quiz: Kiểm tra cuối Module 1",
    type: LessonType.QUIZ,
    duration: "--",
    status: LessonStatus.LOCKED,
  }
];

export const initialModules: Module[] = [
  {
    id: 1,
    title: "Module 1: AI Workflow Foundation",
    lessonsCompleted: 3,
    totalLessons: 5,
    progressPercent: 60,
    lessons: initialLessonsModule1,
  },
  {
    id: 2,
    title: "Module 2: Vibe Coding Basics",
    lessonsCompleted: 2,
    totalLessons: 5,
    progressPercent: 40,
    lessons: [
      {
        id: "2.1",
        title: "Tư duy Vibe Coding",
        type: LessonType.VIDEO,
        duration: "15:20",
        status: LessonStatus.COMPLETED,
      },
      {
        id: "2.2",
        title: "Tạo landing page đầu tiên",
        type: LessonType.VIDEO,
        duration: "24:10",
        status: LessonStatus.COMPLETED,
      },
      {
        id: "2.3",
        title: "Build your first AI landing page",
        type: LessonType.QUIZ,
        duration: "60 phút",
        status: LessonStatus.CURRENT,
      },
      {
        id: "2.4",
        title: "Chỉnh sửa UI bằng AI",
        type: LessonType.VIDEO,
        duration: "32:15",
        status: LessonStatus.AVAILABLE,
      },
      {
        id: "2.5",
        title: "Bài tập: Viết prompt tạo layout",
        type: LessonType.QUIZ,
        duration: "--",
        status: LessonStatus.LOCKED,
      }
    ],
  },
  {
    id: 3,
    title: "Module 3: Build with AI",
    lessonsCompleted: 1,
    totalLessons: 5,
    progressPercent: 20,
    lessons: [
      {
        id: "3.1",
        title: "Thiết lập môi trường React & Vite",
        type: LessonType.VIDEO,
        duration: "14:50",
        status: LessonStatus.COMPLETED,
      },
      {
        id: "3.2",
        title: "Khởi tạo Single Page App siêu tốc",
        type: LessonType.VIDEO,
        duration: "25:30",
        status: LessonStatus.AVAILABLE,
      },
      {
        id: "3.3",
        title: "Tích hợp Tailwind CSS và Custom Theme",
        type: LessonType.RESOURCE,
        duration: "WEB",
        status: LessonStatus.AVAILABLE,
      },
      {
        id: "3.4",
        title: "Xử lý luồng dữ liệu & State trong React",
        type: LessonType.VIDEO,
        duration: "30:45",
        status: LessonStatus.LOCKED,
      },
      {
        id: "3.5",
        title: "Bài thi thực hành: Tạo UI Clone bằng AI",
        type: LessonType.QUIZ,
        duration: "--",
        status: LessonStatus.LOCKED,
      }
    ],
  },
  {
    id: 4,
    title: "Module 4: AI Agent & Automation",
    lessonsCompleted: 0,
    totalLessons: 3,
    progressPercent: 0,
    lessons: [
      {
        id: "4.1",
        title: "Lý thuyết cơ bản về AI Agent",
        type: LessonType.VIDEO,
        duration: "19:15",
        status: LessonStatus.AVAILABLE,
      },
      {
        id: "4.2",
        title: "Tự động hóa luồng kết nối Make/n8n",
        type: LessonType.VIDEO,
        duration: "28:30",
        status: LessonStatus.AVAILABLE,
      },
      {
        id: "4.3",
        title: "Xây dựng AI Agent tự trả lời email",
        type: LessonType.QUIZ,
        duration: "--",
        status: LessonStatus.LOCKED,
      }
    ],
  },
  {
    id: 5,
    title: "Module 5: Final Project",
    lessonsCompleted: 0,
    totalLessons: 2,
    progressPercent: 0,
    lessons: [
      {
        id: "5.1",
        title: "Xây dựng ứng dụng web hoàn chỉnh",
        type: LessonType.RESOURCE,
        duration: "PDF",
        status: LessonStatus.AVAILABLE,
      },
      {
        id: "5.2",
        title: "Đóng gói và xuất bản ứng dụng lên Cloud",
        type: LessonType.RESOURCE,
        duration: "PDF",
        status: LessonStatus.AVAILABLE,
      }
    ],
  }
];

export const initialCourseInfo: CourseInfo = {
  instructor: "Blueprint Team",
  level: "Core Program",
  totalLessonsCount: 20,
  durationString: "~ 6 giờ",
  registeredDate: "21/05/2026",
  statusString: "Đang học"
};

export const initialAssignment: ProjectAssignment = {
  title: "Bài tập: Viết prompt tạo layout",
  statusText: "Đang chờ duyệt",
  statusColorKey: "pending"
};

export const defaultCompletedLessonIds = [
  "1.1", "1.2", "1.4", // 3 lessons in Module 1
  "2.1", "2.2",        // 2 lessons in Module 2
  "3.1",               // 1 lesson in Module 3
];
