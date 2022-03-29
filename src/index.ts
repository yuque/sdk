import Client from './client';
import Group from "./group";
import User from "./user";
import Repo from "./repo";
import Doc from "./doc";
import {RequestOptions} from 'urllib';

export interface YuqueOptions {
    token: string,
    endpoint?: string,
    userAgent?: string,
    requestOpts?:RequestOptions,
    handler?:(res:any)=>any,
}
export interface GArg{
    client:Client,
}
export interface QArg{
    login?:string,
}

export default class Yuque {
    private options:YuqueOptions;
    public client:Client;
    public users:User;
    public groups:Group;
    public repos:Repo;
    public docs:Doc;
    public constructor(options: YuqueOptions) {
        this.options = options;
        const client = new Client(this.options);
        this.client=client;
        this.users = new User({client});
        this.groups = new Group({client});
        this.repos = new Repo({client});
        this.docs = new Doc({client});
    }
}