package com.skilltrack.Backend.service;

import com.skilltrack.Backend.dto.GoalRequest;
import com.skilltrack.Backend.dto.GoalResponse;
import com.skilltrack.Backend.entity.Goal;
import com.skilltrack.Backend.entity.User;
import com.skilltrack.Backend.repository.GoalRepository;
import com.skilltrack.Backend.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalService(
            GoalRepository goalRepository,
            UserRepository userRepository) {

        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    public GoalResponse createGoal(GoalRequest goalRequest) {

        User user = getAuthenticatedUser();

        Goal goal = new Goal();

        goal.setTitle(goalRequest.getTitle());
        goal.setCategory(goalRequest.getCategory());
        goal.setDescription(goalRequest.getDescription());
        goal.setDeadline(goalRequest.getDeadline());
        goal.setProgress(goalRequest.getProgress());
        goal.setIcon(goalRequest.getIcon());

        goal.setUser(user);

        Goal savedGoal = goalRepository.save(goal);

        return convertToResponse(savedGoal);
    }

    public List<GoalResponse> findAllGoal() {

        User user = getAuthenticatedUser();

        return goalRepository.findByUser(user)
                .stream()
                .map(goal -> convertToResponse(goal))
                .toList();
    }

    public GoalResponse updateGoal(
            Long id,
            GoalRequest goalRequest) {

        User user = getAuthenticatedUser();

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Goal not found with id: " + id
                        )
                );

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Non puoi modificare questo goal"
            );
        }

        goal.setTitle(goalRequest.getTitle());
        goal.setCategory(goalRequest.getCategory());
        goal.setDescription(goalRequest.getDescription());
        goal.setDeadline(goalRequest.getDeadline());
        goal.setProgress(goalRequest.getProgress());
        goal.setIcon(goalRequest.getIcon());

        Goal updatedGoal = goalRepository.save(goal);

        return convertToResponse(updatedGoal);
    }

    public void deleteGoal(Long id) {

        User user = getAuthenticatedUser();

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Goal not found with id: " + id
                        )
                );

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Non puoi eliminare questo goal"
            );
        }

        goalRepository.delete(goal);
    }

    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Utente autenticato non trovato"
                        )
                );
    }

    private GoalResponse convertToResponse(Goal goal) {

        return new GoalResponse(
                goal.getId(),
                goal.getTitle(),
                goal.getCategory(),
                goal.getDescription(),
                goal.getDeadline(),
                goal.getProgress(),
                goal.getIcon()
        );
    }
}