import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchJobSeekers } from "../../../actions/authActions";
import classnames from "classnames";

class SearchWorkers extends Component{
  constructor(props) {
    super(props);
    this.state = {...props.auth.user,...props.Seekers, errors: {} };
    console.log(props.auth.user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.props.fetchJobSeekers();
  }

      render(){
        console.log(this.state);
        return <div>Hello</div>
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
