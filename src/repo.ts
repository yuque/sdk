import assert from "assert";
import {GArg,QArg} from "./index";
import Client from "./client";

interface RListArg{
    user?:string,
    group?:string,
    data?:{
        type?:'Book'|'Design'|'Column'|'all',
        include_membered:boolean,
        offset:number,
    }
}
interface RCreateArg{
    user?:string,
    group?:string,
    data:{
        name:string,
        slug:string,
        type:'Book'|'Design'|'Column',
        description?:string,
        public:0|1,
    }
}
interface RGetArg {
    namespace:string|number,
    data:{
        type?:'Book'|'Design'|'Column',
    }
}
interface RUpdateArg{
    namespace:string|number,
    data:{
        name?:string,
        slug?:string,
        toc?:string,
        description?:string,
        public:0|1,
    }
}
interface RGArg {
    namespace:string|number,
}

export default class Repo{
    private client: Client;
    public constructor({client}:GArg) {
        this.client=client;
    }
    public async list({ user, group, data }:RListArg) {
        assert(user || group, 'user or group is required');
        const api = user ? `users/${user}/repos` : `groups/${group}/repos`;
        return this.client.request(api, { method: 'GET', data });
    }
    public async create({ user, group, data }:RCreateArg) {
        assert(user || group, 'user or group is required');
        const api = user ? `users/${user}/repos` : `groups/${group}/repos`;
        return this.client.request(api, { method: 'POST', data });
    }
    public async get({ namespace, data }:RGetArg) {
        assert(namespace, 'namespace is required');
        return this.client.request(`repos/${namespace}`, { method: 'GET', data });
    }
    public async update({ namespace, data }:RUpdateArg) {
        assert(namespace, 'namespace is required');
        return this.client.request(`repos/${namespace}`, { method: 'PUT', data });
    }
    public async delete({ namespace }:RGArg) {
        assert(namespace, 'namespace is required');
        return this.client.request(`repos/${namespace}`, { method: 'DELETE' });
    }
    public async getTOC({ namespace }:RGArg) {
        assert(namespace, 'namespace is required');
        return this.client.request(`repos/${namespace}/toc`, { method: 'GET' });
    }
}