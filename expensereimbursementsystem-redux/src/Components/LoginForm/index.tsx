import React from "react";

export const Login: React.FC = () => {

    const handleInput = () => {

    }

    const handleLogin = () => {
        
    }

    return(
        <div className="login">
            <div className="text-container">
                <h1 className="login-h1">Welcome to Expense</h1>
            </div>

            <form className="login-form">
                <div className="input-div">
                    <h4 className="input-h4">Enter email:</h4>
                    <input className="login-input" type="text" name="email" placeholder="Email" onChange={handleInput} autoComplete="off" />
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