import assert from "assert";
import {GArg, QArg} from "./index";
import Client from "./client";

interface GCreate{
    data:{
        name:string,
        login:string,
        description?:string,
    }
}
interface GGetArg {
    login:string
}
interface GAddUserArg{
    group:string,
    user:string,
    data:{
        role:0|1,
    }
}
interface GUArg{
    group:string,
    user:string,
}

export default class Group {
    private client: Client;

    public constructor({client}: GArg) {
        this.client = client;
    }

    public async list({login}: QArg = {}) {
        const api: string = login ? `users/${login}/groups` : 'groups';
        return this.client.request(api, {method: 'GET'});
    }
    public async create({ data }:GCreate) {
        assert(data, 'data is required');
        assert(data.name, 'data.name is required');
        assert(data.login, 'data.login is required');
        return this.client.request('groups', { method: 'POST', data });
    }
    public async get({ login }:GGetArg) {
        assert(login, 'group login or id is required');
        return this.client.request(`groups/${login}`, { method: 'GET' });
    }
    public async listUser({ login }:GGetArg) {
        assert(login, 'group login or id is required');
        return this.client.request(`groups/${login}/users`, { method: 'GET' });
    }
    public async addUser({ group, user, data }:GAddUserArg) {
        assert(group, 'group login or id is required');
        assert(user, 'user login or id is required');
        return this.client.request(`groups/${group}/users/${user}`, { method: 'PUT', data });
    }
    public async removeUser({ group, user }:GUArg) {
        assert(group, 'group login or id is required');
        assert(user, 'user login or id is required');
        return this.client.request(`groups/${group}/users/${user}`, { method: 'DELETE' });
    }
}