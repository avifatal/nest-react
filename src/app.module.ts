import {HttpAdapterHost, HttpModule, Module, OnModuleInit} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";

import { join } from "path";
import { Request, Response } from "express";
import {ModuleRef} from "@nestjs/core";



@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}), HttpModule],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {
  constructor() {
  }
}