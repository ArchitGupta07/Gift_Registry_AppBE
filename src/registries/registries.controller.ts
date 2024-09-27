import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Prisma } from '@prisma/client';
import { RegistriesService } from './registries.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRegistryDto } from './dto/createRegistry.dto';
import { UpdateRegistryDto } from './dto/updateRegistryDto';

@ApiTags('registries')
@Controller('registries')
export class RegistriesController {
  constructor(private readonly registriesService: RegistriesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new registry',
    description: 'This API creates a new registry with the provided data.',
  })
  @ApiBody({
    description: 'The data required to create a new registry',
    type: CreateRegistryDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The registry has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or validation error.',
  })
  async create(
    @Body() createRegistryDto: Prisma.RegistryCreateInput,
    @Res() res: Response,
  ) {
    try {
      const registry = await this.registriesService.create(createRegistryDto);
      return res.status(HttpStatus.CREATED).json(registry);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid input data',
          error: error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to create registry',
          error: error.message,
        });
      }
    }
  }

  @Get('eventRegistry/:id')
  @ApiOperation({
    summary: 'Find all registries by event ID',
    description: 'Fetch all registries associated with a particular event.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The event ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the list of registries associated with the event.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No registries found for the provided event ID.',
  })
  async findAll(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const registries = await this.registriesService.findAll(id);
      if (!registries) {
        throw new NotFoundException('Registries not found');
      }
      return res.status(HttpStatus.OK).json(registries);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch registries',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a registry by ID',
    description: 'Fetch a specific registry by its ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The registry ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the registry for the given ID.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Registry not found for the provided ID.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const registry = await this.registriesService.findOne(id);
      if (!registry) {
        throw new NotFoundException('Registry not found');
      }
      return res.status(HttpStatus.OK).json(registry);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to Find registry due to server error',
        error: error.message,
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a registry',
    description: 'Update the details of an existing registry.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The registry ID' })
  @ApiBody({
    description: 'The updated registry data',
    type: UpdateRegistryDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The registry has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Registry not found for the provided ID.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegistryDto: Prisma.RegistryUpdateInput,
    @Res() res: Response,
  ) {
    try {
      const updatedRegistry = await this.registriesService.update(
        id,
        updateRegistryDto,
      );
      if (!updatedRegistry) {
        throw new NotFoundException('Registry not found for update');
      }
      return res.status(HttpStatus.OK).json(updatedRegistry);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid input data',
          error: error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to Update registry',
          error: error.message,
        });
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a registry',
    description: 'Remove a registry by its ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The registry ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The registry has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Registry not found for the provided ID.',
  })
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deleted = await this.registriesService.remove(id);
      if (!deleted) {
        throw new NotFoundException('Registry not found for deletion');
      }
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to delete registry due to server error',
        error: error.message,
      });
    }
  }
}
