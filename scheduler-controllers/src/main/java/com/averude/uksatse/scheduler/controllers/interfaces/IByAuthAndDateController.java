package com.averude.uksatse.scheduler.controllers.interfaces;

import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;

public interface IByAuthAndDateController<T> {
    List<T> getAllByAuth(Authentication authentication,
                         LocalDate from,
                         LocalDate to);
}
