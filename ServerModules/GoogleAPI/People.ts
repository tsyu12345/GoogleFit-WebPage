import { google, people_v1 } from "googleapis";
import { GoogleAPI } from "./AbsGoogleAPI";
import token from "../Credentials/apiToken.json";

/**
    Google People APIを呼び出し、利用するクラス
*/
export class PeopleAPI extends GoogleAPI {
    
    private people: people_v1.People;

    constructor() {
        const scope: string[] = [
            'https://www.googleapis.com/auth/contacts',
            'https://www.googleapis.com/auth/userinfo.profile'
        ];
        super(scope, token.people);
        this.people = google.people({ version: 'v1', auth: this.auth.Oauth2 });

    }

    protected initAPI(): void {
        this.people = google.people({ version: 'v1', auth: this.auth.Oauth2 });
    }

    /**
     * getメソッドを呼び出し、ユーザープロフィールを取得する
     * @returns profile of user
     */
    public async getPlofile(): Promise<people_v1.Schema$Person> {
        const response = await this.people.people.get({
            resourceName: 'people/me',
            personFields: 'names,emailAddresses,photos'
        });
        return response.data;
    }
}
