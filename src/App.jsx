import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import BookingPage from './pages/BookingPage';
import PointsPage from './pages/PointsPage';
import ProfilePage from './pages/ProfilePage';

function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <DataProvider>
        <Layout>{children}</Layout>
      </DataProvider>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedLayout>
                <DashboardPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedLayout>
                <SchedulePage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedLayout>
                <BookingPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/points"
            element={
              <ProtectedLayout>
                <PointsPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedLayout>
                <ProfilePage />
              </ProtectedLayout>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
