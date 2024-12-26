import { randomUUID } from "node:crypto";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { File } from "@/application/types/File";

import { HttpRequest, HttpResponse } from "../types/Http";
import { IController } from "../types/IController";

type UploadBody = {
  file: File;
};

export class UploadController implements IController<UploadBody> {
  constructor(private readonly s3Client: S3Client) {}
  async handler(request: HttpRequest<UploadBody>): Promise<HttpResponse> {
    const { file } = request.body;
    const newFileName = `${randomUUID()}-${file.filename}`;
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: newFileName,
      Body: file.content
    });

    await this.s3Client.send(putObjectCommand);
    return {
      statusCode: 200,
      body: {
        filename: newFileName
      }
    };
  }
}
