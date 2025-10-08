import React from 'react';
import { PROJECTS } from '../constants.ts';
import { ProjectCard } from './ProjectCard.tsx';
import { Icon } from './Icon.tsx';

export const PopularProjects: React.FC = () => {
    return (
        <section id="projects" className="py-12 md:py-16 border-t border-black/5 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl tracking-tight font-semibold text-[#111827]">โครงการยอดนิยม</h2>
                        <p className="text-sm text-[#6B7280] mt-1">ใกล้ BTS/MRT พร้อมสิ่งอำนวยความสะดวกครบ</p>
                    </div>
                    <a href="#" className="hidden md:inline-flex items-center gap-1.5 text-sm text-[#1E3A8A] hover:underline underline-offset-4">
                        ดูทั้งหมด
                        <Icon name="arrow-right" className="w-4 h-4" />
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map(project => <ProjectCard key={project.id} project={project} />)}
                </div>
            </div>
        </section>
    );
};