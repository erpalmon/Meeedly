import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../Style/Components/TopNav.css';

export default function TopNav() {
    return (
        <div className="topnav">
            <Link className="topnav__logo" to="/">
                Foodblog
            </Link>

            <div className="topnav__links">
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `topnav__link ${isActive ? 'topnav__link--active' : ''}`
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/noplin"
                    className={({ isActive }) =>
                        `topnav__link ${isActive ? 'topnav__link--active' : ''}`
                    }
                >
                    Noplin
                </NavLink>
            </div>
        </div>
    );
}
