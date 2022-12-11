import Auth from "./ServiceAccountAuth";
/**
 * Googleの各種APIを利用するクラスを作成するさいの基底クラス
 */
export abstract class GoogleAPI {

    protected abstract scopes: string[];

    protected abstract init(): Promise<void>;

    protected async getClient() {
        const auth = new Auth(this.scopes);
        await auth.init();
        return auth.client;
    }

}