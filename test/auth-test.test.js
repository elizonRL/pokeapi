const chai = require('chai');
const chaiHtttp = require('chai-http');

chai.use(chaiHtttp);

const app = require('../app').app;

describe('suite de Prueba de Auth', ()=>{
    it('Should return 401', (done)=>{
        chai.request(app)
        .get('/team')
        .end((err, res)=>{
            chai.assert.equal(res.statusCode, 401);
            done();
        });
    });

    it('Should return 400 when no data is provided', (done)=>{
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    it('should return 200 and token for succesful login', (done)=>{
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({user: 'elizon', password: '1234'})
            .end((err, res)=>{
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when jwt is avile', (done) => {
        chai.request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({user: 'elizon', password: '1234'})
        .end((err, res)=>{
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .get('/team')
            .set('Authorization', `JWT ${res.body.token}`)
            .end((err, res)=>{
                chai.assert.equal(res.statusCode, 200)
                done();
            });
        });
    })
}); 