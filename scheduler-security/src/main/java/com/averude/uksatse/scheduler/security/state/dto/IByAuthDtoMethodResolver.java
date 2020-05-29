package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.service.IService;
import org.springframework.security.core.Authentication;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface IByAuthDtoMethodResolver {
    <P extends Serializable, C extends Serializable, ID> List<BasicDto<P,C>> findAll(Authentication authentication,
                                                                                     IService<P, ID> service,
                                                                                     LocalDate from,
                                                                                     LocalDate to);
}
