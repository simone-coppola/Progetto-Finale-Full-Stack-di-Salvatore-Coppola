package com.skilltrack.Backend.controller;

import com.skilltrack.Backend.dto.SkillRequest;
import com.skilltrack.Backend.dto.SkillResponse;
import com.skilltrack.Backend.service.SkillService;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public SkillResponse createSkill(
            @Valid @RequestBody SkillRequest skillRequest) {

        return skillService.createSkill(skillRequest);
    }

    @GetMapping
    public List<SkillResponse> findAllSkill() {

        return skillService.findAllSkill();
    }

    @PutMapping("/{id}")
    public SkillResponse updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillRequest skillRequest) {

        return skillService.updateSkill(id, skillRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {

        skillService.deleteSkill(id);
    }
}
