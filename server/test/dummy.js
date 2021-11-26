const assert = require('chai').assert;
const login = require('../validation/login');
const register = require('../validation/register');
const update = require('../validation/update');

describe('login',function(){
    data ={
        email : 's@s.com',
        password :'s@154'
    };
    it('It should not return error',function(){
        assert.isEmpty(login(data).errors);
    });
});
