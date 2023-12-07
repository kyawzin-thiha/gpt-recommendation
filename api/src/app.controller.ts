import {Controller, Get, Param} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('/get-all-users')
    getAllUsers() {
        return this.appService.getAllUsers();
    }

    @Get('/get-user/:username')
    getUser(@Param('username') username: string) {
        return this.appService.getUser(username);
    }

    @Get('/get-all-events')
    getEvents() {
        return this.appService.getEvents();
    }

    @Get('/get-recommendation/:username')
    async getRecommendation(@Param('username') username: string) {
        return await this.appService.getRecommendation(username);
    }
}