import { expect } from 'chai';
import supertest from 'supertest';
import { describe, it } from 'mocha'; // Asegúrate de importar describe e it desde 'mocha'
import app from '../../app.js'; // Importa la aplicación Express desde app.js

const requestWithSupertest = supertest(app); // Usaremos esta función para realizar las peticiones HTTP

describe('GET "/pets"', () => {
    it('should return all pets', async () => {
        const res = await requestWithSupertest.get('/pets');
        expect(res.status).to.equal(200);
        expect(res.type).to.include('json');
        expect(res.body).to.deep.equal([
            {
                id: 1,
                name: 'Rex',
                type: 'dog',
                age: 3,
                breed: 'labrador',
            },
            {
                id: 2,
                name: 'Fido',
                type: 'dog',
                age: 1,
                breed: 'poodle',
            },
            {
                id: 3,
                name: 'Mittens',
                type: 'cat',
                age: 2,
                breed: 'tabby',
            },
        ]);
    });
});

describe('GET "/pets/:id"', () => {
    it('should return a specific pet', async () => {
        const res = await requestWithSupertest.get('/pets/1');
        expect(res.status).to.equal(200);
        expect(res.type).to.include('json');
        expect(res.body).to.deep.equal({
            id: 1,
            name: 'Rex',
            type: 'dog',
            age: 3,
            breed: 'labrador',
        });
    });
});

describe('PUT "/pets/:id"', () => {
    it('should update a pet and return it', async () => {
        const res = await requestWithSupertest.put('/pets/1').send({
            id: 1,
            name: 'Rexo',
            type: 'dogo',
            age: 4,
            breed: 'doberman',
        });
        expect(res.status).to.equal(200);
        expect(res.type).to.include('json');
        expect(res.body).to.deep.equal({
            id: 1,
            name: 'Rexo',
            type: 'dogo',
            age: 4,
            breed: 'doberman',
        });
    });
});

describe('POST "/pets"', () => {
    it('should add a new pet and return it', async () => {
        const res = await requestWithSupertest.post('/pets').send({
            name: 'Salame',
            type: 'cat',
            age: 6,
            breed: 'pinky',
        });
        expect(res.status).to.equal(200);
        expect(res.type).to.include('json');
        expect(res.body).to.deep.equal({
            id: 4,
            name: 'Salame',
            type: 'cat',
            age: 6,
            breed: 'pinky',
        });
    });
});

describe('DELETE "/pets/:id"', () => {
    it('should delete a pet and return the updated list', async () => {
        const res = await requestWithSupertest.delete('/pets/2');
        expect(res.status).to.equal(200);
        expect(res.type).to.include('json');
        expect(res.body).to.deep.equal([
            {
                id: 1,
                name: 'Rexo',
                type: 'dogo',
                age: 4,
                breed: 'doberman',
            },
            {
                id: 3,
                name: 'Mittens',
                type: 'cat',
                age: 2,
                breed: 'tabby',
            },
            {
                id: 4,
                name: 'Salame',
                type: 'cat',
                age: 6,
                breed: 'pinky',
            },
        ]);
    });
});
