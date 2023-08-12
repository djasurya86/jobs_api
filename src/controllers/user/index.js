const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const functions = require('../../helpers/functions');

exports.login = async function (req, res) {
    const errors = [];
    if (req.body.username === undefined || validator.isEmpty(req.body.username)) {
        errors.push('Username is Required.');
    }
    if (req.body.password === undefined || validator.isEmpty(req.body.password)) {
        errors.push('Password is Required.');
    }
    if (errors.length > 0) {
        res.status(422).send({
            errors: errors
        });
    } else {
        let user = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        });

        if(user === null) {
            res.status(422).send({
                errors: [
                    'User is Not Found'
                ]
            });
        } else {
            let password = req.body.password;
            password = crypto.createHash('md5').update(password).digest("hex");
            password = crypto.createHash('sha1').update(password).digest("hex");
            if(password !== user.password) {
                res.status(422).send({
                    errors: [
                        'Password is Incorrect'
                    ]
                });
            } else {
                user = functions.jsonParse_bigInt(await prisma.user.update({
                    data: {
                        jwt_token: jwt.sign(functions.jsonParse_bigInt(user), 'wordHQ_user')
                    },
                    where : {
                        id: user.id
                    }
                }));

                res.status(200).send({
                    username: user.username,
                    jwt_token: user.jwt_token
                });
            }
        }
    }
};