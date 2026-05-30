import { StoragePort } from "../ports/storage.port.js";
import AWS from "aws-sdk";
import crypto from "crypto";
import path from "path";
import sharp from "sharp";

export class S3StorageAdapter extends StoragePort {
  constructor(config) {
    super();
    this.bucket = config.env.AWS_S3_BUCKET;
    this.s3 = new AWS.S3({
      accessKeyId: config.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.env.AWS_SECRET_ACCESS_KEY,
      region: config.env.AWS_REGION,
    });
  }

  #generateSafeFilename() {
    const uuid = crypto.randomUUID();
    return `${uuid}.webp`;
  }

  async upload(file, pathFolder = "", options = {}) {
    try {
      const safeFilename = this.#generateSafeFilename();
      const fileKey = pathFolder
        ? `${pathFolder}/${safeFilename}`.replace(/\/+/g, "/")
        : safeFilename;

      // Image Processing with Sharp
      let pipeline = sharp(file.buffer);

      if (options.width || options.height) {
        pipeline = pipeline.resize(options.width, options.height, {
          fit: options.fit || "cover",
          position: "center",
        });
      }

      const processedBuffer = await pipeline
        .webp({ quality: options.quality || 80 })
        .toBuffer();

      const params = {
        Bucket: this.bucket,
        Key: fileKey,
        Body: processedBuffer,
        ContentType: "image/webp",
        ACL: "public-read",
      };

      await this.s3.upload(params).promise();

      return {
        key: fileKey,
        url: this.getUrl(fileKey),
      };
    } catch (error) {
      throw new Error(`S3 Upload failed: ${error.message}`);
    }
  }

  async delete(key) {
    try {
      if (!key) return;

      const cleanKey = key.includes("://") ? key.split(".com/").pop() : key;

      const params = {
        Bucket: this.bucket,
        Key: cleanKey,
      };
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      console.error(`S3 Delete failed for key ${key}:`, error);
    }
  }

  async update(file, oldKey, pathFolder = "", options = {}) {
    const newFileResult = await this.upload(file, pathFolder, options);

    if (oldKey) {
      this.delete(oldKey).catch(error => {
        console.error(`Background S3 delete failed for old key ${oldKey}:`, error);
      });
    }

    return newFileResult;
  }

  getUrl(key) {
    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }
}
