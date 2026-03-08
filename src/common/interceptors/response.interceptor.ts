import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stream } from 'stream';

export interface DefaultResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, DefaultResponse<T> | any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<DefaultResponse<T> | any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        return next.handle().pipe(
            map((res) => {
                // Do not intercept if it's a stream or buffer (e.g., file downloads)
                if (res instanceof Stream || Buffer.isBuffer(res)) {
                    return res;
                }

                // If response already explicitly has 'success' field, return as is (avoid double wrapping)
                if (typeof res === 'object' && res !== null && !Array.isArray(res) && 'success' in res) {
                    return res;
                }

                let message = 'Request successful';
                let data: any = res;
                let meta: any = undefined;

                // Handle null/undefined responses
                if (res === null || res === undefined) {
                    return {
                        success: true,
                        message,
                        data: res,
                    };
                }

                // Determine if response is already partially structured
                if (typeof res === 'object' && !Array.isArray(res)) {
                    const expectedKeys = ['data', 'message', 'meta'];
                    const keys = Object.keys(res);
                    const hasOnlyExpectedKeys = keys.length > 0 && keys.every((key) => expectedKeys.includes(key));

                    if (hasOnlyExpectedKeys) {
                        if ('message' in res) {
                            message = res.message;
                        }
                        if ('data' in res) {
                            data = res.data;
                        } else if (!('data' in res) && keys.length > 0) {
                            // cases like just { message: '...' }
                            data = null;
                        }
                        if ('meta' in res) {
                            meta = res.meta;
                        }
                    }
                }

                const formattedResponse: DefaultResponse<T> = {
                    success: true,
                    message,
                    data,
                };

                if (meta !== undefined) {
                    formattedResponse.meta = meta;
                }

                return formattedResponse;
            }),
        );
    }
}
