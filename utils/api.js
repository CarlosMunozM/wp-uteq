const https = require('https');
const http = require('http');

async function makeRequestGETWS(pathUrl, useHttps = true) {
    const agent = new (useHttps ? https : http).Agent({
        rejectUnauthorized: false
    });

    try {
        const response = await new Promise((resolve, reject) => {
            (useHttps ? https : http).get(pathUrl, { agent }, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const jsonObject = JSON.parse(data);
                        resolve(jsonObject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', reject);
        });

        return response;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

async function makeRequestPOSTWS(pathUrl, body, options) {
    const agent = new (options.useHttps ? https : http).Agent({
        rejectUnauthorized: false
    });

    try {
        const postData = JSON.stringify(body);

        const response = await new Promise((resolve, reject) => {
            const req = (options.useHttps ? https : http).request(pathUrl, {
                method: 'POST',
                agent,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            }, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const jsonObject = JSON.parse(data);
                        resolve(jsonObject);
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            req.on('error', reject);
            req.write(postData);
            req.end();
        });

        return response;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

module.exports = { makeRequestGETWS,makeRequestPOSTWS };