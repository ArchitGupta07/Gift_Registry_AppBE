import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // Endpoint to fetch AI-based suggestions
  @Post('suggestions')
  async getSuggestions(@Body('query') query: string) {
    const suggestions = await this.aiService.getSuggestions(query);
    return { suggestions }; // Return suggestions to the frontend
  }
}
