/**
 * 未来规划时间轴 — 数据配置文件
 * 内容来源：未来规划.docx
 * 后续可直接修改此文件来添加/修改阶段与任务
 * 所有任务 id 用于 localStorage 持久化勾选状态
 */

var TIMELINE_CONFIG = {
  periods: [
    {
      id: "2026-h1",
      timeLabel: "2026 上半年",
      theme: "Foundation Building",
      icon: "🎯",
      status: "in-progress",
      progress: 0,
      mainGoal: "完成技术基础建设",
      categories: [
        {
          name: "学术基础",
          tasks: [
            { id: "2026h1-c1-1", text: "深入学习数据结构与算法" },
            { id: "2026h1-c1-2", text: "Python基础" }
          ]
        },
        {
          name: "科研探索",
          tasks: [
            { id: "2026h1-c2-1", text: "大量阅读空地协同感知、异构无人机、卫星网络、卫星通信相关文献" },
            { id: "2026h1-c2-2", text: "初步确定感兴趣研究方向" },
            { id: "2026h1-c2-3", text: "学习论文阅读与总结方法" },
            { id: "2026h1-c2-4", text: "开始接触论文复现" }
          ]
        },
        {
          name: "英语能力",
          tasks: [
            { id: "2026h1-c3-1", text: "重建英语学习体系" },
            { id: "2026h1-c3-2", text: "提高学术阅读能力" }
          ]
        },
        {
          name: "项目实践",
          tasks: [
            { id: "2026h1-c4-1", text: "完成个人科研路线图网站" },
            { id: "2026h1-c4-2", text: "开始 Agent + Web 开发实践" },
            { id: "2026h1-c4-3", text: "参与实验室（易梦）项目" }
          ]
        }
      ]
    },
    {
      id: "2026-h2",
      timeLabel: "2026 下半年",
      theme: "Research Entry",
      icon: "🎯",
      status: "upcoming",
      progress: 0,
      mainGoal: "完成“从学习者到开发者”的转变",
      categories: [
        {
          name: "科研方向",
          tasks: [
            { id: "2026h2-c1-1", text: "明确未来主研究方向" },
            { id: "2026h2-c1-2", text: "深入阅读重点领域论文" },
            { id: "2026h2-c1-3", text: "开始参与实际科研项目" },
            { id: "2026h2-c1-4", text: "尝试第一篇论文工作" }
          ]
        },
        {
          name: "技术能力",
          tasks: [
            { id: "2026h2-c2-1", text: "Java 后端开发能力初步形成" },
            { id: "2026h2-c2-2", text: "学习数据库与服务器基础" },
            { id: "2026h2-c2-3", text: "学习 AI Agent 工作流" },
            { id: "2026h2-c2-4", text: "提升工程化开发能力" }
          ]
        },
        {
          name: "英语",
          tasks: [
            { id: "2026h2-c3-1", text: "IELTS 系统化学习" },
            { id: "2026h2-c3-2", text: "强化听力与阅读" },
            { id: "2026h2-c3-3", text: "积累学术词汇" }
          ]
        },
        {
          name: "比赛与项目",
          tasks: [
            { id: "2026h2-c4-1", text: "竞赛准备（中国大学生计算机设计大赛）" },
            { id: "2026h2-c4-2", text: "完成 1~2 个完整项目" },
            { id: "2026h2-c4-3", text: "提升 GitHub 项目质量" }
          ]
        }
      ]
    },
    {
      id: "2027-h1",
      timeLabel: "2027 上半年",
      theme: "Research Growth",
      icon: "🎯",
      status: "upcoming",
      progress: 0,
      mainGoal: "形成初步科研与工程能力",
      categories: [
        {
          name: "科研",
          tasks: [
            { id: "2027h1-c1-1", text: "深入参与实验室项目" },
            { id: "2027h1-c1-2", text: "尝试论文投稿" },
            { id: "2027h1-c1-3", text: "学习实验设计与科研方法" },
            { id: "2027h1-c1-4", text: "提升学术表达能力" }
          ]
        },
        {
          name: "技术",
          tasks: [
            { id: "2027h1-c2-1", text: "后端能力提升" },
            { id: "2027h1-c2-2", text: "开始构建完整系统项目" },
            { id: "2027h1-c2-3", text: "深入 AI + Agent 技术" }
          ]
        },
        {
          name: "英语 / 法语",
          tasks: [
            { id: "2027h1-c3-1", text: "IELTS 首次考试准备" },
            { id: "2027h1-c3-2", text: "法语开始系统学习" },
            { id: "2027h1-c3-3", text: "提升国际化交流能力" }
          ]
        },
        {
          name: "项目 / 比赛",
          tasks: [
            { id: "2027h1-c4-1", text: "参加中国大学生计算机设计大赛（4c大赛）" },
            { id: "2027h1-c4-2", text: "丰富个人项目经历" },
            { id: "2027h1-c4-3", text: "开始准备实习" }
          ]
        }
      ]
    },
    {
      id: "2027-h2",
      timeLabel: "2027 下半年",
      theme: "Academic Breakthrough",
      icon: "🎯",
      status: "upcoming",
      progress: 0,
      mainGoal: "建立具有竞争力的个人背景",
      categories: [
        {
          name: "科研",
          tasks: [
            { id: "2027h2-c1-1", text: "冲击高质量论文" },
            { id: "2027h2-c1-2", text: "争取达到 CCF-B 水平" },
            { id: "2027h2-c1-3", text: "明确长期研究方向" },
            { id: "2027h2-c1-4", text: "深化 无人机/卫星网络/通信方向" }
          ]
        },
        {
          name: "实践",
          tasks: [
            { id: "2027h2-c2-1", text: "参加实习" },
            { id: "2027h2-c2-2", text: "提升团队协作与工程经验" },
            { id: "2027h2-c2-3", text: "完成代表性项目" }
          ]
        },
        {
          name: "语言",
          tasks: [
            { id: "2027h2-c3-1", text: "IELTS 冲刺 7~7.5" },
            { id: "2027h2-c3-2", text: "法语达到 B1~B2" }
          ]
        },
        {
          name: "GPA",
          tasks: [
            { id: "2027h2-c4-1", text: "保持高 GPA" },
            { id: "2027h2-c4-2", text: "强化核心课程能力" }
          ]
        }
      ]
    },
    {
      id: "2028-h1",
      timeLabel: "2028 上半年",
      theme: "Application Preparation",
      icon: "🎯",
      status: "upcoming",
      progress: 0,
      mainGoal: "完成海外申请准备",
      targetSchools: [
        "University of Waterloo",
        "Université de Montréal",
        "National University of Singapore",
        "Nanyang Technological University",
        "The University of Hong Kong",
        "Hong Kong University of Science and Technology"
      ],
      categories: [
        {
          name: "学术成果",
          tasks: [
            { id: "2028h1-c1-1", text: "完成本科阶段论文目标" },
            { id: "2028h1-c1-2", text: "整理科研成果与项目集" }
          ]
        },
        {
          name: "语言",
          tasks: [
            { id: "2028h1-c2-1", text: "IELTS 达到目标分数" },
            { id: "2028h1-c2-2", text: "法语达到 B2（如可能）" }
          ]
        },
        {
          name: "材料准备",
          tasks: [
            { id: "2028h1-c3-1", text: "CV" },
            { id: "2028h1-c3-2", text: "PS" },
            { id: "2028h1-c3-3", text: "推荐信" },
            { id: "2028h1-c3-4", text: "项目展示网站" }
          ]
        }
      ]
    },
    {
      id: "2028-h2",
      timeLabel: "2028 下半年",
      theme: "Future Transition",
      icon: "🎯",
      status: "upcoming",
      progress: 0,
      mainGoal: "完成申请，持续成长",
      categories: [
        {
          name: "申请阶段",
          tasks: [
            { id: "2028h2-c1-1", text: "提交申请" },
            { id: "2028h2-c1-2", text: "面试准备" },
            { id: "2028h2-c1-3", text: "联系导师" },
            { id: "2028h2-c1-4", text: "完成最终材料" }
          ]
        },
        {
          name: "技术与科研持续推进",
          tasks: [
            { id: "2028h2-c2-1", text: "持续项目开发" },
            { id: "2028h2-c2-2", text: "保持科研输出" },
            { id: "2028h2-c2-3", text: "深化 AI + 智能系统方向" }
          ]
        }
      ]
    }
  ],

  capabilities: {
    research: {
      icon: "🔬",
      title: "Research",
      items: [
        { name: "空地协同感知", level: 25 },
        { name: "异构无人机系统", level: 20 },
        { name: "卫星网络与通信", level: 15 },
        { name: "论文阅读与综述", level: 30 },
        { name: "实验设计与方法", level: 10 }
      ]
    },
    technical: {
      icon: "💻",
      title: "Technical Skills",
      items: [
        { name: "Python", level: 40 },
        { name: "数据结构与算法", level: 25 },
        { name: "Java 后端开发", level: 10 },
        { name: "AI Agent 开发", level: 15 },
        { name: "Web 开发 (HTML/CSS/JS)", level: 30 },
        { name: "Git / GitHub", level: 25 }
      ]
    },
    language: {
      icon: "🗣️",
      title: "Language",
      items: [
        { name: "英语学术阅读", level: 35 },
        { name: "IELTS 听力与阅读", level: 30 },
        { name: "学术词汇积累", level: 25 },
        { name: "法语（入门）", level: 5 }
      ]
    }
  },

  vision: {
    title: "Future Vision",
    description: "致力于异构智能集群系统（空地协同感知、无人机/卫星网络）的协同控制与智能决策研究，推动学术成果落地，申请海外顶尖院校深造。",
    goals: [
      "在 CCF-B 及以上期刊/会议发表研究论文",
      "获得目标院校（Waterloo / Montréal / NUS / NTU / HKU / HKUST）PhD 或 Master Offer",
      "建立完整的科研 Portfolio 与项目展示",
      "IELTS 7.0+，法语 B1~B2",
      "具备独立科研与工程落地能力"
    ]
  }
};
