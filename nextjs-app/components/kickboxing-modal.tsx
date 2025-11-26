"use client";

import { useState } from "react";
import { X, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { KickboxingGroupModal } from "./kickboxing-group-modal";

interface KickboxingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function KickboxingModal({ isOpen, onClose }: KickboxingModalProps) {
    const [showGroupModal, setShowGroupModal] = useState(false);

    if (!isOpen) return null;

    if (showGroupModal) {
        return (
            <KickboxingGroupModal
                isOpen={true}
                onClose={onClose}
                onBack={() => setShowGroupModal(false)}
            />
        );
    }

    const handlePrivateClick = () => {
        // Redirect to WhatsApp
        window.open("https://wa.me/1234567890", "_blank");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-zinc-800">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                    aria-label="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Kickboxing Training</h2>
                        <p className="text-zinc-400 text-lg">Choose your training style</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
                        {/* Group Session Card */}
                        <button
                            onClick={() => setShowGroupModal(true)}
                            className="group relative flex flex-col items-center p-8 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-red-500 hover:bg-zinc-800/80 transition-all duration-300 text-left"
                        >
                            <div className="w-20 h-20 rounded-full bg-red-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-10 h-10 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Group Session</h3>
                            <p className="text-zinc-400 text-center mb-6">
                                Join a group class with up to 10 participants. High energy, motivation, and fun.
                            </p>
                            <span className="mt-auto px-4 py-2 rounded-full bg-red-600 text-white font-semibold text-sm group-hover:bg-red-500 transition-colors">
                                Book Spot
                            </span>
                        </button>

                        {/* Private Session Card */}
                        <button
                            onClick={handlePrivateClick}
                            className="group relative flex flex-col items-center p-8 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-green-500 hover:bg-zinc-800/80 transition-all duration-300 text-left"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <User className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Private Session</h3>
                            <p className="text-zinc-400 text-center mb-6">
                                One-on-one training tailored to your goals. Contact us directly to schedule.
                            </p>
                            <span className="mt-auto px-4 py-2 rounded-full bg-green-600 text-white font-semibold text-sm group-hover:bg-green-500 transition-colors flex items-center gap-2">
                                Chat on WhatsApp
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
