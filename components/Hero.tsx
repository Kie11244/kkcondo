import React, { useState, useEffect } from 'react';
import type { Language } from '../types.ts';
import { TRANSLATIONS } from '../constants.ts';
import { Icon } from './Icon.tsx';

interface HeroProps {
    lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [searchTab, setSearchTab] = useState('all');

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-[92vh] grid place-items-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1960&auto=format&fit=crop" alt="Luxury condo skyline" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-tight font-semibold leading-tight">
                        {TRANSLATIONS[lang]['hero.title']}
                    </h1>
                    <p className="mt-3 md:mt-4 text-white/80 text-base md:text-lg">
                        {TRANSLATIONS[lang]['hero.subtitle']}
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-black/5 p-4 sm:p-5 md:p-6 transition-all duration-700 delay-150 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <button onClick={() => setSearchTab('all')} className={`px-4 py-2 rounded-lg text-sm font-medium ${searchTab === 'all' ? 'bg-[#1E3A8A] text-white shadow hover:shadow-md' : 'text-[#111827]/80 hover:border-b-2 hover:border-[#DC2626]'} focus-visible:outline-none`}>
                                ทั้งหมด
                            </button>
                            <button onClick={() => setSearchTab('rent')} className={`px-4 py-2 rounded-lg text-sm ${searchTab === 'rent' ? 'bg-[#1E3A8A] text-white shadow hover:shadow-md' : 'text-[#111827]/80 hover:border-b-2 hover:border-[#DC2626]'} focus-visible:outline-none`}>
                                เช่า
                            </button>
                             <button onClick={() => setSearchTab('buy')} className={`px-4 py-2 rounded-lg text-sm ${searchTab === 'buy' ? 'bg-[#1E3A8A] text-white shadow hover:shadow-md' : 'text-[#111827]/80 hover:border-b-2 hover:border-[#DC2626]'} focus-visible:outline-none`}>
                                ซื้อ
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                            <div className="md:col-span-4">
                                <label className="block text-sm text-[#6B7280] mb-1">ทำเล / BTS / MRT</label>
                                <div className="relative">
                                    <Icon name="map-pin" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                    <input type="text" placeholder="เช่น BTS ปุณณวิถี, อโศก" className="w-full rounded-xl border border-black/10 bg-white px-9 py-3 text-sm placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" />
                                </div>
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-sm text-[#6B7280] mb-1">ช่วงราคา (บาท/เดือน)</label>
                                <div className="flex items-center gap-3">
                                    <input id="price-min" type="number" min="0" step="1000" defaultValue="15000" className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" />
                                    <span className="text-[#6B7280] text-sm">-</span>
                                    <input id="price-max" type="number" min="0" step="1000" defaultValue="45000" className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-[#6B7280] mb-1">ห้องนอน</label>
                                <div className="relative">
                                    <Icon name="bed" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                    <select className="w-full appearance-none rounded-xl border border-black/10 bg-white px-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30">
                                        <option value="">ทั้งหมด</option>
                                        <option>สตูดิโอ</option>
                                        <option>1 ห้องนอน</option>
                                        <option>2 ห้องนอน</option>
                                        <option>3 ห้องนอน+</option>
                                    </select>
                                    <Icon name="chevron-down" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                </div>
                            </div>
                            <div className="md:col-span-2 flex items-end">
                                <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#EF4444] px-5 py-3 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">
                                    <Icon name="search" className="w-5 h-5" />
                                    <span className="text-sm font-semibold">ค้นหา</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <button className="px-3 py-1.5 rounded-full text-xs md:text-sm border border-[#1E3A8A]/20 text-[#1E3A8A] hover:bg-[#1E3A8A]/5">ใกล้ BTS (≤ 5 นาที)</button>
                            <button className="px-3 py-1.5 rounded-full text-xs md:text-sm border border-black/10 hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">มีเฟอร์นิเจอร์ครบ</button>
                            <button className="px-3 py-1.5 rounded-full text-xs md:text-sm border border-black/10 hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">เลี้ยงสัตว์ได้</button>
                            <button className="px-3 py-1.5 rounded-full text-xs md:text-sm border border-black/10 hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">ห้องใหม่</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};