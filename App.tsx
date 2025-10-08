import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { FeaturedProperties } from './components/FeaturedProperties.tsx';
import { PopularProjects } from './components/PopularProjects.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { CtaSection } from './components/CtaSection.tsx';
import { PopularAreas } from './components/PopularAreas.tsx';
import { BlogSection } from './components/BlogSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { Icon } from './components/Icon.tsx';
import { PropertyDetailPage } from './components/PropertyDetailPage.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import type { Language } from './types.ts';

declare global {
    interface Window {
        lucide: any;
    }
}

const App: React.FC = () => {
    const [lang, setLang] = useState<Language>('th');
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
    const [isAdminView, setIsAdminView] = useState<boolean>(() => window.location.hash === '#admin');

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang === 'en' ? 'en' : 'th';
    }, [lang]);

    useEffect(() => {
        const handleHashChange = () => {
            setIsAdminView(window.location.hash === '#admin');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleSelectProperty = (id: number) => {
        setSelectedPropertyId(id);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const handleBackToListings = () => {
        setSelectedPropertyId(null);
    };

    if (isAdminView) {
        return (
            <AdminDashboard
                onClose={() => {
                    window.location.hash = '';
                    setIsAdminView(false);
                }}
            />
        );
    }

    return (
        <>
            <div className="hidden md:flex items-center justify-center gap-3 bg-[#1E3A8A] text-white/90 text-sm py-2">
                <div className="flex items-center gap-2">
                    <Icon name="phone" className="w-4 h-4" />
                    <span className="font-medium">โทรเลย 02-XXX-XXXX</span>
                </div>
                <span className="opacity-60">|</span>
                <div className="flex items-center gap-2">
                    <Icon name="message-circle" className="w-4 h-4" />
                    <span className="font-medium">แชทไลน์</span>
                </div>
                <span className="opacity-60">|</span>
                <div className="flex items-center gap-2">
                    <Icon name="shield-check" className="w-4 h-4" />
                    <span className="font-medium">บริการมืออาชีพ อุ่นใจ 100%</span>
                </div>
            </div>

            <Header lang={lang} setLang={setLang} />
            
            {selectedPropertyId ? (
                <PropertyDetailPage propertyId={selectedPropertyId} onBack={handleBackToListings} />
            ) : (
                <main>
                    <Hero lang={lang} />
                    <FeaturedProperties onSelectProperty={handleSelectProperty} />
                    <PopularProjects />
                    <WhyChooseUs />
                    <CtaSection />
                    <PopularAreas />
                    <BlogSection />
                    <FaqSection />
                </main>
            )}

            <Footer />

            <a href="tel:02-000-0000" className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#DC2626] to-[#EF4444] px-4 py-2 text-white shadow-xl hover:shadow-2xl hover:scale-[1.03] transition z-50">
                <Icon name="phone-call" className="w-4 h-4" />
                โทรเลย
            </a>
        </>
    );
};

export default App;