const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
/**import auth json */
const { web } = require('./Credentials.json');
//import { OAuth2Client } from 'google-auth-library';

class GoogleAuth {

    Oauth2 = new google.auth.OAuth2(
        web.client_id,
        web.client_secret,
        web.redirect_uris[0]
    );

    scope = [
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

    accessType = 'offline';

    constructor() {}

    getToken(){

        const authUrl = this.Oauth2.generateAuthUrl({
            access_type: this.accessType,
            scope: this.scope
        });

        console.log('Authorize this app by visiting this url:', authUrl);
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((resolve, reject) => {
            rl.question('Enter the code from that page here: ', (code) => {
                rl.close();
                this.Oauth2.getToken(code, (err, token) => {
                    if (err) {
                        reject(err);
                        console.error('Error retrieving access token', err);
                    }
                    if(!token) {
                        reject('No token');
                        return console.error('token is undefined');
                    }
                    this.Oauth2.setCredentials(token);
                    console.log("API TOKEN", token);
                    resolve(token);
                });
            });
        });
    }

    async saveForJson() {
        const token = await this.getToken();
        fs.writeFile('GoogleAPI.json', JSON.stringify(token), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}

module.exports = { GoogleAuth };