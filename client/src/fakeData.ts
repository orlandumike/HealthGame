import { ApiData } from "types/api";

const data: ApiData = {
  activityChart: {
    byDay: [
      { value: 1, date: "2020-12-11" },
      { value: 0, date: "2020-12-12" },
      { value: 2, date: "2020-12-13" },
      { value: 0, date: "2020-12-14" },
      { value: 1, date: "2020-12-15" },
      { value: 0, date: "2020-12-16" },
      { value: 0, date: "2020-12-17" },
    ],
    byWeek: [
      { value: 4, weekNumber: 43 },
      { value: 5, weekNumber: 44 },
      { value: 3, weekNumber: 45 },
      { value: 4, weekNumber: 46 },
      { value: 1, weekNumber: 47 },
      { value: 0, weekNumber: 48 },
      { value: 3, weekNumber: 49 },
      { value: 4, weekNumber: 50 },
    ],
  },
  activityCounter: {
    currentMonth: 13,
    currentWeek: 5,
    previousMonth: 15,
    previousWeek: 4,
  },
  levelInfos: {
    currentLevel: 3,
    currentLevelGift: "Rabais de 5% sur votre LAMal",
    currentPoints: 600,
    nextLevel: 4,
    levelMinPoints: 400,
    levelMaxPoints: 800,
  },
  recentActivity: [
    {
      description:
        "Excellent ! Vous avez atteins le nombre de pas nécessaires au maintient de votre bonne santé. Continuez comme ça ! Ci-dessous, un article expliquant pourquoi 8000 pas est un pallier important dans l'exercice quotidien : ",
      imageUrl: `${process.env.PUBLIC_URL}/article-placeholder.png`,
      link:
        "https://videos.doctissimo.fr/sante/vie-pratique/marcher-vivre-longtemps",
      title: "Vos premiers 8000 pas",
      type: "communication",
    },
    {
      date: "2020-12-16T16:34:00.000Z",
      description: "Bravo ! Vous avez atteint un objectif quotidien !",
      iconUrl:
        "https://hack202012activitytrack.blob.core.windows.net/images/badges/walk_4.png",
      type: "badge",
    },
    {
      date: "2020-12-16T16:34:00.000Z",
      description: "Vous approchez du but, ne lâchez rien !",
      iconUrl:
        "https://hack202012activitytrack.blob.core.windows.net/images/badges/walk_3.png",
      type: "badge",
    },
    {
      date: "2020-12-16T16:34:00.000Z",
      description: "Vous en êtes à la moitié, félicitations !",
      iconUrl:
        "https://hack202012activitytrack.blob.core.windows.net/images/badges/walk_2.png",
      type: "badge",
    },
    {
      date: "2020-12-16T16:34:00.000Z",
      description:
        "Vous avez fait vos premiers 2000 pas, le plus dur est fait, continuez !",
      iconUrl:
        "https://hack202012activitytrack.blob.core.windows.net/images/badges/walk_1.png",
      type: "badge",
    },
    {
      date: "2020-12-16T16:34:00.000Z",
      description: "Welcome !",
      iconUrl:
        "https://hack202012activitytrack.blob.core.windows.net/images/badges/new.png",
      type: "badge",
    },
    {
      date: "2020-12-16T16:34:00.000Z",
      description: "Marche de 2000 pas",
      pointsWon: 12,
      type: "activity",
    },
    {
      description:
        "Bravo, vous avez synchronisé vos 2000 premiers pas dans nore application. Prenez connaissance des bénéfices de la marche dans l'article qui suit :",
      imageUrl: `${process.env.PUBLIC_URL}/article-placeholder.png`,
      link: "https://www.cchst.ca/oshanswers/psychosocial/walking.html",
      title: "Vos premiers 2000 pas",
      type: "communication",
    },
  ],
  user: {
    age: 34,
    avatarUrl: `${process.env.PUBLIC_URL}/avatar-sample.jpg`,
    dayPoints: 100,
    fullName: "Michaël Fischer",
  },
};

export default data;
