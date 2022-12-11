import { google } from 'googleapis';
import credential from '../Credentials/planar-osprey-368109-ef58e3863f65.json';
import { JWT } from "google-auth-library/build/src/auth/jwtclient";

/**
 * サービスアカウント認証を行うクラス
 */
class Auth {

    private readonly scope: string[];
    private readonly accessType: string = 'offline';
    private clientOptions: Object = { subject: 'fitwebapp@planar-osprey-368109.iam.gserviceaccount.com' };

    public client: JWT;
    
    constructor(scopes: string[]) {
        this.scope = [...scopes];
        this.client = null as unknown as JWT;
    }

    public async init(): Promise<void> {
        this.client = await google.auth.getClient({
            credentials: credential,
            scopes: this.scope,
            clientOptions: this.clientOptions
        }) as JWT;
    }
}

export default Auth;

//TEST CODE
if(require.main === module && typeof require !== 'undefined') {
    const auth = new Auth([
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]);
    /*
    auth.getClient().then(async (client) => {
        const People = google.people({ version: 'v1', auth: client });
        const info = await People.people.get({
            resourceName: 'people/me',
            personFields: 'names,emailAddresses,photos'
        });
        console.log("info: ", info);
        console.log("info.data: ", info.data);
        
    });
    */
}
    