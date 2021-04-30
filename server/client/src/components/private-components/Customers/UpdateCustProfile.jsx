import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCProfile } from "../../../actions/authActions";
import classnames from "classnames";

class UpdateCustProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {...props.auth.user, errors: {} };
    // console.log(props.auth.user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  setUtype = e => {
    // console.log(e.target.value);
    this.setState({...this.state, utype : e.target.value});
    // console.log("from state"+this.state.utype);
    // console.log(this.state);
  }
  
  onSubmit = e => {
    e.preventDefault();
    // console.log("UpdateSubmit");
    const newUser = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      mobile: this.state.mobile,
      utype: this.state.utype,
      location: this.state.location,
    };
    // console.log("inSub");
    this.props.updateCProfile(newUser, this.props.history);
    // console.log("Submitdone");
  };

  render() {

    const { errors } = this.state;
    //console.log(this.props.auth.user);
    //this.setState(...this.props.auth.user);
    //console.log(this.state);
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>UpdateCustProfile</b> below
              </h4>
              <p className="grey-text text-darken-1">
                No Change Back to <Link to="/customerdashboard">Dashboard</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mobile}
                  error={errors.mobile}
                  id="mobile"
                  type="Number"
                  className={classnames("", {
                    invalid: errors.mobile
                  })}
                />
                <label htmlFor="mobile">Enter Mobile no.</label>
                <span className="red-text">{errors.mobile}</span>
              </div>         
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.location}
                  error={errors.location}
                  id="location"
                  type="text"
                  className={classnames("", {
                    invalid: errors.location
                  })}
                />
                <label htmlFor="location">Enter Prefered Location</label>
                <span className="red-text">{errors.location}</span>
              </div> 
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

  
UpdateCustProfile.propTypes = {
  updateCProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateCProfile }
)(UpdateCustProfile);
