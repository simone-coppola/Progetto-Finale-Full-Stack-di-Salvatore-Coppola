package com.skilltrack.Backend.dto;

public class SkillResponse {

    private final Long id;
    private final String name;
    private final String category;
    private final int level;
    private final int experience;
    private final String notes;
    private final String icon;

    public SkillResponse(
            Long id,
            String name,
            String category,
            int level,
            int experience,
            String notes,
            String icon) {

        this.id = id;
        this.name = name;
        this.category = category;
        this.level = level;
        this.experience = experience;
        this.notes = notes;
        this.icon = icon;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public int getLevel() {
        return level;
    }

    public int getExperience() {
        return experience;
    }

    public String getNotes() {
        return notes;
    }

    public String getIcon() {
        return icon;
    }
}
