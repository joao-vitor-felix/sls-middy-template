import { HttpRequest, HttpResponse } from "../types/Http";
import { IController } from "../types/IController";

export class UpdateUserController
  implements IController<undefined, { userId: string }>
{
  async handler({
    params
  }: HttpRequest<undefined, { userId: string }>): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {
        userId: params?.userId
      }
    };
  }
}
