import { Component, OnInit } from '@angular/core';
import {  UserDataService  } from '../user-data.service';
import { User } from '../user';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserDataService]
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  private _dataSub0;
  private _dataSub;
  private _flag = false;
  constructor(
    private userDataService: UserDataService,
    private dialog: MatDialog
  ) {}
  title = 'Users Page';
  public ngOnInit() {
    this._dataSub0 = this.userDataService.getPages().subscribe((pages) => {
      var page_num = pages;
      var i = 1;
      while (i < page_num) {
        this._dataSub = this.userDataService
          .getAllUsers()
          .subscribe(
            (users) => {
                for (let us of users) {
                  this.users.push(us);
                }
            }
          );
        i++;
      }
    });
  }
  openDialog(id, first_name, last_name, avatar) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '600px';
    dialogConfig.minWidth = '300px';
    dialogConfig.data = {
      first_name: first_name,
      last_name: last_name,
      avatar: avatar,
      id: id,
    };
    this.dialog.open(ModalComponent, dialogConfig);
  }

}
