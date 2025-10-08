import React from 'react';
import { AREAS } from '../constants.ts';
import { Icon } from './Icon.tsx';

export const PopularAreas: React.FC = () => {
    return (
        <section id="areas" className="py-12 md:py-16 border-t border-black/5 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl tracking-tight font-semibold text-[#111827]">ทำเลยอดฮิต</h2>
                        <p className="text-sm text-[#6B7280] mt-1">เลือกตามแนวรถไฟฟ้าและย่านไลฟ์สไตล์</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {AREAS.map(area => (
                        <a key={area.id} href="#" className="group rounded-xl border border-black/10 p-4 bg-white hover:border-[#1E3A8A]/30 hover:shadow transition">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-[#111827]">{area.name}</span>
                                <Icon name={area.type === 'BTS' ? 'train' : 'train-front-tunnel'} className="w-4 h-4 text-[#6B7280] group-hover:text-[#1E3A8A]" />
                            </div>
                            <p className="mt-1 text-xs text-[#6B7280]">เริ่มเช่า {area.startPrice}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};