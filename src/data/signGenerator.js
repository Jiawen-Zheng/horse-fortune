/**
 * 签文生成器 - 使用排列组合方式生成签文
 * 基于模块化句子库，通过算法组合生成1200支不重复的签文
 */

import {
  careerSentences
} from './sentences/careerSentences.js';
import {
  studySentences
} from './sentences/studySentences.js';
import {
  healthSentences
} from './sentences/healthSentences.js';
import {
  loveSentences
} from './sentences/loveSentences.js';
import {
  wealthSentences
} from './sentences/wealthSentences.js';

/**
 * 生成事业签
 * @param {number} id - 签号 (1-200)
 * @param {string} level - 签级 ('supreme' 或 'excellent')
 * @param {object} originalSign - 原始签文对象（包含title, poem等）
 * @returns {object} - 完整签文对象
 */
export function generateCareerSign(id, level, originalSign) {
  const lib = careerSentences;
  
  // 使用签号作为种子，确保相同ID生成相同内容
  const seed = id;
  
  // 1. 选择开头总述
  const opening = lib.openings[seed % lib.openings.length];
  
  // 2. 选择人群解读（每个人群选1句）
  // 使用不同的质数作为乘数，确保分布均匀且不重复
  const employedIdx = (seed * 2) % lib.employed.positive.length;
  const jobSeekerIdx = (seed * 3) % lib.jobSeeker.positive.length;
  const entrepreneurIdx = (seed * 5) % lib.entrepreneur.positive.length;
  const managerIdx = (seed * 7) % lib.manager.positive.length;
  
  const employedText = lib.employed.positive[employedIdx];
  const jobSeekerText = lib.jobSeeker.positive[jobSeekerIdx];
  const entrepreneurText = lib.entrepreneur.positive[entrepreneurIdx];
  const managerText = lib.manager.positive[managerIdx];
  
  // 3. 组合interpretation
  const interpretation = `${opening}\n\n【在职人士】：${employedText}\n\n【求职者】：${jobSeekerText}\n\n【创业者】：${entrepreneurText}\n\n【管理者】：${managerText}`;
  
  // 4. 选择建议内容（每个维度选1句）
  const careerAdviceIdx = (seed * 11) % lib.adviceCareer.length;
  const relationshipAdviceIdx = (seed * 13) % lib.adviceRelationship.length;
  const skillAdviceIdx = (seed * 17) % lib.adviceSkill.length;
  const balanceAdviceIdx = (seed * 19) % lib.adviceBalance.length;
  
  const careerAdvice = lib.adviceCareer[careerAdviceIdx];
  const relationshipAdvice = lib.adviceRelationship[relationshipAdviceIdx];
  const skillAdvice = lib.adviceSkill[skillAdviceIdx];
  const balanceAdvice = lib.adviceBalance[balanceAdviceIdx];
  
  // 5. 组合advice
  const advice = `【职场发展】：${careerAdvice}\n\n【人际关系】：${relationshipAdvice}\n\n【能力提升】：${skillAdvice}\n\n【工作生活平衡】：${balanceAdvice}`;
  
  // 6. 返回完整签文对象
  return {
    ...originalSign,
    id,
    level,
    interpretation,
    advice
  };
}

/**
 * 生成学业签
 * @param {number} id - 签号 (1-200)
 * @param {string} level - 签级 ('supreme' 或 'excellent')
 * @param {object} originalSign - 原始签文对象
 * @returns {object} - 完整签文对象
 */
export function generateStudySign(id, level, originalSign) {
  const lib = studySentences;
  const seed = id;
  
  // 1. 选择开头总述
  const opening = lib.openings[seed % lib.openings.length];
  
  // 2. 选择人群解读
  const studentIdx = (seed * 2) % lib.student.positive.length;
  const examPrepIdx = (seed * 3) % lib.examPrep.positive.length;
  const skillLearnerIdx = (seed * 5) % lib.skillLearner.positive.length;
  
  const studentText = lib.student.positive[studentIdx];
  const examPrepText = lib.examPrep.positive[examPrepIdx];
  const skillLearnerText = lib.skillLearner.positive[skillLearnerIdx];
  
  // 3. 组合interpretation（学业签3个人群）
  const interpretation = `${opening}\n\n【在校学生】：${studentText}\n\n【考试备考者】：${examPrepText}\n\n【技能学习者】：${skillLearnerText}`;
  
  // 4. 选择建议内容
  const methodAdviceIdx = (seed * 11) % lib.adviceMethod.length;
  const timeAdviceIdx = (seed * 13) % lib.adviceTime.length;
  const mindsetAdviceIdx = (seed * 17) % lib.adviceMindset.length;
  const examAdviceIdx = (seed * 19) % lib.adviceExam.length;
  
  const methodAdvice = lib.adviceMethod[methodAdviceIdx];
  const timeAdvice = lib.adviceTime[timeAdviceIdx];
  const mindsetAdvice = lib.adviceMindset[mindsetAdviceIdx];
  const examAdvice = lib.adviceExam[examAdviceIdx];
  
  // 5. 组合advice
  const advice = `【学习方法】：${methodAdvice}\n\n【时间管理】：${timeAdvice}\n\n【心态调整】：${mindsetAdvice}\n\n【考试技巧】：${examAdvice}`;
  
  return {
    ...originalSign,
    id,
    level,
    interpretation,
    advice
  };
}

