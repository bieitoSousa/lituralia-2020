import {NgModule} from '@angular/core';
import {OntimizeWebModule} from 'ontimize-web-ngx';
import {CommonModule} from '@angular/common';
import {StarRatingComponent} from './star-rating/star-rating.component';
import {OTableCellRendererStarRatingComponent} from './star-rating/o-table-cell-renderer-star-rating/o-table-cell-renderer-star-rating.component';
import {Base64Pipe} from './pipes/base64.pipe';
import {RouterModule} from "@angular/router";
import {RatingModule} from "ng-starrating";


@NgModule({
  imports: [
    OntimizeWebModule,
    RouterModule,
    RatingModule
  ],
  declarations: [
    StarRatingComponent,
    OTableCellRendererStarRatingComponent,
    Base64Pipe
  ],
  exports: [
    CommonModule,
    OTableCellRendererStarRatingComponent,
    StarRatingComponent,
    Base64Pipe
  ]
})
export class SharedModule {
}
