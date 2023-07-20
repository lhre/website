import { MapStatus } from '../enums/map-status.enum';

export const MapStatusName: ReadonlyMap<MapStatus, string> = new Map([
  [MapStatus.APPROVED, 'Approved'],
  [MapStatus.UPLOADING, 'Uploading'],
  [MapStatus.AWAITING_REVIEW, 'Awaiting review'],
  [MapStatus.PRIVATE_TESTING, 'Private Testing'],
  [MapStatus.PUBLIC_TESTING, 'Public Testing'],
  [MapStatus.READY_FOR_RELEASE, 'Ready for Release'],
  [MapStatus.REJECTED, 'Rejected'],
  [MapStatus.REMOVED, 'Removed']
]);
