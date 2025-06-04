# 玩具商店

一个专为儿童设计的在线玩具购物平台。

## 应用功能

### 🏠 产品浏览
- 浏览丰富的玩具产品目录
- 查看玩具详细信息、图片和价格
- 按类型分类浏览不同的玩具

### 🔍 搜索
- 快速搜索玩具名称
- 按玩具类型筛选产品
- 组合搜索条件精确找到想要的玩具

### 🎨 玩具分类
- **益智玩具**：拼图、积木等开发智力的玩具
- **遥控玩具**：遥控车、无人机等科技玩具
- **户外玩具**：滑板车、秋千等运动玩具
- **玩偶玩具**：布娃娃、毛绒玩具等陪伴玩具

### 📱 用户体验
- 现代化的界面设计
- 响应式布局，支持手机、平板、电脑访问
- 流畅的动画效果和交互体验
- 美观的渐变色彩和卡片式设计

## 项目愿景

为家长和孩子提供一个安全、便捷、有趣的在线玩具购物体验，帮助孩子在玩乐中学习成长。

## 快速开始

### 安装依赖
```bash
npm run install-all
```

### 启动开发服务器
```bash
npm run dev
```

这将同时启动：
- 后端服务器：http://localhost:3000
- 前端应用：http://localhost:3001

### 构建项目
```bash
npm run build
```

### 运行测试

#### 后端单元测试
```bash
npm test
```

#### 端到端测试
```bash
# 运行 E2E 测试
npm run test:e2e

# 在可视化模式下运行
npm run test:e2e:headed

# 运行所有测试（单元测试 + E2E测试）
npm run test:all
```

## 项目结构

- `frontend/` - Next.js 前端应用
- `backend/` - Express.js 后端API
- `tests/` - Playwright E2E 测试
- `user-stories/` - 用户故事文档

## 技术栈

### 前端
- **框架**：Next.js 14 (React)
- **语言**：TypeScript
- **样式**：Emotion (CSS-in-JS)
- **动画**：Framer Motion
- **HTTP客户端**：Axios

### 后端
- **框架**：Express.js
- **语言**：TypeScript
- **数据存储**：内存存储（可扩展为数据库）

### 测试
- **E2E测试**：Playwright
- **单元测试**：Jest
