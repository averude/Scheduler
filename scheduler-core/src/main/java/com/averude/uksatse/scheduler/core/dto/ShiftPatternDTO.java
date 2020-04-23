package com.averude.uksatse.scheduler.core.dto;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;

import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

public class ShiftPatternDTO {
    private ShiftPattern pattern;
    private List<PatternUnit> sequence;

    public ShiftPattern getPattern() {
        return pattern;
    }

    public void setPattern(ShiftPattern pattern) {
        this.pattern = pattern;
    }

    public List<PatternUnit> getSequence() {
        return sequence;
    }

    public void setSequence(List<PatternUnit> sequence) {
        this.sequence = sequence;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShiftPatternDTO that = (ShiftPatternDTO) o;
        return pattern.equals(that.pattern) &&
                Objects.equals(sequence, that.sequence);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pattern, sequence);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ShiftPatternDTO.class.getSimpleName() + "{", "}")
                .add("pattern=" + pattern)
                .add("sequence=" + sequence)
                .toString();
    }
}
