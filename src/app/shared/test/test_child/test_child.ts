import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-test-child',
    imports: [FormsModule],
    templateUrl: './test_child.html',
    styleUrl: './test_child.css'
})
export class TestChild {
    @Input()
    infor!: string;
    @Output()
    send = new EventEmitter<string>();
    sendData(){
        this.send.emit(this.infor);
    }

    message='Test child Hello';

    showMessage() {
        alert(this.message);
    }

    changeMessage() {
        this.message = "ViewChild đã thay đổi";
    }
}   