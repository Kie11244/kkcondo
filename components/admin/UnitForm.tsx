import React from 'react';
import type { UnitStatus } from '../../types.ts';
import type { UnitFormState } from './types.ts';

interface Option {
    value: string;
    label: string;
}

interface UnitFormProps {
    values: UnitFormState;
    onFieldChange: <K extends keyof UnitFormState>(field: K, value: UnitFormState[K]) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isEditing: boolean;
    onCancelEdit: () => void;
    projectOptions: Option[];
}

const statusLabels: Record<UnitStatus, string> = {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
};

export const UnitForm: React.FC<UnitFormProps> = ({
    values,
    onFieldChange,
    onSubmit,
    isEditing,
    onCancelEdit,
    projectOptions,
}) => {
    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
                โครงการ
                <select
                    value={values.projectId}
                    onChange={(event) => onFieldChange('projectId', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    required
                >
                    <option value="" disabled>
                        เลือกโครงการ
                    </option>
                    {projectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
                ชื่อยูนิต / เลขห้อง
                <input
                    type="text"
                    value={values.name}
                    onChange={(event) => onFieldChange('name', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    required
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                ห้องนอน
                <input
                    type="number"
                    value={values.bedrooms}
                    onChange={(event) => onFieldChange('bedrooms', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    min={0}
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                ห้องน้ำ
                <input
                    type="number"
                    value={values.bathrooms}
                    onChange={(event) => onFieldChange('bathrooms', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    min={0}
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                พื้นที่ใช้สอย (ตร.ม.)
                <input
                    type="number"
                    value={values.size}
                    onChange={(event) => onFieldChange('size', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    min={0}
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                ราคา (บาท)
                <input
                    type="number"
                    value={values.price}
                    onChange={(event) => onFieldChange('price', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    min={0}
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                สถานะ
                <select
                    value={values.status}
                    onChange={(event) => onFieldChange('status', event.target.value as UnitStatus)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                >
                    {(Object.keys(statusLabels) as UnitStatus[]).map((status) => (
                        <option key={status} value={status}>
                            {statusLabels[status]}
                        </option>
                    ))}
                </select>
            </label>
            <div className="md:col-span-2 flex items-center gap-3">
                <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
                    {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มยูนิต'}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="text-sm text-slate-500 hover:text-slate-700"
                    >
                        ยกเลิกการแก้ไข
                    </button>
                )}
            </div>
        </form>
    );
};
