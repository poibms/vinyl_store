import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateReviewDto } from './dto/createReviewDto';
import { CreateTrackDto } from './dto/createTrackDto';
import { Review } from './models/review.model';
import { Track } from './models/track.model';
import { TrackService } from './track.service';

@Controller('track')
@ApiTags('Track & Reviews')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOperation({ summary: 'Create new record (only admin)' })
  @ApiResponse({ status: 200, type: Track })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT')
  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
    const { image, audio } = files;
    console.log(files);
    return this.trackService.create(dto, image[0], audio[0]);
  }

  @ApiOperation({
    summary:
      'Get all tracks, also u can add params to filter them by price (price=desc/asc)',
  })
  @ApiResponse({ status: 200, type: Track })
  @Get()
  public getAll(@Query('price') price: string) {
    return this.trackService.getAll(price);
  }

  @ApiOperation({ summary: 'Search track by name or author name' })
  @ApiResponse({ status: 200, type: Track })
  @Get('/search')
  public search(@Query('query') query: string) {
    console.log(query);
    return this.trackService.search(query);
  }

  @ApiOperation({ summary: 'Get all reviews of track by trackId' })
  @ApiResponse({ status: 200, type: Review })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('/:trackId/review')
  public getAllReviews(@Param('trackId') trackId: number) {
    return this.trackService.getAllReviews(trackId);
  }

  @ApiOperation({ summary: 'create new review' })
  @ApiResponse({ status: 200, type: Review })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post('/:trackId/review/create')
  public addReview(
    @Param('trackId') trackId: number,
    @Req() req,
    @Body() dto: CreateReviewDto,
  ) {
    const { id } = req.user;
    return this.trackService.addReview(trackId, id, dto);
  }

  @ApiOperation({ summary: 'Buy track' })
  @ApiResponse({ status: 200, type: Track })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Put('/:trackId/buy')
  public buyTrack(@Req() req, @Param('trackId') trackId: number) {
    const { id } = req.user;
    return this.trackService.buyTrack(id, trackId);
  }
}
