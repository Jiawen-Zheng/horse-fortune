/**
 * 财运签 - 200签基础数据（简化版）
 * 上上签 (1-100)
 * 上签 (101-200)
 * 
 * 注意：本文件只包含基础信息（title, poem, luckyColor等）
 * interpretation和advice将在运行时通过signGenerator动态生成
 */

import { generateWealthSign } from './signGenerator.js';

// 基础签文数据（不包含interpretation和advice）
const baseWealthSigns = [
  // 上上签 (1-100)
  {
    id: 1,
    level: 'supreme',
    title: '财源广进',
    poem: ['财源广进如江海', '滚滚而来不停歇', '正财偏财双双旺', '富贵荣华乐开怀'],
    luckyColor: '金色',
    luckyNumber: 8,
    luckyDirection: '东南'
  },
  {
    id: 2,
    level: 'supreme',
    title: '点石成金',
    poem: ['点石成金财运通', '投资决策皆精准', '项目选择眼光独', '财富翻倍不是梦'],
    luckyColor: '黄色',
    luckyNumber: 9,
    luckyDirection: '中央'
  },
  {
    id: 3,
    level: 'supreme',
    title: '富贵逼人',
    poem: ['富贵逼人运势强', '财富累积速度快', '事业收入节节高', '生活品质大提升'],
    luckyColor: '红色',
    luckyNumber: 6,
    luckyDirection: '南方'
  },
  {
    id: 4,
    level: 'supreme',
    title: '横财就手',
    poem: ['横财就手天降福', '意外之财频频来', '投资获利超预期', '惊喜不断笑颜开'],
    luckyColor: '银色',
    luckyNumber: 7,
    luckyDirection: '西方'
  },
  {
    id: 5,
    level: 'supreme',
    title: '财神眷顾',
    poem: ['财神眷顾福气到', '财运亨通事事顺', '商机无限把握住', '财富积累如登山'],
    luckyColor: '紫色',
    luckyNumber: 5,
    luckyDirection: '北方'
  },
  {
    id: 6,
    level: 'supreme',
    title: '投资丰收',
    poem: ['投资播种已有时', '如今收获正当时', '回报丰厚超预期', '财富自由近可期'],
    luckyColor: '绿色',
    luckyNumber: 3,
    luckyDirection: '东方'
  },
  {
    id: 7,
    level: 'supreme',
    title: '事业带财',
    poem: ['事业兴旺财源来', '职位晋升收入增', '业绩突出奖金丰', '正财稳定偏财随'],
    luckyColor: '蓝色',
    luckyNumber: 4,
    luckyDirection: '东北'
  },
  {
    id: 8,
    level: 'supreme',
    title: '合作生财',
    poem: ['强强合作财路开', '资源共享优势显', '互利共赢收益丰', '财富积累速度快'],
    luckyColor: '橙色',
    luckyNumber: 2,
    luckyDirection: '西南'
  },
  {
    id: 9,
    level: 'supreme',
    title: '财库丰盈',
    poem: ['财库丰盈积蓄多', '收支平衡有余裕', '理财有方增值快', '经济安全无忧虑'],
    luckyColor: '棕色',
    luckyNumber: 1,
    luckyDirection: '西北'
  },
  {
    id: 10,
    level: 'supreme',
    title: '贵人带财',
    poem: ['贵人引路财运通', '指点迷津机会来', '人脉资源转化为', '财富增长加速度'],
    luckyColor: '白色',
    luckyNumber: 10,
    luckyDirection: '正东'
  },

  // 继续上上签 11-100
  ...Array.from({ length: 90 }, (_, i) => {
    const id = i + 11;
    const supremeTitles = [
      '财源滚滚', '投资获利', '事业发财', '偏财旺盛', '合作共赢',
      '理财成功', '贵人相助', '创业丰收', '房产获利', '智慧变现',
      '风险控制', '节俭积累', '资金顺畅', '多元创收', '遗产得福',
      '财运复苏', '财务自由', '商机无限', '市场精准', '财富传承'
    ];
    
    const supremePoems = [
      ['财运亨通正当时', '投资理财皆有利', '正财偏财双双旺', '财富积累速度快'],
      ['事业成功财自来', '业绩突出奖金丰', '职位晋升收入增', '生活质量大提升'],
      ['投资眼光精准独', '市场把握时机好', '回报丰厚超预期', '财富增值乐开怀'],
      ['偏财运旺惊喜多', '意外之财频频来', '投资获利超预期', '财务压力大缓解']
    ];
    
    const colors = ['金色', '黄色', '红色', '银色', '紫色', '绿色', '蓝色', '橙色', '棕色', '白色'];
    const directions = ['东南', '中央', '南方', '西方', '北方', '东方', '东北', '西南', '西北', '正东'];
    
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
    title: '稳步增收',
    poem: ['收入稳步有增长', '虽不迅猛但持续', '理性消费善储蓄', '财富积累慢慢来'],
    luckyColor: '浅金色',
    luckyNumber: 4,
    luckyDirection: '东方'
  },
  {
    id: 102,
    level: 'excellent',
    title: '小有盈余',
    poem: ['收支平衡有盈余', '储蓄账户渐增长', '虽非大富也小康', '财务安全心安宁'],
    luckyColor: '米色',
    luckyNumber: 6,
    luckyDirection: '南方'
  },

  // 继续上签 103-200
  ...Array.from({ length: 98 }, (_, i) => {
    const id = i + 103;
    const excellentTitles = [
      '收入稳定', '小有储蓄', '投资小成', '债务减少', '副业开始',
      '节俭有效', '规划起步', '保险完善', '学习进步', '自律良好',
      '收支平衡', '信用改善', '经验积累', '风险意识', '目标明确',
      '习惯养成', '基础打好', '方向正确', '稳步前进', '未来可期'
    ];
    
    const excellentPoems = [
      ['财运平稳有进展', '收入稳定支出控', '储蓄投资小步走', '财富积累慢慢来'],
      ['投资理财初尝试', '小有收获经验增', '虽然回报不算高', '方向正确未来好'],
      ['债务压力渐减轻', '信用记录改善中', '财务健康向前行', '未来财富基础打'],
      ['节俭生活见效显', '开支减少储蓄增', '财务安全更保障', '简朴之中见智慧']
    ];
    
    const colors = ['浅金', '米白', '淡绿', '浅蓝', '浅灰', '浅紫', '淡黄', '珍珠白', '香槟色', '银灰'];
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
export const wealthSigns = baseWealthSigns.map(sign => 
  generateWealthSign(sign.id, sign.level, sign)
);

/**
 * 根据签号获取签文
 * @param {number} signId - 签号 (1-200)
 * @returns {object} 签文对象
 */
export function getWealthSignById(signId) {
  return wealthSigns.find(sign => sign.id === signId) || wealthSigns[0];
}

/**
 * 获取所有上上签
 * @returns {array} 上上签数组
 */
export function getWealthSupremeSigns() {
  return wealthSigns.filter(sign => sign.level === 'supreme');
}

/**
 * 获取所有上签
 * @returns {array} 上签数组
 */
export function getWealthExcellentSigns() {
  return wealthSigns.filter(sign => sign.level === 'excellent');
}

/**
 * 随机获取一支签
 * @returns {object} 随机签文
 */
export function getRandomWealthSign() {
  const randomId = Math.floor(Math.random() * 200) + 1;
  return getWealthSignById(randomId);
}