var assert = require('assert');
var authController = require('../../controllers/auth.controller.js');
var { expect, should } = require('chai');
var chai = require('chai');
var chaiAsPromised = require ('chai-as-promised');
var sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();

should();

describe('AuthController', function() {
    beforeEach(function settingUpRoles() {
        // console.log('running before each');
        // authController.setRoles(['user']);
    });

    describe('isAuthorized', function() {
        var user = {};
        beforeEach(function () {
            user = {
                roles: ['user'],
                isAuthorized: function(neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
            sinon.spy(user, 'isAuthorized');
            authController.setUser(user);
        });

        it('Should return false if not authorized', function() {
            var isAuth = authController.isAuthorized('admin');
            user.isAuthorized.calledOnce.should.be.true;
            expect(isAuth).to.be.false;
        });

        it('Should return true if authorized', function() {
            authController.setRoles(['user', 'admin']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
        });

        it('should not allow a get if not authorized');
        it('should allow get if authorized');
    });

    describe('isAuthorizedAsync', function() {
        it('Should return false if not authorized', function(done) {
            this.timeout(2500);
            var user = {};
            authController.setUser(user);
            authController.setRoles(['user']);
            authController.isAuthorizedAsync('admin', function(isAuth) {
                assert.equal(false, isAuth);
                done();
            });            
        });
    });

    describe('isAuthorizedPromise', function() {
        it('Should return false if not authorized', function() {
            var user = {};
            authController.setUser(user);
            authController.setRoles(['user']);
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        });
    });

    describe('getIndex', function() {
        var user = {};
        beforeEach(function () {
            user = {
                roles: ['user'],
                isAuthorized: function(neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
        });

        it('should render index if authorized', function() {
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
            var req = {user: user};
            var res = {
                render: function() {}
            };
            var mock = sinon.mock(res);
            mock.expects('render').once().withExactArgs('index');

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;

            mock.verify();
        });
    });
});