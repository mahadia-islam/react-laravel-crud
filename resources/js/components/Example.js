import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

function Crud() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Router>
                        <Header />
                        <div className="col-md-8 m-auto py-5">
                            <Switch>
                                <Route exact path="/"><Home /></Route>
                                <Route exact path="/adduser"><AddUser /></Route>
                                <Route exact path="/updateuser/:id"><UpdateUser/></Route>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default Crud;

if (document.getElementById('example')) {
    ReactDOM.render(<Crud />, document.getElementById('example'));
}
