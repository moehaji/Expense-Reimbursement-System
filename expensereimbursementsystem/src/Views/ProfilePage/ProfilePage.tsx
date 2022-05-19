import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";
import { getUserDetails } from "../../Slices/UserSlice";
import { RootState, AppDispatch } from "../../Store";
import './ProfilePage.css'


export const ProfilePage:React.FC = () => {

    const profile = useSelector((state:RootState) => state.user);

    const dispatch: AppDispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        console.log("Get the info about user: ", id);
        if(id && !profile.currentProfile) {
            dispatch(getUserDetails(id));
        }
        console.log("Current APp State", profile);
    }, [profile]);

    return(
        <div>
            <Navbar/>
            <div className="profile-info">
                <h1>Profile of {profile.currentProfile?.firstName} {profile.currentProfile?.lastName}</h1>
                <ul>
                    <li>First Name: {profile.currentProfile?.firstName}</li>
                    <li>Last Name: {profile.currentProfile?.lastName}</li>
                    <li>Username: {profile.currentProfile?.username}</li>
                    <li>Password: {profile.currentProfile?.password}</li>
                    <li>Email: {profile.currentProfile?.email}</li>
                </ul>
            </div>
        </div>
    )
}