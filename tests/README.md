# 玩具商店 E2E 测试

这个项目包含了玩具商店应用的端到端自动化测试，使用 Playwright 测试框架。

## 项目结构

```
tests/
├── user-story-add-toy.spec.ts   # 基于用户故事的测试
├── tsconfig.json                # TypeScript配置
└── README.md                    # 本文件

playwright.config.ts             # Playwright 配置文件（根目录）
package.json                     # 项目依赖配置（根目录，包含测试依赖）
```

## 安装和设置

### 1. 安装依赖

```bash
# 在根目录安装所有依赖（包括测试依赖）
npm run install-all

# 安装 Playwright 浏览器
npx playwright install
```

### 2. 确保应用服务运行

测试需要前端和后端服务都在运行：

```bash
# 启动后端服务 (端口 3000)
cd backend
npm run dev

# 启动前端服务 (端口 3001)
cd frontend  
npm run dev
```

## 运行测试

### 基本命令

```bash
# 在根目录运行所有测试
npm run test:e2e

# 在有界面模式下运行（可以看到浏览器）
npm run test:e2e:headed

# 调试模式运行
npm run test:e2e:debug

# 使用 Playwright UI 模式
npm run test:e2e:ui

# 查看测试报告
npm run test:e2e:report

# 运行所有测试（单元测试 + E2E测试）
npm run test:all
```

### 针对特定浏览器

```bash
# 默认运行 Chromium
npm run test:e2e

# 明确指定 Chromium 项目
npx playwright test --project=chromium
```

## 配置说明

### playwright.config.ts

主要配置项：

- **baseURL**: `http://localhost:3001` - 前端应用地址
- **webServer**: 自动启动前后端服务
- **browsers**: 支持 Chrome (Chromium)
- **screenshots**: 失败时自动截图
- **videos**: 失败时录制视频
- **traces**: 失败时收集调试信息

## 故障排除

### 常见问题

1. **服务未启动**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:3001
   ```
   解决：确保前端服务在 3001 端口运行

2. **后端 API 错误**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:3000
   ```
   解决：确保后端服务在 3000 端口运行

3. **元素找不到**
   ```
   Error: Locator not found
   ```
   解决：检查应用是否正确加载，元素选择器是否正确

### 调试技巧

1. **使用调试模式**
   ```bash
   npm run test:debug
   ```

2. **查看截图和视频**
   测试失败时会自动生成截图和视频，存放在 `test-results/` 目录

3. **使用 Playwright Inspector**
   ```bash
   npx playwright test --debug
   ```

4. **查看详细日志**
   ```bash
   npx playwright test --reporter=list
   ```

## 扩展测试

要添加更多测试用例，可以：

1. 在现有的 `.spec.ts` 文件中添加新的 `test()` 函数
2. 创建新的测试文件，遵循 `*.spec.ts` 命名规范
3. 参考现有测试的结构和模式

### 测试最佳实践

1. **使用描述性的测试名称**
2. **添加适当的等待时间** (`waitForTimeout`, `waitForSelector`)
3. **使用断言验证预期结果** (`expect`)
4. **添加日志输出帮助调试** (`console.log`)
5. **测试数据隔离**，避免测试间相互影响


