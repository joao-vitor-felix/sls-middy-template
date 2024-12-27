import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ZodSchema } from "zod";

import { HttpError } from "@/application/errors/HttpError";

export function zodValidator<T>(
  schema?: ZodSchema<T>
): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    before: request => {
      if (!schema) return;
      const result = schema.safeParse(request.event.body);
      if (result.error) {
        throw new HttpError(
          400,
          result.error.errors[0].message,
          "INVALID_REQUEST"
        );
      }
    }
  };
}
