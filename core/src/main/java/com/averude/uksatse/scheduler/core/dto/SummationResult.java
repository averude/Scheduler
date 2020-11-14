package com.averude.uksatse.scheduler.core.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.StringJoiner;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SummationResult {
    private Long summationColumnId;
    private String type;
    private Long value;

    @Override
    public String toString() {
        return new StringJoiner(", ", SummationResult.class.getSimpleName() + "{", "}")
                .add("summationColumnId=" + summationColumnId)
                .add("type=" + type)
                .add("value=" + value)
                .toString();
    }
}
