import React from 'react';
import type { Property } from '../types.ts';
import { Icon } from './Icon.tsx';

interface PropertyCardProps {
    property: Property;
    onSelect: (id: number) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
    const isRent = property.type === 'rent';
    const typeBg = isRent ? 'bg-[#1E3A8A]' : 'bg-[#DC2626]';
    
    return (
        <article className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-200 transition-all overflow-hidden flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    {property.tags.map((tag, index) => (
                         <span key={index} className={`rounded-full text-white text-xs px-2.5 py-1 shadow ${index === 0 ? typeBg : 'bg-white/90 text-[#111827]'}`}>
                            {tag}
                         </span>
                    ))}
                </div>
                <button className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-[#111827] hover:bg-white shadow focus-visible:outline-none">
                    <Icon name="heart" className="w-4 h-4" />
                </button>
                {property.imageCount > 0 && (
                    <div className="absolute bottom-3 right-3 rounded-md bg-white/95 px-2.5 py-1 text-xs text-[#6B7280] shadow flex items-center gap-1.5">
                       <Icon name="camera" className="w-3.5 h-3.5" />
                        {property.imageCount} รูป
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 onClick={() => onSelect(property.id)} className="text-lg font-semibold text-[#1E3A8A] tracking-tight hover:text-blue-600 cursor-pointer">{property.title}</h3>
                <p className="text-sm text-[#6B7280] mt-1 flex items-center gap-1.5">
                    <Icon name="map-pin" className="w-4 h-4" /> {property.location} • {property.walkTime} นาที
                </p>
                <div className="mt-3 flex items-center gap-4 text-sm text-[#111827]/80">
                    <span className="inline-flex items-center gap-1.5"><Icon name="bed" className="w-4 h-4" />{property.bedrooms}</span>
                    <span className="inline-flex items-center gap-1.5"><Icon name="bath" className="w-4 h-4" />{property.bathrooms}</span>
                    <span className="inline-flex items-center gap-1.5"><Icon name="ruler" className="w-4 h-4" />{property.size} ตร.ม.</span>
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="text-[#DC2626] text-2xl font-semibold">{property.price}</div>
                    <button onClick={() => onSelect(property.id)} className="inline-flex items-center gap-1.5 text-sm text-[#1E3A8A] hover:underline underline-offset-4">
                        รายละเอียด <Icon name="arrow-right" className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </article>
    );
};