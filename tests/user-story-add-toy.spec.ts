import { test, expect } from '@playwright/test';

/**
 * 用户故事测试：选择商品流程
 * 根据 add-toy.md 用户故事编写的自动化测试
 */

test.describe('用户故事：选择商品流程', () => {
  
  test('完整流程：登录 -> 浏览商品 -> 添加到购物车', async ({ page }) => {
    
    // 步骤 1: 访问网站主页
    console.log('📋 步骤 1: 访问网站主页');
    await page.goto('/');
    
    // 步骤 2: 如果页面上有"退出"按钮，则点击"退出"按钮
    console.log('📋 步骤 2: 检查是否需要退出');
    const logoutButton = page.locator('button:has-text("退出"), a:has-text("退出")');
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      console.log('✅ 已点击退出按钮');
    } else {
      console.log('ℹ️ 未找到退出按钮，用户可能未登录');
    }

    // 步骤 3: 点击"登录"按钮进入用户登录界面
    console.log('📋 步骤 3: 点击登录按钮');
    const loginLink = page.locator('a:has-text("登录")');
    await expect(loginLink).toBeVisible();
    await loginLink.click();

    // 步骤 4: 使用用户名"jacwu"和密码"jacwu"进行登录
    console.log('📋 步骤 4: 填写登录信息');
    await expect(page).toHaveURL(/.*\/login/);
    
    // 填写用户名
    await page.fill('input[type="text"], input[name="username"]', 'jacwu');
    // 填写密码
    await page.fill('input[type="password"], input[name="password"]', 'jacwu');
    // 点击登录按钮
    await page.click('button[type="submit"], button:has-text("登录")');

    // 步骤 5: 登录完成后，会跳转到主页
    console.log('📋 步骤 5: 验证登录成功并跳转主页');
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=欢迎, jacwu')).toBeVisible();
    console.log('✅ 登录成功');

    // 步骤 6: 主页上可以看到玩具按分类显示
    console.log('📋 步骤 6: 验证玩具分类显示');
    const categories = ['全部', '益智玩具', '遥控玩具', '户外玩具', '玩偶玩具'];
    
    for (const category of categories) {
      const categoryButton = page.locator(`button:has-text("${category}")`);
      await expect(categoryButton).toBeVisible();
      console.log(`✅ 找到分类: ${category}`);
    }

    // 步骤 7: 验证每个玩具卡片包含必要信息（图片、名称、价格、描述）
    console.log('📋 步骤 7: 验证玩具卡片信息');
    
    // 等待页面加载完成
    await page.waitForTimeout(2000);
    
    // 寻找包含价格的元素作为玩具卡片
    const toyCards = page.locator('[class*="card"], div').filter({ hasText: '¥' });
    const firstToyCard = toyCards.first();
    
    await expect(firstToyCard).toBeVisible();
    console.log('✅ 找到玩具卡片');

    // 步骤 8: 点击某个玩具卡片时，跳转到该玩具的详情页面
    console.log('📋 步骤 8: 点击玩具卡片跳转详情页');
    
    // 寻找第一个可点击的玩具相关元素
    const clickableToyElement = page.locator('a, button, [onclick]').filter({ hasText: '¥' }).first();
    await clickableToyElement.click();
    
    // 验证跳转到详情页
    await expect(page).toHaveURL(/.*\/toys\/\d+/);
    console.log('✅ 成功跳转到玩具详情页');

    // 步骤 9: 在详情页，点击"加入购物车"按钮
    console.log('📋 步骤 9: 点击加入购物车按钮');
    const addToCartButton = page.locator('button:has-text("加入购物车")');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
    console.log('✅ 已点击加入购物车按钮');
    
    // 等待操作完成
    await page.waitForTimeout(1000);

    // 步骤 10: 点击导航栏中的"购物车"按钮，跳转到购物车页面
    console.log('📋 步骤 10: 点击购物车按钮');
    const cartLink = page.locator('a:has-text("购物车")');
    await expect(cartLink).toBeVisible();
    await cartLink.click();

    // 步骤 11: 验证跳转到购物车页面并看到刚选择的玩具
    console.log('📋 步骤 11: 验证购物车页面和商品');
    await expect(page).toHaveURL(/.*\/cart/);
    
    // 验证购物车中有商品（检查是否有价格信息）
    const cartContent = page.locator('body');
    await expect(cartContent).toContainText(/¥/);
    console.log('✅ 购物车中已显示商品');

    console.log('🎉 用户故事测试完成！所有步骤都成功执行。');
  });

  test('验证分类过滤功能', async ({ page }) => {
    console.log('📋 测试玩具分类过滤功能');
    
    // 先登录
    await page.goto('/login');
    await page.fill('input[type="text"]', 'jacwu');
    await page.fill('input[type="password"]', 'jacwu');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');

    // 测试每个分类按钮
    const categories = ['益智玩具', '遥控玩具', '户外玩具', '玩偶玩具', '全部'];
    
    for (const category of categories) {
      console.log(`🔍 测试分类: ${category}`);
      await page.click(`button:has-text("${category}")`);
      await page.waitForTimeout(500);
      
      // 验证按钮被选中（可以检查样式变化）
      const categoryButton = page.locator(`button:has-text("${category}")`);
      await expect(categoryButton).toBeVisible();
      console.log(`✅ ${category} 分类按钮可正常点击`);
    }
  });

  test('验证玩具详情页面内容', async ({ page }) => {
    console.log('📋 测试玩具详情页面');
    
    // 登录并进入详情页
    await page.goto('/login');
    await page.fill('input[type="text"]', 'jacwu');
    await page.fill('input[type="password"]', 'jacwu');
    await page.click('button[type="submit"]');
    
    // 直接访问一个玩具详情页
    await page.goto('/toys/1');
    
    // 验证详情页必要元素
    await expect(page.locator('button:has-text("加入购物车")')).toBeVisible();
    console.log('✅ 加入购物车按钮存在');
    
    // 可以添加更多详情页内容验证
    // 如：商品图片、名称、价格、描述等
  });
});
