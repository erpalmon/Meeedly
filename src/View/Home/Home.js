import React, { useRef } from 'react';
import '../../Style/Home/Home.css';
import {
    NoplinCard,
    NoplinCardBodyArea,
    LightButton
} from "noplin-uis";
import burger from '../../Asset/burger.jpg';

function Home() {
    const fileInputRef = useRef(null);

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
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        console.log('Selected file:', file);
    };

    return (
        <div className="home-container">
            <div className="navbar">
                <h2 className="logo">Foodblog</h2>
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

                <h2 className="nav-item2">About Us</h2>
            </div>

               <div className="home-content">
                 <h1 className="home-title">
                    Show your food to the <br /> world
                </h1>

                <div className="cards-row">

                {/* Card 1 (Image + progress) */}
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

                {/* Card 2 */}
                <NoplinCard className="upload-card empty">
                    <NoplinCardBodyArea>
                        <div className="plus">+</div>
                    </NoplinCardBodyArea>
                </NoplinCard>

                {/* Card 3 */}
                <NoplinCard className="upload-card empty">
                    <NoplinCardBodyArea>
                        <div className="plus">+</div>
                    </NoplinCardBodyArea>
                </NoplinCard>

            </div>

            <p className="cancel-text">Cancel all uploads</p>

               </div>


        </div>
    )
}

export default Home;