const axios = require('axios');

exports.list = async function (req, res) {
    let queryParams = '';
    if (req.query.description !== undefined && req.query.description !== '') {
        queryParams += queryParams === '' ? '?' : '&';
        queryParams += 'description='+req.query.description;
    }
    if (req.query.location !== undefined && req.query.location !== '') {
        queryParams += queryParams === '' ? '?' : '&';
        queryParams += 'location='+req.query.location;
    }
    if (req.query.full_time !== undefined && req.query.full_time === 'true') {
        queryParams += queryParams === '' ? '?' : '&';
        queryParams += 'full_time=true';
    }
    if (req.query.page !== undefined && req.query.page !== '') {
        queryParams += queryParams === '' ? '?' : '&';
        queryParams += 'page='+req.query.page;
    }
    
    try {
        const data = await axios.get('http://dev3.dansmultipro.co.id/api/recruitment/positions.json'+queryParams);
        res.status(200).send(data.data);
    } catch(err) {
        res.status(200).send([]);
    }
};

exports.detail = async function (req, res) {
    const data = await axios.get('http://dev3.dansmultipro.co.id/api/recruitment/positions/'+req.params.id);

    res.status(200).send(data.data);
};