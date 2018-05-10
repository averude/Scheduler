package service;

import org.springframework.validation.annotation.Validated;
import validation.CheckDateParameters;

import javax.validation.constraints.Min;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

@Validated
public interface ScheduleGenerationService {
    @CheckDateParameters
    void generate(@Min(1L)
                  long employeeId,
                  LocalDate start,
                  LocalDate stop,
                  @PositiveOrZero
                  int offset);
}
