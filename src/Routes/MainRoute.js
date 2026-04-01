import { Routes, Route } from 'react-router-dom';
import Home from '../View/Home/Home';
import About from '../View/About/About';
import Noplin from '../View/Noplin/Noplin';
import Settings from '../View/Settings/settings';
import Error404 from '../View/Error404/Error404';   
import "bootstrap-icons/font/bootstrap-icons.css";

export default function MainRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/noplin" element={<Noplin />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}