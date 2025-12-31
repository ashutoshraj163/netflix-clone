import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
    User, Settings as SettingsIcon, Play, Bell, Shield,
    Globe, Subtitles, ChevronRight, Check, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type TabId = 'account' | 'playback' | 'notifications' | 'privacy' | 'language' | 'subtitles';

interface Tab {
    id: TabId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'playback', label: 'Playback', icon: Play },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'subtitles', label: 'Subtitles', icon: Subtitles },
];

export function Settings() {
    const { user, settings, updateSettings, logout } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabId>('account');

    const handleSave = () => {
        addToast({ title: 'Settings saved successfully!', type: 'success' });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        addToast({ title: 'Signed out successfully', type: 'info' });
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Membership & Billing</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">{user?.email}</p>
                                        <p className="text-gray-400 text-sm">Password: ********</p>
                                    </div>
                                    <button className="text-blue-400 hover:underline text-sm">Change</button>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">Premium Plan</p>
                                        <p className="text-gray-400 text-sm">4K + HDR, Ad-free</p>
                                    </div>
                                    <button className="text-blue-400 hover:underline text-sm">Change plan</button>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <div>
                                        <p className="text-white font-medium">Next billing date</p>
                                        <p className="text-gray-400 text-sm">January 15, 2025</p>
                                    </div>
                                    <button className="text-blue-400 hover:underline text-sm">Manage payment</button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign out of all devices
                        </button>
                    </div>
                );

            case 'playback':
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Playback Settings</h3>
                            <div className="space-y-6">
                                {/* Quality */}
                                <div>
                                    <label className="text-white font-medium block mb-3">Video Quality</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {(['auto', '720p', '1080p', '4k'] as const).map(quality => (
                                            <button
                                                key={quality}
                                                onClick={() => updateSettings({ playbackQuality: quality })}
                                                className={cn(
                                                    'px-4 py-3 rounded-lg border transition-all',
                                                    settings.playbackQuality === quality
                                                        ? 'border-white bg-white/10 text-white'
                                                        : 'border-gray-600 text-gray-400 hover:border-gray-400'
                                                )}
                                            >
                                                {quality.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Toggles */}
                                <SettingToggle
                                    label="Autoplay next episode"
                                    description="Automatically play the next episode in a series"
                                    checked={settings.autoplayNext}
                                    onChange={(checked) => updateSettings({ autoplayNext: checked })}
                                />
                                <SettingToggle
                                    label="Autoplay previews"
                                    description="Play previews while browsing"
                                    checked={settings.autoplayPreviews}
                                    onChange={(checked) => updateSettings({ autoplayPreviews: checked })}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="bg-gray-800/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                        <div className="space-y-6">
                            <SettingToggle
                                label="New releases"
                                description="Get notified about new movies and shows"
                                checked={settings.notifications.newReleases}
                                onChange={(checked) => updateSettings({
                                    notifications: { ...settings.notifications, newReleases: checked }
                                })}
                            />
                            <SettingToggle
                                label="Personalized recommendations"
                                description="Receive suggestions based on your watch history"
                                checked={settings.notifications.recommendations}
                                onChange={(checked) => updateSettings({
                                    notifications: { ...settings.notifications, recommendations: checked }
                                })}
                            />
                            <SettingToggle
                                label="Account updates"
                                description="Important updates about your account"
                                checked={settings.notifications.accountUpdates}
                                onChange={(checked) => updateSettings({
                                    notifications: { ...settings.notifications, accountUpdates: checked }
                                })}
                            />
                        </div>
                    </div>
                );

            case 'privacy':
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Privacy & Security</h3>
                            <div className="space-y-4">
                                <SettingLink label="Manage viewing activity" />
                                <SettingLink label="Download your personal info" />
                                <SettingLink label="Request account deletion" />
                                <SettingLink label="Two-factor authentication" />
                                <SettingLink label="Manage devices" />
                            </div>
                        </div>
                    </div>
                );

            case 'language':
                return (
                    <div className="bg-gray-800/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Language Preferences</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-white font-medium block mb-2">Display Language</label>
                                <select
                                    value="en"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-white"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                    <option value="ja">日本語</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-white font-medium block mb-2">Audio Language</label>
                                <select
                                    value={settings.audioLanguage}
                                    onChange={(e) => updateSettings({ audioLanguage: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-white"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="ja">Japanese</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 'subtitles':
                return (
                    <div className="bg-gray-800/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Subtitle Preferences</h3>
                        <div className="space-y-6">
                            <SettingToggle
                                label="Enable subtitles by default"
                                description="Show subtitles when available"
                                checked={settings.subtitlesEnabled}
                                onChange={(checked) => updateSettings({ subtitlesEnabled: checked })}
                            />
                            <div>
                                <label className="text-white font-medium block mb-2">Subtitle Language</label>
                                <select
                                    value={settings.subtitleLanguage}
                                    onChange={(e) => updateSettings({ subtitleLanguage: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-white"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="ja">Japanese</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#141414]">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <SettingsIcon className="w-8 h-8 text-white" />
                        <h1 className="text-3xl font-bold text-white">Settings</h1>
                    </div>

                    <div className="grid md:grid-cols-[240px_1fr] gap-8">
                        {/* Sidebar Tabs */}
                        <nav className="space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                                        activeTab === tab.id
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                    )}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        {/* Content */}
                        <div className="animate-fade-in">
                            {renderTabContent()}

                            <div className="mt-8 flex gap-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-[#E50914] hover:bg-[#B20710] text-white font-semibold px-6 py-3 rounded transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function SettingToggle({
    label,
    description,
    checked,
    onChange
}: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <div
            className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0 cursor-pointer"
            onClick={() => onChange(!checked)}
            role="switch"
            aria-checked={checked}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onChange(!checked)}
        >
            <div>
                <p className="text-white font-medium">{label}</p>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
            <div className={cn(
                'w-12 h-6 rounded-full transition-colors relative',
                checked ? 'bg-[#E50914]' : 'bg-gray-600'
            )}>
                <div className={cn(
                    'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform flex items-center justify-center',
                    checked ? 'translate-x-6' : 'translate-x-0.5'
                )}>
                    {checked && <Check className="w-3 h-3 text-[#E50914]" />}
                </div>
            </div>
        </div>
    );
}

function SettingLink({ label }: { label: string }) {
    return (
        <button className="w-full flex items-center justify-between py-3 border-b border-gray-700 last:border-0 text-white hover:text-gray-300 transition-colors">
            {label}
            <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
    );
}
