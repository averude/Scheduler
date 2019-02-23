package com.averude.uksatse.scheduler.core.dto;

import java.io.Serializable;

public class CountDTO implements Serializable {
    private Long id;
    private Long count;

    public CountDTO() {
    }

    public CountDTO(Long id, Long count) {
        this.id = id;
        this.count = count;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
