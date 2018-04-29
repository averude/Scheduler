package validation;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

public class ErrorDetails {

    private LocalDateTime time;
    private String message;
    private List<String> details = new ArrayList<>();

    public ErrorDetails(LocalDateTime time, String message) {
        this.time = time;
        this.message = message;
    }

    public ErrorDetails(LocalDateTime time, String message, List<String> details) {
        this.time = time;
        this.message = message;
        this.details = details;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
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
