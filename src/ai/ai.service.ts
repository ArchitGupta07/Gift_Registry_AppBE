import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly AI_API_URL: string;
  private readonly AI_API_KEY: string;

  constructor(private configService: ConfigService) {
    this.AI_API_URL = this.configService.get<string>('AI_API_URL');
    this.AI_API_KEY = this.configService.get<string>('AI_API_KEY');
  }

  // Method to fetch suggestions from AI API
  async getSuggestions(query: string): Promise<string[]> {
    try {
      const response = await axios.post(`${this.AI_API_URL}/suggestions`, {
        query,
      }, {
        headers: {
          'Authorization': `Bearer ${this.AI_API_KEY}`,
        },
      });
  
      console.log('API Response:', response.data); // Log the full API response
      return response.data.suggestions || [];
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  }
}
