import { getByText, render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import React from 'react'
import {Provider} from 'react-redux';
import store from './store';


describe('Testing', function() {
    const { queryByTitle, getByText } = render(<App />);
    describe("<App />", () => {
      it(" Check whether app renders or not?", () => {
        //const { getByText } = render(<App />);
        expect(getByText(/Hire/i)).toBeInTheDocument();
      });
    });   

    it('Login page loading or not', function () {
      const { queryByTitle, getByText } = render(<Provider store={store}>
              <App />
            </Provider>);
            //Case-1
            fireEvent.click(getByText("Log In"));
            expect(getByText(/account/i)).toBeInTheDocument();
            });
          
         
  

      it('Register page loading or not', function () {
          const { queryByTitle, getByText } = render(<Provider store={store}>
              <App />
            </Provider>);
                //Case-1
                fireEvent.click(getByText("Register"));
                expect(getByText(/Register/i)).toBeInTheDocument();
                });
              
          
    
return
});
