import { google, fitness_v1 } from 'googleapis';
import { GoogleAPI } from './AbsGoogleAPI';
import token from "../Credentials/apiToken.json";

/**
 * Google Fit APIを呼び出し、各種機能を利用するクラス
//FIXME: 403エラーが発生する
 */
export class FitAPI extends GoogleAPI {

    private readonly fit: fitness_v1.Fitness;

    constructor() {
        const scope: string[] = [
            "https://www.googleapis.com/auth/fitness.activity.read"
        ]
        super(scope, token.people);
        this.fit = google.fitness({ version: 'v1', auth: this.auth.Oauth2 });
    }

    public async getUserData() {
        const response = await this.fit.users.dataSources.list({
            userId: 'me'
        });
        console.log("response: ", response);
        return response;
    }
}
