import React, {useState} from "react";
import axios from "axios";

export default function CardDisplay(props){
  console.log("props "+props);  
  
  const Workers = [];


  

  return 
  (<div>{ Workers.map((pers) =>(
            <div className="row">
            <div className="col s12 m7">
              <div className="card">
                <div className="card-image">
                  <img src="images/sample-1.jpg"/>
                  <span className="card-title">{pers.name}</span>
                </div>
                <div className="card-content">
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
                <div className="card-action">
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>)
        ;
}
        
        