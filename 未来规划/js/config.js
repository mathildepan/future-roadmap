/**
 * 未来规划时间轴 — 数据配置文件
 * 后续可直接修改此文件来添加/修改阶段与任务
 * 所有任务 id 用于 localStorage 持久化勾选状态
 */

const TIMELINE_CONFIG = {
  periods: [
    {
      id: "2026-h1",
      timeLabel: "2026 上半年",
      theme: "基础建设期",
      icon: "🔬",
      status: "in-progress",
      progress: 35,
      mainGoal: "确定研究方向，完成基础课程学习",
      tasks: [
        {
          id: "2026h1-main-1",
          text: "完成线性代数与概率论强化",
          subtasks: [
            { id: "2026h1-sub-1a", text: "MIT 18.06 线性代数课程" },
            { id: "2026h1-sub-1b", text: "概率论习题集全部完成" }
          ]
        },
        {
          id: "2026h1-main-2",
          text: "掌握 Python 数据科学工具链",
          subtasks: [
            { id: "2026h1-sub-2a", text: "NumPy / Pandas / Matplotlib 熟练使用" },
            { id: "2026h1-sub-2b", text: "完成 3 个 Kaggle 入门竞赛" }
          ]
        },
        {
          id: "2026h1-main-3",
          text: "阅读 10 篇领域核心论文并撰写综述",
          subtasks: []
        }
      ]
    },
    {
      id: "2026-h2",
      timeLabel: "2026 下半年",
      theme: "能力提升期",
      icon: "🚀",
      status: "upcoming",
      progress: 0,
      mainGoal: "发表第一篇论文，参与科研项目",
      tasks: [
        {
          id: "2026h2-main-1",
          text: "完成第一个独立研究项目",
          subtasks: [
            { id: "2026h2-sub-1a", text: "问题定义与文献调研" },
            { id: "2026h2-sub-1b", text: "实验设计与实现" },
            { id: "2026h2-sub-1c", text: "论文撰写与投稿" }
          ]
        },
        {
          id: "2026h2-main-2",
          text: "深度学习框架精通（PyTorch）",
          subtasks: []
        },
        {
          id: "2026h2-main-3",
          text: "参加 1 次学术会议并做报告",
          subtasks: []
        }
      ]
    },
    {
      id: "2027-h1",
      timeLabel: "2027 上半年",
      theme: "突破发展期",
      icon: "💡",
      status: "upcoming",
      progress: 0,
      mainGoal: "确定主攻方向，积累高质量成果",
      tasks: [
        {
          id: "2027h1-main-1",
          text: "确定细分研究方向并深入探索",
          subtasks: []
        },
        {
          id: "2027h1-main-2",
          text: "完成第 2 篇论文（目标 CCF-B 及以上）",
          subtasks: []
        },
        {
          id: "2027h1-main-3",
          text: "建立个人学术主页与 GitHub 项目",
          subtasks: []
        }
      ]
    },
    {
      id: "2027-h2",
      timeLabel: "2027 下半年",
      theme: "成果产出期",
      icon: "📝",
      status: "upcoming",
      progress: 0,
      mainGoal: "多线推进，冲刺高质量论文",
      tasks: [
        {
          id: "2027h2-main-1",
          text: "投稿 CCF-A 类会议/期刊",
          subtasks: []
        },
        {
          id: "2027h2-main-2",
          text: "申请发明专利 1-2 项",
          subtasks: []
        },
        {
          id: "2027h2-main-3",
          text: "参与国家级科研项目申报",
          subtasks: []
        }
      ]
    },
    {
      id: "2028-h1",
      timeLabel: "2028 上半年",
      theme: "国际拓展期",
      icon: "🌍",
      status: "upcoming",
      progress: 0,
      mainGoal: "准备留学申请，发表顶级论文",
      tasks: [
        {
          id: "2028h1-main-1",
          text: "完成 TOEFL/IELTS 考试（目标 100+/7.0+）",
          subtasks: []
        },
        {
          id: "2028h1-main-2",
          text: "完成 GRE 考试（目标 325+）",
          subtasks: []
        },
        {
          id: "2028h1-main-3",
          text: "联系海外导师并准备 Research Proposal",
          subtasks: []
        }
      ]
    },
    {
      id: "2028-h2",
      timeLabel: "2028 下半年",
      theme: "冲刺收获期",
      icon: "🎓",
      status: "upcoming",
      progress: 0,
      mainGoal: "完成申请，总结本科成果",
      tasks: [
        {
          id: "2028h2-main-1",
          text: "提交留学申请材料",
          subtasks: []
        },
        {
          id: "2028h2-main-2",
          text: "完成本科毕业论文（优秀目标）",
          subtasks: []
        },
        {
          id: "2028h2-main-3",
          text: "整理科研成果形成完整 Portfolio",
          subtasks: []
        }
      ]
    }
  ],

  capabilities: {
    research: {
      icon: "🔬",
      title: "Research",
      items: [
        { name: "异构集群编队控制", level: 45 },
        { name: "强化学习 (RL/MARL)", level: 35 },
        { name: "预设性能控制 (PPC)", level: 30 },
        { name: "图神经网络 (GNN/GAT)", level: 25 },
        { name: "论文写作与文献综述", level: 50 }
      ]
    },
    technical: {
      icon: "💻",
      title: "Technical Skills",
      items: [
        { name: "Python / PyTorch", level: 55 },
        { name: "MATLAB / Simulink", level: 40 },
        { name: "LaTeX 论文排版", level: 60 },
        { name: "Git / 版本控制", level: 35 },
        { name: "HTML / CSS / JavaScript", level: 45 }
      ]
    },
    language: {
      icon: "🗣️",
      title: "Language",
      items: [
        { name: "英语 — TOEFL/IELTS", level: 50 },
        { name: "学术英语写作", level: 35 },
        { name: "英文学术报告", level: 25 },
        { name: "英文文献速读", level: 55 }
      ]
    }
  },

  vision: {
    title: "Future Vision",
    description: "致力于异构智能集群系统的协同控制与智能决策研究，推动无人机/无人车/无人船等异构平台在复杂环境中的自主协作能力。",
    goals: [
      "在 CCF-A 类期刊/会议发表研究论文",
      "获得世界 Top 50 院校 PhD Offer",
      "建立有影响力的开源研究项目",
      "参与国际顶级学术会议并做 Oral 报告",
      "推动异构集群系统在真实场景中的落地应用"
    ]
  }
};
