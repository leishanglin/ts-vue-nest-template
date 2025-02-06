import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

export const importServeStaticModule = () => {
  console.log(process.cwd());
  return ServeStaticModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return [
        {
          rootPath: path.resolve(
            process.cwd(),
            configService.get('app.publicPath'),
          ),
        },
      ];
    },
  });
};
