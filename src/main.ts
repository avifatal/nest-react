import { NestFactory } from '@nestjs/core';
import { AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import {join} from "path";
import {Request, Response} from "express";
import * as express from "express";
import * as Bundler from "parcel-bundler";

export const AppConfig = {
  INDEX_PATH: "/index.html",
  ASSETS_PATH: join(__dirname, "src/assets"),
  FRONTEND_PATH: join(__dirname, "front/"),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  if (process.env.NODE_ENV === "development") {
    // Use `parcel-bundler` middleware
    const bundler = new Bundler(join(AppConfig.FRONTEND_PATH, AppConfig.INDEX_PATH));
    app.use('/react',bundler.middleware());
    //app.use(express.static('/react'));

  } else {
    // Use `express.static` middleware
    app.use(express.static(AppConfig.ASSETS_PATH));
    app.use((req: Request, res: Response) =>
        res.sendFile(join(AppConfig.ASSETS_PATH, AppConfig.INDEX_PATH))
    );
  }


  await app.listen(3005);
}
bootstrap();
