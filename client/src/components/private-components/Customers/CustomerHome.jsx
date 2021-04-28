import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Link } from "react-router-dom";

class CustomerDashboard extends Component{
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

      render() {
        const { user } = this.props.auth;
        
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
              <div className="row">
                <div className="landing-copy col s12 center-align">
                  <h4>
                    <b>Hey there,</b> {user.name.split(" ")[0]}
                    <p className="flow-text grey-text text-darken-1">
                      You are logged in as 
                      <span style={{ fontFamily: "monospace" }}> Customer </span>  👏
                    </p>
                  </h4>
                  <Link to="/customerprofile" props={this.state}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Update Profile
                  </button>
                  </Link>
                  <Link to="/searchWorkers" props={this.state}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Search Workers
                  </button>
                  </Link>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          );
        }
      }
      
      CustomerDashboard.propTypes = {
        logoutUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
      };
      
      const mapStateToProps = state => ({
        auth: state.auth
      });
      
      export default connect(
        mapStateToProps,
        { logoutUser }
      )(CustomerDashboard);
      