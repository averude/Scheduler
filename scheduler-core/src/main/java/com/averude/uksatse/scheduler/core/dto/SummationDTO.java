package com.averude.uksatse.scheduler.core.dto;

import com.averude.uksatse.scheduler.core.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.StringJoiner;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SummationDTO implements Serializable {
    private Employee employee;
    private LocalDate from;
    private LocalDate to;
    private List<SummationResult> results;

    @Override
    public String toString() {
        return new StringJoiner(", ", SummationDTO.class.getSimpleName() + "[", "]")
                .add("employee=" + employee)
                .add("results=" + results)
                .toString();
    }
}
