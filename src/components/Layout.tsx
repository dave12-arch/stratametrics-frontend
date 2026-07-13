import React from 'react';
import { LayoutDashboard, LineChart, Wallet, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#f5f1e8] font-sans text-[#171717]">
      <aside className="flex w-64 flex-col border-r border-[#d8d0c2] bg-[#f8f4eb] p-6">
        <Link to="/home" className="mb-10 block text-xl font-semibold uppercase tracking-[0.35em] text-[#171717]">
          Stratametrics
        </Link>

        <nav className="flex flex-col gap-3">
          <NavItem to="/home" icon={<LayoutDashboard size={18} />} label="Home" />
          <NavItem to="/dashboard" icon={<LineChart size={18} />} label="Markets" />
          <NavItem to="/portfolio" icon={<Wallet size={18} />} label="Portfolio" />
          <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium text-[#605a53] transition hover:bg-[#efe8db] hover:text-[#171717]"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </aside>

      <main className="flex-1 p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => (
  <Link to={to} className="flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium text-[#605a53] transition hover:bg-[#efe8db] hover:text-[#171717]">
    {icon}
    <span>{label}</span>
  </Link>
);