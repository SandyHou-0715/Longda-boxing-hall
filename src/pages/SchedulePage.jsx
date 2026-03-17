import { useState } from 'react';
import { useData } from '../context/DataContext';

const STATUS_OPTIONS = ['全部', '待上课', '已完成', '已取消'];

const statusStyle = {
  待上课: 'bg-blue-900/50 text-blue-300 border-blue-700',
  已完成: 'bg-green-900/50 text-green-300 border-green-700',
  已取消: 'bg-gray-800 text-gray-500 border-gray-700',
};

export default function SchedulePage() {
  const { mySchedule, cancelBooking } = useData();
  const [statusFilter, setStatusFilter] = useState('全部');
  const [dateFilter, setDateFilter] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const filtered = mySchedule.filter((s) => {
    const matchStatus = statusFilter === '全部' || s.status === statusFilter;
    const matchDate = !dateFilter || s.date === dateFilter;
    return matchStatus && matchDate;
  });

  function handleCancel(id, date) {
    if (date < today) {
      showToast('无法取消已过去的课程');
      return;
    }
    cancelBooking(id);
    showToast('已成功取消预约');
  }

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">我的课程表</h1>
        <p className="text-gray-400 text-sm mt-1">查看您的全部课程记录</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-2xl p-4 mb-5 border border-gray-800 flex flex-wrap gap-4">
        {/* Status filter */}
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === s
                  ? 'bg-primary-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {/* Date filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
        />
        {dateFilter && (
          <button
            onClick={() => setDateFilter('')}
            className="text-sm text-gray-400 hover:text-white"
          >
            清除日期
          </button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">📅</p>
          <p className="text-gray-400">暂无相关课程记录</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((cls) => (
            <div
              key={cls.id}
              className="bg-gray-900 rounded-2xl p-4 border border-gray-800 flex items-start gap-4"
            >
              {/* Date badge */}
              <div className="flex-shrink-0 w-14 text-center">
                <div className="bg-primary-900/60 rounded-xl py-1 px-1">
                  <p className="text-lg font-bold text-primary-400 leading-none">
                    {cls.date.slice(8)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {cls.date.slice(5, 7)}月
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white">{cls.courseName}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                      🕐 {cls.time} · ⏱ {cls.duration}分钟 · 👨‍🏫 {cls.coach}
                    </p>
                    <p className="text-sm text-gray-500">📍 {cls.location}</p>
                  </div>
                  <span
                    className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full border ${
                      statusStyle[cls.status] || 'bg-gray-800 text-gray-400 border-gray-700'
                    }`}
                  >
                    {cls.status}
                  </span>
                </div>

                {cls.status === '待上课' && cls.date >= today && (
                  <button
                    onClick={() => handleCancel(cls.id, cls.date)}
                    className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    取消预约
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-5 py-3 rounded-full shadow-lg border border-gray-700 z-50">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
