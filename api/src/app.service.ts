import {Injectable} from '@nestjs/common';
import OpenAI from 'openai';
import {ConfigService} from '@nestjs/config';


import * as users from './data/users.json';
import * as events from './data/events.json';

@Injectable()
export class AppService {

    private openai: any;

    constructor(private readonly config: ConfigService) {
        this.openai = new OpenAI({
            organization: this.config.get('OPENAI_API_ORG'),
            apiKey: this.config.get('OPENAI_API_KEY')
        });
    }

    getAllUsers() {
        return users;
    }

    getUser(username: string) {
        return users.find(user => user.name.trim() === username.trim());
    }

    getEvents() {
        return events;
    }

    async getRecommendation(username: string) {
        const messages: any[] = [
            {
                role: 'system',
                content: 'You are a helpful assistant. You will use the getUser tool to fetch user information and' +
                    ' the getEvents tool to fetch event information. Then, based on the user’s preferences, you will' +
                    ' suggest the top 10 best suited events. You will return only events information in JSON string format, no extra characters or identification' +
                    ' no extra texts!'
            },
            {
                role: 'user',
                content: `Please use the getUser tool to fetch details for the user named ${username}. Then, based on those preferences, use the getEvents tool to find the best suited up to 10s events.`
            }
        ];

        const tools = [
            {
                type: 'function',
                function: {
                    name: 'getEvents',
                    description: 'Get a list of events with name, description, tags, etc... from database',
                    parameters: {
                        type: 'object',
                        properties: {},
                        required: []
                    }
                }
            },
            {
                type: 'function',
                function: {
                    name: 'getUser',
                    description: 'Get a user\'s details including name, age, preferences, etc..., database',
                    parameters: {
                        type: 'object',
                        properties: {
                            username: {
                                type: 'string',
                                description: 'The name of the user'
                            }
                        },
                        required: ['username']
                    }
                }
            }
        ];

        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: messages,
            tools: tools,
            tool_choice: 'auto'
        });

        const responseMessage = response.choices[0].message;
        messages.push(responseMessage);
        const functionsToCall = responseMessage?.tool_calls;

        if (functionsToCall) {
            functionsToCall.forEach((functionToCall: any) => {
                const functionName = functionToCall.function.name;
                const functionParameters = JSON.parse(functionToCall.function.arguments);


                switch (functionName) {
                    case 'getUser':
                        const users = this.getUser(functionParameters.username);
                        messages.push({
                            tool_call_id: functionToCall.id,
                            role: 'tool',
                            name: functionName,
                            content: JSON.stringify(users)
                        });
                        break;
                    case 'getEvents':
                        const events = this.getEvents();
                        messages.push({
                            tool_call_id: functionToCall.id,
                            role: 'tool',
                            name: functionName,
                            content: JSON.stringify(events)
                        });
                        break;
                }
            });
        }

        const secondResponse = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: messages
        });

        return JSON.parse(secondResponse.choices[0].message.content);

    }

}