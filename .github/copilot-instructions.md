## 项目概述
这是一个玩具商店电子商务应用程序。代码库管理产品库存、用户账户、购物车功能和订单处理。

## 功能概述
- 产品目录浏览：支持分类、搜索与过滤  
- 产品详情页：展示图片、描述、库存、评价和评分  
- 购物车管理：添加、删除及更新商品数量  
- 用户中心：注册/登录

## 玩具类型
- 益智玩具：如拼图、积木等
- 遥控玩具：如遥控车、无人机等
- 户外玩具：如滑板车、秋千等
- 玩偶玩具：布娃娃等

## 模块设计：

### 前端 (frontend/)
- **技术栈：**
  - TypeScript
  - Next.js 14 - React 框架，使用 App Router
  - Emotion - CSS-in-JS 样式解决方案
  - Framer Motion - UI 交互动画库
  - Axios - HTTP 客户端

- **目录结构：**
  - `src/app/`：Next.js App Router 页面和布局
    - `page.tsx`：主页面
    - `layout.tsx`：全局布局
    - `globals.css`：全局样式   
  - `src/components/`：可复用 React 组件
    - `ToyCard.tsx`：玩具卡片组件
    - `ToyFilter.tsx`：玩具筛选组件
    - `Navbar.tsx`：导航栏组件
    - `Loading.tsx`：加载状态组件
    - `About.tsx`：关于页面组件
  - `src/lib/`：工具库和 API 客户端
    - `api.ts`：API 请求封装
  - `src/types/`：TypeScript 类型定义
  - `public/images/`：静态图片

### 后端 (backend/)
- **技术栈：**
  - TypeScript
  - Express.js - Web 框架

- **目录结构：**
  - `src/controllers/`：请求控制器
    - `toyController.ts`：玩具相关接口
    - `toyTypeController.ts`：玩具类型相关接口
  - `src/services/`：业务逻辑层
    - `toyTypeService.ts`：玩具类型业务逻辑
    - `memoryToyService.ts`：内存版本服务
  - `src/repositories/`：数据访问层
    - `memoryToyTypeRepository.ts`：玩具类型数据访问
    - `memoryToyRepository.ts`：玩具数据访问
  - `src/routes/`：Express 路由定义
    - `toyRoutes.ts`：玩具相关路由
    - `toyTypeRoutes.ts`：玩具类型相关路由
  - `src/middleware/`：中间件
    - `errorHandler.ts`：错误处理
    - `requestLogger.ts`：请求日志
  - `src/validators/`：输入验证
    - `toyValidator.ts`：玩具数据验证
    - `toyTypeValidator.ts`：玩具类型数据验证
  - `src/types/`：TypeScript 类型定义
    - `toy.ts`：玩具相关类型
    - `toyType.ts`：玩具类型相关类型

## 代码风格和约定
- 变量和函数名使用驼峰命名法（camelCase）
- 类名和组件名使用帕斯卡命名法（PascalCase）
- 编写能反映其用途的描述性变量名
- 保持函数简短并专注于单一职责

## 启动
- Development: `npm run dev` - 启动开发服务器
- Build: `npm run build` - 创建生产构建
- Preview: `npm run preview` - 本地预览生产构建
- Lint: `npm run lint` - 运行 ESLint 检查代码质量