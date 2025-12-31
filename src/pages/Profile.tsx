import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { mockProfiles } from '@/data/mockData';
import { Edit2, Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Profile as ProfileType } from '@/types';

const avatars = ['🎬', '🎭', '🎮', '🎵', '🎨', '🌟', '🚀', '🎪', '👤', '👶'];

export function Profile() {
    const { user, profile, selectProfile } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profiles, setProfiles] = useState<ProfileType[]>(mockProfiles);
    const [editingProfile, setEditingProfile] = useState<ProfileType | null>(null);

    const handleSelectProfile = (selectedProfile: ProfileType) => {
        if (isEditing) {
            setEditingProfile(selectedProfile);
        } else {
            selectProfile(selectedProfile);
            navigate('/explore');
        }
    };

    const handleSaveProfile = () => {
        if (editingProfile) {
            setProfiles(prev =>
                prev.map(p => p.id === editingProfile.id ? editingProfile : p)
            );
            setEditingProfile(null);
        }
    };

    const handleAddProfile = () => {
        const newProfile: ProfileType = {
            id: Date.now().toString(),
            name: 'New Profile',
            avatar: '👤',
            isKid: false,
            maturityRating: 'R',
        };
        setProfiles(prev => [...prev, newProfile]);
        setEditingProfile(newProfile);
    };

    return (
        <div className="min-h-screen bg-[#141414]">
            <Navbar />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-medium text-white mb-2">
                        {isEditing ? 'Manage Profiles' : "Who's watching?"}
                    </h1>

                    {user && (
                        <p className="text-gray-400 mb-8">
                            Logged in as {user.email}
                        </p>
                    )}

                    {/* Profile Grid */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        {profiles.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => handleSelectProfile(p)}
                                className={cn(
                                    'group flex flex-col items-center gap-2 transition-transform hover:scale-105',
                                    profile?.id === p.id && !isEditing && 'ring-2 ring-white rounded-lg p-2'
                                )}
                                aria-label={`Select ${p.name} profile`}
                            >
                                <div className={cn(
                                    'w-24 h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center text-5xl md:text-6xl transition-all',
                                    'bg-gradient-to-br from-blue-600 to-purple-600',
                                    isEditing && 'group-hover:ring-2 ring-white'
                                )}>
                                    {p.avatar}
                                    {isEditing && (
                                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit2 className="w-8 h-8 text-white" />
                                        </div>
                                    )}
                                </div>
                                <span className={cn(
                                    'text-gray-400 group-hover:text-white transition-colors',
                                    profile?.id === p.id && !isEditing && 'text-white'
                                )}>
                                    {p.name}
                                </span>
                                {p.isKid && (
                                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                        KIDS
                                    </span>
                                )}
                            </button>
                        ))}

                        {/* Add Profile Button */}
                        {isEditing && profiles.length < 5 && (
                            <button
                                onClick={handleAddProfile}
                                className="flex flex-col items-center gap-2 group"
                                aria-label="Add new profile"
                            >
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-2 border-gray-600 group-hover:border-white flex items-center justify-center transition-colors">
                                    <Plus className="w-12 h-12 text-gray-600 group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-gray-400 group-hover:text-white transition-colors">
                                    Add Profile
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={cn(
                            'px-6 py-2 rounded border transition-colors',
                            isEditing
                                ? 'bg-white text-black border-white hover:bg-gray-200'
                                : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
                        )}
                    >
                        {isEditing ? 'Done' : 'Manage Profiles'}
                    </button>
                </div>

                {/* Edit Profile Modal */}
                {editingProfile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                        <div className="bg-[#181818] rounded-lg p-6 w-full max-w-md animate-scale-in">
                            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

                            <div className="space-y-6">
                                {/* Avatar Selection */}
                                <div>
                                    <label className="text-gray-400 text-sm mb-2 block">Avatar</label>
                                    <div className="flex flex-wrap gap-2">
                                        {avatars.map(avatar => (
                                            <button
                                                key={avatar}
                                                onClick={() => setEditingProfile({ ...editingProfile, avatar })}
                                                className={cn(
                                                    'w-12 h-12 rounded flex items-center justify-center text-2xl transition-all',
                                                    editingProfile.avatar === avatar
                                                        ? 'bg-white ring-2 ring-white'
                                                        : 'bg-gray-700 hover:bg-gray-600'
                                                )}
                                            >
                                                {avatar}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Name Input */}
                                <div>
                                    <label className="text-gray-400 text-sm mb-2 block">Name</label>
                                    <input
                                        type="text"
                                        value={editingProfile.name}
                                        onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-white"
                                    />
                                </div>

                                {/* Kids Profile Toggle */}
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div
                                        onClick={() => setEditingProfile({ ...editingProfile, isKid: !editingProfile.isKid })}
                                        className={cn(
                                            'w-12 h-6 rounded-full transition-colors relative',
                                            editingProfile.isKid ? 'bg-blue-600' : 'bg-gray-600'
                                        )}
                                    >
                                        <div className={cn(
                                            'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform',
                                            editingProfile.isKid ? 'translate-x-6' : 'translate-x-0.5'
                                        )} />
                                    </div>
                                    <span className="text-white">Kids Profile</span>
                                </label>

                                {/* Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="flex-1 bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-5 h-5" />
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingProfile(null)}
                                        className="flex-1 border border-gray-600 text-white py-3 rounded hover:border-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
