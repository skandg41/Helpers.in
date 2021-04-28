import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {signout} from '../../../helpers/auth';
export default class Navbar extends Component{

    render(){
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Helpers.in</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/admin-util" className="nav-link">Admin-Utility</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/view-stat" className="nav-link">View Stats</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}