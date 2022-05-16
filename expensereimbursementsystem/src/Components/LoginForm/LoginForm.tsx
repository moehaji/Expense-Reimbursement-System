import React, {useState, useEffect} from "react";

interface LoginFormProps {
    onClick: (username:string, password:string) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({onClick}:LoginFormProps) => {

    //Need to store userinput properly
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
    
    }, [username, password])

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "username") {
            setUsername(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick(username, password);
    }
  
    return (
        <div className='login-container'>
            <h2>Welcome to the Employee Reimbursement System</h2>
            <h3>Please login below</h3>
            <form>
                <h2>Username:</h2>
                <input type="text" name="username" id="username-input" onChange={handleChange} />
                <h2>Password:</h2>
                <input type="password" name="password" id="password-input" onChange={handleChange} />
            </form>
            <button onClick={handleClick}>Login</button>
        </div>
  );

}