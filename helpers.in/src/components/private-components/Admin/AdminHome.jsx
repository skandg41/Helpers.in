import React, {Component} from "react";
//import axios from 'axios';
import Navbar from './navbar.component';
export default class Home extends Component{
    render(){
        return <div>
            <Navbar></Navbar>
            <h1>Admin Home</h1>
        </div>
    }
}
