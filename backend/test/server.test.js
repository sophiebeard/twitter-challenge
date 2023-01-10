import chaiHttp from 'chai-http';
import { beforeEach, describe } from 'mocha';
import Peep from '../models/peep.model.js';
import User from '../models/user.model.js';
import testPeeps from '../mockData/testPeeps.js';
import testUsers from '../mockData/testUsers.js';
import chai, { expect } from 'chai';
import server from '../server.js';
import { successfulPeep, unsuccessfulPeep, invalidPeep, successfulUser, invalidEmail, invalidUsername2, invalidPassword, invalidName, invalidName2, invalidUsername, successfulLogin, invalidLoginEmail, invalidLoginPassword } from './testConstants.js';

chai.use(chaiHttp);

describe(`All server tests`, () => {

    describe(`Peep server tests`, () => {

        beforeEach(async () => {
            await Peep.deleteMany()
                .then(() => console.log(`All peeps deleted.`))
                .catch(err => {
                    console.log(`Error deleting all peeps.`);
                    throw new Error();
                });

            await Peep.insertMany(testPeeps)
                .then(() => console.log(`All test peeps added.`))
                .catch(err => {
                    console.log(`Error adding test peeps.`);
                    throw new Error();
                });
        });

        describe(`index route tests`, () => {

            it(`should return all the test peeps.`, async () => {

                // Act
                const res = await chai.request(server)
                    .get(`/`)

                // Assert
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an(`array`);
                expect(res.body.length).to.be.equal(testPeeps.length);
            });

            it(`should return the peeps in reverse chronological order`, async () => {

                // Act
                const res = await chai.request(server)
                    .get(`/`)

                // Assert
                expect(res.body[3].namePeep).to.be.equal(`Carolyn`);
                expect(res.body[2].namePeep).to.be.equal(`Ben`);
                expect(res.body[1].namePeep).to.be.equal(`Molly`);
                expect(res.body[0].namePeep).to.be.equal(`Sophie`);
            });
        });

        describe(`post route tests`, () => {

            it(`should have a 201 status when a peep is peeped`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/post`)
                    .send(successfulPeep);

                // Assert
                expect(res).to.have.status(201);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Peep successfully peeped!`);
            });

            it(`should have a 422 status when a peep is invalid`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/post`)
                    .send(unsuccessfulPeep);

                // Assert
                expect(res).to.have.status(422);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Peep upload unsuccessful`);
            });

            it(`should have a 422 status when a peep included forbidden characters`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/post`)
                    .send(invalidPeep);

                // Assert
                expect(res).to.have.status(422);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Invalid peep input data`);
            });
        });
    });

    describe(`Users server tests`, () => {

        beforeEach(async () => {
            await User.deleteMany()
                .then(() => console.log(`All users deleted`))
                .catch(err => {
                    console.log(`Error deleting all users`);
                    throw new Error();
                });

            await User.insertMany(testUsers)
                .then(() => console.log(`All test users added`))
                .catch(err => {
                    console.log(`Error adding test users`);
                    throw new Error();
                });
        });

        describe(`register route tests`, () => {

            it(`should have a 201 status when the user is successfully registered`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/register`)
                    .send(successfulUser);

                // Assert
                expect(res).to.have.status(201);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `User registration successful`);
            });

            it(`should give an alert message when the email already exists`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/register`)
                    .send(invalidEmail);

                // Assert
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `This email has already been registered. Login instead.`);
            });

            it(`should not register an email if it already exists`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/register`)
                    .send(invalidEmail)

                // Assert
                expect(res).to.not.have.status(201);
            });

            it(`should not register a username if it already exists`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/register`)
                    .send(invalidUsername2);

                // Assert
                expect(res).to.not.have.status(201);
            });

            it(`should have a 422 status when an invalid password is used`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/register`)
                    .send(invalidPassword);

                // Assert
                expect(res).to.have.status(422);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Invalid registration data`);
            });

            it(`should have a 422 status when a name input is too short`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/register`)
                    .send(invalidName);

                // Assert
                expect(res).to.have.status(422);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Invalid registration data`);
            });

            it(`should have a 422 status if the name includes anything but letters`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/register`)
                    .send(invalidName2);

                // Assert
                expect(res).to.have.status(422);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Invalid registration data`);
            });

            it(`should have a 422 status if the username contains anything other than letters and numbers`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/register`)
                    .send(invalidUsername);

                // Assert
                expect(res).to.have.status(422);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Invalid registration data`);
            });
        });

        describe(`login route tests`, () => {

            it(`should have a 200 status when a user logs in`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/login`)
                    .send(successfulLogin);

                // Assert
                expect(res).to.have.status(200);
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Login successful!`);
            });

            it(`should send a message alert when the email is not registered`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/login`)
                    .send(invalidLoginEmail);

                // Assert
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Invalid input data`);
            });

            it(`should send a message alert when the password is wrong`, async () => {

                // Act
                const res = await chai.request(server)
                    .post(`/login`)
                    .send(invalidLoginPassword);

                // Assert
                expect(res.body).to.be.an(`object`);
                expect(res.body).to.have.property(`message`, `Invalid input data`);
            });
        });
    });
});


