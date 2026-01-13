/**
 * 签文数据统一导出
 * 包含6个签类：好运签、事业签、学业签、健康签、爱情签、财运签
 * 每个签类200支签：100支上上签 + 100支上签
 * 总计：1200支签
 */

import { fortuneSigns, getFortuneSignById, getFortuneSupremeSigns, getFortuneExcellentSigns, getRandomFortuneSign } from './fortuneSigns.js';
import { careerSigns, getCareerSignById, getCareerSupremeSigns, getCareerExcellentSigns, getRandomCareerSign } from './careerSigns.js';
import { studySigns, getStudySignById, getStudySupremeSigns, getStudyExcellentSigns, getRandomStudySign } from './studySigns.js';
import { healthSigns, getHealthSignById, getHealthSupremeSigns, getHealthExcellentSigns, getRandomHealthSign } from './healthSigns.js';
import { loveSigns, getLoveSignById, getLoveSupremeSigns, getLoveExcellentSigns, getRandomLoveSign } from './loveSigns.js';
import { wealthSigns, getWealthSignById, getWealthSupremeSigns, getWealthExcellentSigns, getRandomWealthSign } from './wealthSigns.js';

/**
 * 签类配置
 */
export const signCategories = [
  {
    id: 'fortune',
    name: '好运签',
    description: '测试整体运势，包括事业、财运、感情、健康等各方面',
    icon: '🍀',
    color: '#FFD700',
    signs: fortuneSigns,
    getById: getFortuneSignById,
    getSupreme: getFortuneSupremeSigns,
    getExcellent: getFortuneExcellentSigns,
    getRandom: getRandomFortuneSign
  },
  {
    id: 'career',
    name: '事业签',
    description: '测试事业运势，包括工作、晋升、创业、合作等',
    icon: '💼',
    color: '#4169E1',
    signs: careerSigns,
    getById: getCareerSignById,
    getSupreme: getCareerSupremeSigns,
    getExcellent: getCareerExcellentSigns,
    getRandom: getRandomCareerSign
  },
  {
    id: 'study',
    name: '学业签',
    description: '测试学业运势，包括考试、学习、升学、研究等',
    icon: '📚',
    color: '#32CD32',
    signs: studySigns,
    getById: getStudySignById,
    getSupreme: getStudySupremeSigns,
    getExcellent: getStudyExcellentSigns,
    getRandom: getRandomStudySign
  },
  {
    id: 'health',
    name: '健康签',
    description: '测试健康运势，包括身体、心理、睡眠、运动等',
    icon: '💚',
    color: '#00CED1',
    signs: healthSigns,
    getById: getHealthSignById,
    getSupreme: getHealthSupremeSigns,
    getExcellent: getHealthExcellentSigns,
    getRandom: getRandomHealthSign
  },
  {
    id: 'love',
    name: '爱情签',
    description: '测试爱情运势，包括恋爱、婚姻、感情发展等',
    icon: '💕',
    color: '#FF69B4',
    signs: loveSigns,
    getById: getLoveSignById,
    getSupreme: getLoveSupremeSigns,
    getExcellent: getLoveExcellentSigns,
    getRandom: getRandomLoveSign
  },
  {
    id: 'wealth',
    name: '财运签',
    description: '测试财运运势，包括收入、投资、理财、储蓄等',
    icon: '💰',
    color: '#FFD700',
    signs: wealthSigns,
    getById: getWealthSignById,
    getSupreme: getWealthSupremeSigns,
    getExcellent: getWealthExcellentSigns,
    getRandom: getRandomWealthSign
  }
];

/**
 * 根据签类ID获取签类配置
 * @param {string} categoryId - 签类ID
 * @returns {object} 签类配置对象
 */
export function getCategoryById(categoryId) {
  return signCategories.find(cat => cat.id === categoryId) || signCategories[0];
}

/**
 * 根据签类ID和签号获取签文
 * @param {string} categoryId - 签类ID
 * @param {number} signId - 签号 (1-200)
 * @returns {object} 签文对象
 */
export function getSignByCategoryAndId(categoryId, signId) {
  const category = getCategoryById(categoryId);
  return category.getById(signId);
}

/**
 * 根据签类ID随机获取一支签
 * @param {string} categoryId - 签类ID
 * @returns {object} 随机签文
 */
export function getRandomSignByCategory(categoryId) {
  const category = getCategoryById(categoryId);
  return category.getRandom();
}

/**
 * 获取所有签类的统计信息
 * @returns {object} 统计信息
 */
export function getStatistics() {
  return {
    totalCategories: signCategories.length,
    totalSigns: signCategories.length * 200,
    signsPerCategory: 200,
    supremePerCategory: 100,
    excellentPerCategory: 100,
    categories: signCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: cat.signs.length
    }))
  };
}

// 导出所有签类数据
export {
  fortuneSigns,
  careerSigns,
  studySigns,
  healthSigns,
  loveSigns,
  wealthSigns
};

// 导出各签类的辅助函数
export {
  getFortuneSignById,
  getFortuneSupremeSigns,
  getFortuneExcellentSigns,
  getRandomFortuneSign,
  getCareerSignById,
  getCareerSupremeSigns,
  getCareerExcellentSigns,
  getRandomCareerSign,
  getStudySignById,
  getStudySupremeSigns,
  getStudyExcellentSigns,
  getRandomStudySign,
  getHealthSignById,
  getHealthSupremeSigns,
  getHealthExcellentSigns,
  getRandomHealthSign,
  getLoveSignById,
  getLoveSupremeSigns,
  getLoveExcellentSigns,
  getRandomLoveSign,
  getWealthSignById,
  getWealthSupremeSigns,
  getWealthExcellentSigns,
  getRandomWealthSign
};