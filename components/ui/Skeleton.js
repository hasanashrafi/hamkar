"use client";

export function Skeleton({ className = "" }) {
    return <div className={`animate-pulse rounded bg-emerald-100 ${className}`} />;
}

export function SkeletonText({ lines = 2 }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className={`h-3 w-${i === 0 ? "4/5" : "3/5"} animate-pulse rounded bg-emerald-100`} />
            ))}
        </div>
    );
}


