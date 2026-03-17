import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const { mySchedule, myPoints } = useData();
  const navigate = useNavigate();

  const pkg = currentUser.package;
  const remaining = pkg.total - pkg.used;
  const completedCount = mySchedule.filter((s) => s.status === '已完成').length;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">个人信息</h1>
      </div>

      {/* Avatar & name */}
      <div className="bg-gray-900 rounded-2xl p-6 mb-5 border border-gray-800 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-primary-700 flex items-center justify-center text-4xl font-bold text-white flex-shrink-0">
          {currentUser.avatar}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{currentUser.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-primary-900/60 text-primary-400 text-xs px-2.5 py-1 rounded-full border border-primary-700">
              {currentUser.level}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">入馆时间：{currentUser.joinDate}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-primary-400">{remaining}</p>
          <p className="text-xs text-gray-400 mt-1">剩余课程</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-yellow-400">{myPoints.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">积分余额</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 text-center">
          <p className="text-2xl font-bold text-green-400">{completedCount}</p>
          <p className="text-xs text-gray-400 mt-1">已完成课程</p>
        </div>
      </div>

      {/* Info list */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 mb-5 overflow-hidden">
        <h3 className="px-5 py-3 text-sm font-semibold text-gray-400 border-b border-gray-800">
          基本信息
        </h3>
        {[
          { label: '用户名', value: currentUser.username },
          { label: '手机号', value: currentUser.phone },
          { label: '邮箱', value: currentUser.email },
          { label: '会员级别', value: currentUser.level },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-3.5 border-b border-gray-800 last:border-0"
          >
            <span className="text-sm text-gray-400">{item.label}</span>
            <span className="text-sm text-white">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Package info */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 mb-5 overflow-hidden">
        <h3 className="px-5 py-3 text-sm font-semibold text-gray-400 border-b border-gray-800">
          套餐信息
        </h3>
        {[
          { label: '套餐名称', value: pkg.name },
          { label: '总课时', value: `${pkg.total} 节` },
          { label: '已使用', value: `${pkg.used} 节` },
          { label: '剩余课时', value: `${remaining} 节` },
          { label: '到期日期', value: pkg.expireDate },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-3.5 border-b border-gray-800 last:border-0"
          >
            <span className="text-sm text-gray-400">{item.label}</span>
            <span className="text-sm text-white">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-900/40 hover:bg-red-900/60 border border-red-800 text-red-300 font-semibold py-3 rounded-xl transition-colors"
      >
        退出登录
      </button>
    </div>
  );
}
