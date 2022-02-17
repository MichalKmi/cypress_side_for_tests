module.exports = function () {
    const { faker } = require('@faker-js/faker');
    let _ = require('../../node_modules/lodash');
    return {
        people: _.times(20, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        })
    };
}