package validation;

import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ErrorDetails {

    private Date timestamp;
    private String message;
    private List<String> details = new ArrayList<>();

    public ErrorDetails(Date timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;
    }

    public ErrorDetails(Date timestamp, String message, List<String> details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }
}
