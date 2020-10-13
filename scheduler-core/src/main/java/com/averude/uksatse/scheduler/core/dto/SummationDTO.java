package com.averude.uksatse.scheduler.core.dto;

import com.averude.uksatse.scheduler.core.entity.Employee;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class SummationDTO extends BasicDto<Employee, SummationResult> implements Serializable {
    private LocalDate from;
    private LocalDate to;

    public SummationDTO(Employee parent,
                        LocalDate from,
                        LocalDate to,
                        List<SummationResult> collection) {
        super(parent, collection);
        this.from = from;
        this.to = to;
    }
}
