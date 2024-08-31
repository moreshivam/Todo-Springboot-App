import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  

  constructor(private taskService: TaskService) { }

  newTask: Task = { description: "", completed: false };
  tasks: Task[] = [];
  editingTask: Task | null = null;
  updatedTask: Task = { description: "", completed: false };
  updateSuccessMessage: string = '';
  deleteSuccessMessage: string = '';
  addSuccessMessage: string = '';
  showList: boolean = true;
  ngOnInit(): void {
    this.getAllTasks();
  }
  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe((createdTask) => {
      this.newTask = { description: "", completed: false } //reset task
      this.tasks.push(createdTask);
      this.addSuccessMessage = 'Task added successfully';
      setTimeout(() => {
        this.addSuccessMessage = '';
      }, 1000); // 1 seconds before hiding the success message

      // setTimeout(() => {
      //   this.showTaskList();
      // }, 10); // 1 seconds before displaying the task list
    })
  }
  showTaskList() {
    this.showList = true; // Set flag to display task list
  }
  getAllTasks() {
    this.taskService.getAllTask().subscribe((tasks) => {
      this.tasks = tasks;
    })
  }
  editTask(task: Task) {
    this.editingTask = task;
    this.updatedTask = { ...task };   //create copy for editing
  }
  updateTask(): void {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id!, this.updatedTask)
        .subscribe((result) => {
          const index = this.tasks.findIndex((task) => task.id == this.editingTask!.id)
          if (index !== -1) {
            this.tasks[index] = result;
            this.cancelEdit(); // close the form
            this.updateSuccessMessage = 'Task details updated successfully';
            setTimeout(() => {
              this.updateSuccessMessage = '';
            }, 3000); // 3 seconds
          }
        })
    }
  }
  cancelEdit() {
    this.editingTask = null;
    this.updatedTask = { description: "", completed: false };
  }

  deleteTask(taskId: any) {
    if (confirm("Are you sure want to delete?")) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
        if (this.editingTask && this.editingTask.id == taskId) {
          this.cancelEdit();
        }
        this.deleteSuccessMessage = 'Task deleted successfully';
        setTimeout(() => {
          this.deleteSuccessMessage = '';
        }, 3000); // 3 seconds
      })
    }
  }

}
