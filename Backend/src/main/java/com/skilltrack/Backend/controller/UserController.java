package com.skilltrack.Backend.controller;

import com.skilltrack.Backend.dto.UserResponse;
import com.skilltrack.Backend.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponse getMyProfile() {
        return userService.getMyProfile();
    }
    
}
