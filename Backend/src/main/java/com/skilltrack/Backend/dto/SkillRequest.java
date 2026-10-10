package com.skilltrack.Backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class SkillRequest {

    @NotBlank(message = "Nome obbligatorio")
    private String name;
    @NotBlank(message = "Categoria obbligatoria")
    private String category;
    @Min(value = 0, message = "Il livello deve essere almeno 0")
    @Max(value = 100, message = "Il livello non può superare 100")
    private int level;
    @Min(value = 0, message = "L'esperienza deve essere almeno 0")
    private int experience;
    private String notes;
    private String icon;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

}
