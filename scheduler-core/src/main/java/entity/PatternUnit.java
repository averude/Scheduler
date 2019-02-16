package entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;

@Entity
@Table(
        name = "pattern_units",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "pattern_token_unique_constraint",
                        columnNames = {"pattern_id","order_id"}
                )
        }
)
public class PatternUnit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{unit.pattern.null}")
    @Positive(message = "{unit.pattern.negative}")
    @Column(name = "pattern_id",
            nullable = false)
    private Long patternId;

    @NotNull(message = "{unit.order.null}")
    @Positive(message = "{unit.order.negative}")
    @Column(name = "order_id",
            nullable = false)
    private Long orderId;

    @NotNull(message = "{unit.daytype.null}")
    @Positive(message = "{unit.daytype.negative}")
    @Column(name = "day_type_id",
            nullable = false)
    private Long dayTypeId;

    @Size(  max = 5,
            message = "{unit.label.size}")
    @Column(nullable = true)
    private String label;

    @NotNull(message = "{unit.hours.null}")
    @PositiveOrZero(message = "{unit.hours.negative}")
    @DecimalMax(value = "24",
                message = "{unit.hours.max}")
    @Column(nullable = false)
    private Float value;

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

    public Long getDayTypeId() {
        return dayTypeId;
    }

    public void setDayTypeId(Long dayTypeId) {
        this.dayTypeId = dayTypeId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }
}
