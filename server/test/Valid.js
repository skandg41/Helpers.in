const assert = require('chai').assert;
const login = require('../validation/login');
const register = require('../validation/register');
const update = require('../validation/update');

var cname = ['Skand Gupta','Neeraj Jetha'];
var cemail = ['skg@gmail.in','skand@gmail.com','neeraj@gmail.com'];
var cpassword = ['s1234','s@154','12%ub','abs@243652'];
var cmobile = ['7124368542','2423652142','8982067673'];
var clocation = ['mds','df451!','Mandsaur'];
var cutype = ['JobSeeker','Customer'];


cemail.forEach(em =>{
    cpassword.forEach(pw =>{
        describe('login',function(){
            data ={
                email : em,
                password :pw
            };
            it('It should not return error',function(){
                console.log('email :' + data.email + 'pw : ' + data.password);
                assert.isNotEmpty(login(data).errors);
            });
        });
    });
});

//console.log("-------------------------------------------");

cname.forEach(nam =>{
    cpassword.forEach(pw =>{
        cemail.forEach(em =>{
            cmobile.forEach(mob =>{
                clocation.forEach(loc =>{
                    cutype.forEach(typ=>{
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
                                assert.isNotEmpty(register(data).errors);
                            });
                        });
                    });
                });
            });
        });
    });
});


cname.forEach(nam =>{
    cmobile.forEach(mob =>{
        clocation.forEach(loc =>{
                describe('update',function(){
                    data ={
                        id : '26489',
                        name : nam,
                        mobile : mob,
                        location : loc 
                    };
                    it('It should not return error',function(){
                        assert.isEmpty(update(data).errors);
                    });
                });
        });
    });
});

