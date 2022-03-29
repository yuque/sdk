import assert from "assert";
import httpclient, {RequestOptions} from 'urllib';

const extend = require('extend2');
import DBG from 'debug'
const debug=DBG('yuque');

import {YuqueOptions} from "./index";
class CError extends Error{
    public status?:string;
    public code?:number;
    public data?:any;
    public constructor(message?:string) {
        super(message);
    }
}

export default class Client {
    private options: YuqueOptions;

    public constructor(options: YuqueOptions) {
        this.options = Object.assign({
            endpoint: 'https://www.yuque.com/api/v2',
            userAgent: '@yuque/sdk',
        }, options);
        assert(this.options.token, 'token is required');
    }

    public async request(api:string,opts:RequestOptions) {
        const {endpoint, token, userAgent, requestOpts, handler} = this.options;
        const url=`${endpoint}${api}`;
        opts=extend(true,{
            method: 'GET',
            contentType: 'json',
            dataType: 'json',
            headers: {
                'User-Agent': userAgent,
                'X-Auth-Token': token,
            },
            gzip: true,

            // proxy
            rejectUnauthorized: !process.env.http_proxy,
            enableProxy: !!process.env.http_proxy,
            proxy: process.env.http_proxy,
        }, requestOpts, opts);
        debug(`${opts.method},${url}`);

        const res=await httpclient.request(url,opts);
        debug('response',res.data);

        //custom response
        if(handler) return handler(res);

        //default handler
        if(res.status !== 200){
            const err=new CError(res.data.message);
            /* istanbul ignore next */
            err.status = res.data.status || res.status;
            err.code = res.data.code;
            err.data = res;
            throw err;
        }
    }
}
