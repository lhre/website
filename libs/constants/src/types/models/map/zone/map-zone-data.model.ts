export interface MapZoneData {
  formatVersion: number;
  dataTimestamp: number;
  tracks: Tracks;
  volumes: Volume[];
}

export interface Tracks {
  main: TrackEx;
  stages: Track[];
  bonuses: TrackEx[];
}

export interface Track {
  name?: string;
  majorOrdered: boolean;
  minorRequired: boolean;
  zones: {
    segments: Segment[];
    end: Zone;
    cancel: Zone[];
  };
}

export interface TrackEx extends Track {
  maxVelocity?: number;
  defragFlags?: number;
}

export interface Segment {
  start: SegmentStartZone;
  checkpoints: Zone[];
}

export interface Zone {
  volumeIndex: number;
  filterName?: string;
}

export interface SegmentStartZone extends Zone {
  limitGroundSpeed: boolean;
}

export interface Volume {
  regions: Region[];
}

export type Vector = [number, number, number];
export type Vector2D = [number, number];

export interface Region {
  points: Vector2D[];
  bottom: number;
  height: number;
  teleportPos?: Vector; // TODO: This below are required if region is part of a volume used by stafe or major checkpoint zone
  teleportYaw?: number; // See convo in mom red 25/09/23 02:00 GMT
  safeHeight?: number;
}
