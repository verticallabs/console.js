var mocha = require('mocha');
global.sinon = require('sinon');
var chai = require('chai');
chai.config.includeStack = true;
chai.use(require('chai-as-promised'));
chai.use(require('chai-properties'));
global.expect = chai.expect;
