package validation;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ErrorDetails {

    private LocalDateTime time;
    private List<ErrorDTO> errors = new ArrayList<>();

    public ErrorDetails(LocalDateTime time) {
        this.time = time;
    }

    public ErrorDetails(LocalDateTime time, List<ErrorDTO> errors) {
        this.time = time;
        this.errors = errors;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public List<ErrorDTO> getErrors() {
        return errors;
    }

    public void setErrors(List<ErrorDTO> errors) {
        this.errors = errors;
    }

    public void addError(ErrorDTO errorDTO){
        errors.add(errorDTO);
    }

    public void removeError(ErrorDTO errorDTO){
        errors.remove(errorDTO);
    }

    public void addError(String message, String details){
        errors.add(new ErrorDTO(message, details));
    }
}
