import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { BasketService } from '../basket/basket.service';
import { FileService, FileType } from '../file/file.service';
import { MailService } from '../mail/mail.service';
import { CreateReviewDto } from './dto/createReviewDto';
import { CreateTrackDto } from './dto/createTrackDto';
import { Review } from './models/review.model';
import { Track } from './models/track.model';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track) private trackRepository: typeof Track,
    @InjectModel(Review) private reviewRepository: typeof Review,
    private fileService: FileService,
    private basketService: BasketService,
    private mailService: MailService,
  ) {}

  groupBy = ['Track.id', 'comments.id'];

  public async create(payload: CreateTrackDto, image, audio): Promise<Track> {
    const audioPath = await this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = await this.fileService.createFile(
      FileType.IMAGE,
      image,
    );
    const track = await this.trackRepository.create({
      ...payload,
      audio: audioPath,
      image: picturePath,
    });
    return track;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackRepository.findAll({
      where: {
        isSold: false,
        [Op.or]: [{ name: query }, { authorName: query }],
      },
    });
    return tracks;
  }

  async getAll(price: string): Promise<Track[]> {
    if (price !== undefined) {
      return await this.trackRepository.findAll({
        where: { isSold: false },
        order: [['price', `${price}`]],
        include: [
          {
            model: Review,
            // attributes: [
            //   [sequelize.fn('avg', sequelize.col('rating')), 'avgRating'],
            // ],
          },
        ],
        group: this.groupBy,
      });
    }
    return await this.trackRepository.findAll({
      where: { isSold: false },
      include: [
        {
          model: Review,
          // attributes: [
          //   [sequelize.fn('avg', sequelize.col('rating')), 'avgRating'],
          // ],
        },
      ],
      group: this.groupBy,
    });
  }

  async getAllReviews(trackId: number): Promise<Review[]> {
    return await this.reviewRepository.findAll({ where: { trackId } });
  }

  async addReview(
    trackId: number,
    userId: number,
    dto: CreateReviewDto,
  ): Promise<Review> {
    const track = await this.trackRepository.findByPk(trackId);
    if (track === null) {
      throw new BadRequestException(
        `there is no track with such id: ${trackId}`,
      );
    }
    const review = await this.reviewRepository.create({
      ...dto,
      trackId,
      userId,
    });
    return review;
  }

  async buyTrack(id: number, trackId: number): Promise<string> {
    await this.trackRepository.update(
      { isSold: true },
      { where: { id: trackId } },
    );
    await this.basketService.addToBasket(id, trackId);
    await this.mailService.paymentNotify(id);
    return 'success';
  }
}