/**
 * 生成健康签
 * @param {number} id - 签号 (1-200)
 * @param {string} level - 签级 ('supreme' 或 'excellent')
 * @param {object} originalSign - 原始签文对象
 * @returns {object} - 完整签文对象
 */
export function generateHealthSign(id, level, originalSign) {
  const lib = healthSentences;
  const seed = id;
  
  // 1. 选择开头总述
  const opening = lib.openings[seed % lib.openings.length];
  
  // 2. 选择人群解读
  const healthyIdx = (seed * 2) % lib.healthy.positive.length;
  const subHealthIdx = (seed * 3) % lib.subHealth.positive.length;
  const chronicIdx = (seed * 5) % lib.chronic.positive.length;
  const recoveryIdx = (seed * 7) % lib.recovery.positive.length;
  
  const healthyText = lib.healthy.positive[healthyIdx];
  const subHealthText = lib.subHealth.positive[subHealthIdx];
  const chronicText = lib.chronic.positive[chronicIdx];
  const recoveryText = lib.recovery.positive[recoveryIdx];
  
  // 3. 组合interpretation
  const interpretation = `${opening}\n\n【健康人群】：${healthyText}\n\n【亚健康人群】：${subHealthText}\n\n【慢性病患者】：${chronicText}\n\n【康复期人群】：${recoveryText}`;
  
  // 4. 选择建议内容
  const lifestyleAdviceIdx = (seed * 11) % lib.adviceLifestyle.length;
  const exerciseAdviceIdx = (seed * 13) % lib.adviceExercise.length;
  const mentalAdviceIdx = (seed * 17) % lib.adviceMental.length;
  const preventAdviceIdx = (seed * 19) % lib.advicePrevent.length;
  
  const lifestyleAdvice = lib.adviceLifestyle[lifestyleAdviceIdx];
  const exerciseAdvice = lib.adviceExercise[exerciseAdviceIdx];
  const mentalAdvice = lib.adviceMental[mentalAdviceIdx];
  const preventAdvice = lib.advicePrevent[preventAdviceIdx];
  
  // 5. 组合advice
  const advice = `【生活方式】：${lifestyleAdvice}\n\n【运动锻炼】：${exerciseAdvice}\n\n【心理健康】：${mentalAdvice}\n\n【疾病预防】：${preventAdvice}`;
  
  return {
    ...originalSign,
    id,
    level,
    interpretation,
    advice
  };
}

/**
 * 生成爱情签
 * @param {number} id - 签号 (1-200)
 * @param {string} level - 签级 ('supreme' 或 'excellent')
 * @param {object} originalSign - 原始签文对象
 * @returns {object} - 完整签文对象
 */
export function generateLoveSign(id, level, originalSign) {
  const lib = loveSentences;
  const seed = id;
  
  // 1. 选择开头总述
  const opening = lib.openings[seed % lib.openings.length];
  
  // 2. 选择人群解读
  const singleIdx = (seed * 2) % lib.single.positive.length;
  const datingIdx = (seed * 3) % lib.dating.positive.length;
  const marriedIdx = (seed * 5) % lib.married.positive.length;
  const confusedIdx = (seed * 7) % lib.confused.positive.length;
  
  const singleText = lib.single.positive[singleIdx];
  const datingText = lib.dating.positive[datingIdx];
  const marriedText = lib.married.positive[marriedIdx];
  const confusedText = lib.confused.positive[confusedIdx];
  
  // 3. 组合interpretation
  const interpretation = `${opening}\n\n【单身者】：${singleText}\n\n【恋爱中】：${datingText}\n\n【已婚者】：${marriedText}\n\n【感情困惑者】：${confusedText}`;
  
  // 4. 选择建议内容
  const communicationAdviceIdx = (seed * 11) % lib.adviceCommunication.length;
  const trustAdviceIdx = (seed * 13) % lib.adviceTrust.length;
  const growthAdviceIdx = (seed * 17) % lib.adviceGrowth.length;
  const maintainAdviceIdx = (seed * 19) % lib.adviceMaintain.length;
  
  const communicationAdvice = lib.adviceCommunication[communicationAdviceIdx];
  const trustAdvice = lib.adviceTrust[trustAdviceIdx];
  const growthAdvice = lib.adviceGrowth[growthAdviceIdx];
  const maintainAdvice = lib.adviceMaintain[maintainAdviceIdx];
  
  // 5. 组合advice
  const advice = `【沟通交流】：${communicationAdvice}\n\n【信任建立】：${trustAdvice}\n\n【共同成长】：${growthAdvice}\n\n【关系维护】：${maintainAdvice}`;
  
  return {
    ...originalSign,
    id,
    level,
    interpretation,
    advice
  };
}

