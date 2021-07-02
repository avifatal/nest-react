import {HttpService, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(
      private readonly httpService: HttpService,
      private readonly configService: ConfigService) {
  }
  async getShopToken(shop: string, code: string): Promise<string> {
    const apiKey = this.configService.get('SHOPIFY_API_KEY');
    const apiSecret = this.configService.get('SHOPIFY_API_SECRET');

    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };
    try {
      const {data} = await this.httpService.post(accessTokenRequestUrl,  accessTokenPayload).toPromise()
      return data.access_token;
    }catch (e){
      console.log(e);
      throw e;
    }
  }
}
