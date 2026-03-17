import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (currentUser) return <Navigate to="/dashboard" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!identifier.trim() || !password.trim()) {
      setError('请填写用户名和密码');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(identifier.trim(), password.trim());
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-700 rounded-full mb-4">
            <span className="text-4xl">🥋</span>
          </div>
          <h1 className="text-3xl font-bold text-white">龙达跆拳道</h1>
          <p className="text-gray-400 mt-1">会员管理系统</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6">登录账户</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5" htmlFor="identifier">
                用户名 / 手机号
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="请输入用户名或手机号"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600 placeholder-gray-500"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5" htmlFor="password">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600 placeholder-gray-500"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-700 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? '登录中...' : '登 录'}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-3">示例账号（密码均为 123456）：</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '张三', id: 'zhang_san' },
                { label: '李四', id: 'li_si' },
                { label: '王五', id: 'wang_wu' },
                { label: '陈七', id: 'chen_qi' },
              ].map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => { setIdentifier(acc.id); setPassword('123456'); setError(''); }}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg py-2 px-3 transition-colors"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
