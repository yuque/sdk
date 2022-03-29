import Client from './client';
import {RequestOptions} from 'urllib';

interface YuqueOptions {
    token: string,
    endpoint?: string,
    userAgent?: string,
    requestOpts?:RequestOptions,
    handler?:(res:any)=>any,
}

export default class Yuque {
    private options:YuqueOptions;
    public client:Client;
    public constructor(options:YuqueOptions) {
        this.options=options;
        this.client=new Client();
    }
}