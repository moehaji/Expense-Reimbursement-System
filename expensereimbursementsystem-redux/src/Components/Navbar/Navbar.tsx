import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Slices/UserSlice';
import { RootState } from '../../Store';
// // import ers from '../..ers.svg';
import ers from '../..ers.png';
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
        <nav>
            {/* <img className="logo-image" src={image} /> */}
            <ul className='nav-menu'>
                <li>
                    <a href={`/profile/${user?.userID}`}>Profile</a>
                </li>

                <li>
                    <a href={"/login"} className="logout-btn"><button onClick={handleLogout}>Logout</button></a>
                </li>
            </ul>
        </nav>
    )
}