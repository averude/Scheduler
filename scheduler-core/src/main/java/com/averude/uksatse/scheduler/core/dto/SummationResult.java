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
    private Long value;

    @Override
    public String toString() {
        return new StringJoiner(", ", SummationResult.class.getSimpleName() + "{", "}")
                .add("summationColumnId=" + summationColumnId)
                .add("value=" + value)
                .toString();
    }
}
