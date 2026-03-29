import React from 'react';
import { NoplinCard, NoplinCardBodyArea } from 'noplin-uis';
import '../Style/Components/HomeUploadCard.css';

export function createEmptyUploadSlot() {
    return {
        status: 'idle',
        progress: 0,
        previewUrl: null,
    };
}


const PROGRESS_RING_YELLOW = '#f5d75f';
const PROGRESS_TRACK_YELLOW = 'rgba(245, 215, 95, 0.35)';

function CircularUploadProgress({ progress }) {
    const r = 34;
    const stroke = 10;
    const c = 2 * Math.PI * r;
    const dash = (progress / 100) * c;
    
    return (
        <div className="huc-loader" aria-live="polite" aria-label={`Upload progress ${Math.round(progress)} percent`}>
            <svg className="huc-progress-svg" viewBox="0 0 100 100" width="130" height="130">
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke={PROGRESS_TRACK_YELLOW}
                    strokeWidth={stroke}
                />
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke={PROGRESS_RING_YELLOW}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${c}`}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <span className="huc-progress-label">{Math.round(progress)}%</span>
        </div>
    );
}

