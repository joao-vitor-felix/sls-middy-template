export type RequestBody = Record<string, any> | undefined;
export type RequestParams = Record<string, string> | undefined;

export type HttpRequest<
  TBody extends RequestBody = undefined,
  TParams extends RequestParams = undefined
> = {
  body: TBody;
  headers?: Record<string, string>;
  params: TParams;
};

export type HttpResponse = {
  statusCode: number;
  body?: Record<string, any>;
  headers?: Record<string, string>;
};
