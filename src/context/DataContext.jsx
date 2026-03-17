import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  userSchedules,
  pointsHistories,
  availableBookings,
  users,
} from '../data/mockData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { currentUser } = useAuth();

  // Local state for schedules (to support booking mutations)
  const [schedules, setSchedules] = useState({ ...userSchedules });
  const [bookings, setBookings] = useState([...availableBookings]);
  const [pointsHistoriesState, setPointsHistoriesState] = useState({ ...pointsHistories });
  const [userPoints, setUserPoints] = useState(() => {
    const pts = {};
    users.forEach((u) => { pts[u.id] = u.points; });
    return pts;
  });

  const mySchedule = currentUser ? (schedules[currentUser.id] || []) : [];
  const myPointsHistory = currentUser ? (pointsHistoriesState[currentUser.id] || []) : [];
  const myPoints = currentUser ? (userPoints[currentUser.id] ?? currentUser.points) : 0;

  function bookCourse(bookingId) {
    if (!currentUser) return { success: false, message: '请先登录' };

    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: '课程不存在' };

    const isFull = booking.currentEnrollment >= booking.maxCapacity;
    if (isFull) return { success: false, message: '该课程已满员' };

    const pkg = currentUser.package;
    const used = schedules[currentUser.id]?.filter((s) => s.status !== '已取消').length || 0;
    if (used >= pkg.total) return { success: false, message: '剩余课程数不足' };

    // Check if already booked
    const alreadyBooked = schedules[currentUser.id]?.some(
      (s) => s.date === booking.date && s.time === booking.time && s.status !== '已取消'
    );
    if (alreadyBooked) return { success: false, message: '该时段已有课程' };

    // Add to user schedule
    const newRecord = {
      id: Date.now(),
      courseName: booking.courseName,
      coach: booking.coach,
      date: booking.date,
      time: booking.time,
      duration: booking.duration,
      location: booking.location,
      status: '待上课',
    };

    setSchedules((prev) => ({
      ...prev,
      [currentUser.id]: [...(prev[currentUser.id] || []), newRecord].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      ),
    }));

    // Increase enrollment count
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, currentEnrollment: b.currentEnrollment + 1 } : b
      )
    );

    // Award 10 points
    const pointsEarned = 10;
    setUserPoints((prev) => ({
      ...prev,
      [currentUser.id]: (prev[currentUser.id] ?? currentUser.points) + pointsEarned,
    }));

    const newPointEntry = {
      id: Date.now() + 1,
      date: new Date().toISOString().split('T')[0],
      type: 'earn',
      amount: pointsEarned,
      reason: '预约课程奖励',
      balance: (userPoints[currentUser.id] ?? currentUser.points) + pointsEarned,
    };
    setPointsHistoriesState((prev) => ({
      ...prev,
      [currentUser.id]: [newPointEntry, ...(prev[currentUser.id] || [])],
    }));

    return { success: true };
  }

  function cancelBooking(scheduleId) {
    if (!currentUser) return { success: false };

    setSchedules((prev) => ({
      ...prev,
      [currentUser.id]: (prev[currentUser.id] || []).map((s) =>
        s.id === scheduleId ? { ...s, status: '已取消' } : s
      ),
    }));

    return { success: true };
  }

  return (
    <DataContext.Provider
      value={{
        mySchedule,
        myPointsHistory,
        myPoints,
        availableBookings: bookings,
        bookCourse,
        cancelBooking,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
