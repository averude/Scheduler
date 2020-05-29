package com.averude.uksatse.scheduler.core.service;

import java.io.Serializable;
import java.util.List;

public interface IByEnterpriseIdService<T extends Serializable, ID> {
    List<T> findAllByEnterpriseId(Long enterpriseId);
}
