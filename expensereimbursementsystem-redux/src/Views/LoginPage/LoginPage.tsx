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

import React, { useEffect } from "react";
import { Login } from "../../Components/LoginForm";
import "./LoginPage.css"
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {

  const userState = useSelector((state:RootState) => state.user);
  const navigator = useNavigate();

  useEffect(() => {
    if(!userState.error && userState.user) {
      navigator("/employee");
    }
  }, [userState]);

  return(
    <div className="login-page">
       {userState.error ? <h2 className="login-error">Username or password incorrect</h2> : <></>}
      <Login />
    </div>
  );
}