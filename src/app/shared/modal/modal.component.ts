import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  @Input() listId: String;
  constructor(private http: HttpService, private toastr: ToastrManager) { }

  ngOnInit() {
  }

  public deleteToDo: any = ()=>{
    this.http.deleteToDoList(this.listId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr("ToDoList Deleted Succesfully")
          console.log(location.origin)
        }else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr("Some Error Occured")
      }
    )
  } // end delete todo
}
