package com.example.todo.repository;

import com.example.todo.model.Todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCompletedFalse(); // Add this method
}