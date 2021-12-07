const assert = require('chai').assert;
const login = require('../validation/login');
const register = require('../validation/register');
const update = require('../validation/update');

var wemail = ['gfc.com','','@.']
var wpassword = ['',' '];
var wname = ['dskf@','sf12j%','#12',''];
var wmobile =['211#3426','idsfnkj2650'];
var wlocation =['$jkjf', '@insafj','@713'];
var wtype = ['Random'];

wemail.forEach(em =>{
    wpassword.forEach(pw =>{
        describe('login',function(){
            data ={
                email : em,
                password :pw
            };
            it('It should return error',function(){
                console.log('email :' + data.email + 'pw : ' + data.password);
                assert.isNotEmpty(login(data).errors);
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
                        assert.isEmpty(update(data).errors);
                    });
                });
        });
    });
});


wname.forEach(nam =>{
    wpassword.forEach(pw =>{
        wemail.forEach(em =>{
            wmobile.forEach(mob =>{
                wlocation.forEach(loc =>{
                    wtype.forEach(typ=>{
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