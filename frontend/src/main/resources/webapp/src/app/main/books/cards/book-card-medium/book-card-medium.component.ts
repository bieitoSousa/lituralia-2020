import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../book";

@Component({
  selector: 'app-book-card-medium',
  templateUrl: './book-card-medium.component.html',
  styleUrls: ['./book-card-medium.component.scss']
})
export class BookCardMediumComponent implements OnInit {

  @Input() book: Book
  
  constructor() { }

  ngOnInit() {
  }
  
  getImageSrc(cover: any) {
    return 'data:image/png;base64,' + cover;
  }

  addToMyList(book_id: number) {

  }

  reviewPopup(book_id: number) {

  }
}
