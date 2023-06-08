const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('suite de Prueba Teams', ()=>{
    it('Should return the team of the given user', (done)=>{
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'elizon', password: '1234'})
        .end((err, res)=>{
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .get('/teams')
            .set('Authorization', `JWT ${res.body.token}`)
            .end((err, res)=>{
                chai.assert.equal(res.statusCode, 200)
                chai.assert.equal(res.body.trainer, 'elizon');
                chai.assert.equal(res.body.team.length, 2);
                chai.assert.equal(res.body.team[0].name, 'Charizard');
                chai.assert.equal(res.body.team[1].name, 'Blastoise');
                done();
            });
        });
    });
});