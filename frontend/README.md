# 玩具商店前端

这是玩具商店的前端应用，使用 Next.js 15、TypeScript、Emotion 和 Framer Motion 构建。

## 技术栈

- **Next.js 15.3.2** - React 框架
- **TypeScript** - 类型安全
- **Emotion** - CSS-in-JS 样式解决方案
- **Framer Motion** - UI 交互动画库
- **Axios** - HTTP 客户端

## 功能特性

- 🏠 主页：浏览所有玩具产品
- 🔍 搜索与筛选：按名称、描述或类型搜索玩具
- 📱 响应式设计：适配各种设备尺寸
- ✨ 动画效果：流畅的页面过渡和交互动画
- 🎨 现代化 UI：美观的用户界面设计

## 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 环境配置

复制 `.env.local` 文件并配置 API 地址：

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                 # Next.js 13+ App Router
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局组件
│   ├── page.tsx        # 主页
│   └── about/          # 关于页面
├── components/         # 可复用组件
│   ├── Navbar.tsx      # 导航栏
│   ├── ToyCard.tsx     # 玩具卡片
│   ├── ToyFilter.tsx   # 筛选器
│   └── Loading.tsx     # 加载组件
├── lib/                # 工具库
│   └── api.ts          # API 客户端
└── types/              # TypeScript 类型定义
    └── index.ts        # 通用类型
```

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 创建生产构建
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查

## API 集成

前端与后端 API 集成，支持：

- 获取所有玩具列表
- 按类型筛选玩具
- 搜索玩具
- 获取玩具类型列表

API 基础地址可以通过 `NEXT_PUBLIC_API_URL` 环境变量配置。

## 开发指南

### 组件开发

- 使用 Emotion 进行样式管理
- 使用 Framer Motion 添加动画效果
- 遵循 TypeScript 最佳实践
- 组件应该是可复用和可测试的

### 代码风格

- 使用 ESLint 进行代码质量检查
- 遵循 React 和 Next.js 最佳实践
- 变量和函数使用驼峰命名法
- 组件使用帕斯卡命名法
