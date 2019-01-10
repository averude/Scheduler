package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "day_types",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "day_types_unique_constraint",
                        columnNames = {"label", "name"}
                )
        }
)
public class DayType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{daytype.name.null}")
    @Size(  max = 64,
            min = 1,
            message = "{daytype.name.size}")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "{daytype.label.null}")
    @Size(  max = 5,
            min = 1,
            message = "{daytype.label.size}")
    @Column(nullable = false)
    private String label;

    @JsonIgnore
    @OneToMany( mappedBy = "dayTypeId",
                fetch = FetchType.LAZY,
                orphanRemoval = true,
                cascade = CascadeType.ALL)
    private List<PatternToken> tokens = new ArrayList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "dayTypeId",
                fetch = FetchType.LAZY,
                orphanRemoval = true,
                cascade = CascadeType.ALL)
    private List<WorkDay> workDays = new ArrayList<>();

    public DayType() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String name) {
        this.label = name;
    }

    public List<PatternToken> getTokens() {
        return tokens;
    }

    public void setTokens(List<PatternToken> tokens) {
        this.tokens = tokens;
    }

    public List<WorkDay> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(List<WorkDay> workDays) {
        this.workDays = workDays;
    }
}