import { useState } from 'react';
import { useData } from '../context/DataContext';
import { pointsRules } from '../data/mockData';

const TYPE_OPTIONS = ['全部', '获得', '消耗'];

export default function PointsPage() {
  const { myPoints, myPointsHistory } = useData();
  const [typeFilter, setTypeFilter] = useState('全部');
  const [tab, setTab] = useState('history'); // 'history' | 'rules'

  const filtered = myPointsHistory.filter((h) => {
    if (typeFilter === '获得') return h.type === 'earn';
    if (typeFilter === '消耗') return h.type === 'spend';
    return true;
  });

  const totalEarned = myPointsHistory
    .filter((h) => h.type === 'earn')
    .reduce((sum, h) => sum + h.amount, 0);
  const totalSpent = myPointsHistory
    .filter((h) => h.type === 'spend')
    .reduce((sum, h) => sum + h.amount, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">我的积分</h1>
        <p className="text-gray-400 text-sm mt-1">查看积分余额与变动记录</p>
      </div>

      {/* Points banner */}
      <div className="bg-gradient-to-r from-yellow-900/60 to-gray-900 rounded-2xl p-6 mb-6 border border-yellow-800/50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-800/60 flex items-center justify-center text-4xl">
            ⭐
          </div>
          <div>
            <p className="text-gray-400 text-sm">当前积分余额</p>
            <p className="text-4xl font-bold text-yellow-300">{myPoints.toLocaleString()}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-black/20 rounded-xl p-3">
            <p className="text-xs text-gray-400">累计获得</p>
            <p className="text-xl font-semibold text-green-400">+{totalEarned.toLocaleString()}</p>
          </div>
          <div className="bg-black/20 rounded-xl p-3">
            <p className="text-xs text-gray-400">累计消耗</p>
            <p className="text-xl font-semibold text-red-400">-{totalSpent.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900 p-1 rounded-xl mb-5 border border-gray-800">
        {[
          { key: 'history', label: '变动记录' },
          { key: 'rules', label: '积分规则' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key
                ? 'bg-primary-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'history' && (
        <>
          {/* Type filter */}
          <div className="flex gap-2 mb-4">
            {TYPE_OPTIONS.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  typeFilter === t
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">⭐</p>
              <p className="text-gray-400">暂无积分记录</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((h) => (
                <div
                  key={h.id}
                  className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        h.type === 'earn' ? 'bg-green-900/60' : 'bg-red-900/60'
                      }`}
                    >
                      {h.type === 'earn' ? '⬆️' : '⬇️'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{h.reason}</p>
                      <p className="text-xs text-gray-500">{h.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        h.type === 'earn' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {h.type === 'earn' ? '+' : '-'}{h.amount}
                    </p>
                    <p className="text-xs text-gray-500">余额 {h.balance}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'rules' && (
        <div className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              🎁 获得积分
            </h3>
            {pointsRules
              .filter((r) => r.points > 0)
              .map((r) => (
                <div
                  key={r.id}
                  className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{r.event}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.description}</p>
                  </div>
                  <span className="text-green-400 font-bold text-sm ml-4 flex-shrink-0">
                    +{r.points}
                  </span>
                </div>
              ))}
          </div>
          <div className="space-y-2 mt-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              🎁 消耗积分
            </h3>
            {pointsRules
              .filter((r) => r.points < 0)
              .map((r) => (
                <div
                  key={r.id}
                  className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{r.event}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.description}</p>
                  </div>
                  <span className="text-red-400 font-bold text-sm ml-4 flex-shrink-0">
                    {r.points}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
