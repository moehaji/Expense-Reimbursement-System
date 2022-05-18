import React, {useState, useEffect} from "react";
import "./EmployeePage.css";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';
import { Navbar } from '../../Components/Navbar/Navbar';
import { IReimbursement } from '../../Interfaces/IReimbursement';
import { createReimbursement } from '../../Slices/ReimbursementSlice';

export const EmployeePage: React.FC = () => {
    
    const currentEmployee = useSelector((state:RootState) => state.user.user);
   
    const [amount, setReimbursementAmount] = useState<string>("");
    const [description, setReimbursementDescription] = useState<string>("");
    const [reimbursementType, setReimbursementType] = useState<string>("");
    const dispatch:AppDispatch = useDispatch();

    const handleDescriptionChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setReimbursementDescription(event.target.value);
    }

    const handleAmountChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setReimbursementAmount(event.target.value);
    }

    const handleTypeChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setReimbursementType(event.target.value);
        
    }

    const handleReimbursement = () => {

        let submittedDate = new Date();

        if(currentEmployee){
            let reimbursement:IReimbursement = {
                reimbursementID: 0,
                amount,
                submittedDate: submittedDate,
                description,
                reimbursementAuthor: currentEmployee.userID,
                reimbursementStatus: 1,
                reimbursementType
            }

            dispatch(createReimbursement(reimbursement));
        }
    }
    
    return(
        <div>
            <Navbar />
            <div className="employee-page">
                <ul>
                    <li>Request</li>
                    <li>Pending</li>
                    <li>Resolved</li>
                </ul>

                <form className="create-form" action="">
                    <div className="form-title">Reimbursement Request</div>
                    
                    <div className="form-item">
                        <label htmlFor="">Type</label>
                        <select name="" onChange={handleTypeChange}>
                            <option value="1">1 - LODGING</option>
                            <option value="2">2 - TRAVEL</option>
                            <option value="3">3 - FOOD</option>
                            <option value="4">4 - OTHER</option>
                        </select>
                    </div>
                    
                    <div className="form-item">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input className="form-input" type="text" onChange={handleAmountChange}/>
                    </div>
                    
                    <div className="form-item">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-input" onChange={handleDescriptionChange} ></textarea>
                    </div>

                    <div className="form-item">
                        <button className="form-btn" type="submit">Create</button>
                    </div>
                </form>
            </div>
            {/* <div className="feed-page">
                <CreatePost />
                {posts.posts ? posts.posts.map((post:IPost) => {
                    return <Post {...post} key={post.postId} />
                }) :
                <Loading />
                }
            </div> */}
        </div>
    );
}