package com.averude.uksatse.scheduler.core.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

@Data
public class GenerationDTO {
    @NotNull
    private Long shiftId;
    @NotNull
    @PositiveOrZero
    private int offset;
    @NotNull
    private LocalDate from;
    @NotNull
    private LocalDate to;
}
