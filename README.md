# 龙达跆拳道馆会员管理系统

基于 **React + Tailwind CSS** 构建的跆拳道馆会员管理系统，提供用户登录、课程表查看、课程预约、积分管理等完整功能。

## 技术栈

- **React 19** + **Vite** — 前端框架与构建工具
- **Tailwind CSS 3** — CSS 框架
- **React Router 7** — 路由管理
- **React Context** — 全局状态管理

## 功能模块

| 页面 | 路径 | 功能描述 |
|------|------|----------|
| 登录页 | `/login` | 用户名/手机号 + 密码登录，登录状态持久化 |
| 个人仪表盘 | `/dashboard` | 欢迎信息、套餐进度、近期课程概览 |
| 我的课程表 | `/schedule` | 查看已预约/历史课程，支持按状态/日期筛选，可取消预约 |
| 预约课程 | `/booking` | 浏览未来14天可预约课程，一键预约，查看名额 |
| 我的积分 | `/points` | 积分余额、变动历史记录、积分规则说明 |
| 个人信息 | `/profile` | 个人资料、套餐详情、退出登录 |

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/SandyHou-0715/Longda-boxing-hall.git
cd Longda-boxing-hall

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 `http://localhost:5173`

### 生产构建

```bash
npm run build
npm run preview
```

## 示例账号

| 用户名 | 密码 | 姓名 | 级别 |
|--------|------|------|------|
| `zhang_san` | `123456` | 张三 | 黑带一段 |
| `li_si` | `123456` | 李四 | 红带 |
| `wang_wu` | `123456` | 王五 | 蓝带 |
| `zhao_liu` | `123456` | 赵六 | 白带 |
| `chen_qi` | `123456` | 陈七 | 黑带二段 |

也可以直接输入手机号（如 `13800138001`）登录。

## 项目结构

```
src/
├── components/       # 公共组件 (Layout, Sidebar, BottomNav, ProtectedRoute)
├── pages/           # 页面组件 (Login, Dashboard, Schedule, Booking, Points, Profile)
├── context/         # React Context (AuthContext, DataContext)
├── data/            # Mock 数据 (用户、课程、积分记录)
├── App.jsx          # 路由配置
└── main.jsx         # 应用入口
```
