import { StoragePort } from "../ports/storage.port.js";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

export class LocalStorageAdapter extends StoragePort {
  #apiUrl;
  #uploadDir;

  constructor(config) {
    super();
    this.#uploadDir = path.resolve(process.cwd(), "uploads");
    this.#apiUrl = config.env.API_URL;
  }

  #generateSafeFilename() {
    const uuid = crypto.randomUUID();
    return `${uuid}.webp`;
  }

  async upload(file, pathFolder = "", options = {}) {
    try {
      const safeFilename = this.#generateSafeFilename();
      const fileKey = pathFolder ? path.join(pathFolder, safeFilename).replace(/\\/g, "/") : safeFilename;

      if (fileKey.includes("..")) throw new Error("Invalid path");

      const absolutePath = path.join(this.#uploadDir, fileKey);
      const directory = path.dirname(absolutePath);

      await fs.mkdir(directory, { recursive: true });

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

      await fs.writeFile(absolutePath, processedBuffer);

      return {
        key: fileKey,
        url: this.getUrl(fileKey)
      };
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  async delete(key) {
    try {
      if (!key) return;
      
      const cleanKey = key.includes("://") ? key.split("/uploads/").pop() : key;
      
      if (cleanKey.includes("..")) throw new Error("Invalid path");
      const absolutePath = path.join(this.#uploadDir, cleanKey);
      await fs.unlink(absolutePath);
    } catch (err) {
      if (err.code !== "ENOENT") {
        console.error(`Failed to delete file: ${key}`, err);
      }
    }
  }

  async update(file, oldKey, pathFolder = "", options = {}) {
    const newFileResult = await this.upload(file, pathFolder, options);

    if (oldKey) {
      this.delete(oldKey).catch(err => {
        console.error(`Background delete failed for old file ${oldKey}:`, err);
      });
    }

    return newFileResult;
  }

  getUrl(key) {
    const normalizedKey = key.replace(/\\/g, "/");
    return `${this.#apiUrl}/uploads/${normalizedKey}`;
  }
}
