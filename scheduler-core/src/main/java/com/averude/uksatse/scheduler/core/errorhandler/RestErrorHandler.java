package com.averude.uksatse.scheduler.core.errorhandler;

import com.averude.uksatse.scheduler.core.dto.ErrorDetails;
import com.averude.uksatse.scheduler.core.exception.JsonTimeStringDeserializeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolationException;
import java.time.LocalDateTime;

@ControllerAdvice
public class RestErrorHandler extends ResponseEntityExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(RestErrorHandler.class);

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> {
                    logger.error("Field error. Field: {}, Message: {}", error.getField(), error.getDefaultMessage());
                    details.addError("Field error",
                            error.getField() + ": " + error.getDefaultMessage());
                });
        ex.getBindingResult()
                .getGlobalErrors()
                .forEach(error -> {
                    logger.error("Global error. Object: {}, Message: {}", error.getObjectName(), error.getDefaultMessage());
                    details.addError("Global error",
                            error.getObjectName() + ": " + error.getDefaultMessage());
                });
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        logger.error("Parameter {} is missing. {}", ex.getParameterName(), ex.getMessage());
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        details.addError("Request error",
                ex.getParameterName() + " parameter is missing");
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex,
                                                            WebRequest request){
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        ex.getConstraintViolations()
                .forEach(constraintViolation -> {
                    logger.error("Constraint violation: {}", constraintViolation.getMessage());
                    details.addError("Constraint violation",
                            constraintViolation.getMessage());
                });
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({PersistenceException.class})
    public ResponseEntity<Object> handlePersistenceException(PersistenceException ex,
                                                             WebRequest request){
        logger.error("Persistence error: {}", ex.getCause().getLocalizedMessage());
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        details.addError("Persistence error", ex.getCause().getLocalizedMessage());
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({JsonTimeStringDeserializeException.class})
    public ResponseEntity<Object> handleJsonDeserializationException(PersistenceException ex,
                                                             WebRequest request){
        logger.error("Json deserialization error: {}", ex.getCause().getLocalizedMessage());
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        details.addError("Json deserialization error", ex.getCause().getLocalizedMessage());
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }
}
