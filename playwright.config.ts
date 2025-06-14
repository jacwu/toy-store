import { defineConfig, devices } from '@playwright/test';

/**
 * 玩具商店 Playwright 配置
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* 并行运行测试 */
  fullyParallel: false,
  /* 在 CI 上失败时不重试，本地可以重试 */
  retries: process.env.CI ? 2 : 0,
  /* 在 CI 上选择较少的工作线程 */
  workers: process.env.CI ? 1 : undefined,
  /* 测试结果报告器 */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['list']
  ],  /* 全局测试配置 */
  use: {
    /* 基础 URL */
    baseURL: 'http://localhost:3001',
    
    /* 在失败时收集追踪信息 */
    trace: 'off',
    
    /* 截图设置 */
    screenshot: 'off',
    
    /* 视频录制 */
    video: 'off',
    
    /* 浏览器上下文配置 */
    viewport: { width: 1280, height: 720 },
    
    /* 忽略 HTTPS 错误 */
    ignoreHTTPSErrors: true,
  },
  /* 配置测试项目 */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // 可以设置特定的浏览器配置
        launchOptions: {
          // 在测试时显示浏览器窗口（调试用）
          // headless: false,
          // slowMo: 1000,
          // 使用系统安装的Chrome浏览器
          executablePath: '/usr/bin/google-chrome',
        },
      },
    },

    /* 移动设备测试 */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* 在测试开始前启动本地开发服务器 */
  webServer: [
    {
      command: 'npm run dev',
      cwd: './backend',
      port: 3000,
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
    {
      command: 'npm run dev',
      cwd: './frontend',
      port: 3001,
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
  ],
});
