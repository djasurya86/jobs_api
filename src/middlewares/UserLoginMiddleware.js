const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const functions = require('../helpers/functions');

module.exports =  async function (req, res, next) {
    let error = false;
    let user;
    if(req.headers.token === undefined) {
        error = true;
    } else {
        user = functions.jsonParse_bigInt(await prisma.user.findFirst({
            where: {
                jwt_token: req.headers.token
            }
        }));
        if(user === null) {
            error = true;
        }
    }

    if(error) {
        res.status(401).send({
            error: 'Unauthorized'
        }).end();
    } else {
        req.user = user;
        next();
    }
}