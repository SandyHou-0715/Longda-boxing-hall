import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', icon: '🏠', label: '仪表盘' },
  { to: '/schedule', icon: '📅', label: '我的课程' },
  { to: '/booking', icon: '📋', label: '预约课程' },
  { to: '/points', icon: '⭐', label: '我的积分' },
  { to: '/profile', icon: '👤', label: '个人信息' },
];

export default function Sidebar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🥋</span>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">龙达跆拳道</h1>
            <p className="text-xs text-gray-400">会员管理系统</p>
          </div>
        </div>
      </div>

      {/* User info */}
      {currentUser && (
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold text-lg">
              {currentUser.avatar}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-400 truncate">{currentUser.level}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-700 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span>退出登录</span>
        </button>
      </div>
    </aside>
  );
}
