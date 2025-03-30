import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TodoInterface } from '../types/todo.interace';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  authService = inject(AuthService);
  todoService = inject(TodoService);
  router = inject(Router);

  todos: TodoInterface[] = [];

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe((userId) => {
      if (userId) {
        this.todoService.getTodos(userId).subscribe((todos) => {
          this.todos = todos;
        });
      }
    });
  }
}
