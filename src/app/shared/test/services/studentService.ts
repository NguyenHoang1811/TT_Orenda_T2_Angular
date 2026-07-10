import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StudentService{
    students = [
        'Hoc sinh 1',
        'Hoc sinh 2',
        'Hoc sinh 3'
    ];
     
    studentGetList(){
        return this.students;
    }
}