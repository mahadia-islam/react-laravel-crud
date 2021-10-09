import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Home() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getUser = async () => {
        const user = await axios.get('/user');
        setUsers(user.data);
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    const deleteUser = async (id) => {
        const response = await axios.delete(`/user/${id}`);
        if (response.data.success) {
            setSuccess('user deleted successfully');
            setError('');
            getUser();
        } else {
            setError('user deleted failed');
            setSuccess('');
        }
    }

    return (
        <>
            { loading ? (<div className="col-md-4 m-auto">loading ...</div>) : <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={Date.now() + Math.random()}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={ () => deleteUser(user.id) } className="btn btn-danger btn-sm">
                                    delete
                                </button>
                                <button className="btn btn-dark mx-2 btn-sm">
                                    <NavLink exact to={`/updateuser/${user.id}`}>update</NavLink>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            {error ? (<div className="alert alert-danger mt-5">{error}</div>) : null}
            {success ? (<div className="alert alert-primary mt-5">{ success }</div>) : null}
        </>
    );
}

export default Home;
