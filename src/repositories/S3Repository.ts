import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export class S3Repository {
  private client: S3Client;
  private bucketName: string;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION || "sa-east-1",
    });
    this.bucketName = process.env.S3_BUCKET_NAME || "svx-csv";
  }

  async getCsvContent(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.client.send(command);

    if (response.Body) {
      const byteArray = await response.Body.transformToByteArray();
      return Buffer.from(byteArray);
    } else {
      throw new Error("Arquivo vazio ou não encontrado no S3");
    }
  }
}
