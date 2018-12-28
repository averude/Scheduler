package entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;

@Entity
@Table(
        name = "pattern_token",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "pattern_token_unique_constraint",
                        columnNames = {"pattern_id","order_id"}
                )
        }
)
public class PatternToken implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{token.pattern.null}")
    @Positive(message = "{token.pattern.negative}")
    @Column(name = "pattern_id",
            nullable = false)
    private Long patternId;

    @NotNull(message = "{token.order.null}")
    @Positive(message = "{token.order.negative}")
    @Column(name = "order_id",
            nullable = false)
    private Long orderId;

    @NotNull(message = "{token.daytype.null}")
    @Positive(message = "{token.daytype.negative}")
    @Column(name = "day_type_id",
            nullable = false)
    private Long dayTypeId;

    @NotNull(message = "{token.label.null}")
    @Size(  max = 5,
            min = 1,
            message = "{token.label.size}")
    @Column(nullable = false)
    private String label;

    @NotNull(message = "{token.hours.null}")
    @PositiveOrZero(message = "{token.hours.negative}")
    @DecimalMax(value = "24",
                message = "{token.hours.max}")
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