/**
 * 生成财运签
 * @param {number} id - 签号 (1-200)
 * @param {string} level - 签级 ('supreme' 或 'excellent')
 * @param {object} originalSign - 原始签文对象
 * @returns {object} - 完整签文对象
 */
export function generateWealthSign(id, level, originalSign) {
  const lib = wealthSentences;
  const seed = id;
  
  // 1. 选择开头总述
  const opening = lib.openings[seed % lib.openings.length];
  
  // 2. 选择人群解读
  const salaryIdx = (seed * 2) % lib.salary.positive.length;
  const investorIdx = (seed * 3) % lib.investor.positive.length;
  const businessIdx = (seed * 5) % lib.business.positive.length;
  const beginnerIdx = (seed * 7) % lib.beginner.positive.length;
  
  const salaryText = lib.salary.positive[salaryIdx];
  const investorText = lib.investor.positive[investorIdx];
  const businessText = lib.business.positive[businessIdx];
  const beginnerText = lib.beginner.positive[beginnerIdx];
  
  // 3. 组合interpretation
  const interpretation = `${opening}\n\n【工薪族】：${salaryText}\n\n【投资者】：${investorText}\n\n【创业者】：${businessText}\n\n【理财新手】：${beginnerText}`;
  
  // 4. 选择建议内容
  const incomeAdviceIdx = (seed * 11) % lib.adviceIncome.length;
  const manageAdviceIdx = (seed * 13) % lib.adviceManage.length;
  const investAdviceIdx = (seed * 17) % lib.adviceInvest.length;
  const riskAdviceIdx = (seed * 19) % lib.adviceRisk.length;
  
  const incomeAdvice = lib.adviceIncome[incomeAdviceIdx];
  const manageAdvice = lib.adviceManage[manageAdviceIdx];
  const investAdvice = lib.adviceInvest[investAdviceIdx];
  const riskAdvice = lib.adviceRisk[riskAdviceIdx];
  
  // 5. 组合advice
  const advice = `【收入提升】：${incomeAdvice}\n\n【财务管理】：${manageAdvice}\n\n【投资理财】：${investAdvice}\n\n【风险控制】：${riskAdvice}`;
  
  return {
    ...originalSign,
    id,
    level,
    interpretation,
    advice
  };
}

/**
 * 批量生成事业签
 * @param {Array} originalSigns - 原始签文数组
 * @returns {Array} - 生成的签文数组
 */
export function generateAllCareerSigns(originalSigns) {
  return originalSigns.map(sign => {
    return generateCareerSign(sign.id, sign.level, sign);
  });
}

/**
 * 批量生成学业签
 * @param {Array} originalSigns - 原始签文数组
 * @returns {Array} - 生成的签文数组
 */
export function generateAllStudySigns(originalSigns) {
  return originalSigns.map(sign => {
    return generateStudySign(sign.id, sign.level, sign);
  });
}

/**
 * 批量生成健康签
 * @param {Array} originalSigns - 原始签文数组
 * @returns {Array} - 生成的签文数组
 */
export function generateAllHealthSigns(originalSigns) {
  return originalSigns.map(sign => {
    return generateHealthSign(sign.id, sign.level, sign);
  });
}

/**
 * 批量生成爱情签
 * @param {Array} originalSigns - 原始签文数组
 * @returns {Array} - 生成的签文数组
 */
export function generateAllLoveSigns(originalSigns) {
  return originalSigns.map(sign => {
    return generateLoveSign(sign.id, sign.level, sign);
  });
}

/**
 * 批量生成财运签
 * @param {Array} originalSigns - 原始签文数组
 * @returns {Array} - 生成的签文数组
 */
export function generateAllWealthSigns(originalSigns) {
  return originalSigns.map(sign => {
    return generateWealthSign(sign.id, sign.level, sign);
  });
}