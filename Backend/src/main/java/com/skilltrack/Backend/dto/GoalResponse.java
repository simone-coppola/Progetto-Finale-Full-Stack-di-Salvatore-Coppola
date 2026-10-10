package com.skilltrack.Backend.dto;

import java.time.LocalDate;

public class GoalResponse {
    private final Long id;
    private final String title;
    private final String category;
    private final String description;
    private final LocalDate deadline;
    private final int progress;
    private final String icon;

    public GoalResponse(
            Long id,
            String title,
            String category,
            String description,
            LocalDate deadline,
            int progress,
            String icon) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.deadline = deadline;
        this.progress = progress;
        this.icon = icon;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public int getProgress() {
        return progress;
    }

    public String getIcon() {
        return icon;
    }
}
