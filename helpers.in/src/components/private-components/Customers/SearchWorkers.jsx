import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchJobSeekers } from "../../../actions/authActions";
import axios from "axios";
import store from "../../../store";
class SearchWorkers extends Component{
  constructor(props) {
    super(props);
    this.props.fetchJobSeekers();
    this.state = {...props.auth.user, errors: {} };
    console.log(this.state.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  Book =e =>{
    e.preventDefault();
    console.log(e.target.id);
    console.log(this.state.id);
    const Bookreq={
      Booker : this.state.id,
      target : e.target.id,
    }
    axios.post("/api/customer/book",Bookreq).then(res=>{
      console.log(res);
    }).catch(err => console.log(err));
  }

      render(){
        console.log("getstore "+ store.getState().auth.Seeker);
        const Workers = store.getState().auth.Seeker;
        console.log(Workers[1])
        return (
        <div className="container">
        <div className="row">
          { Workers.map((pers) =>(
            <div className="col s12 m7">
              <div className="card" id={pers._id+"1"}>
                <div className="card-image">
                  <img style={{ border: "1px solid #ddd", padding: "5px",width: "150px" }} src={process.env.PUBLIC_URL + "/Letter-H-icon.png"} />
                  <span className="card-title">{pers.name}</span>
                </div>
                <div className="card-content">
                  <p> Name: {pers.name} Contact number: {pers.mobile} Location Available :{pers.location} </p>
                </div>
                <div className="card-action">
                  <button onClick={this.Book} id={pers._id}>Request Booking</button>
                </div>
            
            </div>
          </div>
          ))
          }
          </div>
        </div>
        )
  }
}

SearchWorkers.propTypes = {
  fetchJobSeekers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  Seekers: state.Seekers,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchJobSeekers }
)(SearchWorkers);
