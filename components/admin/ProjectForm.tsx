import React from 'react';
import type { ProjectFormState } from './types.ts';

interface ProjectFormProps {
    values: ProjectFormState;
    onFieldChange: <K extends keyof ProjectFormState>(field: K, value: ProjectFormState[K]) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isEditing: boolean;
    onCancelEdit: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ values, onFieldChange, onSubmit, isEditing, onCancelEdit }) => {
    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
                ชื่อโครงการ
                <input
                    type="text"
                    value={values.name}
                    onChange={(event) => onFieldChange('name', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    required
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                ผู้พัฒนา
                <input
                    type="text"
                    value={values.developer}
                    onChange={(event) => onFieldChange('developer', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    required
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                ปีที่สร้าง
                <input
                    type="number"
                    value={values.year}
                    onChange={(event) => onFieldChange('year', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    min={1900}
                    max={2100}
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                สถานี/ทำเล
                <input
                    type="text"
                    value={values.station}
                    onChange={(event) => onFieldChange('station', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                เวลาเดิน (นาที)
                <input
                    type="number"
                    value={values.walkTime}
                    onChange={(event) => onFieldChange('walkTime', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    min={0}
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                จำนวนชั้น
                <input
                    type="number"
                    value={values.floors}
                    onChange={(event) => onFieldChange('floors', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                    min={0}
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                จำนวนยูนิตทั้งหมด
                <input
                    type="text"
                    value={values.units}
                    onChange={(event) => onFieldChange('units', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                ช่วงราคา (เช่า)
                <input
                    type="text"
                    value={values.priceRangeRent}
                    onChange={(event) => onFieldChange('priceRangeRent', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm">
                ช่วงราคา (ขาย)
                <input
                    type="text"
                    value={values.priceRangeSale}
                    onChange={(event) => onFieldChange('priceRangeSale', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm md:col-span-2">
                ลิงก์รูปภาพหลัก
                <input
                    type="url"
                    value={values.imageUrl}
                    onChange={(event) => onFieldChange('imageUrl', event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2"
                />
            </label>
            <div className="md:col-span-2 flex items-center gap-3">
                <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
                    {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มโครงการ'}
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
