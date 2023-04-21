const assert = require('chai').assert;

function addfuntion(a,b){
    return a+b;
}
describe('Primera prueba del curso', ()=>{
    it('should return 4', ()=>{
        let va = addfuntion(2,2);
        assert.equal(va, 4);
    });
});