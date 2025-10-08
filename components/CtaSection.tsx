import React, { useState, useCallback } from 'react';
import { Icon } from './Icon.tsx';

export const CtaSection: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        // In a real app, you would send form data to a server here.
        form.reset();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    }, []);

    return (
        <section id="rent" className="relative overflow-hidden py-12 md:py-16 border-t border-black/5">
            <img src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1960&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl md:text-3xl tracking-tight font-semibold text-[#111827]">
                            นัดดูห้องฟรี กับผู้เชี่ยวชาญคอนโด
                        </h2>
                        <p className="mt-2 text-sm text-[#6B7280]">
                            บอกความต้องการ งบประมาณ และทำเลที่สนใจ เราจัดแพลนดูห้องให้ภายใน 24 ชม.
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-[#111827]/80">
                            <li className="flex items-center gap-2"><Icon name="check-circle-2" className="w-4 h-4 text-green-600" /> คัดห้องตรงงบ พร้อมดีลพิเศษ</li>
                            <li className="flex items-center gap-2"><Icon name="check-circle-2" className="w-4 h-4 text-green-600" /> เดินทางสะดวกใกล้ BTS/MRT</li>
                            <li className="flex items-center gap-2"><Icon name="check-circle-2" className="w-4 h-4 text-green-600" /> ดูห้องหลายยูนิตในทริปเดียว</li>
                        </ul>
                        <div className="mt-6 flex items-center gap-3">
                            <a href="tel:02-000-0000" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-4 py-2 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition">
                                <Icon name="phone" className="w-4 h-4" /> โทรปรึกษา
                            </a>
                            <a href="#" className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-4 py-2 text-[#1E3A8A] hover:bg-[#1E3A8A]/5 transition">
                                <Icon name="message-circle" className="w-4 h-4" /> แชทไลน์
                            </a>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 shadow p-5 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-[#6B7280] mb-1">ชื่อ</label>
                                <input required type="text" name="name" className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" placeholder="ชื่อ-นามสกุล" />
                            </div>
                            <div>
                                <label className="block text-sm text-[#6B7280] mb-1">เบอร์โทร</label>
                                <input required type="tel" name="phone" pattern="[0-9+ -]{8,}" className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" placeholder="08X-XXX-XXXX" />
                            </div>
                            <div>
                                <label className="block text-sm text-[#6B7280] mb-1">งบประมาณ (บาท/เดือน)</label>
                                <input type="number" min="0" step="1000" name="budget" className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" placeholder="เช่น 20000" />
                            </div>
                            <div>
                                <label className="block text-sm text-[#6B7280] mb-1">ความต้องการ</label>
                                <select name="intent" className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30">
                                    <option value="rent">เช่า</option>
                                    <option value="buy">ซื้อ</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-[#6B7280] mb-1">ทำเลที่สนใจ</label>
                                <input type="text" name="area" className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" placeholder="เช่น สุขุมวิท, อโศก, ปุณณวิถี" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-[#6B7280] mb-1">หมายเหตุ</label>
                                <textarea name="note" rows={3} className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" placeholder="ขนาดห้อง เฟอร์นิเจอร์ ที่จอดรถ ฯฯ"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#EF4444] px-5 py-3 text-white shadow-lg hover:shadow-xl transition">
                            <Icon name="calendar" className="w-5 h-5" /> นัดดูห้องฟรี
                        </button>
                        <p className={`mt-3 text-center text-xs text-green-600 transition-opacity ${submitted ? 'opacity-100' : 'opacity-0'}`}>ขอบคุณครับ ทีมงานจะติดต่อกลับโดยเร็วที่สุด</p>
                    </form>
                </div>
            </div>
        </section>
    );
};