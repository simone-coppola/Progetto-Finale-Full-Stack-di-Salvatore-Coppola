package com.skilltrack.Backend.repository;

import com.skilltrack.Backend.entity.Skill;
import com.skilltrack.Backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByUser(User user);

    Optional<Skill> findByIdAndUser(Long id, User user);
}
