import React from 'react';
import { TESTIMONIALS } from '../constants.ts';
import { Icon } from './Icon.tsx';

const features = [
    { icon: 'shield-check', title: 'โปร่งใส ไว้ใจได้', description: 'ข้อมูลจริง อัปเดตเสมอ ไม่มีค่าธรรมเนียมแอบแฝง' },
    { icon: 'building-2', title: 'ทำเลเด่น สิ่งอำนวยความสะดวกครบ', description: 'คัดสรรโครงการคุณภาพ ใกล้ BTS/MRT' },
    { icon: 'phone-call', title: 'ตอบเร็ว ดูห้องฟรี', description: 'เจ้าหน้าที่พร้อมช่วยเหลือทุกขั้นตอน' },
    { icon: 'badge-check', title: 'ตัวจริงเรื่องคอนโด', description: 'ประสบการณ์กว่า 10 ปี ย่านใจกลางเมือง' },
];

export const WhyChooseUs: React.FC = () => {
    return (
        <section className="py-12 md:py-16 border-t border-black/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl tracking-tight font-semibold text-[#111827]">ทำไมลูกค้าเลือกเรา</h2>
                    <p className="mt-2 text-sm text-[#6B7280]">บริการครบวงจร ดูห้องฟรี ให้คำปรึกษาแบบมืออาชีพ</p>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="rounded-2xl border border-black/10 bg-white p-6 hover:shadow-lg transition">
                            <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] grid place-items-center mb-3">
                                <Icon name={feature.icon} className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-[#111827] tracking-tight">{feature.title}</h3>
                            <p className="text-sm text-[#6B7280] mt-1">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map(testimonial => (
                        <div key={testimonial.id} className="rounded-2xl border border-black/10 bg-white p-6">
                            <div className="flex items-center gap-3">
                                <img src={testimonial.imageUrl} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="text-sm font-medium text-[#111827]">{testimonial.name}</p>
                                    <p className="text-xs text-[#6B7280]">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-[#111827]/80">{testimonial.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};