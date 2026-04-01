import TopNav from '../../Components/TopNav';

export default function Noplin() {
    return (
        <div className="home-container">
            <div className="navbar">
                <TopNav />
            </div>

            <div className="home-content">
                <h1 className="home-title">Noplin Page</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                    Curabitur id interdum risus. Pellentesque habitant morbi tristique senectus
                    et netus.
                </p>
            </div>
        </div>
    );
}
