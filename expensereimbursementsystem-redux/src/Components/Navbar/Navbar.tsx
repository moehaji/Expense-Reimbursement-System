import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Slices/UserSlice';
import { RootState } from '../../Store';
import image from '../../image.jpeg';
import { AppDispatch } from '../../Store';
import './Navbar.css';

export const Navbar: React.FC = () => {
    
    const dispatch:AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const user = useSelector((state:RootState) => state.user.user);

    return(
        <nav className="navbar">
            <img className="profile-pic" src={image} />
            <ul className='nav-menu'>
                <li className="nav-item">
                    <Link to={`/user/${user?.userID}`} className="nav-link">Profile</Link>
                </li>

                <li className="nav-item">
                    <Link to={"/feed"} className="nav-link">Home</Link>
                </li>

                <li className="logout">
                    <Link to={"/login"} className="nav-link">
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </Link>
                </li>
            </ul>
        </nav>
    )

}