package com.skilltrack.Backend.controller;

import com.skilltrack.Backend.dto.GoalRequest;
import com.skilltrack.Backend.dto.GoalResponse;
import com.skilltrack.Backend.service.GoalService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping
    public GoalResponse createGoal(
           @Valid @RequestBody GoalRequest goalRequest) {

        return goalService.createGoal(goalRequest);
    }

    @GetMapping
    public List<GoalResponse> findAllGoal() {

        return goalService.findAllGoal();
    }

    @PutMapping("/{id}")
    public GoalResponse updateGoal(
            @PathVariable Long id,
            @Valid @RequestBody GoalRequest goalRequest) {

        return goalService.updateGoal(id, goalRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteGoal(
            @PathVariable Long id) {

        goalService.deleteGoal(id);
    }
}
