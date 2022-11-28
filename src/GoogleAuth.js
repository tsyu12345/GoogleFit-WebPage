const readline = require('readline');
const {google} = require('googleapis');
/**import auth json */
const {web} = require('./lib/GoogleAPI/credentials.json');
//import { OAuth2Client } from 'google-auth-library';

class GoogleAuth {

    auth = new google.auth.OAuth2(
        web.client_id,
        web.client_secret,
        web.redirect_uris[0]
    );;

    scope = [
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

    accessType = 'offline';

    constructor() {
    }



    getToken(){

        const authUrl = this.auth.generateAuthUrl({
            access_type: this.accessType,
            scope: this.scope
        });

        console.log('Authorize this app by visiting this url:', authUrl);
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            this.auth.getToken(code, (err, token) => {
                if (err) {
                    return console.error('Error retrieving access token', err);
                }
                if(!token) {
                    return console.error('token is undefined');
                }
                this.auth.setCredentials(token);
                console.log(token);
            });
        });
    }
}

const googleAuth = new GoogleAuth();
googleAuth.getToken();