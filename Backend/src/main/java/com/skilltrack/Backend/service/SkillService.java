package com.skilltrack.Backend.service;

import com.skilltrack.Backend.dto.SkillRequest;
import com.skilltrack.Backend.dto.SkillResponse;
import com.skilltrack.Backend.entity.Skill;
import com.skilltrack.Backend.entity.User;
import com.skilltrack.Backend.repository.SkillRepository;
import com.skilltrack.Backend.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillService(
            SkillRepository skillRepository,
            UserRepository userRepository) {

        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    public SkillResponse createSkill(SkillRequest skillRequest) {

        User user = getAuthenticatedUser();

        Skill skill = new Skill();

        skill.setName(skillRequest.getName());
        skill.setCategory(skillRequest.getCategory());
        skill.setLevel(skillRequest.getLevel());
        skill.setExperience(skillRequest.getExperience());
        skill.setNotes(skillRequest.getNotes());
        skill.setIcon(skillRequest.getIcon());

        skill.setUser(user);

        Skill savedSkill = skillRepository.save(skill);

        return convertToResponse(savedSkill);
    }

    public List<SkillResponse> findAllSkill() {

        User user = getAuthenticatedUser();

        return skillRepository.findByUser(user)
                .stream()
                .map(skill -> convertToResponse(skill))
                .toList();
    }

    public SkillResponse updateSkill(
            Long id,
            SkillRequest skillRequest) {

        User user = getAuthenticatedUser();

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Skill not found with id: " + id));

        if (!skill.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Non puoi modificare questa skill");
        }

        skill.setName(skillRequest.getName());
        skill.setCategory(skillRequest.getCategory());
        skill.setLevel(skillRequest.getLevel());
        skill.setExperience(skillRequest.getExperience());
        skill.setNotes(skillRequest.getNotes());
        skill.setIcon(skillRequest.getIcon());

        Skill updatedSkill = skillRepository.save(skill);

        return convertToResponse(updatedSkill);
    }

    public void deleteSkill(Long id) {

        User user = getAuthenticatedUser();

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Skill not found with id: " + id));

        if (!skill.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Non puoi eliminare questa skill");
        }

        skillRepository.delete(skill);
    }

    private User getAuthenticatedUser() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String username = authentication.getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(
                        "Utente autenticato non trovato"));
    }

    private SkillResponse convertToResponse(Skill skill) {

        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getLevel(),
                skill.getExperience(),
                skill.getNotes(),
                skill.getIcon());
    }
}
