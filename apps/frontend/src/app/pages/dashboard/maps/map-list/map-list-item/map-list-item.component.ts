import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MomentumMap } from '../../../../../@core/models/momentum-map.model';
import { LocalUserService } from '../../../../../@core/data/local-user.service';
import { getStatusFromEnum } from '../../../../../@core/models/map-upload-status.model';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'mom-map-list-item',
  templateUrl: './map-list-item.component.html',
  styleUrls: ['./map-list-item.component.scss']
})
export class MapListItemComponent implements OnInit {
  @Input() map: MomentumMap;
  @Input() isUpload: boolean;
  @Input() inLibrary: boolean;
  @Input() inFavorites: boolean;
  @Input() showDownloadButton: boolean;
  @Output() onLibraryUpdate = new EventEmitter();
  @Output() onFavoriteUpdate = new EventEmitter();
  mapInFavorites: boolean;
  mapInLibrary: boolean;
  status: string;

  constructor(
    private localUserService: LocalUserService,
    private toastService: NbToastrService
  ) {
    this.inLibrary = false;
    this.inFavorites = false;
    this.isUpload = false;
    this.map = null;
    this.status = '';
  }

  ngOnInit() {
    this.mapInFavorites = this.inFavorites;
    this.mapInLibrary = this.inLibrary;
    this.status = getStatusFromEnum(this.map.statusFlag);
  }

  toggleMapInFavorites() {
    if (this.mapInFavorites) {
      this.localUserService.removeMapFromFavorites(this.map.id).subscribe({
        next: () => {
          this.mapInFavorites = false;
          this.onFavoriteUpdate.emit(false);
          this.toastService.success('Removed map from favorites', 'Success');
        },
        error: () =>
          this.toastService.danger(
            'Failed to remove map from favorites',
            'Error'
          )
      });
    } else {
      this.localUserService.addMapToFavorites(this.map.id).subscribe({
        next: () => {
          this.mapInFavorites = true;
          this.onFavoriteUpdate.emit(true);
          this.toastService.success('Added map to favorites', 'Success');
        },
        error: () =>
          this.toastService.danger('Failed to add map to favorites', 'Error')
      });
    }
  }

  toggleMapInLibrary() {
    if (this.mapInLibrary) {
      this.localUserService.removeMapFromLibrary(this.map.id).subscribe({
        next: () => {
          this.mapInLibrary = false;
          this.onLibraryUpdate.emit(false);
          this.toastService.success('Removed map from library', 'Success');
        },
        error: (error) =>
          this.toastService.danger(
            error.message,
            'Failed to remove map from library'
          )
      });
    } else {
      this.localUserService.addMapToLibrary(this.map.id).subscribe({
        next: () => {
          this.mapInLibrary = true;
          this.onLibraryUpdate.emit(true);
          this.toastService.success('Added map to library', 'Success');
        },
        error: (error) =>
          this.toastService.danger(
            error.message,
            'Failed to add map to library'
          )
      });
    }
  }
}
