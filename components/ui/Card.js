"use client";

export default function Card({ children, className = "" }) {
    return (
        <div className={`rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur p-4 sm:p-6 shadow-sm ${className}`}>
            {children}
        </div>
    );
}


