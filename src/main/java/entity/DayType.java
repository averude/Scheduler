package entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(
        name = "day_types",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "day_types_unique_constraint",
                        columnNames = {"pattern_id", "label", "value"}
                )
        }
)
public class DayType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{daytype.pattern.null}")
    @Positive(message = "{daytype.pattern.negative}")
    @Column(name = "pattern_id",
            nullable = false)
    private Long patternId;

    @NotNull(message = "{daytype.order.null}")
    @Positive(message = "{daytype.order.negative}")
    @Column(name = "order_id",
            nullable = false)
    private Long orderId;

    @NotNull(message = "{daytype.name.null}")
    @Size(  max = 5,
            min = 1,
            message = "{daytype.name.size}")
    @Column(nullable = false)
    private String label;

    @NotNull(message = "{daytype.value.null}")
    @PositiveOrZero(message = "{daytype.value.negative}")
    @Column(nullable = false)
    private Float value;

    public DayType() {
    }

    public DayType(Long orderId, String label, Float value) {
        this.orderId = orderId;
        this.label = label;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatternId() {
        return patternId;
    }

    public void setPatternId(Long patternId) {
        this.patternId = patternId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String name) {
        this.label = name;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DayType dayType = (DayType) o;
        return Objects.equals(id, dayType.id) &&
                Objects.equals(patternId, dayType.patternId) &&
                Objects.equals(orderId, dayType.orderId) &&
                Objects.equals(label, dayType.label) &&
                Objects.equals(value, dayType.value);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, patternId, orderId, label, value);
    }
}