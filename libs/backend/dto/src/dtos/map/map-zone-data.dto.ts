import {
  MapZoneData,
  Region,
  Tracks,
  Vector2D,
  Vector,
  Volume,
  Zone,
  SegmentStartZone,
  Track,
  TrackEx
} from '@momentum/constants';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min
} from 'class-validator';
import { IsVector } from '@momentum/backend/validators';
import { ApiProperty } from '@nestjs/swagger';
import { NestedProperty } from '../../decorators';

export class RegionDto implements Region {
  @ApiProperty({
    description:
      'A collection of 2-tuples of floats representing points in the XY plane, describing the shape of the zone from a top-down view.',
    example: '[[0, 0], [0, 512], [512, 0], [512, 512]]'
  })
  @ArrayMaxSize(64)
  @IsVector(2, { each: true })
  readonly points: Vector2D[];

  @ApiProperty({
    description:
      'The Z coordinate of all the points in the "points" collection, forming the bottom of the region.',
    example: 0
  })
  @IsNumber()
  readonly bottom: number;

  @ApiProperty({
    description:
      'The height of the zone, effectively Z coordinate of the points in the "points" collection at the top of the region.',
    example: 512
  })
  @IsNumber()
  readonly height: number;

  @ApiProperty({
    description:
      'A 3-tuple of floats representing the location in the XYZ plane the player is placed at when teleported into the region.' +
      'Should *generally correspond to an `info_teleport_destination.`' +
      'Required if the region is part of a volume used by a start or major checkpoint zone, otherwise optional.',
    example: '[512, 512, 0]'
  })
  @IsVector(3)
  @IsOptional()
  readonly teleportPos?: Vector;

  @ApiProperty({
    description:
      'The yaw angle in degrees the player faces when teleported into the region.' +
      'Required if the region is part of a volume used by a start or major checkpoint zone, otherwise optional.',
    example: 90
  })
  @IsNumber()
  @Min(-360)
  @Max(360)
  @IsOptional()
  readonly teleportYaw?: number;

  @ApiProperty({
    description:
      'The "safe height" is the greatest height from the base of the region that the player is allowed to enter "primed" state from - see the docs for a detailed explanation.' +
      'If not included, the game uses a default value of -1, which indicates that the entire region is also the safe region.'
  })
  @IsNumber()
  @IsOptional()
  readonly safeHeight?: number;
}

export class VolumeDto implements Volume {
  @NestedProperty(RegionDto, {
    isArray: true,
    description:
      'A collection of regions. In most cases just a single region, but the format is structured this way so multiple are possible.'
  })
  readonly regions: RegionDto[];
}

export class ZoneDto implements Zone {
  @ApiProperty({
    description: '`targetname` of a filter entity on the map.'
  })
  @IsString()
  @IsOptional()
  readonly filterName: string;

  @ApiProperty({
    description:
      'Index into the `volumes` array picking out the volume representing the region(s) of space the zone occupies.'
  })
  @IsString()
  readonly volumeIndex: number;
}

export class SegmentStartZoneDto extends ZoneDto implements SegmentStartZone {
  @ApiProperty({
    description:
      'If enabled, prevents the player from bhopping, even with the timer running.'
  })
  @IsBoolean()
  limitGroundSpeed: boolean;
}

export class SegmentDto implements SegmentDto {
  @NestedProperty(SegmentStartZoneDto, { description: 'The start zone' })
  readonly start: SegmentStartZoneDto;

  @NestedProperty(ZoneDto, {
    isArray: true,
    description: 'A collection of checkpoint zones'
  })
  @ArrayMaxSize(256)
  readonly checkpoints: ZoneDto[];
}

class TrackZonesDto {
  @NestedProperty(SegmentDto, { isArray: true })
  @ArrayMaxSize(256)
  readonly segments: SegmentDto[];

  @NestedProperty(ZoneDto, { description: 'The end zone of the track' })
  readonly end: ZoneDto;

  @NestedProperty(ZoneDto, { isArray: true })
  readonly cancel: ZoneDto[];
}

export class TrackDto implements Track {
  @ApiProperty({ description: '' }) // TODO: Describe me!
  @IsBoolean()
  readonly majorOrdered: boolean;

  @ApiProperty({ description: '' }) // TODO: Describe me!
  @IsBoolean()
  readonly minorRequired: boolean;

  @ApiProperty({
    description: 'An optional name for the track',
    example: '' // TODO: We haven't fully figured out naming yet
  })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  readonly name?: string;

  @NestedProperty(TrackZonesDto)
  readonly zones: TrackZonesDto;
}

export class TrackExDto extends TrackDto implements TrackEx {
  @ApiProperty({
    description: 'The sv_maxvelocity value set on the track',
    default: 3500
  })
  @IsNumber()
  @Min(2000)
  @Max(1000000000)
  @IsOptional()
  readonly maxVelocity?: number;

  @ApiProperty({ description: '' }) // TODO: Describe me!
  @IsInt()
  @IsOptional()
  readonly defragFlags?: number;
}

export class TracksDto implements Tracks {
  @NestedProperty(TrackExDto, {
    required: true,
    description: 'The main track of the map'
  })
  @ArrayMinSize(0)
  readonly main: TrackExDto;

  @NestedProperty(TrackDto, {
    isArray: true,
    required: true,
    description: 'A collection of stage tracks'
  })
  @ArrayMinSize(0)
  @ArrayMaxSize(256)
  readonly stages: TrackDto[];

  @NestedProperty(TrackDto, {
    isArray: true,
    required: false,
    description: 'A collection of bonus tracks'
  })
  @ArrayMinSize(0)
  @ArrayMaxSize(256)
  readonly bonuses: TrackExDto[];
}

export class MapZoneDataDto implements MapZoneData {
  @ApiProperty()
  @IsInt()
  readonly dataTimestamp: number;

  @ApiProperty()
  @IsInt()
  readonly formatVersion: number;

  @NestedProperty(TracksDto, { required: true })
  readonly tracks: Tracks;

  @NestedProperty(VolumeDto, {
    required: true,
    isArray: true
  })
  readonly volumes: Volume[];
}
