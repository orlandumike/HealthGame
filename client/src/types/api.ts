export interface ApiData {
  activityChart: ActivityChart;
  activityCounter: ActivityCounter;
  levelInfos: LevelInfos;
  recentActivity: RecentActivityItemType[];
  user: User;
}

// Recent activity.

export type ActivityType = "activity" | "badge" | "communication";

interface ActivityCommon {
  date: string;
  description: string;
  type: ActivityType;
}

export interface Activity extends ActivityCommon {
  pointsWon: number;
}

export interface Article {
  description: string;
  imageUrl: string;
  link?: string;
  title: string;
  type: ActivityType;
}

export interface Badge extends ActivityCommon {
  iconUrl: string;
}

export type RecentActivityItemType = Activity | Badge | Article;

//----------

export interface DataPoint {
  date?: string;
  value: number;
  weekNumber?: number;
}

export interface ActivityChart {
  byDay: DataPoint[];
  byWeek: DataPoint[];
}

//----------

export interface ActivityCounter {
  currentMonth: number;
  currentWeek: number;
  previousMonth: number;
  previousWeek: number;
}

//----------

export interface LevelInfos {
  currentLevel: number;
  currentLevelGift: string;
  currentPoints: number;
  nextLevel: number;
  levelMinPoints: number;
  levelMaxPoints: number;
}

export interface User {
  age: number;
  avatarUrl: string;
  dayPoints: number;
  fullName: string;
}
