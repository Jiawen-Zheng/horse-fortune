# 马年好运签

> 2026马年抽签H5应用 - 测一测你的马年运势

## 项目简介

马年好运签是一款基于中国传统玄学文化的在线抽签产品，专为2026马年打造。用户通过输入个人信息进行测运，系统从1000种预设签文中匹配对应的运势结果。

## 功能特点

- 🎯 6种签类：好运签、事业签、学业签、健康签、爱情签、财运签
- 📝 1000支签文：每个签类包含200支上上签 + 800支上签
- 🎨 精美UI：中国风设计，红金配色
- 📱 移动优先：专为手机端优化
- 🎉 摇签动画：支持摇动手机抽签
- 📸 分享功能：生成精美签文图片

## 技术栈

- **框架**: Vue 3 + Vite
- **UI**: Vant 4 + 自定义组件
- **动画**: GSAP + CSS3
- **状态管理**: Pinia
- **路由**: Vue Router
- **样式**: SCSS + PostCSS
- **工具**: html2canvas, lodash-es, dayjs

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
horse-fortune/
├── public/                 # 静态资源
│   ├── images/            # 图片资源
│   └── sounds/            # 音效文件
├── src/
│   ├── assets/            # 资源文件
│   │   ├── styles/        # 全局样式
│   │   └── fonts/         # 字体文件
│   ├── components/        # 公共组件
│   │   ├── common/        # 通用组件
│   │   ├── animations/    # 动画组件
│   │   └── fortune/       # 签相关组件
│   ├── views/             # 页面组件
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── utils/             # 工具函数
│   ├── data/              # 签文数据
│   ├── App.vue
│   └── main.js
├── .gitignore
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## 开发规范

### 代码风格

- 使用 ES6+ 语法
- 组件使用 Composition API
- 遵循 Vue 3 官方风格指南

### 命名规范

- 组件：PascalCase (如 `UserInfo.vue`)
- 文件夹：kebab-case (如 `user-info/`)
- 变量/函数：camelCase (如 `getUserInfo`)
- 常量：UPPER_SNAKE_CASE (如 `MAX_ATTEMPTS`)

### Git 提交规范

- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- perf: 性能优化
- test: 测试相关
- chore: 构建/工具相关

## 部署

### Vercel 部署

1. 连接 GitHub 仓库
2. 选择 `horse-fortune` 目录
3. 构建命令：`npm run build`
4. 输出目录：`dist`

### Netlify 部署

1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`dist`

## 浏览器支持

- iOS Safari 12+
- Android Chrome 80+
- 微信内置浏览器

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系开发团队。

---

**祝您马年大吉，万事如意！** 🐴✨