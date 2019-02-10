package errorhandlers;

import dto.ErrorDetails;
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

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> details.addError("Field error",
                        error.getField() + ": " + error.getDefaultMessage()));
        ex.getBindingResult()
                .getGlobalErrors()
                .forEach(error -> details.addError("Global error",
                        error.getObjectName() + ": " + error.getDefaultMessage()));
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
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
                .forEach(constraintViolation -> details.addError("Constraint violation",
                        constraintViolation.getMessage()));
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({PersistenceException.class})
    public ResponseEntity<Object> handlePersistenceException(PersistenceException ex,
                                                             WebRequest request){
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        details.addError("Persistence error", ex.getCause().getLocalizedMessage());
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }
}
