/**
 * 健康签 - 200签基础数据（简化版）
 * 上上签 (1-100)
 * 上签 (101-200)
 * 
 * 注意：本文件只包含基础信息（title, poem, luckyColor等）
 * interpretation和advice将在运行时通过signGenerator动态生成
 */

import { generateHealthSign } from './signGenerator.js';

// 基础签文数据（不包含interpretation和advice）
const baseHealthSigns = [
  // 上上签 (1-100)
  {
    id: 1,
    level: 'supreme',
    title: '康宁福寿',
    poem: ['身心健康福寿长', '精神矍铄体魄强', '无病无灾平安日', '神清气爽乐安康'],
    luckyColor: '绿色',
    luckyNumber: 8,
    luckyDirection: '东方'
  },
  {
    id: 2,
    level: 'supreme',
    title: '病去康复',
    poem: ['病魔退散康复来', '身体渐强精神好', '医疗有效配合佳', '健康回归乐开怀'],
    luckyColor: '白色',
    luckyNumber: 6,
    luckyDirection: '西方'
  },
  {
    id: 3,
    level: 'supreme',
    title: '活力四射',
    poem: ['精力充沛如朝阳', '活力四射身体棒', '工作效率倍增快', '生活充满正能量'],
    luckyColor: '橙色',
    luckyNumber: 9,
    luckyDirection: '南方'
  },
  {
    id: 4,
    level: 'supreme',
    title: '心态平和',
    poem: ['心态平和不焦虑', '情绪稳定烦恼少', '看淡得失心境宽', '健康长寿乐逍遥'],
    luckyColor: '蓝色',
    luckyNumber: 3,
    luckyDirection: '北方'
  },
  {
    id: 5,
    level: 'supreme',
    title: '睡眠香甜',
    poem: ['夜夜安眠睡梦甜', '一觉天亮精神满', '深度休息质量高', '日间工作活力添'],
    luckyColor: '紫色',
    luckyNumber: 7,
    luckyDirection: '东北'
  },
  {
    id: 6,
    level: 'supreme',
    title: '体检全优',
    poem: ['体检报告全达标', '各项指标均正常', '医生称赞体质好', '健康无忧心欢畅'],
    luckyColor: '天蓝色',
    luckyNumber: 5,
    luckyDirection: '中央'
  },
  {
    id: 7,
    level: 'supreme',
    title: '运动达人',
    poem: ['运动健身效果显', '体质增强体型美', '坚持不懈收获丰', '健康生活永相随'],
    luckyColor: '红色',
    luckyNumber: 4,
    luckyDirection: '东南'
  },
  {
    id: 8,
    level: 'supreme',
    title: '饮食均衡',
    poem: ['饮食均衡营养全', '身体吸收效率高', '体重标准体型好', '健康基础打得牢'],
    luckyColor: '黄色',
    luckyNumber: 2,
    luckyDirection: '西南'
  },
  {
    id: 9,
    level: 'supreme',
    title: '免疫强大',
    poem: ['免疫系统如长城', '病菌难侵体魄强', '少病少痛健康保', '四季平安福寿长'],
    luckyColor: '银色',
    luckyNumber: 1,
    luckyDirection: '西北'
  },
  {
    id: 10,
    level: 'supreme',
    title: '容颜焕发',
    poem: ['容光焕发气色佳', '皮肤光滑精神好', '内外兼修健康显', '自然之美人人夸'],
    luckyColor: '粉色',
    luckyNumber: 10,
    luckyDirection: '正东'
  },

  // 继续上上签 11-100
  ...Array.from({ length: 90 }, (_, i) => {
    const id = i + 11;
    const supremeTitles = [
      '精力充沛', '睡眠良好', '食欲正常', '消化顺畅', '运动能力',
      '免疫力强', '心态积极', '压力适应', '康复迅速', '检查正常',
      '慢病稳定', '伤痛恢复', '视力良好', '听力清晰', '心肺健康',
      '骨骼强壮', '皮肤健康', '头发亮泽', '牙齿坚固', '身心和谐'
    ];
    
    const supremePoems = [
      ['身体健康精神好', '病痛不扰乐陶陶', '饮食睡眠皆规律', '健康长寿福气高'],
      ['心理平和烦恼少', '压力应对有妙招', '情绪稳定心态好', '身心健康乐逍遥'],
      ['运动健身习惯好', '体质增强疾病少', '活力充沛效率高', '健康生活品质好'],
      ['饮食均衡营养全', '身体吸收效率显', '体重标准体型美', '健康基础打得牢']
    ];
    
    const colors = ['翠绿', '天蓝', '米白', '浅黄', '淡粉', '银灰', '淡紫', '浅棕', '象牙', '珍珠'];
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
    title: '平稳健康',
    poem: ['健康状况平稳好', '无大问题无烦恼', '日常维护做得到', '健康生活乐陶陶'],
    luckyColor: '浅绿色',
    luckyNumber: 4,
    luckyDirection: '东方'
  },
  {
    id: 102,
    level: 'excellent',
    title: '小病快愈',
    poem: ['偶感小疾恢复快', '身体自愈能力强', '注意休息多喝水', '很快康复无大碍'],
    luckyColor: '淡蓝色',
    luckyNumber: 6,
    luckyDirection: '南方'
  },

  // 继续上签 103-200
  ...Array.from({ length: 98 }, (_, i) => {
    const id = i + 103;
    const excellentTitles = [
      '健康平稳', '小病快好', '检查正常', '压力可控', '睡眠尚可',
      '运动有益', '饮食改善', '慢病控制', '康复进行', '心态平和',
      '精力一般', '消化正常', '免疫正常', '视力稳定', '听力正常',
      '心肺尚可', '骨骼正常', '皮肤尚好', '情绪稳定', '适应良好'
    ];
    
    const excellentPoems = [
      ['健康状况总体平', '无大问题小调整', '日常维护做得好', '生活质量有保证'],
      ['小病小痛恢复快', '身体自愈能力在', '注意休息多保养', '很快又能健康态'],
      ['体检结果无大碍', '小问题可调整改', '医生建议认真做', '健康管理不懈怠'],
      ['工作生活压力有', '找到方法能承受', '放松调节做得到', '身心健康能维护']
    ];
    
    const colors = ['浅绿', '米白', '淡蓝', '浅灰', '淡黄', '浅紫', '淡粉', '珍珠白', '香槟色', '银灰'];
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
export const healthSigns = baseHealthSigns.map(sign => 
  generateHealthSign(sign.id, sign.level, sign)
);

/**
 * 根据签号获取签文
 * @param {number} signId - 签号 (1-200)
 * @returns {object} 签文对象
 */
export function getHealthSignById(signId) {
  return healthSigns.find(sign => sign.id === signId) || healthSigns[0];
}

/**
 * 获取所有上上签
 * @returns {array} 上上签数组
 */
export function getHealthSupremeSigns() {
  return healthSigns.filter(sign => sign.level === 'supreme');
}

/**
 * 获取所有上签
 * @returns {array} 上签数组
 */
export function getHealthExcellentSigns() {
  return healthSigns.filter(sign => sign.level === 'excellent');
}

/**
 * 随机获取一支签
 * @returns {object} 随机签文
 */
export function getRandomHealthSign() {
  const randomId = Math.floor(Math.random() * 200) + 1;
  return getHealthSignById(randomId);
}