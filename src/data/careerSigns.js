/**
 * 事业签 - 200签基础数据（简化版）
 * 上上签 (1-100)
 * 上签 (101-200)
 * 
 * 注意：本文件只包含基础信息（title, poem, luckyColor等）
 * interpretation和advice将在运行时通过signGenerator动态生成
 */

import { generateCareerSign } from './signGenerator.js';

// 基础签文数据（不包含interpretation和advice）
const baseCareerSigns = [
  // 上上签 (1-100)
  {
    id: 1,
    level: 'supreme',
    title: '步步高升',
    poem: ['事业阶梯步步高', '青云直上九重霄', '才能得展机遇好', '功成名就乐陶陶'],
    luckyColor: '深蓝色',
    luckyNumber: 8,
    luckyDirection: '北方'
  },
  {
    id: 2,
    level: 'supreme',
    title: '功成名就',
    poem: ['十年磨剑终成锋', '功成名就显威风', '业绩斐然众人赞', '行业翘楚展雄风'],
    luckyColor: '金色',
    luckyNumber: 9,
    luckyDirection: '中央'
  },
  {
    id: 3,
    level: 'supreme',
    title: '伯乐相马',
    poem: ['千里马遇伯乐识', '才华得展露锋芒', '贵人引路平步起', '前程似锦事业旺'],
    luckyColor: '银色',
    luckyNumber: 6,
    luckyDirection: '西北'
  },
  {
    id: 4,
    level: 'supreme',
    title: '开创新局',
    poem: ['破旧立新创天地', '敢为人先开新局', '独到眼光占先机', '事业腾飞无人及'],
    luckyColor: '橙色',
    luckyNumber: 7,
    luckyDirection: '东方'
  },
  {
    id: 5,
    level: 'supreme',
    title: '权柄在握',
    poem: ['执掌大权展宏图', '运筹帷幄决胜远', '领导有方得人心', '事业兴旺福满途'],
    luckyColor: '紫色',
    luckyNumber: 5,
    luckyDirection: '南方'
  },
  {
    id: 6,
    level: 'supreme',
    title: '合作共赢',
    poem: ['强强联手力量增', '合作共赢事业兴', '资源整合优势显', '共创辉煌扬美名'],
    luckyColor: '绿色',
    luckyNumber: 3,
    luckyDirection: '东南'
  },
  {
    id: 7,
    level: 'supreme',
    title: '名利双收',
    poem: ['名扬四海声誉隆', '利禄双全财运通', '事业家庭两得意', '人生圆满乐无穷'],
    luckyColor: '红色',
    luckyNumber: 2,
    luckyDirection: '西南'
  },
  {
    id: 8,
    level: 'supreme',
    title: '突破瓶颈',
    poem: ['瓶颈突破见新天', '思路打开创新篇', '困扰难题终得解', '事业更上一层巅'],
    luckyColor: '黄色',
    luckyNumber: 4,
    luckyDirection: '东北'
  },
  {
    id: 9,
    level: 'supreme',
    title: '跨界发展',
    poem: ['跨界发展视野阔', '多元技能优势多', '适应变化能力强', '事业道路更宽广'],
    luckyColor: '白色',
    luckyNumber: 1,
    luckyDirection: '西方'
  },
  {
    id: 10,
    level: 'supreme',
    title: '行业领袖',
    poem: ['行业翘楚领风骚', '标准制定话语高', '技术领先优势显', '竞争无敌地位牢'],
    luckyColor: '深紫色',
    luckyNumber: 10,
    luckyDirection: '西北'
  },

  // 继续上上签 11-100
  ...Array.from({ length: 90 }, (_, i) => {
    const id = i + 11;
    const supremeTitles = [
      '职场得意', '晋升顺利', '项目成功', '业绩突出', '创业成功',
      '合作顺利', '贵人扶持', '机遇频现', '能力认可', '资源丰富',
      '团队和谐', '创新成功', '转型顺利', '市场拓展', '技术突破',
      '管理卓越', '品牌提升', '客户满意', '竞争优胜', '稳如泰山'
    ];
    
    const supremePoems = [
      ['职场运势正当时', '晋升加薪皆可期', '项目推进顺心意', '事业有成乐滋滋'],
      ['贵人扶持事业兴', '机遇频现好运临', '能力展现受认可', '职场得意步青云'],
      ['团队协作力量强', '项目顺利业绩扬', '领导赞赏同事敬', '事业阶梯步步高'],
      ['创新思维破常规', '市场竞争显神威', '产品服务获青睐', '事业腾飞展宏图']
    ];
    
    const colors = ['藏青', '咖啡色', '酒红', '墨绿', '深紫', '靛蓝', '棕红', '橄榄绿', '深灰', '炭黑'];
    const directions = ['正北', '正南', '正东', '正西', '东南', '西南', '东北', '西北'];
    
    return {
      id,
      level: 'supreme',
      title: supremeTitles[(id - 11) % supremeTitles.length],
      poem: supremePoems[(id - 11) % supremePoems.length],
      luckyColor: colors[id % colors.length],
      luckyNumber: (id % 9) + 1,
      luckyDirection: directions[id % directions.length]
    };
  }),

  // 上签 (101-200)
  {
    id: 101,
    level: 'excellent',
    title: '稳步发展',
    poem: ['事业稳步向前行', '不急不躁心态平', '积累经验打基础', '未来可期步步升'],
    luckyColor: '浅蓝色',
    luckyNumber: 4,
    luckyDirection: '东方'
  },
  {
    id: 102,
    level: 'excellent',
    title: '小有所成',
    poem: ['小有所成心欢喜', '点滴积累见成绩', '虽无大功也有得', '继续努力创奇迹'],
    luckyColor: '米色',
    luckyNumber: 6,
    luckyDirection: '南方'
  },

  // 继续上签 103-200
  ...Array.from({ length: 98 }, (_, i) => {
    const id = i + 103;
    const excellentTitles = [
      '平稳过渡', '渐入佳境', '小步前进', '稳步提升', '团队和谐',
      '技能进步', '项目推进', '工作稳定', '人脉拓展', '压力减轻',
      '效率提升', '沟通改善', '问题解决', '计划实施', '目标达成',
      '职业安全', '学习进步', '环境适应', '流程优化', '质量保证'
    ];
    
    const excellentPoems = [
      ['事业发展平稳行', '小步前进莫看轻', '积累经验打基础', '未来自有好前程'],
      ['职场和谐少纷争', '工作顺利心情轻', '团队协作效率高', '业绩稳定步步升'],
      ['技能提升眼界宽', '学习进步成长安', '专业能力得增强', '职场发展路更宽'],
      ['工作稳定心安宁', '收入保障生活平', '虽无大富也小康', '平安是福乐盈盈']
    ];
    
    const colors = ['浅蓝', '米白', '淡绿', '浅灰', '淡黄', '浅紫', '淡粉', '珍珠白', '香槟金', '银灰'];
    const directions = ['正东', '正南', '正西', '正北', '东南', '西南', '东北', '西北'];
    
    return {
      id,
      level: 'excellent',
      title: excellentTitles[(id - 103) % excellentTitles.length],
      poem: excellentPoems[(id - 103) % excellentPoems.length],
      luckyColor: colors[id % colors.length],
      luckyNumber: (id % 8) + 1,
      luckyDirection: directions[id % directions.length]
    };
  })
];

// 导出完整签文数组（运行时动态生成interpretation和advice）
export const careerSigns = baseCareerSigns.map(sign => 
  generateCareerSign(sign.id, sign.level, sign)
);

/**
 * 根据签号获取签文
 * @param {number} signId - 签号 (1-200)
 * @returns {object} 签文对象
 */
export function getCareerSignById(signId) {
  return careerSigns.find(sign => sign.id === signId) || careerSigns[0];
}

/**
 * 获取所有上上签
 * @returns {array} 上上签数组
 */
export function getCareerSupremeSigns() {
  return careerSigns.filter(sign => sign.level === 'supreme');
}

/**
 * 获取所有上签
 * @returns {array} 上签数组
 */
export function getCareerExcellentSigns() {
  return careerSigns.filter(sign => sign.level === 'excellent');
}

/**
 * 随机获取一支签
 * @returns {object} 随机签文
 */
export function getRandomCareerSign() {
  const randomId = Math.floor(Math.random() * 200) + 1;
  return getCareerSignById(randomId);
}