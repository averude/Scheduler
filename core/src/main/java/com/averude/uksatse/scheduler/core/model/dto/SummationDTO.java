package com.averude.uksatse.scheduler.core.model.dto;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasPositionId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasShiftId;
import com.averude.uksatse.scheduler.core.model.entity.Employee;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SummationDTO extends BasicDto<Employee, SummationResult> implements Serializable, HasPositionId, HasShiftId {
    private LocalDate from;
    private LocalDate to;
    private Long positionId;
    private Long shiftId;

    public SummationDTO(Employee parent,
                        LocalDate from,
                        LocalDate to,
                        List<SummationResult> collection) {
        super(parent, collection);
        this.from = from;
        this.to = to;
    }
}
