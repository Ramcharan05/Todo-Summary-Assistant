package com.example.todo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean completed;

    // Explicit getters if Lombok isn't working
    public String getDescription() {
        return description;
    }
    
    public String getTitle() {
        return title;
    }
}