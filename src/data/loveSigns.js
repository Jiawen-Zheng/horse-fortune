/**
 * 爱情签 - 200签基础数据（简化版）
 * 上上签 (1-100)
 * 上签 (101-200)
 * 
 * 注意：本文件只包含基础信息（title, poem, luckyColor等）
 * interpretation和advice将在运行时通过signGenerator动态生成
 */

import { generateLoveSign } from './signGenerator.js';

// 基础签文数据（不包含interpretation和advice）
const baseLoveSigns = [
  // 上上签 (1-100)
  {
    id: 1,
    level: 'supreme',
    title: '天作之合',
    poem: ['天赐良缘前世修', '佳偶天成共白头', '琴瑟和鸣恩爱深', '幸福美满乐无忧'],
    luckyColor: '粉红色',
    luckyNumber: 8,
    luckyDirection: '南方'
  },
  {
    id: 2,
    level: 'supreme',
    title: '桃花盛开',
    poem: ['桃花运旺正当时', '良缘佳偶纷纷至', '选择如意心上人', '爱情甜蜜如蜜汁'],
    luckyColor: '桃红色',
    luckyNumber: 6,
    luckyDirection: '东方'
  },
  {
    id: 3,
    level: 'supreme',
    title: '心心相印',
    poem: ['心有灵犀一点通', '彼此默契情意浓', '不需言语能会意', '灵魂伴侣喜相逢'],
    luckyColor: '紫色',
    luckyNumber: 9,
    luckyDirection: '北方'
  },
  {
    id: 4,
    level: 'supreme',
    title: '喜结连理',
    poem: ['红鸾星动婚姻近', '喜结连理定终身', '双方家长皆满意', '美满姻缘福满门'],
    luckyColor: '红色',
    luckyNumber: 2,
    luckyDirection: '西南'
  },
  {
    id: 5,
    level: 'supreme',
    title: '破镜重圆',
    poem: ['旧情复燃爱更浓', '破镜重圆胜当初', '误会消除理解增', '感情升华迈新途'],
    luckyColor: '银色',
    luckyNumber: 7,
    luckyDirection: '西方'
  },
  {
    id: 6,
    level: 'supreme',
    title: '情投意合',
    poem: ['情投意合两心欢', '兴趣爱好皆相同', '相处愉快无压力', '爱情甜蜜如蜜甜'],
    luckyColor: '橙色',
    luckyNumber: 3,
    luckyDirection: '东南'
  },
  {
    id: 7,
    level: 'supreme',
    title: '患难真情',
    poem: ['患难之中见真情', '风雨同舟爱更坚', '互相扶持度难关', '感情升华永不变'],
    luckyColor: '深蓝色',
    luckyNumber: 4,
    luckyDirection: '东北'
  },
  {
    id: 8,
    level: 'supreme',
    title: '一见钟情',
    poem: ['一见钟情心相印', '电光火石情缘生', '浪漫邂逅天注定', '甜蜜恋情速升温'],
    luckyColor: '金色',
    luckyNumber: 1,
    luckyDirection: '中央'
  },
  {
    id: 9,
    level: 'supreme',
    title: '细水长流',
    poem: ['细水长流情更真', '平淡之中见深情', '日久生情根基固', '白头偕老永不分'],
    luckyColor: '浅蓝色',
    luckyNumber: 10,
    luckyDirection: '正东'
  },
  {
    id: 10,
    level: 'supreme',
    title: '佳偶天成',
    poem: ['郎才女貌配成双', '佳偶天成人人羡', '家庭事业两相宜', '美满姻缘传佳话'],
    luckyColor: '玫瑰金',
    luckyNumber: 8,
    luckyDirection: '正南'
  },

  // 继续上上签 11-100
  ...Array.from({ length: 90 }, (_, i) => {
    const id = i + 11;
    const supremeTitles = [
      '缘分天定', '感情深厚', '婚姻美满', '复合成功', '兴趣相投',
      '患难真情', '浪漫邂逅', '日久生情', '匹配和谐', '深情似海',
      '旧爱重燃', '爱情事业', '浪漫不断', '家庭祝福', '突破障碍',
      '精神契合', '成熟稳定', '圆满幸福', '相互成长', '长久相伴'
    ];
    
    const supremePoems = [
      ['姻缘天定福气来', '佳偶天成笑颜开', '相处和谐恩爱深', '幸福美满乐开怀'],
      ['感情深厚似海洋', '彼此理解又体谅', '困难面前同担当', '爱情之路更宽广'],
      ['婚姻生活美满多', '互相包容少风波', '家庭和睦事业顺', '幸福日子快乐过'],
      ['相互扶持共成长', '感情稳定又坚强', '理解包容爱意长', '白头偕老情意长']
    ];
    
    const colors = ['粉红', '桃红', '紫色', '红色', '银色', '天蓝', '橙色', '深蓝', '金色', '浅蓝'];
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
    title: '稳步发展',
    poem: ['感情稳步向前行', '不急不躁心态平', '逐步了解增信任', '未来可期爱渐深'],
    luckyColor: '浅粉色',
    luckyNumber: 4,
    luckyDirection: '东方'
  },
  {
    id: 102,
    level: 'excellent',
    title: '小有进展',
    poem: ['感情小有进展见', '关系升温渐明显', '虽无突破也有得', '继续用心爱更甜'],
    luckyColor: '米色',
    luckyNumber: 6,
    luckyDirection: '南方'
  },

  // 继续上签 103-200
  ...Array.from({ length: 98 }, (_, i) => {
    const id = i + 103;
    const excellentTitles = [
      '平稳发展', '小有进步', '矛盾解决', '社交扩展', '关系修复',
      '家庭认可', '适应良好', '平衡改善', '个人成长', '朋友支持',
      '沟通改善', '信任建立', '理解增加', '互动增多', '共同兴趣',
      '冲突减少', '压力减轻', '焦虑降低', '信心增强', '希望增加'
    ];
    
    const excellentPoems = [
      ['感情发展平稳行', '小步前进莫看轻', '逐步了解增信任', '未来可期爱渐深'],
      ['感情小有进展见', '关系升温渐明显', '虽无大突破也有', '继续用心爱更甜'],
      ['矛盾误会得化解', '沟通改善理解增', '感情基础更稳固', '相处更加和谐生'],
      ['单身生活有机遇', '社交扩展朋友多', '虽未确定关系立', '未来可能缘分来']
    ];
    
    const colors = ['浅粉', '米白', '淡绿', '浅蓝', '浅灰', '浅紫', '淡黄', '珍珠白', '香槟金', '银灰'];
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
export const loveSigns = baseLoveSigns.map(sign => 
  generateLoveSign(sign.id, sign.level, sign)
);

/**
 * 根据签号获取签文
 * @param {number} signId - 签号 (1-200)
 * @returns {object} 签文对象
 */
export function getLoveSignById(signId) {
  return loveSigns.find(sign => sign.id === signId) || loveSigns[0];
}

/**
 * 获取所有上上签
 * @returns {array} 上上签数组
 */
export function getLoveSupremeSigns() {
  return loveSigns.filter(sign => sign.level === 'supreme');
}

/**
 * 获取所有上签
 * @returns {array} 上签数组
 */
export function getLoveExcellentSigns() {
  return loveSigns.filter(sign => sign.level === 'excellent');
}

/**
 * 随机获取一支签
 * @returns {object} 随机签文
 */
export function getRandomLoveSign() {
  const randomId = Math.floor(Math.random() * 200) + 1;
  return getLoveSignById(randomId);
}