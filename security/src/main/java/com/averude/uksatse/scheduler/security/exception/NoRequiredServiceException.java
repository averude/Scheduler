package com.averude.uksatse.scheduler.security.exception;

public class NoRequiredServiceException extends RuntimeException {
    public NoRequiredServiceException() {
    }

    public NoRequiredServiceException(String message) {
        super(message);
    }
}
