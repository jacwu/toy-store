import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import toyTypeRoutes from './routes/toyTypeRoutes';
import toyRoutes from './routes/toyRoutes';
import userRoutes from './routes/userRoutes'; // Import user routes
import commentRoutes from './routes/commentRoutes'; // Import comment routes

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 安全中间件
app.use(helmet());

// CORS 配置
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] // 生产环境设置具体域名
    : ['http://localhost:3001', 'http://localhost:5173'], // 开发环境
  credentials: true
}));

// 限流中间件
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制每个 IP 15 分钟内最多 100 个请求
  message: '请求过于频繁，请稍后再试'
});
app.use(limiter);

// 基础中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 请求日志中间件
app.use(requestLogger);

// 健康检查端点
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API 路由
app.use('/api/toy-types', toyTypeRoutes);
app.use('/api/toys', toyRoutes);
app.use('/api/users', userRoutes); // Add user routes
app.use('/api', commentRoutes); // Add comment routes

// 404 处理
app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ 
    error: '端点未找到',
    message: '请检查 API 路径是否正确'
  });
});

// 全局错误处理中间件
app.use(errorHandler);

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在端口 ${PORT}`);
  console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📝 健康检查: http://localhost:${PORT}/health`);
});

export default app;
