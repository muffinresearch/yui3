#!/usr/bin/env node

var path = require('path');

var base = path.join(__dirname, '../../');

var paths = require('./parse');

var travis = process.env.TRAVIS;

//Skip this long running tests in travis
var skipping = [
    'io',
    'anim',
    'dd',
    'charts',
    'graphics'
];

var skip = function(p) {
    var ret = false;
    if (!travis) { //Not in travis, run all tests
        return false;
    }
    skipping.forEach(function(i) {
        if (p.indexOf(path.join(i, 'tests/')) === 0) {
            ret = true;
        }
    });

    return ret;
};

var out = [];

paths.forEach(function(p, i) {
    if (!skip(p)) {
        out.push(path.join(base, p));
    }
});

module.exports = out;
