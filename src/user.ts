import {GArg, QArg} from "./index";
import Client from "./client";

export default class User {
    private client: Client;

    public constructor({client}: GArg) {
        this.client = client;
    }

    public async get({login}: QArg = {}) {
        const api = login ? `users/${login}` : 'user';
        return this.client.request(api, {method: 'GET'});
    }
}