import { HttpRequest, HttpResponse, RequestBody, RequestParams } from "./Http";

export interface IController<
  TBody extends RequestBody = undefined,
  TParams extends RequestParams = undefined
> {
  handler(request: HttpRequest<TBody, TParams>): Promise<HttpResponse>;
}
