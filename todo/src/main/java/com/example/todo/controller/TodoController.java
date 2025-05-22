package com.example.todo.controller;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import com.theokanning.openai.completion.chat.*;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;
    
    @Value("${openai.api.key}")
    private String openaiApiKey;
    
    @Value("${slack.webhook.url}")
    private String slackWebhookUrl;

    @GetMapping("/todos")
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping("/todos")
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeAndSendToSlack() {
        List<Todo> pendingTodos = todoRepository.findByCompletedFalse();
        
        OpenAiService service = new OpenAiService(openaiApiKey, Duration.ofSeconds(60));
        
        String todoList = pendingTodos.stream()
            .map(t -> "- " + t.getTitle() + ": " + t.getDescription())
            .collect(Collectors.joining("\n"));
        
        String prompt = "Create a motivating summary of these pending tasks:\n" + todoList;
        
        String summary = service.createChatCompletion(
            ChatCompletionRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(List.of(new ChatMessage("user", prompt)))
                .build()
        ).getChoices().get(0).getMessage().getContent();
        
        new RestTemplate().postForObject(slackWebhookUrl, 
            Map.of("text", summary), 
            String.class);
            
        return ResponseEntity.ok("Summary sent to Slack!");
    }
}