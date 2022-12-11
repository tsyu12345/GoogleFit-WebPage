/**Node package */
import express from 'express';
/**Google API */
import PeopleAPI from './GoogleAPI/People';
import FitAPI from './GoogleAPI/Fit';

class Server {

    private app: express.Express;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 8000;
    }

    public run(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    /**
     * サーバーのレスポンスを設定する
     * @param url
     * @param callback  
     */
    public setResponse(url: string, callback: (req: express.Request, res: express.Response) => void): void{
        this.app.get(url, callback);
    }

}


function runServer(): void {
    const server = new Server();
    server.setResponse("/", (req, res) => {
        res.send("Hello World!");
    });
    peopleAPI(server);
    fitAPI(server);
}

/**
 * Google People APIを呼び出しラッパ
 * @param server 
 */
function peopleAPI(server:Server) {

    server.setResponse("/api/People", async (req, res) => {
        const people = new PeopleAPI();
        await people.init();
        res.send(await people.getPlofile());
    });
}

/**
 * Google Fit APIを呼び出しラッパ
 * @param server 
 */
function fitAPI(server:Server) {
    server.setResponse("/api/Fit", async (req, res) => {
        const fit = new FitAPI();
        await fit.init();
        const data = await fit.getUserData();
        res.send(data);
    });
}

runServer();


