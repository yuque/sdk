import assert from "assert";
import Client from "./client";

interface DocArg{
    client:Client,
}
interface DocListArg{
    namespace:string,
}
interface DocGetArg{
    namespace:string,
    slug:string,
    data?:{
        raw:number
    }
}
type DocFormat='markdown'|'lake';
interface DocCreateArg{
    namespace:string,
    data:{
        title:string,
        slug:string,
        public?:number,
        format?:DocFormat,
        body:string,
    }
}
interface DocUpdateArg{
    namespace:string,
    id:string,
    data:{
        title?:string,
        slug?:string,
        public?:number,
        body?:string
    }
}
interface DocDeleteArg{
    namespace:string,
    id:string,
}

export default class Doc{
    private client:Client;
    constructor({client}:DocArg) {
        this.client=client;
    }
    public async list({namespace}:DocListArg){
        assert(namespace,'repo namespace or id is required');
        return this.client.request(`repos/${namespace}/docs`, { method: 'GET' });
    }
    public async get({namespace,slug,data}:DocGetArg){
        assert(namespace,'repo namespace or id is required');
        assert(slug,'doc slug or id is required');
        return this.client.request(`repos/${namespace}/docs/${slug}`, { method: 'GET', data });
    }
    public async create({namespace,data}:DocCreateArg){
        assert(namespace, 'repo namespace or id is required');
        return this.client.request(`repos/${namespace}/docs`, { method: 'POST', data });
    }
    public async update({ namespace, id, data }:DocUpdateArg) {
        assert(namespace, 'repo namespace or id is required');
        assert(id, 'doc id is required');
        return this.client.request(`repos/${namespace}/docs/${id}`, { method: 'PUT', data });
    }
    public async delete({ namespace, id }:DocDeleteArg) {
        assert(namespace, 'repo namespace or id is required');
        assert(id, 'doc id is required');
        return this.client.request(`repos/${namespace}/docs/${id}`, { method: 'DELETE' });
    }
}