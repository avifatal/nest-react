import {Controller, Get, HttpService, Query, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Response, Request} from 'express'
import * as nonce from 'nonce';
import {ConfigService} from "@nestjs/config";
import * as crypto from 'crypto';
import * as querystring from 'querystring';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly configService: ConfigService,
      private readonly httpService: HttpService) {
  }

  @Get('test')
  test(){
    return {test : 'yes'}
  }



}
