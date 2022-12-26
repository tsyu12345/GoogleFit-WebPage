import { google, fitness_v1 } from 'googleapis';
import { GoogleAPI } from './AbsGoogleAPI';

/**
 * Google Fit APIを呼び出し、各種機能を利用するクラス
 */
class FitAPI extends GoogleAPI {

    private fit: fitness_v1.Fitness;

    protected scopes: string[] = [
        "https://www.googleapis.com/auth/fitness.activity.read",
        "https://www.googleapis.com/auth/fitness.activity.write",
        "https://www.googleapis.com/auth/fitness.body.read",
        "https://www.googleapis.com/auth/fitness.location.read",
        "https://www.googleapis.com/auth/fitness.nutrition.read",
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


    /**
     * ハートポイントのデータを取得する
     * @param startTime 集計開始日
     * @param endTime　集計終了日
     * @returns 
     */
    public async getHeartPoints(startTime: Date, endTime: Date) {
        //convert Date to UnixTime
        const start = Math.floor(startTime.getTime() / 1000);
        const end = Math.floor(endTime.getTime() / 1000);
        //request
        const requestBody: Object = {
            aggregateBy: [
                {
                    dataTypeName: "com.google.heart_minutes.summary",
                    //dataSourceId: "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
                }
            ],
        }
        const response = await this.fit.users.dataset.aggregate({
                userId: 'me',
                requestBody: requestBody
        });
        console.log("response: ", response.data);
        return response.data;
    }
}

export default FitAPI;

//TEST Call
if(typeof require !== 'undefined' && require.main === module) {
    const run = async () => {
        const fit = new FitAPI();
        await fit.init();
        //await fit.getUserData();
        const startTime = new Date(2022, 10, 1);
        const endTime = new Date(2022, 12, 25);
        await fit.getHeartPoints(startTime, endTime);
    }
    run();
}
