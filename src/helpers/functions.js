const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    jsonParse_bigInt: function(data) {
        return JSON.parse(this.toJson(data));
    },
    toJson: function(data) {
        return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v).replace(/"(-?\d+)n"/g, (_, a) => a);
    },
    showStatic: function(path, req) {
        return (path.replace('static',process.env.PROTOCOL+'://'+req.get('host')));
    }
};