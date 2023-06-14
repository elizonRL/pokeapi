const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../app').app;
const usersController = require('../../auth/users.auth');
const teamsController = require('../teams.controller');


before((done)=>{
    usersController.registerUser('elizon', '1234');
    done();
})
afterEach((done)=>{
    teamsController.cleanUpTeam();
    done();
})
describe('suite de Prueba Teams', ()=>{
    it('Should return the team of the given user', (done)=>{
        let team =[{name:'Charizard'},{name:'Blastoise'}];
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'elizon', password: '1234'})
        .end((err, res)=>{
            let token = res.body.token
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .put('/teams')
            .send({
                team : team
            })
            .set('Authorization', `JWT ${token}`)
            .end((err, res)=>{
                chai.request(app)
                .get('/teams')
                .set('Authorization', `JWT ${token}`)
                .end((err, res)=>{
                    chai.assert.equal(res.statusCode, 200)
                    chai.assert.equal(res.body.trainer, 'elizon');
                    chai.assert.equal(res.body.team.length, team.length);
                    chai.assert.equal(res.body.team[0].name, team[0].name);
                    chai.assert.equal(res.body.team[1].name, team[1].name);
                    done();
                });
            });  
        });
    });
    it('Should return the pokedex Nomber', ()=>{
        let pokemonNAme ='Bulbasaur';
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'elizon', password: '1234'})
        .end((err, res)=>{
            let token = res.body.token
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .post('/teams/pokemons')
            .send({name : pokemonNAme})
            .set('Authorization', `JWT ${token}`)
            .end((err, res)=>{
                chai.request(app)
                .get('/teams')
                .set('Authorization', `JWT ${token}`)
                .end((err, res)=>{
                    chai.assert.equal(res.statusCode, 200)
                    chai.assert.equal(res.body.trainer, 'elizon');
                    chai.assert.equal(res.body.team.length, 1);
                    chai.assert.equal(res.body.team[0].name, pokemonNAme);
                    chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                    
                });
            });  
        });
    });

    it('Should return the delete pokemon', (done)=>{
        let team =[{name:'Charizard'},{name:'Blastoise'}];
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'elizon', password: '1234'})
        .end((err, res)=>{
            let token = res.body.token
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .put('/teams')
            .send({
                team : team
            })
            .set('Authorization', `JWT ${token}`)
            .end((err, res)=>{
                chai.request(app)
                .delete('/teams/pokemons/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res)=>{
                    chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res)=>{
                        chai.assert.equal(res.statusCode, 200)
                        chai.assert.equal(res.body.trainer, 'elizon')
                        chai.assert.equal(res.body.team.length, team.length-1)
                        done();
                    })
                    
                });
            });  
        });
    });

    it('Should return the error for the 6 pokemon', ()=>{
        let team =[
            {name:'Charizard'},
            {name:'Blastoise'},
            {name:'pikachu'},
            {name:'charmander'},
            {name:'bulbasaur'},
            {name:'Pidgeotto'}];
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'elizon', password: '1234'})
        .end((err, res)=>{
            let token = res.body.token
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .put('/teams')
            .send({
                team : team
            })
            .set('Authorization', `JWT ${token}`)
            .end((err, res)=>{
                chai.request(app)
                .post('/teams/pokemons')
                .send({name: 'venusaur'})
                .set('Authorization', `JWT ${token}`)
                .end((err, res)=>{
                    chai.assert.equal(res.statusCode, 400);
                    
                });
            });  
        });
    });
});

after(async ()=>{
    await usersController.cleanUpUser();
})