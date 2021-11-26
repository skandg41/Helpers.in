const assert = require('chai').assert;
const login = require('../validation/login');
const register = require('../validation/register');
const update = require('../validation/update');

var cname = ['Skand Gupta','Neeraj Jetha'];
var wname = ['dskf@','sf12j%','#12',''];
var cemail = ['s@s.com','skg@gmail.in','skand@gmail.com'];
var wemail = ['gfc.com','','@.']
var cpassword = ['s1234','s@154','12%ub','abs@243652'];
var wpassword = [''];
var cmobile = ['7124368542','2423652142','8982067673'];
var wmobile =['211#3426','idsfnkj2650'];
var clocation = ['mds','df451!','Mandsaur'];
var wlocation =['$jkjf', '@insafj','@713'];
var cutype = ['JobSeeker','Customer'];
var wtype = ['Random'];

cemail.forEach(em =>{
    cpassword.forEach(pw =>{
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

cemail.forEach(em =>{
    cpassword.forEach(pw =>{
        describe('login',function(){
            data ={
                email : em,
                password :pw
            };
            it('It should return error',function(){
                assert.isEmpty(login(data).errors);
            });
        });
    });
});

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
                            it('It should return error',function(){
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
                        assert.isNotEmpty(update(data).errors);
                    });
                });
        });
    });
});

wname.forEach(nam =>{
    wmobile.forEach(mob =>{
        wlocation.forEach(loc =>{
                describe('update',function(){
                    data ={
                        id : '26489',
                        name : nam,
                        mobile : mob,
                        location : loc 
                    };
                    it('It should return error',function(){
                        assert.isNotEmpty(update(data).errors);
                    });
                });
        });
    });
});