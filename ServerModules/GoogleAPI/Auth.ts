import * as fs from 'fs';
import * as readline from 'readline';
import { google } from 'googleapis';
import { web } from '../Credentials/apiAuth.json';
import { OAuth2Client } from 'google-auth-library';

/**
 * APIトークンの返却値
 */
interface ApiToken {
    access_token: string;
    refresh_token: string;
    scope: string;
    id_token: string,
    expiry_date: number 
}

/**
 * API利用の承認処理を行う
 */
export class Auth {

    private readonly  Oauth2: OAuth2Client = new google.auth.OAuth2(
        web.client_id,
        web.client_secret,
        web.redirect_uris[0]
    );
    
    /*
    private readonly scope : string[] = [
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];
    */
    private readonly scope : string[];

    private readonly accessType: string = 'offline';

    constructor(scopes: string[]) {
        this.scope = scopes;
    }

    /**
     * APIを利用するためのトークンを取得する
     *
     */
    public getToken(): Promise<ApiToken>{

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
                        return;
                    }
                    if(!token) {
                        reject('No token');
                        console.error('token is undefined');
                        return;
                    }
                    this.Oauth2.setCredentials(token);
                    console.log("API TOKEN", token);
                    resolve(token as ApiToken);
                });
            });
        });
    }

    /**
     * 承認情報をJSONで出力し保存する
     * @param savePath 保存先のパス
     */
    public async saveForJson(savePath: string): Promise<void> {
        const token: {} = await this.getToken();
        fs.writeFile(savePath, JSON.stringify(token), (err) => {
            if (err) throw err;
            console.log('The file has been saved! see:', savePath);
        });
    }
}

