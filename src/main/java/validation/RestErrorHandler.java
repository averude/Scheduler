package validation;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;
import java.time.LocalDateTime;

@ControllerAdvice
public class RestErrorHandler extends ResponseEntityExceptionHandler{

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(fieldError -> details.addError("Argument validation error",
                        fieldError.getDefaultMessage()));
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex,
                                                            WebRequest request){
        ErrorDetails details = new ErrorDetails(LocalDateTime.now());
        ex.getConstraintViolations()
                .forEach(constraintViolation -> details.addError("Method validaiton error",
                        constraintViolation.getMessage()));
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }
}
