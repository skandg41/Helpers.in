const assert = require('chai').assert;

const login = require('../validation/login');
const register = require('../validation/register');
const update = require('../validation/update');

var name = ['skf','dskf@','sf12j%','#12',''];
var email = ['s@s.com','gfc.com','skg@gmail.in','','@.','skand@gmail.com',''];
var password = ['s1234','s@154',' ','12%ub','abs@243652',''];
var mobile = ['7124368542','2423652142','211#3426','idsfnkj2650','8982067673'];
var location = ['mds', '$jkjf', '@insafj','df451!','Mandsaur','@713'];
var utype = ['JobSeeker','Customer','Random'];

email.forEach(em =>{
    password.forEach(pw =>{
        describe('login',function(){
            data ={
                email : em,
                password :pw
            };
            it('It should not return error',function(){
                assert.isEmpty(login(data).errors);
            });
        });
    });
});

name.forEach(nam =>{
    password.forEach(pw =>{
        email.forEach(em =>{
            mobile.forEach(mob =>{
                location.forEach(loc =>{
                    utype.forEach(typ=>{
                        describe('register',function(){
                            data ={
                                name : nam,
                                email : em,
                                password : pw,
                                password2 : pw,
                                utype : typ,
                                mobile : mob,
                                location : loc 
                            };
                            it('It should not return error',function(){
                                assert.isEmpty(login(data).errors);
                            });
                        });
                    });
                });
            });
        });
    });
});

name.forEach(nam =>{
            mobile.forEach(mob =>{
                location.forEach(loc =>{
                        describe('update',function(){
                            data ={
                                id : '26489',
                                name : nam,
                                mobile : mob,
                                location : loc 
                            };
                            it('It should not return error',function(){
                                assert.isEmpty(login(data).errors);
                            });
                        });
        });
    });
});