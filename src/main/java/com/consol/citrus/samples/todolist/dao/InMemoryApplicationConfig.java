package com.consol.citrus.samples.todolist.dao;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class InMemoryApplicationConfig {

    @Bean
    public TodoListDao todoListInMemoryDao() {
        return new InMemoryTodoListDao();
    }
}
