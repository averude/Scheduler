package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import org.springframework.security.core.Authentication;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface IByAuthDtoMethodResolver {
    <P extends Serializable, C extends Serializable, ID> List<? extends BasicDto<P, C>> findAll(Authentication authentication,
                                                                                                IService<P, ID> service,
                                                                                                LocalDate from,
                                                                                                LocalDate to);
}
