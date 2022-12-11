import { google, people_v1 } from "googleapis";
import { GoogleAPI } from "./AbsGoogleAPI";
import token from "../Credentials/apiToken.json";

/**
    Google People APIを呼び出し、利用するクラス
*/
class PeopleAPI extends GoogleAPI {
    
    private people: people_v1.People;

    protected scopes: string[] = [
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]

    constructor() {
        super();
        this.people = null as unknown as people_v1.People;
    }

    public async init(): Promise<void> {
        const client = await this.getClient();
        this.people = google.people({ version: 'v1', auth: client });
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

export default PeopleAPI;
