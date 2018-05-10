package entity;

import javax.persistence.*;
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
    private Long id;

    @Column(name = "pattern_id")
    private Long patternId;

    @Column(name = "order_id")
    private Long orderId;

    @Column(nullable = false)
    private String name;

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