/**Google APIs */
const { google } = require('googleapis');
/** */
const { GoogleAuth } = require('./Auth');
const GoogleAPI = require('./APIToken.json');

/**
    Google People APIを呼び出し、利用するクラス
    todo: TS化
*/
export class PeopleAPI {
    
    people;
    auth;
    
    constructor() {
        
        this.auth = new GoogleAuth();
        
        this.auth.Oauth2.setCredentials({
            access_token:GoogleAPI.access_token,
            refresh_token:GoogleAPI.refresh_token,
            scope:GoogleAPI.scope,
            token_type:GoogleAPI.token_type,
            expiry_date:GoogleAPI.expiry_date
        });
        this.people = google.people({ version: 'v1', auth: this.auth.Oauth2 });
    }

    async getProfile() {
        const res = await this.people.people.get({
            resourceName: 'people/me',
            personFields: 'names,emailAddresses,photos'
        });
        return res.data;
    }

    /**
     * get url of user photo from People API's response
     * @returns url of user photo
     */
    async getPhotoURL() {
        const profile = await this.getProfile();
        const url = profile.photos[0].url;
        console.log(url);
        return url;
    }
}


/**
 * TEST
 */
//const peopleAPI = new PeopleAPI();
//peopleAPI.getPhoto();