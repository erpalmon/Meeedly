import React, { useRef, useState, useEffect, useCallback, useId } from 'react';
import '../../Style/Home/Home.css';
import {
    NoplinCard,
    NoplinCardBodyArea,
    LightButton
} from "noplin-uis";
import burger from '../../Asset/burger.jpg';
import HomeUploadCard, { createEmptyUploadSlot } from '../../Components/HomeUploadCard';
import TopNav from '../../Components/TopNav';

function Home() {
    const fileInputRef = useRef(null);
    const intervalRefs = useRef({});
    const baseId = useId();

    const [uploadSlots, setUploadSlots] = useState(() => [createEmptyUploadSlot(), createEmptyUploadSlot()]);
    const uploadSlotsRef = useRef(uploadSlots);
    uploadSlotsRef.current = uploadSlots;

    const clearSlotInterval = useCallback((slotIndex) => {
        const id = intervalRefs.current[slotIndex];
        if (id != null) {
            clearInterval(id);
            delete intervalRefs.current[slotIndex];
        }
    }, []);

    useEffect(() => {
        return () => {
            Object.values(intervalRefs.current).forEach(clearInterval);
            uploadSlotsRef.current.forEach((s) => {
                if (s.previewUrl) {
                    URL.revokeObjectURL(s.previewUrl);
                }
            });
        };
    }, []);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            return;
        }
        const file = files[0];
        if (!file) {
            return;
        }
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        console.log('Selected file:', file);
        event.target.value = '';
    };

    const simulateUpload = useCallback(
        (slotIndex, file) => {
            clearSlotInterval(slotIndex);

            setUploadSlots((prev) => {
                const next = [...prev];
                const prevUrl = next[slotIndex].previewUrl;
                if (prevUrl) URL.revokeObjectURL(prevUrl);
                const previewUrl = URL.createObjectURL(file);
                next[slotIndex] = { status: 'uploading', progress: 0, previewUrl };
                return next;
            });

            const interval = setInterval(() => {
                setUploadSlots((prev) => {
                    const next = [...prev];
                    const slot = next[slotIndex];
                    if (slot.status !== 'uploading') return prev;

                    const step = 6 + Math.random() * 8;
                    const newProgress = Math.min(100, slot.progress + step);

                    if (newProgress >= 100) {
                        clearSlotInterval(slotIndex);
                        next[slotIndex] = {
                            status: 'done',
                            progress: 100,
                            previewUrl: slot.previewUrl,
                        };
                        return next;
                    }

                    next[slotIndex] = { ...slot, progress: newProgress };
                    return next;
                });
            }, 90);

            intervalRefs.current[slotIndex] = interval;
        },
        [clearSlotInterval]
    );

    const handleSlotFileChange = (slotIndex) => (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        simulateUpload(slotIndex, file);
    };

    const handleCancelAllUploads = () => {
        Object.keys(intervalRefs.current).forEach((k) => clearInterval(intervalRefs.current[k]));
        intervalRefs.current = {};

        setUploadSlots((prev) => {
            prev.forEach((s) => {
                if (s.previewUrl) URL.revokeObjectURL(s.previewUrl);
            });
            return [createEmptyUploadSlot(), createEmptyUploadSlot()];
        });
    };

    return (
        <div className="home-container">
            <div className="navbar">
                <TopNav />
                <LightButton
                    className="nav-item"
                    style={{ backgroundColor: 'yellow', color: 'navy', border: '3px solid yellow', borderRadius: '10px', fontSize: '24px', fontWeight: 'bold', padding: '4px 8px' }}
                    onClick={handleUploadClick}
                >
                    Upload
                </LightButton>

                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

            </div>

            <div className="home-content">
                <h1 className="home-title">
                    Show your food to the <br /> world
                </h1>

                <div className="cards-row">

                    <NoplinCard className="upload-card image-card">
                        <NoplinCardBodyArea>
                            <div className="card-content">
                                <img
                                    src={burger}
                                    alt="food"
                                    className="card-image"
                                />
                                <div className="progress-circle">62.5%</div>
                            </div>
                        </NoplinCardBodyArea>
                    </NoplinCard>

                    {uploadSlots.map((slot, index) => {
                        const inputId = `${baseId}-slot-${index}`;
                        return (
                            <HomeUploadCard
                                key={inputId}
                                inputId={inputId}
                                slot={slot}
                                onFileChange={handleSlotFileChange(index)}
                            />
                        );
                    })}

                </div>

                <button type="button" className="cancel-text cancel-uploads-btn" onClick={handleCancelAllUploads}>
                    Cancel all uploads
                </button>

            </div>

        </div>
    );
}

export default Home;
