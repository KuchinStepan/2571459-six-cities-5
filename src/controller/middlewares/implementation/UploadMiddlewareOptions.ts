import multer, { StorageEngine } from 'multer';
import { Request, Response, NextFunction } from 'express';
import mime from 'mime-types';
import { nanoid } from 'nanoid';
import {IMiddleware} from '../IMiddleware.js';

interface UploadMiddlewareOptions {
  fieldName: string;
  uploadDir: string;
  multiple?: boolean;
  maxCount?: number;
}

export class UploadFileMiddleware implements IMiddleware {
  private uploader: multer.Multer;

  constructor(private readonly options: UploadMiddlewareOptions) {

    const storage: StorageEngine = multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, this.options.uploadDir);
      },

      filename: (_req, file, cb) => {
        const ext = mime.extension(file.mimetype) || 'bin';
        const uniqueName = `${nanoid()}.${ext}`;
        cb(null, uniqueName);
      }
    });

    this.uploader = multer({ storage });
  }

  public execute(req: Request, res: Response, next: NextFunction): void {
    const field = this.options.fieldName;

    const handler = this.options.multiple
      ? this.uploader.array(field, this.options.maxCount ?? 10)
      : this.uploader.single(field);

    handler(req, res, next);
  }
}
