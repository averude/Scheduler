package com.averude.uksatse.scheduler.core.extractor;

public interface OnAuthorityFound<T, R> {
    R get(Long departmentId, Long shiftId);
}
