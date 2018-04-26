package validation;

import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import validation.error.ErrorDetails;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@ControllerAdvice
public class RestErrorHandler extends ResponseEntityExceptionHandler{

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        List<FieldError> errorList = ex.getBindingResult().getFieldErrors();
        errorList.forEach(fieldError -> System.out.println(fieldError.getDefaultMessage()));
        ErrorDetails details = new ErrorDetails(new Date(),
                "Validation Failed", ex.getBindingResult().toString());
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

}
