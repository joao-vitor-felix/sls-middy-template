import { HttpResponse } from "../types/Http";
import { IController } from "../types/IController";

export class ListUsersController implements IController {
  async handler(): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {
        users: []
      }
    };
  }
}
