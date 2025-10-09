import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where,
    writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase.ts';
import type { UnitStatus } from '../types.ts';
import { ProjectForm } from './admin/ProjectForm.tsx';
import { ProjectTable } from './admin/ProjectTable.tsx';
import { UnitForm } from './admin/UnitForm.tsx';
import { UnitTable } from './admin/UnitTable.tsx';
import type { ProjectFormState, ProjectRecord, UnitFormState, UnitRecord } from './admin/types.ts';

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
    const [units, setUnits] = useState<UnitRecord[]>([]);
    const [projectsLoading, setProjectsLoading] = useState<boolean>(true);
    const [unitsLoading, setUnitsLoading] = useState<boolean>(true);
    const [projectForm, setProjectForm] = useState<ProjectFormState>(emptyProjectForm);
    const [unitForm, setUnitForm] = useState<UnitFormState>(emptyUnitForm);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
    const [unitFilterProjectId, setUnitFilterProjectId] = useState<string>('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const projectQuery = query(collection(db, 'projects'), orderBy('name'));
        const unsubscribeProjects = onSnapshot(
            projectQuery,
            (snapshot) => {
                const projectItems: ProjectRecord[] = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...(docSnap.data() as Omit<ProjectRecord, 'id'>),
                }));
                setProjects(projectItems);
                setProjectsLoading(false);
            },
            (snapshotError) => {
                console.error(snapshotError);
                setProjectsLoading(false);
                setError('ไม่สามารถโหลดข้อมูลโครงการได้');
            },
        );

        const unitQuery = query(collection(db, 'units'), orderBy('name'));
        const unsubscribeUnits = onSnapshot(
            unitQuery,
            (snapshot) => {
                const unitItems: UnitRecord[] = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...(docSnap.data() as Omit<UnitRecord, 'id'>),
                }));
                setUnits(unitItems);
                setUnitsLoading(false);
            },
            (snapshotError) => {
                console.error(snapshotError);
                setUnitsLoading(false);
                setError('ไม่สามารถโหลดข้อมูลยูนิตได้');
            },
        );

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

    const handleProjectFieldChange = useCallback(
        <K extends keyof ProjectFormState>(field: K, value: ProjectFormState[K]) => {
            setProjectForm((prev) => ({ ...prev, [field]: value }));
        },
        [],
    );

    const handleUnitFieldChange = useCallback(
        <K extends keyof UnitFormState>(field: K, value: UnitFormState[K]) => {
            setUnitForm((prev) => ({ ...prev, [field]: value }));
        },
        [],
    );

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
            } satisfies Omit<ProjectRecord, 'id'>;

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

            const payload: Omit<UnitRecord, 'id'> = {
                projectId: unitForm.projectId,
                name: unitForm.name.trim(),
                bedrooms: Number(unitForm.bedrooms) || 0,
                bathrooms: Number(unitForm.bathrooms) || 0,
                size: Number(unitForm.size) || 0,
                price: Number(unitForm.price) || 0,
                status: unitForm.status as UnitStatus,
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

    const handleEditUnit = (unit: UnitRecord) => {
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
        if (!window.confirm('ยืนยันการลบโครงการนี้พร้อมยูนิตที่เกี่ยวข้องหรือไม่?')) {
            return;
        }
        try {
            const batch = writeBatch(db);
            batch.delete(doc(db, 'projects', projectId));

            const relatedUnits = await getDocs(query(collection(db, 'units'), where('projectId', '==', projectId)));
            relatedUnits.forEach((unitDoc) => batch.delete(unitDoc.ref));

            await batch.commit();
            setFeedback('ลบโครงการและยูนิตที่เกี่ยวข้องเรียบร้อยแล้ว');
            if (unitFilterProjectId === projectId) {
                setUnitFilterProjectId('');
            }
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
        () => projects.map((project) => ({ value: project.id, label: project.name })),
        [projects],
    );

    const projectLookup = useMemo(() => {
        return projects.reduce<Record<string, string>>((acc, project) => {
            acc[project.id] = project.name;
            return acc;
        }, {});
    }, [projects]);

    const filteredUnits = useMemo(() => {
        if (!unitFilterProjectId) {
            return units;
        }
        return units.filter((unit) => unit.projectId === unitFilterProjectId);
    }, [units, unitFilterProjectId]);

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
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">โครงการ</h2>
                            <p className="text-sm text-slate-500">บันทึกข้อมูลรายละเอียดของแต่ละโครงการ</p>
                        </div>
                        {editingProjectId && (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                กำลังแก้ไขโครงการ
                            </span>
                        )}
                    </div>

                    <ProjectForm
                        values={projectForm}
                        onFieldChange={handleProjectFieldChange}
                        onSubmit={handleProjectSubmit}
                        isEditing={Boolean(editingProjectId)}
                        onCancelEdit={() => {
                            setProjectForm(emptyProjectForm);
                            setEditingProjectId(null);
                        }}
                    />

                    <ProjectTable
                        projects={projects}
                        isLoading={projectsLoading}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                    />
                </section>

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                    {editingUnitId && (
                        <div className="mb-2">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">กำลังแก้ไขยูนิต</span>
                        </div>
                    )}
                    <UnitForm
                        values={unitForm}
                        onFieldChange={handleUnitFieldChange}
                        onSubmit={handleUnitSubmit}
                        isEditing={Boolean(editingUnitId)}
                        onCancelEdit={() => {
                            setUnitForm(emptyUnitForm);
                            setEditingUnitId(null);
                        }}
                        projectOptions={projectOptions}
                    />

                    <UnitTable
                        units={filteredUnits}
                        isLoading={unitsLoading}
                        onEdit={handleEditUnit}
                        onDelete={handleDeleteUnit}
                        projectOptions={projectOptions}
                        filterProjectId={unitFilterProjectId}
                        onFilterProjectIdChange={setUnitFilterProjectId}
                        projectLookup={projectLookup}
                        hasAnyUnit={units.length > 0}
                    />
                </section>
            </main>
        </div>
    );
};
