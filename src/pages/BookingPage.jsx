import { useState } from 'react';
import { useData } from '../context/DataContext';

const DIFFICULTY_OPTIONS = ['全部', '初级', '中级', '高级'];

const difficultyStyle = {
  初级: 'bg-green-900/50 text-green-300 border-green-700',
  中级: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
  高级: 'bg-red-900/50 text-red-300 border-red-700',
};

export default function BookingPage() {
  const { availableBookings, mySchedule, bookCourse } = useData();
  const [difficultyFilter, setDifficultyFilter] = useState('全部');
  const [dateFilter, setDateFilter] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const today = new Date().toISOString().split('T')[0];

  // Build set of already-booked slots for this user
  const bookedSlots = new Set(
    mySchedule
      .filter((s) => s.status === '待上课')
      .map((s) => `${s.date}_${s.time}`)
  );

  const filtered = availableBookings.filter((b) => {
    const matchDifficulty = difficultyFilter === '全部' || b.difficulty === difficultyFilter;
    const matchDate = !dateFilter || b.date === dateFilter;
    return matchDifficulty && matchDate;
  });

  function handleBook(bookingId) {
    const result = bookCourse(bookingId);
    if (result.success) {
      showToast('预约成功！已获得 10 积分', 'success');
    } else {
      showToast(result.message, 'error');
    }
  }

  function showToast(msg, type = 'success') {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(''), 3000);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">预约课程</h1>
        <p className="text-gray-400 text-sm mt-1">浏览并预约未来 14 天内的课程</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-2xl p-4 mb-5 border border-gray-800 flex flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          {DIFFICULTY_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                difficultyFilter === d
                  ? 'bg-primary-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <input
          type="date"
          value={dateFilter}
          min={today}
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
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-400">暂无可预约课程</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => {
            const isFull = b.currentEnrollment >= b.maxCapacity;
            const alreadyBooked = bookedSlots.has(`${b.date}_${b.time}`);
            const spotsLeft = b.maxCapacity - b.currentEnrollment;

            return (
              <div
                key={b.id}
                className="bg-gray-900 rounded-2xl p-4 border border-gray-800"
              >
                <div className="flex items-start gap-4">
                  {/* Date badge */}
                  <div className="flex-shrink-0 w-14 text-center">
                    <div className="bg-primary-900/60 rounded-xl py-1 px-1">
                      <p className="text-lg font-bold text-primary-400 leading-none">
                        {b.date.slice(8)}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{b.date.slice(5, 7)}月</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-white">{b.courseName}</h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${
                              difficultyStyle[b.difficulty] || 'bg-gray-800 text-gray-400 border-gray-700'
                            }`}
                          >
                            {b.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          🕐 {b.time} · ⏱ {b.duration}分钟 · 👨‍🏫 {b.coach}
                        </p>
                        <p className="text-sm text-gray-500">📍 {b.location}</p>
                        <p className="text-xs text-gray-500 mt-1">{b.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Capacity bar */}
                      <div className="flex-1 mr-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>名额</span>
                          <span
                            className={
                              isFull ? 'text-red-400' : spotsLeft <= 3 ? 'text-yellow-400' : 'text-green-400'
                            }
                          >
                            {isFull ? '已满' : `剩余 ${spotsLeft} 名`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${isFull ? 'bg-red-600' : 'bg-primary-600'}`}
                            style={{
                              width: `${Math.min(100, (b.currentEnrollment / b.maxCapacity) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Book button */}
                      <button
                        onClick={() => handleBook(b.id)}
                        disabled={isFull || alreadyBooked}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          alreadyBooked
                            ? 'bg-green-900/50 text-green-300 cursor-default'
                            : isFull
                            ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                            : 'bg-primary-700 hover:bg-primary-600 text-white'
                        }`}
                      >
                        {alreadyBooked ? '已预约' : isFull ? '已满员' : '立即预约'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div
          className={`fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 text-sm px-5 py-3 rounded-full shadow-lg border z-50 ${
            toastType === 'success'
              ? 'bg-green-900 text-green-200 border-green-700'
              : 'bg-red-900 text-red-200 border-red-700'
          }`}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
