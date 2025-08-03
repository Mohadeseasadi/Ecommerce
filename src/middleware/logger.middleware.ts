import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;

      const methodColor = '\x1b[36m'; // Cyan
      const urlColor = '\x1b[37m'; // White
      const statusColor =
        res.statusCode >= 500
          ? '\x1b[31m' // Red
          : res.statusCode >= 400
            ? '\x1b[35m' // Magenta
            : res.statusCode >= 300
              ? '\x1b[34m' // Blue
              : res.statusCode >= 200
                ? '\x1b[32m' // Green
                : '\x1b[0m'; // Reset

      const durationColor = duration > 1000 ? '\x1b[31m' : '\x1b[90m'; // Red if slow, Gray otherwise
      const reset = '\x1b[0m';

      console.log(
        `${methodColor}${req.method}${reset} | ` +
          `${urlColor}${req.originalUrl}${reset} | ` +
          `${statusColor}${res.statusCode}${reset} | ` +
          `${durationColor}${duration} ms${reset}`,
      );
    });

    next();
  }
}
