import { Controller, Get } from "@nestjs/common";
import { MailService } from "src/services/mail.service";


@Controller("mail")
export class MailController { 

    constructor(
        private readonly mailService: MailService
    ) {

    }

    @Get("send")
    async prueba() {
        return await this.mailService.prueba();
    }

}
