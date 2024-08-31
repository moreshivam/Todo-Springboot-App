package com.mjcode.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mjcode.todo.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

}
