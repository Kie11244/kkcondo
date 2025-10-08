import React, { useState, useCallback, useEffect } from 'react';
import { PROPERTIES } from '../constants.ts';
import { PropertyCard } from './PropertyCard.tsx';
import { Icon } from './Icon.tsx';

type ViewState = 'idle' | 'loading' | 'error';

interface FeaturedPropertiesProps {
    onSelectProperty: (id: number) => void;
}

const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-2xl shadow border border-black/5 overflow-hidden">
        <div className="aspect-[4/3] bg-gray-200"></div>
        <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
    </div>
);

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ onSelectProperty }) => {
    const [viewState, setViewState] = useState<ViewState>('idle');

    useEffect(() => {
        if (viewState !== 'idle') {
            document.getElementById('state-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [viewState]);

    const handleRetry = useCallback(() => {
        setViewState('loading');
        setTimeout(() => {
            setViewState('idle');
        }, 1500);
    }, []);
    
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [viewState]);

    const renderContent = () => {
        switch (viewState) {
            case 'loading':
                return Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />);
            case 'error':
                return (
                    <div className="sm:col-span-2 lg:col-span-4 text-center py-8 bg-white/50 rounded-2xl border border-red-200">
                        <p className="text-red-600 mb-4">ไม่สามารถโหลดข้อมูลได้</p>
                        <button onClick={handleRetry} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] px-5 py-2.5 text-white shadow hover:shadow-md">
                           <Icon name="rotate-ccw" className="w-4 h-4"/>
                            ลองใหม่
                        </button>
                    </div>
                );
            case 'idle':
            default:
                return PROPERTIES.map(prop => <PropertyCard key={prop.id} property={prop} onSelect={onSelectProperty} />);
        }
    };
    
    return (
        <section id="featured" className="py-12 md:py-16 border-t border-black/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl tracking-tight font-semibold text-[#111827]">ประกาศแนะนำ</h2>
                        <p className="text-sm text-[#6B7280] mt-1">คัดสรรทั้งเช่าและซื้อ ราคาดี ทำเลเยี่ยม</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <button className="px-3 py-2 rounded-lg border border-black/10 text-sm hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">เช่าทั้งหมด</button>
                        <button className="px-3 py-2 rounded-lg border border-black/10 text-sm hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">ซื้อทั้งหมด</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   {viewState === 'idle' && renderContent()}
                </div>

                <div id="state-container" className={`mt-6 ${viewState === 'idle' ? 'hidden' : ''}`}>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {viewState !== 'idle' && renderContent()}
                   </div>
                </div>


                <div className="mt-8 flex items-center gap-3">
                    <button onClick={() => { setViewState('loading'); setTimeout(() => setViewState('idle'), 2000); }} className="px-4 py-2 rounded-lg border border-black/10 text-sm hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">แสดงสถานะโหลด</button>
                    <button onClick={() => setViewState('error')} className="px-4 py-2 rounded-lg border border-black/10 text-sm hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">แสดงข้อผิดพลาด</button>
                </div>
            </div>
        </section>
    );
};