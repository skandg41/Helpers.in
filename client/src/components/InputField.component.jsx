import React, {Component} from 'react';

export default class InputField extends Component{
    render(){
        const{
            type,
            placeholder,
            icon:Icon,
            name,
            value,
            handleInputChange,
            required='true',
        } = this.props;

        return(
            <div className="form_input_outer">
                <div className="form_input_icon_outer">
                    <Icon className="form_input_icon"></Icon>
                </div>
                <input
                    type={type}
                    placeholder = {placeholder}
                    name={name}
                    className="form_input"
                    value={value}
                    onChange={handleInputChange}
                    required={required}
                />
                
            </div>
        )
    }
}