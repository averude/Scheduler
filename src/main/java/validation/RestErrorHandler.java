package validation;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import validation.error.ErrorDetails;

import java.util.Date;

@ControllerAdvice
public class RestErrorHandler extends ResponseEntityExceptionHandler{

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        System.out.println(ex.getMessage());
        ErrorDetails details = new ErrorDetails(new Date(),
                "Validation Failed", ex.getMessage());
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }
}
