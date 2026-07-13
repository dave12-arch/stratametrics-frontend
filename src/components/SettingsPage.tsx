import { useEffect, useState } from 'react';
import { BellRing, Lock, UserRound, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const STORAGE_KEY = 'stratametrics-settings';

const defaultSettings = {
  fullName: 'Alex Mercer',
  email: 'alex@stratametrics.com',
  phone: '+1 (555) 010-203',
  notifications: true,
  marketAlerts: true,
  autoRefresh: true,
  timezone: 'UTC',
};

export const SettingsPage = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      } catch {
        // ignore invalid data
      }
    }
  }, []);

  useEffect(() => {
    const metadataName = user?.user_metadata?.full_name;
    const metadataPhone = user?.user_metadata?.phone;

    setSettings((current) => ({
      ...current,
      fullName: metadataName ? String(metadataName) : current.fullName,
      email: user?.email ? user.email : current.email,
      phone: metadataPhone ? String(metadataPhone) : current.phone,
    }));
  }, [user]);

  const handleChange = (field: keyof typeof settings, value: string | boolean) => {
    setSettings((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7a746a]">Settings</p>
          <h1 className="text-3xl font-semibold text-[#171717]">Account controls</h1>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-[#171717] px-5 py-2 text-sm font-semibold text-[#f8f4eb] transition hover:bg-[#2b2b2b]"
        >
          {saved ? 'Saved' : 'Save changes'}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
          <div className="mb-4 flex items-center gap-3">
            <UserRound className="text-[#171717]" size={20} />
            <h2 className="text-lg font-semibold text-[#171717]">Profile</h2>
          </div>
          <div className="space-y-4">
            <label className="block text-sm text-[#605a53]">
              <span className="mb-2 block">Full name</span>
              <input
                value={settings.fullName}
                onChange={(event) => handleChange('fullName', event.target.value)}
                className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 text-sm text-[#171717] outline-none"
              />
            </label>
            <label className="block text-sm text-[#605a53]">
              <span className="mb-2 block">Email</span>
              <input
                value={settings.email}
                onChange={(event) => handleChange('email', event.target.value)}
                className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 text-sm text-[#171717] outline-none"
              />
            </label>
            <label className="block text-sm text-[#605a53]">
              <span className="mb-2 block">Phone</span>
              <input
                value={settings.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 text-sm text-[#171717] outline-none"
              />
            </label>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
          <div className="mb-4 flex items-center gap-3">
            <Lock className="text-[#171717]" size={20} />
            <h2 className="text-lg font-semibold text-[#171717]">Security</h2>
          </div>
          <div className="space-y-3 text-sm text-[#605a53]">
            <div className="rounded-[1rem] border border-[#e4dccf] bg-white p-4">
              <p className="font-medium text-[#171717]">Authentication status</p>
              <p className="mt-1">Protected access is active for your current session.</p>
            </div>
            <div className="rounded-[1rem] border border-[#e4dccf] bg-white p-4">
              <p className="font-medium text-[#171717]">Recovery options</p>
              <p className="mt-1">Password reset and verification are available from the secure portal.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
          <div className="mb-4 flex items-center gap-3">
            <SlidersHorizontal className="text-[#171717]" size={20} />
            <h2 className="text-lg font-semibold text-[#171717]">Preferences</h2>
          </div>
          <div className="space-y-4 text-sm text-[#605a53]">
            <label className="flex items-center justify-between rounded-[1rem] border border-[#e4dccf] bg-white p-4">
              <span>Auto-refresh market data</span>
              <input
                type="checkbox"
                checked={settings.autoRefresh}
                onChange={(event) => handleChange('autoRefresh', event.target.checked)}
                className="h-4 w-4 rounded border-[#d8d0c2]"
              />
            </label>
            <label className="flex items-center justify-between rounded-[1rem] border border-[#e4dccf] bg-white p-4">
              <span>Market alerts</span>
              <input
                type="checkbox"
                checked={settings.marketAlerts}
                onChange={(event) => handleChange('marketAlerts', event.target.checked)}
                className="h-4 w-4 rounded border-[#d8d0c2]"
              />
            </label>
            <label className="flex items-center justify-between rounded-[1rem] border border-[#e4dccf] bg-white p-4">
              <span>Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(event) => handleChange('notifications', event.target.checked)}
                className="h-4 w-4 rounded border-[#d8d0c2]"
              />
            </label>
            <label className="block text-sm text-[#605a53]">
              <span className="mb-2 block">Timezone</span>
              <select
                value={settings.timezone}
                onChange={(event) => handleChange('timezone', event.target.value)}
                className="w-full rounded-full border border-[#d8d0c2] bg-white px-4 py-3 text-sm text-[#171717] outline-none"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="GMT">GMT</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
          <div className="mb-4 flex items-center gap-3">
            <BellRing className="text-[#171717]" size={20} />
            <h2 className="text-lg font-semibold text-[#171717]">Notifications</h2>
          </div>
          <p className="text-sm leading-7 text-[#605a53]">
            Your alerts are currently configured for account, market, and portfolio updates.
          </p>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-[#d8d0c2] bg-[#f8f4eb] p-6">
        <h2 className="text-xl font-semibold text-[#171717]">Connected account</h2>
        <p className="mt-3 text-sm leading-7 text-[#605a53]">
          Your account is active and linked to secured market-data access. Preferences are saved locally and can be updated at any time.
        </p>
      </div>
    </div>
  );
};
