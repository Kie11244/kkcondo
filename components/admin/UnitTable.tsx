import React from 'react';
import type { UnitStatus } from '../../types.ts';
import type { UnitRecord } from './types.ts';

interface UnitTableProps {
    units: UnitRecord[];
    isLoading: boolean;
    onEdit: (unit: UnitRecord) => void;
    onDelete: (unitId: string) => void;
    projectOptions: Array<{ value: string; label: string }>;
    filterProjectId: string;
    onFilterProjectIdChange: (projectId: string) => void;
    projectLookup: Record<string, string>;
    hasAnyUnit: boolean;
}

const statusLabels: Record<UnitStatus, string> = {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
};

export const UnitTable: React.FC<UnitTableProps> = ({
    units,
    isLoading,
    onEdit,
    onDelete,
    projectOptions,
    filterProjectId,
    onFilterProjectIdChange,
    projectLookup,
    hasAnyUnit,
}) => {
    const header = (
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold">ยูนิต</h2>
            <div className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:gap-3">
                <label className="flex items-center gap-2">
                    <span className="text-slate-600">กรองตามโครงการ:</span>
                    <select
                        value={filterProjectId}
                        onChange={(event) => onFilterProjectIdChange(event.target.value)}
                        className="rounded-md border border-slate-300 px-3 py-2"
                    >
                        <option value="">ทั้งหมด</option>
                        {projectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <>
                {header}
                <div className="rounded-lg border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500">
                    กำลังโหลดข้อมูลยูนิต...
                </div>
            </>
        );
    }

    if (units.length === 0) {
        return (
            <>
                {header}
                <div className="rounded-lg border border-dashed border-slate-200 bg-white/70 p-6 text-center text-sm text-slate-500">
                    {hasAnyUnit ? 'ไม่มียูนิตในโครงการนี้' : 'ยังไม่มียูนิตในระบบ'}
                </div>
            </>
        );
    }

    return (
        <>
            {header}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-3 py-2">ยูนิต</th>
                            <th className="px-3 py-2">โครงการ</th>
                            <th className="px-3 py-2">ขนาด</th>
                            <th className="px-3 py-2">ราคา</th>
                            <th className="px-3 py-2">สถานะ</th>
                            <th className="px-3 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {units.map((unit) => {
                            const projectName = projectLookup[unit.projectId] ?? '-';
                            return (
                                <tr key={unit.id} className="hover:bg-slate-50">
                                    <td className="px-3 py-2 font-medium text-slate-900">{unit.name}</td>
                                    <td className="px-3 py-2">{projectName}</td>
                                    <td className="px-3 py-2">{unit.size ? `${unit.size} ตร.ม.` : '-'}</td>
                                    <td className="px-3 py-2">
                                        {unit.price
                                            ? unit.price.toLocaleString('th-TH', {
                                                  style: 'currency',
                                                  currency: 'THB',
                                              })
                                            : '-'}
                                    </td>
                                    <td className="px-3 py-2 capitalize">{statusLabels[unit.status] ?? unit.status}</td>
                                    <td className="px-3 py-2 text-right text-sm">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(unit)}
                                            className="mr-2 text-slate-600 hover:text-slate-900"
                                        >
                                            แก้ไข
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(unit.id)}
                                            className="text-rose-600 hover:text-rose-800"
                                        >
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
