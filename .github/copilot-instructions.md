## 项目概述
这是一个玩具商店电子商务应用程序。代码库管理产品库存、用户账户、购物车功能和订单处理。

## 功能概述
- 产品目录浏览：支持分类、搜索  
- 产品详情页：展示图片、描述、价格  
- 购物车管理：添加、删除及更新商品数量  
- 用户中心：注册/登录  
- 订单管理：查看订单历史

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
    - `about/page.tsx`：关于页面
    - `cart/page.tsx`：购物车页面
    - `login/page.tsx`：登录页面
    - `register/page.tsx`：注册页面
    - `orders/page.tsx`：订单页面
    - `toys/[id]/page.tsx`：玩具详情页面
  - `src/components/`：可复用 React 组件
    - `ToyCard.tsx`：玩具卡片组件
    - `ToyFilter.tsx`：玩具筛选组件
    - `Navbar.tsx`：导航栏组件
    - `Loading.tsx`：加载状态组件
    - `index.ts`：组件导出文件
  - `src/contexts/`：React Context 状态管理
    - `AuthContext.tsx`：用户认证状态管理
    - `CartContext.tsx`：购物车状态管理
    - `OrderContext.tsx`：订单状态管理
  - `src/lib/`：工具库和 API 客户端
    - `api.ts`：API 请求封装
  - `src/types/`：TypeScript 类型定义
    - `index.ts`：类型定义文件
  - `public/images/toys/`：玩具图片静态资源

### 后端 (backend/)
- **技术栈：**
  - TypeScript
  - Express.js - Web 框架

- **目录结构：**
  - `src/controllers/`：请求控制器
    - `toyController.ts`：玩具相关接口
    - `toyTypeController.ts`：玩具类型相关接口
    - `userController.ts`：用户相关接口
    - `userController.test.ts`：用户控制器测试
  - `src/services/`：业务逻辑层
    - `memoryToyTypeService.ts`：玩具类型业务逻辑
    - `memoryToyService.ts`：玩具业务逻辑（内存版本）
    - `userService.ts`：用户业务逻辑
    - `userService.test.ts`：用户服务测试
  - `src/repositories/`：数据访问层
    - `memoryToyTypeRepository.ts`：玩具类型数据访问
    - `memoryToyRepository.ts`：玩具数据访问
    - `memoryUserRepository.ts`：用户数据访问
  - `src/routes/`：Express 路由定义
    - `toyRoutes.ts`：玩具相关路由
    - `toyTypeRoutes.ts`：玩具类型相关路由
    - `userRoutes.ts`：用户相关路由
  - `src/middleware/`：中间件
    - `errorHandler.ts`：错误处理
    - `requestLogger.ts`：请求日志  
  - `src/validators/`：输入验证
    - `toyValidator.ts`：玩具数据验证
    - `toyTypeValidator.ts`：玩具类型数据验证
  - `src/types/`：TypeScript 类型定义
    - `toy.ts`：玩具相关类型
    - `toyType.ts`：玩具类型相关类型
    - `user.ts`：用户相关类型

### 测试 (tests/)
- **技术栈：**
  - Playwright - 端到端测试框架
  - Jest - 单元测试框架（后端）

- **目录结构：**
  - `tests/`：端到端测试
    - `user-story-add-toy.spec.ts`：用户故事测试
    - `tsconfig.json`：测试 TypeScript 配置
  - `user-stories/`：用户故事文档
    - `add-toy.md`：添加玩具到购物车的用户故事
  - `playwright.config.ts`：Playwright 配置文件
  - `playwright-report/`：测试报告输出
  - `test-results/`：测试结果文件

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
- Test: `npm test` - 运行后端单元测试
- E2E Test: `npm run test:e2e` - 运行端到端测试
- E2E Test UI: `npm run test:e2e:ui` - 运行端到端测试（带UI界面）