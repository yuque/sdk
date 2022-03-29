import * as doc from './doc';
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
    public constructor(options:YuqueOptions) {
        this.options=options;

    }
}