import React, { useEffect, useRef } from 'react';
import { FAQ_ITEMS } from '../constants.ts';
import { Icon } from './Icon.tsx';

export const FaqSection: React.FC = () => {
    const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

    useEffect(() => {
        const handleToggle = (event: Event) => {
            const target = event.currentTarget as HTMLDetailsElement;
            if (target.open) {
                detailsRefs.current.forEach(details => {
                    if (details && details !== target) {
                        details.open = false;
                    }
                });
            }
        };

        const refs = detailsRefs.current;
        refs.forEach(details => {
            if (details) {
                details.addEventListener('toggle', handleToggle);
            }
        });

        return () => {
            refs.forEach(details => {
                if (details) {
                    details.removeEventListener('toggle', handleToggle);
                }
            });
        };
    }, []);

    return (
        <section className="py-12 md:py-16 border-t border-black/5 bg-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl tracking-tight font-semibold text-[#111827] text-center">คำถามที่พบบ่อย</h2>
                <div className="mt-6 space-y-3">
                    {FAQ_ITEMS.map((item, index) => (
                        <details key={item.id} ref={el => detailsRefs.current[index] = el} className="group rounded-xl border border-black/10 p-4 bg-white open:shadow">
                            <summary className="flex cursor-pointer list-none items-center justify-between">
                                <span className="font-medium text-[#111827]">{item.question}</span>
                                <Icon name="chevron-down" className="w-5 h-5 text-[#6B7280] transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-2 text-sm text-[#6B7280]">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};