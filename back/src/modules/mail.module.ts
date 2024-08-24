import { Module } from '@nestjs/common';
import { MailService } from 'src/services/mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
