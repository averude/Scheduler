package com.averude.uksatse.scheduler.core.dto;

import java.io.Serializable;

public class CountDTO implements Serializable {
    private long id;
    private long count;

    public CountDTO(long id, long count) {
        this.id = id;
        this.count = count;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
