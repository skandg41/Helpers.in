import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchJobProposals } from "../../../actions/authActions";
import axios from "axios";
import store from "../../../store";

class LookForWork extends Component{
  constructor(props) {
    super(props);
    
    this.state = {...props.auth.user, errors: {} };
    this.props.fetchJobProposals(this.state.id);
    console.log(this.state.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  accept =e =>{
    e.preventDefault();
    console.log(e.target.id);
    console.log(this.state.id);
    const confirmation={
      JobSeeker : this.state.id,
      customer : e.target.id,
      response : "Accept"
    }
    axios.post("/api/jobseeker/proposals",confirmation).then(res=>{
      console.log(res);
      window.alert("Congrats your job is confirmed you will receive contact details of job provider through sms on your registered mobile number");
    }).catch(err => console.log(err));
  }

  reject =e =>{
    e.preventDefault();
    console.log(e.target.id);
    console.log(this.state.id);
    const confirmation={
      JobSeeker : this.state.id,
      customer : e.target.id,
      response : "Reject"
    }
    axios.post("/api/jobseeker/proposals",confirmation).then(res=>{
      console.log(res);
      window.alert("Thanks for using the service :) Keep looking for work");
    }).catch(err => console.log(err));
  }
      render(){
        console.log("getstore "+ store.getState().auth.proposals);
        const customers = store.getState().auth.proposals;
        const filCust = customers.filter((cus) =>{
          return cus.Status === "Requested";
        });
        console.log(customers[1])
        return (
        <div  className="container valign-wrapper">
        <div className="row">
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Accept or reject Booking requests </b> below
              </h4>
              <p className="grey-text text-darken-1">
                No Change Back to <Link to="/jobseekerdashboard">Dashboard</Link>
              </p>
            </div>
          { filCust.map((pers) =>(
            <div className="col s12 m7">
              <div className="card" id={pers._id+"1"}>
                <div className="card-image">
                  <img style={{ border: "1px solid #ddd", padding: "5px",width: "150px" }} alt={pers.name} src={process.env.PUBLIC_URL + "/Letter-H-icon.png"} />
                  <span className="card-title">{pers.name}</span>
                </div>
                <div className="card-content">
                  <p> Booking person id {pers.Bookerid} Date and time of Booking {pers.DateofReq} </p>
                </div>
                <div className="card-action">
                  <button onClick={this.accept} id={pers._id}>Accept</button>
                </div>
                <div className="card-action">
                  <button onClick={this.reject} id={pers._id}>reject</button>
                </div>
            </div>
          </div>
          ))}
          </div>
        </div>
        )
  }
}

LookForWork.propTypes = {
  fetchJobProposals: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  proposals: state.proposals,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchJobProposals }
)(LookForWork);
