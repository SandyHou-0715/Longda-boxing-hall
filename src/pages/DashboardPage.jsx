import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { mySchedule, myPoints } = useData();
  const navigate = useNavigate();

  const pkg = currentUser.package;
  const remaining = pkg.total - pkg.used;
  const usedPercent = Math.round((pkg.used / pkg.total) * 100);

  const today = new Date().toISOString().split('T')[0];
  const upcomingClasses = mySchedule
    .filter((s) => s.date >= today && s.status === '待上课')
    .slice(0, 3);

  const completedCount = mySchedule.filter((s) => s.status === '已完成').length;

  const diffDays = Math.ceil(
    (new Date(pkg.expireDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary-900 to-gray-900 rounded-2xl p-6 mb-6 border border-primary-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
            {currentUser.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              欢迎回来，{currentUser.name}！
            </h1>
            <p className="text-gray-400 mt-0.5">
              {currentUser.level} · 入馆时间 {currentUser.joinDate}
            </p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon="📚"
          label="剩余课程"
          value={remaining}
          sub={`共 ${pkg.total} 节`}
          color="primary"
        />
        <StatCard
          icon="⭐"
          label="我的积分"
          value={myPoints.toLocaleString()}
          sub="点"
          color="yellow"
        />
        <StatCard
          icon="✅"
          label="已完成课程"
          value={completedCount}
          sub="节"
          color="green"
        />
        <StatCard
          icon="⏳"
          label="套餐到期"
          value={diffDays > 0 ? diffDays : 0}
          sub="天后"
          color="blue"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Package progress */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">套餐使用情况</h2>
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>{pkg.name}</span>
              <span>{pkg.used} / {pkg.total} 节</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${usedPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">已使用 {usedPercent}%</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <PackageDetail label="总课时" value={pkg.total} />
            <PackageDetail label="已使用" value={pkg.used} />
            <PackageDetail label="剩余" value={remaining} highlight />
          </div>
          <p className="text-xs text-gray-500 mt-3">
            到期日：{pkg.expireDate}
          </p>
        </div>

        {/* Upcoming classes */}
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">近期课程</h2>
            <button
              onClick={() => navigate('/schedule')}
              className="text-xs text-primary-400 hover:text-primary-300"
            >
              查看全部 →
            </button>
          </div>
          {upcomingClasses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">暂无即将上课的课程</p>
              <button
                onClick={() => navigate('/booking')}
                className="mt-3 text-sm text-primary-400 hover:text-primary-300"
              >
                去预约课程 →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center gap-3 bg-gray-800 rounded-xl p-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center text-lg flex-shrink-0">
                    🥋
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{cls.courseName}</p>
                    <p className="text-xs text-gray-400">
                      {cls.date} {cls.time} · {cls.coach}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  const colorMap = {
    primary: 'from-primary-900/60 to-primary-950 border-primary-800 text-primary-400',
    yellow: 'from-yellow-900/40 to-gray-900 border-yellow-800/50 text-yellow-400',
    green: 'from-green-900/40 to-gray-900 border-green-800/50 text-green-400',
    blue: 'from-blue-900/40 to-gray-900 border-blue-800/50 text-blue-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} rounded-2xl p-4 border`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">
        {label}
        {sub && <span className="ml-1 text-gray-500">{sub}</span>}
      </div>
    </div>
  );
}

function PackageDetail({ label, value, highlight }) {
  return (
    <div className="bg-gray-800 rounded-xl p-3 text-center">
      <p className={`text-xl font-bold ${highlight ? 'text-primary-400' : 'text-white'}`}>
        {value}
      </p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
