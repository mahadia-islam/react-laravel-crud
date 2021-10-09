import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

function AddUser() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const changeName = (e) => {
        setUsername(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const formData = {
        username,
        email,
        password
    }

    const addUser = async (e) => {
        e.preventDefault();
        console.log('form is suubmitted');
        const response = await axios.post('/user', formData);

        if (response.data.success) {
            setSuccess(response.data.message);
            setError('');
        } else if(response.data) {
            setError('user added failed');
            setSuccess('');
        }
    }

    return (
        <form onSubmit={ addUser }>
            <h2 className="py-4">Add New User</h2>
            <div className="form-group mt-2">
                <input onChange={ changeName } type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
            </div>
            <br/>
            <div className="form-group mt-2">
                <input onChange={ changeEmail } type="email" className="form-control" id="exampleInputPassword1" placeholder="Enter Email" />
            </div>
            <br />
            <div className="form-group mt-2">
                <input onChange={ changePassword } type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
            </div>
            <br />
            <div className="form-group mt-2">
                <input onChange={ changeConfirmPassword } type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
            </div>
            <br/>
            <div className="form-check mt-2">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className ="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
            {error ? (<div className="alert alert-danger mt-3">{error}</div>) : null}
            {success ? (<div className="alert alert-primary mt-3">{ success }</div>) : null}
        </form>
    );
}

export default AddUser;
