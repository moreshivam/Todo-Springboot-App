package com.mjcode.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mjcode.todo.entity.Task;
import com.mjcode.todo.repository.TaskRepository;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;

	@GetMapping("/")
	public String Helloworld() {
		return "Get Hello World!";
	}

	@PostMapping
	public Task CreateTask(@RequestBody Task task) {
		taskRepository.save(task);
		return task;
	}

	@GetMapping
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	@PutMapping("/{id}")
	public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
		task.setId(id);
		return taskRepository.save(task);
	}
	
	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskRepository.deleteById(id);		;
	}
}
