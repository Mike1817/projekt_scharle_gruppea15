import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessengerComponent } from './messenger/messenger.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessengerComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lms';
}
