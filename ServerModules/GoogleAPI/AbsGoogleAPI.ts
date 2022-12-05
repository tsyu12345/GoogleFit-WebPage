import { Auth, ApiToken } from './Auth';
/**
 * Googleの各種APIを利用するクラスを作成するさいの基底クラス
 */
export abstract class GoogleAPI {
    protected readonly auth: Auth;
    protected readonly scope : string[];
    protected readonly token: ApiToken;

    constructor(scope: string[], token: ApiToken) {
        this.scope = [...scope];
        this.token = token;
        this.auth = new Auth(this.scope);
        this.auth.setCredentials(this.token);
    }

    
}