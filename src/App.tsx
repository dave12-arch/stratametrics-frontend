import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MarketGrid } from './components/MarketGrid';
import { AuthForm } from './components/AuthForm';
import { LandingPage } from './components/LandingPage';
import { PortfolioPage } from './components/PortfolioPage';
import { SettingsPage } from './components/SettingsPage';
import { useAuth } from './hooks/useAuth';
import { useMarketData } from './hooks/useMarketData';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#f5f1e8] text-[#6f685d] flex items-center justify-center">Authenticating...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#f5f1e8] text-[#6f685d] flex items-center justify-center">Authenticating...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { data, loading: dataLoading } = useMarketData();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={
          <PublicAuthRoute>
            <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center p-4">
              <div className="w-full max-w-6xl rounded-[2.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-4 shadow-[0_24px_80px_-30px_rgba(17,17,17,0.35)] md:p-8">
                <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="rounded-[2rem] border border-[#d8d0c2] bg-white p-8 md:p-10">
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-[#7a746a]">Private Access</p>
                    <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#111111] sm:text-5xl">
                      A quieter kind of edge.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-[#4b463f]">
                      Sign in to continue into a refined workspace designed for calm, intelligent decision-making.
                    </p>
                  </div>
                  <AuthForm />
                </div>
              </div>
            </div>
          </PublicAuthRoute>
        } />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<div className="min-h-screen bg-[#f5f1e8] px-4 py-8"><iframe src="/privacy-policy.html" title="Privacy Policy" className="h-[85vh] w-full rounded-[2rem] border border-[#d8d0c2] bg-white" /></div>} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <header className="mb-8">
                <h1 className="text-3xl font-semibold text-[#171717]">Market Overview</h1>
              </header>
              <MarketGrid data={data} loading={dataLoading} />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/portfolio" element={
          <ProtectedRoute>
            <Layout>
              <PortfolioPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <Layout>
              <SettingsPage />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;