import React from 'react';
import type { ProjectRecord } from './types.ts';

interface ProjectTableProps {
    projects: ProjectRecord[];
    isLoading: boolean;
    onEdit: (project: ProjectRecord) => void;
    onDelete: (projectId: string) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({ projects, isLoading, onEdit, onDelete }) => {
    if (isLoading) {
        return (
            <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500">
                กำลังโหลดข้อมูลโครงการ...
            </div>
        );
    }

    return (
        <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                        <th className="px-3 py-2">ชื่อโครงการ</th>
                        <th className="px-3 py-2">ผู้พัฒนา</th>
                        <th className="px-3 py-2">สถานี</th>
                        <th className="px-3 py-2">ชั้น</th>
                        <th className="px-3 py-2">ยูนิต</th>
                        <th className="px-3 py-2"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-50">
                            <td className="px-3 py-2 font-medium text-slate-900">{project.name}</td>
                            <td className="px-3 py-2">{project.developer}</td>
                            <td className="px-3 py-2">{project.station || '-'}</td>
                            <td className="px-3 py-2">{project.floors || '-'}</td>
                            <td className="px-3 py-2">{project.units || '-'}</td>
                            <td className="px-3 py-2 text-right text-sm">
                                <button
                                    type="button"
                                    onClick={() => onEdit(project)}
                                    className="mr-2 text-slate-600 hover:text-slate-900"
                                >
                                    แก้ไข
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDelete(project.id)}
                                    className="text-rose-600 hover:text-rose-800"
                                >
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                    {projects.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-3 py-6 text-center text-slate-500">
                                ยังไม่มีโครงการในระบบ
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
