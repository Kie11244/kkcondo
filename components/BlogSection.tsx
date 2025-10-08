import React from 'react';
import { BLOG_POSTS } from '../constants.ts';
import { Icon } from './Icon.tsx';

export const BlogSection: React.FC = () => {
    return (
        <section id="blog" className="py-12 md:py-16 border-t border-black/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl tracking-tight font-semibold text-[#111827]">บทความและคู่มือ</h2>
                        <p className="text-sm text-[#6B7280] mt-1">อัปเดตเทรนด์คอนโด การลงทุน และทิปส์การเช่า</p>
                    </div>
                    <a href="#" className="hidden md:inline-flex items-center gap-1.5 text-sm text-[#1E3A8A] hover:underline underline-offset-4">
                        อ่านทั้งหมด <Icon name="arrow-right" className="w-4 h-4" />
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BLOG_POSTS.map(post => (
                        <article key={post.id} className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow hover:shadow-xl transition">
                            <img src={post.imageUrl} alt={post.title} className="h-44 w-full object-cover" />
                            <div className="p-5">
                                <span className="inline-flex items-center gap-1 text-xs text-[#6B7280]"><Icon name="calendar" className="w-3.5 h-3.5" /> {post.date}</span>
                                <h3 className="mt-2 text-lg font-semibold text-[#111827] tracking-tight">{post.title}</h3>
                                <p className="mt-1 text-sm text-[#6B7280]">{post.excerpt}</p>
                                <a href="#" className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#1E3A8A] hover:underline">อ่านต่อ <Icon name="arrow-right" className="w-4 h-4" /></a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};