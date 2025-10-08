import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase.ts';
import type { Unit, UnitStatus } from '../types.ts';

interface ProjectRecord {
    id: string;
    name: string;
    developer: string;
    year: number;
    station: string;
    walkTime: number;
    floors: number;
    units: string;
    priceRangeRent: string;
    priceRangeSale: string;
    imageUrl: string;
}

interface ProjectFormState {
    name: string;
    developer: string;
    year: string;
    station: string;
    walkTime: string;
    floors: string;
    units: string;
    priceRangeRent: string;
    priceRangeSale: string;
    imageUrl: string;
}

interface UnitFormState {
    projectId: string;
    name: string;
    bedrooms: string;
    bathrooms: string;
    size: string;
    price: string;
    status: UnitStatus;
}

interface AdminDashboardProps {
    onClose?: () => void;
}

const emptyProjectForm: ProjectFormState = {
    name: '',
    developer: '',
    year: '',
    station: '',
    walkTime: '',
    floors: '',
    units: '',
    priceRangeRent: '',
    priceRangeSale: '',
    imageUrl: '',
};

const emptyUnitForm: UnitFormState = {
    projectId: '',
    name: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    price: '',
    status: 'available',
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
    const [projects, setProjects] = useState<ProjectRecord[]>([]);
    const [units, setUnits] = useState<(Unit & { id: string })[]>([]);
    const [projectForm, setProjectForm] = useState<ProjectFormState>(emptyProjectForm);
    const [unitForm, setUnitForm] = useState<UnitFormState>(emptyUnitForm);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const projectQuery = query(collection(db, 'projects'), orderBy('name'));
        const unsubscribeProjects = onSnapshot(projectQuery, (snapshot) => {
            const projectItems: ProjectRecord[] = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...(docSnap.data() as Omit<ProjectRecord, 'id'>),
            }));
            setProjects(projectItems);
        });

        const unitQuery = query(collection(db, 'units'), orderBy('name'));
        const unsubscribeUnits = onSnapshot(unitQuery, (snapshot) => {
            const unitItems = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...(docSnap.data() as Unit),
            }));
            setUnits(unitItems);
        });

        return () => {
            unsubscribeProjects();
            unsubscribeUnits();
        };
    }, []);

    useEffect(() => {
        if (!feedback && !error) {
            return;
        }
        const timeout = setTimeout(() => {
            setFeedback(null);
            setError(null);
        }, 4000);
        return () => clearTimeout(timeout);
    }, [feedback, error]);

    const handleProjectSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setFeedback(null);
            setError(null);

            if (!projectForm.name.trim() || !projectForm.developer.trim()) {
                setError('กรุณากรอกชื่อโครงการและชื่อผู้พัฒนา');
                return;
            }

            const payload = {
                name: projectForm.name.trim(),
                developer: projectForm.developer.trim(),
                year: Number(projectForm.year) || 0,
                station: projectForm.station.trim(),
                walkTime: Number(projectForm.walkTime) || 0,
                floors: Number(projectForm.floors) || 0,
                units: projectForm.units.trim(),
                priceRangeRent: projectForm.priceRangeRent.trim(),
                priceRangeSale: projectForm.priceRangeSale.trim(),
                imageUrl: projectForm.imageUrl.trim(),
            };

            try {
                if (editingProjectId) {
                    await updateDoc(doc(db, 'projects', editingProjectId), payload);
                    setFeedback('อัปเดตข้อมูลโครงการเรียบร้อยแล้ว');
                } else {
                    await addDoc(collection(db, 'projects'), payload);
                    setFeedback('สร้างโครงการใหม่เรียบร้อยแล้ว');
                }
                setProjectForm(emptyProjectForm);
                setEditingProjectId(null);
            } catch (err) {
                setError('ไม่สามารถบันทึกข้อมูลโครงการได้ กรุณาลองใหม่อีกครั้ง');
                console.error(err);
            }
        },
        [projectForm, editingProjectId],
    );

    const handleUnitSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setFeedback(null);
            setError(null);

            if (!unitForm.projectId) {
                setError('กรุณาเลือกโครงการสำหรับยูนิต');
                return;
            }
            if (!unitForm.name.trim()) {
                setError('กรุณากรอกชื่อยูนิต');
                return;
            }

            const payload: Omit<Unit, 'id'> = {
                projectId: unitForm.projectId,
                name: unitForm.name.trim(),
                bedrooms: Number(unitForm.bedrooms) || 0,
                bathrooms: Number(unitForm.bathrooms) || 0,
                size: Number(unitForm.size) || 0,
                price: Number(unitForm.price) || 0,
                status: unitForm.status,
            };

            try {
                if (editingUnitId) {
                    await updateDoc(doc(db, 'units', editingUnitId), payload);
                    setFeedback('อัปเดตข้อมูลยูนิตเรียบร้อยแล้ว');
                } else {
                    await addDoc(collection(db, 'units'), payload);
                    setFeedback('สร้างยูนิตใหม่เรียบร้อยแล้ว');
                }
                setUnitForm(emptyUnitForm);
                setEditingUnitId(null);
            } catch (err) {
                setError('ไม่สามารถบันทึกข้อมูลยูนิตได้ กรุณาลองใหม่อีกครั้ง');
                console.error(err);
            }
        },
        [unitForm, editingUnitId],
    );

    const handleEditProject = (project: ProjectRecord) => {
        setProjectForm({
            name: project.name,
            developer: project.developer,
            year: String(project.year || ''),
            station: project.station,
            walkTime: String(project.walkTime || ''),
            floors: String(project.floors || ''),
            units: project.units,
            priceRangeRent: project.priceRangeRent,
            priceRangeSale: project.priceRangeSale,
            imageUrl: project.imageUrl,
        });
        setEditingProjectId(project.id);
    };

    const handleEditUnit = (unit: Unit & { id: string }) => {
        setUnitForm({
            projectId: unit.projectId,
            name: unit.name,
            bedrooms: String(unit.bedrooms || ''),
            bathrooms: String(unit.bathrooms || ''),
            size: String(unit.size || ''),
            price: String(unit.price || ''),
            status: unit.status,
        });
        setEditingUnitId(unit.id);
    };

    const handleDeleteProject = async (projectId: string) => {
        if (!window.confirm('ยืนยันการลบโครงการนี้หรือไม่?')) {
            return;
        }
        try {
            await deleteDoc(doc(db, 'projects', projectId));
            setFeedback('ลบโครงการเรียบร้อยแล้ว');
        } catch (err) {
            setError('ไม่สามารถลบโครงการได้ กรุณาลองใหม่อีกครั้ง');
            console.error(err);
        }
    };

    const handleDeleteUnit = async (unitId: string) => {
        if (!window.confirm('ยืนยันการลบยูนิตนี้หรือไม่?')) {
            return;
        }
        try {
            await deleteDoc(doc(db, 'units', unitId));
            setFeedback('ลบยูนิตเรียบร้อยแล้ว');
        } catch (err) {
            setError('ไม่สามารถลบยูนิตได้ กรุณาลองใหม่อีกครั้ง');
            console.error(err);
        }
    };

    const projectOptions = useMemo(
        () =>
            projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
            )),
        [projects],
    );

    const getProjectName = useCallback(
        (projectId: string) => projects.find((project) => project.id === projectId)?.name || '-',
        [projects],
    );

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">ระบบจัดการโครงการและยูนิต</h1>
                    <p className="text-sm text-white/70">เพิ่ม แก้ไข และจัดการข้อมูลสำหรับทีมหลังบ้าน</p>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
                    >
                        กลับหน้าเว็บไซต์
                    </button>
                )}
            </header>

            <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">
                {(feedback || error) && (
                    <div
                        className={`rounded-lg px-4 py-3 text-sm ${error ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}
                    >
                        {error || feedback}
                    </div>
                )}

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">โครงการ</h2>
                        {editingProjectId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setProjectForm(emptyProjectForm);
                                    setEditingProjectId(null);
                                }}
                                className="text-sm text-slate-500 hover:text-slate-700"
                            >
                                ยกเลิกการแก้ไข
                            </button>
                        )}
                    </div>
                    <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-1 text-sm">
                            ชื่อโครงการ
                            <input
                                type="text"
                                value={projectForm.name}
                                onChange={(event) => setProjectForm((prev) => ({ ...prev, name: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            ผู้พัฒนา
                            <input
                                type="text"
                                value={projectForm.developer}
                                onChange={(event) =>
                                    setProjectForm((prev) => ({ ...prev, developer: event.target.value }))
                                }
                                className="rounded-md border border-slate-300 px-3 py-2"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            ปีที่สร้าง
                            <input
                                type="number"
                                value={projectForm.year}
                                onChange={(event) => setProjectForm((prev) => ({ ...prev, year: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                min={1900}
                                max={2100}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            สถานี/ทำเล
                            <input
                                type="text"
                                value={projectForm.station}
                                onChange={(event) => setProjectForm((prev) => ({ ...prev, station: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            เวลาเดิน (นาที)
                            <input
                                type="number"
                                value={projectForm.walkTime}
                                onChange={(event) => setProjectForm((prev) => ({ ...prev, walkTime: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                min={0}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            จำนวนชั้น
                            <input
                                type="number"
                                value={projectForm.floors}
                                onChange={(event) => setProjectForm((prev) => ({ ...prev, floors: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                min={0}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            จำนวนยูนิตทั้งหมด
                            <input
                                type="text"
                                value={projectForm.units}
                                onChange={(event) => setProjectForm((prev) => ({ ...prev, units: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            ช่วงราคา (เช่า)
                            <input
                                type="text"
                                value={projectForm.priceRangeRent}
                                onChange={(event) =>
                                    setProjectForm((prev) => ({ ...prev, priceRangeRent: event.target.value }))
                                }
                                className="rounded-md border border-slate-300 px-3 py-2"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            ช่วงราคา (ขาย)
                            <input
                                type="text"
                                value={projectForm.priceRangeSale}
                                onChange={(event) =>
                                    setProjectForm((prev) => ({ ...prev, priceRangeSale: event.target.value }))
                                }
                                className="rounded-md border border-slate-300 px-3 py-2"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm md:col-span-2">
                            ลิงก์รูปภาพหลัก
                            <input
                                type="url"
                                value={projectForm.imageUrl}
                                onChange={(event) => setProjectForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                            />
                        </label>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                            >
                                {editingProjectId ? 'บันทึกการแก้ไข' : 'เพิ่มโครงการ'}
                            </button>
                        </div>
                    </form>

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
                                                onClick={() => handleEditProject(project)}
                                                className="mr-2 text-slate-600 hover:text-slate-900"
                                            >
                                                แก้ไข
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteProject(project.id)}
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
                </section>

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">ยูนิต</h2>
                        {editingUnitId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setUnitForm(emptyUnitForm);
                                    setEditingUnitId(null);
                                }}
                                className="text-sm text-slate-500 hover:text-slate-700"
                            >
                                ยกเลิกการแก้ไข
                            </button>
                        )}
                    </div>
                    <form onSubmit={handleUnitSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="flex flex-col gap-1 text-sm">
                            โครงการ
                            <select
                                value={unitForm.projectId}
                                onChange={(event) => setUnitForm((prev) => ({ ...prev, projectId: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                required
                            >
                                <option value="" disabled>
                                    เลือกโครงการ
                                </option>
                                {projectOptions}
                            </select>
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            ชื่อยูนิต / เลขห้อง
                            <input
                                type="text"
                                value={unitForm.name}
                                onChange={(event) => setUnitForm((prev) => ({ ...prev, name: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            ห้องนอน
                            <input
                                type="number"
                                value={unitForm.bedrooms}
                                onChange={(event) => setUnitForm((prev) => ({ ...prev, bedrooms: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                min={0}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            ห้องน้ำ
                            <input
                                type="number"
                                value={unitForm.bathrooms}
                                onChange={(event) => setUnitForm((prev) => ({ ...prev, bathrooms: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                min={0}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            พื้นที่ใช้สอย (ตร.ม.)
                            <input
                                type="number"
                                value={unitForm.size}
                                onChange={(event) => setUnitForm((prev) => ({ ...prev, size: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                min={0}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            ราคา (บาท)
                            <input
                                type="number"
                                value={unitForm.price}
                                onChange={(event) => setUnitForm((prev) => ({ ...prev, price: event.target.value }))}
                                className="rounded-md border border-slate-300 px-3 py-2"
                                min={0}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            สถานะ
                            <select
                                value={unitForm.status}
                                onChange={(event) =>
                                    setUnitForm((prev) => ({ ...prev, status: event.target.value as UnitStatus }))
                                }
                                className="rounded-md border border-slate-300 px-3 py-2"
                            >
                                <option value="available">Available</option>
                                <option value="reserved">Reserved</option>
                                <option value="sold">Sold</option>
                            </select>
                        </label>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                            >
                                {editingUnitId ? 'บันทึกการแก้ไข' : 'เพิ่มยูนิต'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 overflow-x-auto">
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
                                {units.map((unit) => (
                                    <tr key={unit.id} className="hover:bg-slate-50">
                                        <td className="px-3 py-2 font-medium text-slate-900">{unit.name}</td>
                                        <td className="px-3 py-2">{getProjectName(unit.projectId)}</td>
                                        <td className="px-3 py-2">{unit.size ? `${unit.size} ตร.ม.` : '-'}</td>
                                        <td className="px-3 py-2">
                                            {unit.price ? unit.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' }) : '-'}
                                        </td>
                                        <td className="px-3 py-2 capitalize">{unit.status}</td>
                                        <td className="px-3 py-2 text-right text-sm">
                                            <button
                                                type="button"
                                                onClick={() => handleEditUnit(unit)}
                                                className="mr-2 text-slate-600 hover:text-slate-900"
                                            >
                                                แก้ไข
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteUnit(unit.id!)}
                                                className="text-rose-600 hover:text-rose-800"
                                            >
                                                ลบ
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {units.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-3 py-6 text-center text-slate-500">
                                            ยังไม่มียูนิตในระบบ
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};
