import '../../Style/Home/Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="navbar">
                <h2 className="logo">Foodblog</h2>
                <h2 className="nav-item">Upload</h2>
                <h2 className="nav-item2">About Us</h2>
            </div>

               <div className="home-content">
                 <h1 className="home-title">
                    Show your food to the <br /> world
                </h1>

               </div>


        </div>
    )
}

export default Home;