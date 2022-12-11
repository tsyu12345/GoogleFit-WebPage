import { google, fitness_v1 } from 'googleapis';
import { GoogleAPI } from './AbsGoogleAPI';

/**
 * Google Fit APIを呼び出し、各種機能を利用するクラス
//FIXME: 403エラーが発生する
 */
class FitAPI extends GoogleAPI {

    private fit: fitness_v1.Fitness;

    protected scopes: string[] = [
        "https://www.googleapis.com/auth/fitness.activity.read"
    ]

    constructor() {
        super();
        this.fit = null as unknown as fitness_v1.Fitness;
    }

    public async init(): Promise<void> {
        const client = await this.getClient();
        this.fit = google.fitness({ version: 'v1', auth: client });
    }

    public async getUserData() {
        const response = await this.fit.users.dataSources.list({
            userId: 'me'
        });
        console.log("response: ", response.data);
        return response.data;
    }
}

export default FitAPI;
