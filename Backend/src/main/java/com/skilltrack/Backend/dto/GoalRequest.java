package com.skilltrack.Backend.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class GoalRequest {

    @NotBlank(message = "Titolo obbligatorio")
    private String title;
    @NotBlank(message = "Categoria obbligatoria")
    private String category;
    private String description;
    private LocalDate deadline;
    @Min(value = 0, message = "Il progresso deve essere almeno 0")
    @Max(value = 100, message = "Il progresso non può superare 100")
    private int progress;
    private String icon;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
