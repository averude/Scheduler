package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.HasId;
import org.springframework.security.core.Authentication;

public interface GenericByAuthService<T extends HasId, ID> extends GenericService<T, ID> {
    Iterable<T> findAllByAuth(Authentication authentication);
}
