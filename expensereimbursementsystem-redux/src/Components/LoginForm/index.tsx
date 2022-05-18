import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { loginUser, toggleError } from "../../Slices/UserSlice";
import { AppDispatch } from "../../Store";

export const Login: React.FC = () => {

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();

    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "username") {
            setUserName(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleLogin = (event:React.MouseEvent<HTMLButtonElement>) => {
        let credentials = {
            username,
            password
        };
        
        dispatch(loginUser(credentials));
    }

    return(
        <div className="login">
            <div className="text-container">
                <h1 className="login-h1">Welcome to Expense</h1>
            </div>

            <form className="login-form">
                <div className="input-div">
                    <h4 className="input-h4">Enter username:</h4>
                    <input className="login-input" type="text" name="username" placeholder="Username" autoComplete="off" onChange={handleInput} />
                </div>

                <div className="input-div">
                    <h4 className="input-h4">Enter password:</h4>
                    <input className="login-input" type="password" name="password" placeholder="Password" onChange={handleInput} />
                </div>
            </form>

            <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
    )
}