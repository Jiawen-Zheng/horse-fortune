/**
 * 批量生成事业签脚本
 * 使用句子库生成所有200支事业签
 */

import { careerSigns } from '../src/data/careerSigns.js';
import { generateAllCareerSigns } from '../src/data/signGenerator.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('开始生成事业签...');
console.log(`原始签文数量: ${careerSigns.length}`);

// 使用生成器生成新的签文
const newSigns = generateAllCareerSigns(careerSigns);

console.log(`生成签文数量: ${newSigns.length}`);

// 生成文件内容
const fileContent = `/**
 * 事业签 - 200签签文数据
 * 使用句子库生成，包含多元化人群解读
 * 上上签 (1-100)
 * 上签 (101-200)
 */

export const careerSigns = ${JSON.stringify(newSigns, null, 2)};

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
`;

// 写入新文件
const outputPath = path.join(__dirname, '../src/data/careerSigns.new.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');

console.log(`✅ 生成完成！`);
console.log(`📁 输出文件: ${outputPath}`);
console.log(`\n示例签文（ID 1）:`);
console.log(`标题: ${newSigns[0].title}`);
console.log(`解释长度: ${newSigns[0].interpretation.length}字`);
console.log(`建议长度: ${newSigns[0].advice.length}字`);
console.log(`\n解释内容预览:`);
console.log(newSigns[0].interpretation.substring(0, 200) + '...');