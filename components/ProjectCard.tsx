import React from 'react';
import type { Project } from '../types.ts';
import { Icon } from './Icon.tsx';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <article className="overflow-hidden rounded-2xl border border-black/5 shadow hover:shadow-xl transition-all bg-white">
            <div className="relative aspect-[16/9]">
                <img src={project.imageUrl} alt={project.name} className="h-full w-full object-cover" />
                <div className="absolute top-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-xs text-[#111827] shadow">{project.developer} • {project.year}</div>
                <div className="absolute bottom-3 right-3 rounded-md bg-white/95 px-2.5 py-1 text-xs text-[#6B7280] shadow flex items-center gap-1.5">
                    <Icon name="train" className="w-3.5 h-3.5" /> {project.station} • {project.walkTime} นาที
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-xl tracking-tight font-semibold text-[#111827]">{project.name}</h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-[#6B7280]">
                    <span className="inline-flex items-center gap-1.5"><Icon name="layers" className="w-4 h-4" />{project.floors} ชั้น</span>
                    <span className="inline-flex items-center gap-1.5"><Icon name="users" className="w-4 h-4" />{project.units}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-[#111827]/80">เช่า {project.priceRangeRent} • ซื้อ {project.priceRangeSale}</div>
                    <div className="flex items-center gap-2">
                        <a href="#" className="px-3 py-1.5 rounded-lg border border-[#1E3A8A]/30 text-[#1E3A8A] text-sm hover:bg-[#1E3A8A] hover:text-white transition">เช่า</a>
                        <a href="#" className="px-3 py-1.5 rounded-lg border border-black/10 text-sm hover:border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">ซื้อ</a>
                    </div>
                </div>
            </div>
        </article>
    );
};