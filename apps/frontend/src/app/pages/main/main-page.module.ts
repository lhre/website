import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page.component';
import { AboutComponent } from './about/about.component';
import { CreditsComponent } from './credits/credits.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { GamemodesComponent } from './gamemodes/gamemodes.component';
import { SharedModule } from '../../shared.module';
import { GalleryModule } from 'ng-gallery';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    GalleryModule,
    SharedModule
  ],
  declarations: [
    MainPageComponent,
    AboutComponent,
    CreditsComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    GamemodesComponent
  ]
})
export class MainPageModule {}
