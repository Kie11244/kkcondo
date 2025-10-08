import React, { useState, useEffect } from 'react';
import type { Language } from '../types.ts';
import { Icon } from './Icon.tsx';

interface HeaderProps {
    lang: Language;
    setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [isMobileMenuOpen]);

    return (
        <header id="site-header" className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <a href="#" className="inline-flex items-center gap-2 group" aria-label="LX Home">
                        <div className="h-8 w-8 rounded-md bg-[#1E3A8A] text-white grid place-items-center tracking-tight font-semibold">LX</div>
                        <div className="text-[#111827] text-xl tracking-tight font-semibold">Luxury Condos</div>
                    </a>

                    <nav className="hidden lg:flex items-center gap-8">
                        <a href="#buy" className="text-sm text-[#111827]/80 hover:text-[#111827] hover:underline underline-offset-8 decoration-[#DC2626]/50">ซื้อ</a>
                        <a href="#rent" className="text-sm text-[#111827]/80 hover:text-[#111827] hover:underline underline-offset-8 decoration-[#DC2626]/50">เช่า</a>
                        <a href="#projects" className="text-sm text-[#111827]/80 hover:text-[#111827] hover:underline underline-offset-8 decoration-[#DC2626]/50">โครงการ</a>
                        <a href="#areas" className="text-sm text-[#111827]/80 hover:text-[#111827] hover:underline underline-offset-8 decoration-[#DC2626]/50">ทำเล</a>
                        <a href="#blog" className="text-sm text-[#111827]/80 hover:text-[#111827] hover:underline underline-offset-8 decoration-[#DC2626]/50">บทความ</a>
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-[#1E3A8A]/20 overflow-hidden">
                            <button onClick={() => setLang('th')} className={`px-3 py-1.5 text-sm ${lang === 'th' ? 'font-medium text-[#1E3A8A] bg-[#1E3A8A]/5' : 'text-[#111827]/70'} hover:bg-[#1E3A8A]/10 focus-visible:outline-none`}>TH</button>
                            <button onClick={() => setLang('en')} className={`px-3 py-1.5 text-sm ${lang === 'en' ? 'font-medium text-[#1E3A8A] bg-[#1E3A8A]/5' : 'text-[#111827]/70'} hover:bg-[#1E3A8A]/10 focus-visible:outline-none`}>EN</button>
                        </div>
                        <a href="tel:02-000-0000" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-[#DC2626] to-[#EF4444] px-4 py-2 text-white shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">
                            <Icon name="phone" className="w-4 h-4" />
                            <span className="text-sm font-semibold">โทรเลย 02-XXX-XXXX</span>
                        </a>
                    </div>

                    <button id="btn-mobile" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/40" aria-label="Open menu">
                        <Icon name="menu" className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {!isMobileMenuOpen ? null : (
                <div id="mobile-menu" className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-black/5">
                    <div className="mx-auto max-w-7xl px-4 py-4 space-y-2">
                        <a href="#buy" className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-black/5"><span className="text-[#111827]/90">ซื้อ</span><Icon name="chevron-right" className="w-4 h-4" /></a>
                        <a href="#rent" className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-black/5"><span className="text-[#111827]/90">เช่า</span><Icon name="chevron-right" className="w-4 h-4" /></a>
                        <a href="#projects" className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-black/5"><span className="text-[#111827]/90">โครงการ</span><Icon name="chevron-right" className="w-4 h-4" /></a>
                        <a href="#blog" className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-black/5"><span className="text-[#111827]/90">บทความ</span><Icon name="chevron-right" className="w-4 h-4" /></a>
                        <div className="flex items-center justify-between pt-2">
                             <div className="flex items-center rounded-full border border-[#1E3A8A]/20 overflow-hidden">
                                <button onClick={() => setLang('th')} className={`px-3 py-1.5 text-sm ${lang === 'th' ? 'font-medium text-[#1E3A8A] bg-[#1E3A8A]/5' : 'text-[#111827]/70'}`}>TH</button>
                                <button onClick={() => setLang('en')} className={`px-3 py-1.5 text-sm ${lang === 'en' ? 'font-medium text-[#1E3A8A] bg-[#1E3A8A]/5' : 'text-[#111827]/70'}`}>EN</button>
                            </div>
                            <a href="tel:02-000-0000" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-[#DC2626] to-[#EF4444] px-4 py-2 text-white shadow-lg">
                                <Icon name="phone" className="w-4 h-4" />
                                <span className="text-sm font-semibold">โทรเลย</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};