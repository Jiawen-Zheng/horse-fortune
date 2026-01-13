/**
 * 学业签 - 200签基础数据（简化版）
 * 上上签 (1-100)
 * 上签 (101-200)
 * 
 * 注意：本文件只包含基础信息（title, poem, luckyColor等）
 * interpretation和advice将在运行时通过signGenerator动态生成
 */

import { generateStudySign } from './signGenerator.js';

// 基础签文数据（不包含interpretation和advice）
const baseStudySigns = [
  // 上上签 (1-100)
  {
    id: 1,
    level: 'supreme',
    title: '金榜题名',
    poem: ['十年寒窗苦读勤', '金榜题名耀门庭', '一举成名天下知', '前程似锦步青云'],
    luckyColor: '红色',
    luckyNumber: 1,
    luckyDirection: '南方'
  },
  {
    id: 2,
    level: 'supreme',
    title: '状元及第',
    poem: ['文曲星君照前程', '状元及第显才能', '学识渊博惊四座', '名扬四海誉满城'],
    luckyColor: '金色',
    luckyNumber: 9,
    luckyDirection: '东南'
  },
  {
    id: 3,
    level: 'supreme',
    title: '过目不忘',
    poem: ['过目不忘记忆强', '博闻强识智慧藏', '学习效率倍增快', '知识积累如海洋'],
    luckyColor: '蓝色',
    luckyNumber: 7,
    luckyDirection: '北方'
  },
  {
    id: 4,
    level: 'supreme',
    title: '名师指点',
    poem: ['名师指点迷津开', '茅塞顿开心智来', '学习方法得改善', '学业进步步伐快'],
    luckyColor: '紫色',
    luckyNumber: 3,
    luckyDirection: '东方'
  },
  {
    id: 5,
    level: 'supreme',
    title: '文思泉涌',
    poem: ['文思泉涌创意新', '下笔如有神助灵', '论文写作顺畅好', '创作才华得展映'],
    luckyColor: '绿色',
    luckyNumber: 5,
    luckyDirection: '西方'
  },
  {
    id: 6,
    level: 'supreme',
    title: '融会贯通',
    poem: ['知识融会贯通明', '举一反三思路清', '学科交叉创新见', '学业成就更上层'],
    luckyColor: '橙色',
    luckyNumber: 8,
    luckyDirection: '西北'
  },
  {
    id: 7,
    level: 'supreme',
    title: '深造有成',
    poem: ['求学深造机会来', '名校录取通知在', '学业更上一层台', '知识海洋任遨游'],
    luckyColor: '白色',
    luckyNumber: 6,
    luckyDirection: '西方'
  },
  {
    id: 8,
    level: 'supreme',
    title: '研究突破',
    poem: ['研究课题有突破', '创新成果显著多', '学术论文发表顺', '学术声誉日增添'],
    luckyColor: '银色',
    luckyNumber: 4,
    luckyDirection: '北方'
  },
  {
    id: 9,
    level: 'supreme',
    title: '考试超常',
    poem: ['考场发挥超水平', '难题巧解思路明', '平时积累终见效', '成绩优异喜临门'],
    luckyColor: '黄色',
    luckyNumber: 2,
    luckyDirection: '中央'
  },
  {
    id: 10,
    level: 'supreme',
    title: '学业有成',
    poem: ['学业有成功名就', '学位证书手中收', '多年苦读终圆满', '前程锦绣展宏图'],
    luckyColor: '深蓝色',
    luckyNumber: 10,
    luckyDirection: '东北'
  },

  // 继续上上签 11-100
  ...Array.from({ length: 90 }, (_, i) => {
    const id = i + 11;
    const supremeTitles = [
      '考试顺利', '学习进步', '成绩优异', '理解深入', '记忆增强',
      '方法得当', '效率提升', '兴趣浓厚', '专注力强', '思维活跃',
      '作业优秀', '研究顺利', '竞赛获奖', '考证成功', '师生和谐',
      '同学互助', '资源丰富', '环境优良', '心态积极', '目标明确'
    ];
    
    const supremePoems = [
      ['学业运势正当时', '考试顺利成绩佳', '平时努力终有报', '金榜题名乐哈哈'],
      ['学习进步日日新', '知识积累日渐深', '老师赞赏同学羡', '学业路上步青云'],
      ['考试成绩超预期', '平时积累显威力', '难题巧解思路清', '学业优秀人称奇'],
      ['学习兴趣浓如茶', '主动求知乐开花', '课堂内外勤钻研', '知识海洋任遨游']
    ];
    
    const colors = ['宝蓝', '翠绿', '金黄', '绛紫', '银白', '靛青', '橙红', '墨绿', '深红', '藏青'];
    const directions = ['正东', '正南', '正西', '正北', '东南', '西南', '东北', '西北', '中央'];
    
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
    title: '稳步前进',
    poem: ['学业稳步向前行', '不急不躁心态平', '积累知识打基础', '未来考试定能赢'],
    luckyColor: '浅蓝色',
    luckyNumber: 4,
    luckyDirection: '东方'
  },
  {
    id: 102,
    level: 'excellent',
    title: '小有进步',
    poem: ['学习小有进步见', '点滴积累成效显', '虽无飞跃也有得', '继续努力定向前'],
    luckyColor: '米色',
    luckyNumber: 6,
    luckyDirection: '南方'
  },

  // 继续上签 103-200
  ...Array.from({ length: 98 }, (_, i) => {
    const id = i + 103;
    const excellentTitles = [
      '平稳学习', '小步提升', '基础扎实', '方法得当', '环境良好',
      '同学互助', '心态稳定', '课堂认真', '作业完成', '复习有效',
      '考试达标', '学习坚持', '兴趣培养', '时间管理', '资源利用',
      '师生沟通', '错题整理', '计划执行', '习惯养成', '目标明确'
    ];
    
    const excellentPoems = [
      ['学业发展平稳行', '小步前进莫看轻', '基础扎实后劲足', '未来考试定能赢'],
      ['学习环境得改善', '效率提升进步见', '同学互助氛围好', '学业路上稳步前'],
      ['学习方法渐得当', '时间管理效率强', '不再熬夜效果显', '学业进步心欢畅'],
      ['考试达标心安宁', '虽非优异也还行', '达到要求继续进', '学业路上稳步攀']
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
export const studySigns = baseStudySigns.map(sign => 
  generateStudySign(sign.id, sign.level, sign)
);

/**
 * 根据签号获取签文
 * @param {number} signId - 签号 (1-200)
 * @returns {object} 签文对象
 */
export function getStudySignById(signId) {
  return studySigns.find(sign => sign.id === signId) || studySigns[0];
}

/**
 * 获取所有上上签
 * @returns {array} 上上签数组
 */
export function getStudySupremeSigns() {
  return studySigns.filter(sign => sign.level === 'supreme');
}

/**
 * 获取所有上签
 * @returns {array} 上签数组
 */
export function getStudyExcellentSigns() {
  return studySigns.filter(sign => sign.level === 'excellent');
}

/**
 * 随机获取一支签
 * @returns {object} 随机签文
 */
export function getRandomStudySign() {
  const randomId = Math.floor(Math.random() * 200) + 1;
  return getStudySignById(randomId);
}