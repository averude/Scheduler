package com.averude.uksatse.scheduler.security.state.entity;

import org.springframework.security.core.Authentication;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface IByAuthMethodResolver {
    <T extends Serializable, ID> List<T> findAll(Authentication authentication,
                                                 Object service,
                                                 LocalDate from,
                                                 LocalDate to);
}
