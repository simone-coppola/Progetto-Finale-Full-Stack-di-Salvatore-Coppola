package com.skilltrack.Backend.service;

import com.skilltrack.Backend.entity.User;
import com.skilltrack.Backend.repository.UserRepository;
import com.skilltrack.Backend.dto.UserResponse;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));
    }

    public UserResponse getMyProfile() {
        User user = getAuthenticatedUser();
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
    }
}
