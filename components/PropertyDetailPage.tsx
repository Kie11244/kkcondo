import React, { useState, useEffect, useCallback } from 'react';
import { PROPERTIES } from '../constants.ts';
import { Icon } from './Icon.tsx';

interface PropertyDetailPageProps {
    propertyId: number;
    onBack: () => void;
}

const ContactForm: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        form.reset();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    }, []);

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 shadow-lg p-5 md:p-6 mt-6">
            <h3 className="font-semibold text-lg text-[#111827]">นัดดูห้อง / สอบถาม</h3>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                    <label className="block text-sm text-[#6B7280] mb-1">ชื่อ</label>
                    <input required type="text" name="name" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" placeholder="ชื่อ-นามสกุล" />
                </div>
                <div>
                    <label className="block text-sm text-[#6B7280] mb-1">เบอร์โทร</label>
                    <input required type="tel" name="phone" pattern="[0-9+ -]{8,}" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" placeholder="08X-XXX-XXXX" />
                </div>
                <div>
                    <label className="block text-sm text-[#6B7280] mb-1">หมายเหตุ (ถ้ามี)</label>
                    <textarea name="note" rows={2} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30" placeholder="เช่น สนใจเข้าชมวันเสาร์-อาทิตย์"></textarea>
                </div>
            </div>
            <button type="submit" className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#EF4444] px-5 py-3 text-white shadow-lg hover:shadow-xl transition">
                <Icon name="calendar" className="w-5 h-5" />
                ส่งข้อความ
            </button>
            <p className={`mt-3 text-center text-xs text-green-600 transition-opacity ${submitted ? 'opacity-100' : 'opacity-0'}`}>ขอบคุณครับ ทีมงานจะติดต่อกลับโดยเร็วที่สุด</p>
        </form>
    )
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ propertyId, onBack }) => {
    const property = PROPERTIES.find(p => p.id === propertyId);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [propertyId]);

    if (!property) {
        return (
            <div className="text-center py-20">
                <p>Property not found.</p>
                <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">Back to listings</button>
            </div>
        );
    }
    
    const isRent = property.type === 'rent';
    const typeBg = isRent ? 'bg-[#1E3A8A]' : 'bg-[#DC2626]';

    return (
        <main className="py-8 md:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-[#1E3A8A] hover:underline underline-offset-4 mb-6">
                    <Icon name="arrow-left" className="w-4 h-4" />
                    กลับไปหน้ารายการ
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                    {/* Left Column: Images & Details */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div>
                            <div className="aspect-video overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                                <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index} className={`aspect-video overflow-hidden rounded-lg cursor-pointer border-2 ${index === 0 ? 'border-blue-500' : 'border-transparent hover:border-blue-300'}`}>
                                        <img src={property.imageUrl.replace('?q=80', `?q=80&random=${index}`)} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="mt-8">
                           <div className="flex items-start justify-between">
                               <div>
                                    <div className="flex items-center gap-2">
                                        {property.tags.map((tag, index) => (
                                            <span key={index} className={`rounded-full text-white text-xs px-2.5 py-1 shadow ${index === 0 ? typeBg : 'bg-gray-500'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-semibold text-[#111827] mt-2">{property.title}</h1>
                                    <p className="text-md text-[#6B7280] mt-1 flex items-center gap-1.5">
                                        <Icon name="map-pin" className="w-4 h-4" /> {property.location} • {property.walkTime} นาที
                                    </p>
                               </div>
                               <div className="text-right flex-shrink-0 ml-4">
                                   <div className="text-[#DC2626] text-3xl font-bold">{property.price}</div>
                                   <div className="text-sm text-[#6B7280]">{isRent ? 'บาท/เดือน' : 'บาท'}</div>
                               </div>
                           </div>
                           <div className="mt-6 border-t border-black/10 pt-6">
                               <h2 className="text-lg font-semibold">รายละเอียด</h2>
                               <p className="mt-2 text-[#374151] leading-relaxed">{property.description}</p>
                           </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <aside className="lg:col-span-1">
                        <div className="lg:sticky top-24">
                           <ContactForm />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};
