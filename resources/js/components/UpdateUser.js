import { useParams } from 'react-router';
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function UpdateUser() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password:''
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { id } = useParams();

    const getUser = async () => {
        const response = await axios.get(`/user/${id}`);
        setUser(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const formData = {
        name,
        email,
        password
    }

    useEffect(() => {
        getUser();
    }, []);

    const formHandler = async (e) => {
        e.preventDefault();
        const response = await axios.put(`/user/${id}`, formData);
        if (response.data.success) {
            setSuccess('user updated successfully');
            setError('');
        } else {
            setError('user updated failed');
            setSuccess('');
        }
    }

    return (
        <form onSubmit={formHandler}>
            <h2 className="py-4">Update User</h2>
            <div className="form-group mt-2">
                <input onChange={onChangeName} type="text" value={name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
            </div>
            <br />
            <div className="form-group mt-2">
                <input onChange={onChangeEmail} type="email" value={email} className="form-control" id="exampleInputPassword1" placeholder="Enter Email" />
            </div>
            <br />
            <div className="form-group mt-2">
                <input onChange={onChangePassword} type="password" value={password} className="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Update</button>
            {error ? (<div className="alert alert-danger mt-3">{error}</div>) : null}
            {success ? (<div className="alert alert-primary mt-3">{ success }</div>) : null}
        </form>
    );
}

export default UpdateUser;
