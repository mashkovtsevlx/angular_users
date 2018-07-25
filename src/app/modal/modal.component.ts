import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  first_name:string;
  last_name: string;
  avatar: string;
  id: string;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) data) {
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.avatar = data.avatar;
      this.id = data.id;
  }

  public ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
