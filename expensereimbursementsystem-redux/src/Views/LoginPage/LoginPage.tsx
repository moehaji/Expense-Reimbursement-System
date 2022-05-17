// import React, {useState} from "react";
// import axios from "axios";

// import { IUser } from "../../Interfaces/IUser";
// import { LoginForm } from "../../Components/LoginForm/LoginForm";

// interface LoginPageProps {
//     liftState: (user:IUser) => void
// }

// export const LoginPage: React.FC<LoginPageProps> = ({liftState}) => {

//     const [error, setError] = useState(false);

//     const loginUser = async (username:string, password:string) => {
//         //We would want to take that email and password, and try to login
//         let loginObj = {
//           username,
//           password
//         }
    
//         try{
//           const res = await axios.post('http://localhost:8080/user/login', loginObj)
//           setError(false)
//           liftState(res.data)
//         } catch (e) {
//           setError(true);
//         }
    
//       }


//       return (
//         <>
//           <LoginForm onClick={loginUser}/>
//           {error ? <h1>Username or password incorrect</h1> : <></>}
//         </>
//       );

// }

import React from "react";
import { Login } from "../../Components/LoginForm";

export const LoginPage: React.FC = () => {

  return(
    <div className="login-page">
      <Login />
    </div>
  )
}