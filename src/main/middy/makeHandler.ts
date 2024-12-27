import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";
import httpResponseSerializer from "@middy/http-response-serializer";
import { ZodSchema } from "zod";

import { IController } from "@/application/types/IController";
import { errorHandler } from "@/main/middy/middlewares/errorHandler";

import { sanitizeObject } from "../utils/sanitizeObject";
import { zodValidator } from "./middlewares/zodValidator";

export function makeHandler(
  controller: IController<any, any>,
  schema?: ZodSchema
) {
  return middy()
    .use(
      httpJsonBodyParser({
        disableContentTypeError: true
      })
    )
    .use(
      httpMultipartBodyParser({
        disableContentTypeError: true
      })
    )
    .use(
      httpResponseSerializer({
        defaultContentType: "application/json",
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body)
          }
        ]
      })
    )
    .use(zodValidator(schema))
    .use(errorHandler())
    .handler(async event => {
      console.log(event.pathParameters);
      return controller.handler({
        body: event.body,
        headers: sanitizeObject(event.headers),
        params: sanitizeObject(event.pathParameters)
      });
    });
}
