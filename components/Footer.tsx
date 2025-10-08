import React from 'react';
import { Icon } from './Icon.tsx';

export const Footer: React.FC = () => {
    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.querySelector('input[type="email"]') as HTMLInputElement;
        if (input) {
            const originalPlaceholder = input.placeholder;
            input.value = '';
            input.placeholder = 'สมัครสำเร็จ! ขอบคุณค่ะ';
            setTimeout(() => {
                input.placeholder = originalPlaceholder;
            }, 3000);
        }
    };

    return (
        <footer className="border-t border-black/5 bg-[#0B1220] text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-white text-[#0B1220] grid place-items-center font-semibold">LX</div>
                            <span className="font-semibold tracking-tight">Luxury Condos</span>
                        </div>
                        <p className="mt-3 text-sm text-white/70">แพลตฟอร์มคอนโดคุณภาพในกรุงเทพฯ คัดสรรโดยมืออาชีพ</p>
                        <div className="mt-4 flex items-center gap-3">
                            <a href="#" aria-label="Facebook" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"><Icon name="facebook" className="w-4 h-4" /></a>
                            <a href="#" aria-label="Instagram" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"><Icon name="instagram" className="w-4 h-4" /></a>
                            <a href="#" aria-label="Line" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"><Icon name="message-circle" className="w-4 h-4" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">เมนู</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li><a className="hover:underline" href="#rent">เช่า</a></li>
                            <li><a className="hover:underline" href="#buy">ซื้อ</a></li>
                            <li><a className="hover:underline" href="#projects">โครงการ</a></li>
                            <li><a className="hover:underline" href="#areas">ทำเล</a></li>
                            <li><a className="hover:underline" href="#blog">บทความ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">ติดต่อ</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li className="flex items-center gap-2"><Icon name="phone" className="w-4 h-4" /> 02-XXX-XXXX</li>
                            <li className="flex items-center gap-2"><Icon name="mail" className="w-4 h-4" /> hello@luxurycondos.example</li>
                            <li className="flex items-center gap-2"><Icon name="map-pin" className="w-4 h-4" /> สุขุมวิท, กรุงเทพฯ</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">รับข่าวสาร</h4>
                        <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
                            <label className="sr-only" htmlFor="newsletter-email">อีเมล</label>
                            <div className="flex rounded-xl overflow-hidden ring-1 ring-white/10 focus-within:ring-white/30">
                                <input id="newsletter-email" type="email" className="w-full bg-white/10 text-white placeholder-white/60 px-3 py-2 text-sm focus:outline-none" placeholder="ใส่อีเมลของคุณ" required />
                                <button type="submit" className="bg-white text-[#0B1220] px-3 text-sm font-semibold hover:opacity-90">สมัคร</button>
                            </div>
                            <p className="text-xs text-white/60">อัปเดตประกาศใหม่และโปรโมชันพิเศษทุกสัปดาห์</p>
                        </form>
                    </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
                    <p>© {new Date().getFullYear()} Luxury Condos Co., Ltd. สงวนลิขสิทธิ์</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:underline">นโยบายความเป็นส่วนตัว</a>
                        <a href="#" className="hover:underline">ข้อกำหนดการใช้งาน</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};