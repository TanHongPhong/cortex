/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum LessonType {
  VIDEO = "Video",
  RESOURCE = "Resource",
  QUIZ = "Quiz"
}

export enum LessonStatus {
  COMPLETED = "Completed",
  CURRENT = "Current",
  AVAILABLE = "Available",
  LOCKED = "Locked"
}

export interface Lesson {
  id: string; // e.g., "1.1", "1.2", "1.3"
  title: string;
  type: LessonType;
  duration: string; // e.g., "12:45", "PDF", "--"
  status: LessonStatus;
}

export interface Module {
  id: number;
  title: string;
  lessonsCompleted: number;
  totalLessons: number;
  progressPercent: number; // e.g., 60
  lessons: Lesson[];
}

export interface CourseInfo {
  instructor: string;
  level: string;
  totalLessonsCount: number;
  durationString: string;
  registeredDate: string;
  statusString: string;
}

export interface ProjectAssignment {
  title: string;
  statusText: string;
  statusColorKey: "pending" | "approved" | "none";
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  completedCount: number;
  inProgressCount: number;
  notStartedCount: number;
  totalCount: number;
}
