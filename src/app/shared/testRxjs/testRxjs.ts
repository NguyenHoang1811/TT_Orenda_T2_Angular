import { Component, OnInit } from "@angular/core";
import { Observable,of } from "rxjs";
import { filter } from "rxjs";

@Component({
    selector: 'app-testrxjs',
    templateUrl: './testRxjs.html'
})
export class TestRxjs implements OnInit {

    students: string[] = [];

    numbers: number[] = [];

    studentObservable = new Observable<string>(subcriber => {
        subcriber.next("An");
        subcriber.next("Binh");
        subcriber.next("Nam");
        subcriber.complete();
    });

    ngOnInit(): void {
        this.studentObservable.subscribe(data => {
            this.students.push(data);
        });

        of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).pipe(
            filter(x => x % 2 == 0)
        ).subscribe(data =>{
            this.numbers.push(data);
        })
    }



}