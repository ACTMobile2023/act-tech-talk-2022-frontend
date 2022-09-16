import './AddSuccess.css'
import {useSelector} from "react-redux";
import {attenderSelect} from "../../redux/selecters";

function AddSuccess() {
    const attender = useSelector(attenderSelect)

    return (
        <div style={{width: '100%', height: 400, textAlign: 'center', paddingTop: 70}}>
            <h2 style={{color: 'green'}}>
                <span style={{color: 'red', fontSize: 25}}>Congratulation!</span>
                <br></br>
                You have successfully registered to Ascend Technology - Tech Talk 2022
            </h2>

            <p>Here is your registered information:</p>
            <div className="form-container">
                <div style={{textAlign: 'left', marginLeft: '30%'}}>
                    <p>Fullname: <b>{attender.full_name}</b></p>
                    <p>Date of birth: <b>{new Date(attender.date_of_birth).toLocaleDateString()}</b></p>
                    <p>Email: <b>{attender.email}</b></p>
                    <p>Organization: <b>{attender.organization}</b></p>
                    <p>Role: <b>{attender.role}</b></p>
                    <p>Experience: <b>{attender.months_of_experience}</b></p>
                    <p>Confirm to join experience: <b>{attender.is_join_experience_section ? 'X' : ''}</b></p>
                </div>
                <img className="image-avatar" src={attender.avatar || '../assets/no-avatar.png'} alt={'avatar'}/>
            </div>

        </div>
    );
}

export default AddSuccess;