package entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(
        name = "day_types",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "day_types_unique_constraint",
                        columnNames = {"name", "value"}
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
    @Size(  max = 20,
            min = 3,
            message = "{daytype.name.size}")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "{daytype.value.null}")
    @PositiveOrZero(message = "{daytype.value.negative}")
    @Column(nullable = false)
    private Float value;

    public DayType() {
    }

    public DayType(Long orderId, String name, Float value) {
        this.orderId = orderId;
        this.name = name;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

}