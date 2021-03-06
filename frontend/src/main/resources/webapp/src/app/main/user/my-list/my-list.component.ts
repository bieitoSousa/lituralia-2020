import {Component, OnInit} from '@angular/core';
import {ListService} from "../../../shared/services/list.service";
import {DialogService, LoginService, OTranslateService} from "ontimize-web-ngx";
import {BookList} from "../../../shared/domain/book-list";
import {filter, map, tap} from "rxjs/operators";
import {Book} from "../../../shared/domain/book";

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  myBookList: BookList
  public isListInitialized: boolean = false;


  public static readonly LIST_DELETING_BOOK: string = "LIST_DELETING_BOOK";
  public static readonly LIST_DELETING_BOOK_ERROR: string = "LIST_DELETING_BOOK_ERROR";
  public static readonly LIST_DELETING_BOOK_OK: string = "LIST_DELETING_BOOK_OK";
  public static readonly LIST_ADDING_BOOK: string = "LIST_ADDING_BOOK";
  public static readonly LIST_ADDING_BOOK_ERROR: string = "LIST_ADDING_BOOK_ERROR";
  public static readonly LIST_ADDING_BOOK_OK: string = "LIST_ADDING_BOOK_OK";
  private static readonly LIST_INIT_TITLE: string = "LIST_INIT_TITLE";
  private static readonly LIST_INIT_ERROR: string = "LIST_INIT_ERROR";


  constructor(private listService: ListService,
              private dialogService: DialogService,
              private translate: OTranslateService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.fetchMyList();
  }

  private fetchMyList() {
    this.listService.getPrivateUserList().pipe(
      filter(response => response.data.length > 0),
      tap(response => {
        this.isListInitialized = true
        this.myBookList = response.data[0]
        this.myBookList.books$ = this.listService.getListBooks(this.myBookList.list_id).pipe(
          filter(response => response.data.length > 0),
          map(resp => resp.data),
        )
      })
    ).subscribe()
  }

  initMyList() {
    return this.listService.initPrivateList().subscribe(
      success => {
        if (success)
          this.fetchMyList()
        else this.dialogService.error(MyListComponent.LIST_INIT_TITLE, MyListComponent.LIST_INIT_ERROR)
      },
      error => this.dialogService.error(MyListComponent.LIST_INIT_TITLE, MyListComponent.LIST_INIT_ERROR)
    )
  }


  removeBookFromList(book: Book) {
    this.listService.removeBookFromList(book.list_book_id, book.book_id, book.list_id).subscribe(
      value => {
        if(!value)
          this.dialogService.error(this.translate.get(MyListComponent.LIST_DELETING_BOOK), this.translate.get(MyListComponent.LIST_DELETING_BOOK_ERROR))
        // this.dialogService.info(this.translate.get(MyListComponent.LIST_DELETING_BOOK), this.translate.get(MyListComponent.LIST_DELETING_BOOK_OK))
      },
      error => this.dialogService.error(this.translate.get(MyListComponent.LIST_DELETING_BOOK), this.translate.get(MyListComponent.LIST_DELETING_BOOK_ERROR)),
      () => this.fetchMyList()
    )
  }


  public isLoggedIn() {
    return this.loginService.isLoggedIn()
  }
}
