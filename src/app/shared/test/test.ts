import { Component, ViewChild} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Highlight } from "./directives/highlightDirective";
import { FormsModule } from "@angular/forms";
import { TestChild } from "./test_child/test_child";
import { StudentService } from "./services/studentService";


@Component({
    selector: 'app-test',
    standalone: true,
    imports: [
        CommonModule,
        Highlight,
        FormsModule,
        TestChild
    ],
    templateUrl: './test.html',
    styleUrl: './test.css'
})


export class Test{
    
    title = 'Hello my-app';

    isLogin = true;

    studentsList = [
        'An',
        'Binh',
        'Hoang'
    ];

    imageUrl='images/clinic_reason.png';
    
    updateTitle(){
        this.title = 'Nothing123';
    }

    infor = "Text something";

    receiveData(data: string){
        this.infor=data;
    }

    @ViewChild(TestChild)
    child!:TestChild;


    callChild() {
        this.child.showMessage();
    }

    changeChildMessage() {
        this.child.changeMessage();
    }

    students:string[]=[];
    constructor(private studentService: StudentService){
        this.students = this.studentService.studentGetList();
    }
    price = 1234567.89;

    today = new Date();
    
}