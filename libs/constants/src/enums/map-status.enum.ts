// prettier-ignore
export enum MapStatus {
  APPROVED = 0,           // Submission complete, fully available.
  UPLOADING = 1,          // Has been submitted but waiting on file uploads
  PRIVATE_TESTING = 2,    // Is available in Beta tab to users with an accepted MapTestingRequest
  AWAITING_REVIEW = 3,    // Waiting for a MAP_REVIEWER to approve
  PUBLIC_TESTING = 4,     // Available to all users in Beta tab
  READY_FOR_RELEASE = 5,  // Waiting for final review by MODERATOR or ADMIN
  REJECTED = 6,           // Map has been rejected by a MODERATOR or ADMIN at some point during review process
  REMOVED = 7             // Map has been deleted
}
