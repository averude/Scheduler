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
        name = "shift_patterns",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "shift_paterns_unique_constraint",
                        columnNames = {"department_id", "name"}
                )
        }
)
public class ShiftPattern implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{shiftpattern.department.null}")
    @Positive(message = "{shiftpattern.department.negative}")
    @Column(name = "department_id",
            nullable = false)
    private Long departmentId;

    @NotNull(message = "{shiftpattern.name.null}")
    @Size(  max = 64,
            min = 3,
            message = "{shiftpattern.name.size}")
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany( mappedBy = "patternId",
                cascade = CascadeType.ALL,
                orphanRemoval = true)
    private List<PatternToken> sequence = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "patternId")
    private List<Shift> shifts = new ArrayList<>();

    public ShiftPattern() {
    }

    public ShiftPattern(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PatternToken> getSequence() {
        return sequence;
    }

    public void setSequence(List<PatternToken> sequence) {
        this.sequence = sequence;
    }

    public List<Shift> getShifts() {
        return shifts;
    }

    public void setShifts(List<Shift> shifts) {
        this.shifts = shifts;
    }

    public void addPatternToken(PatternToken patternToken) {
        patternToken.setId(this.getId());
        sequence.add(patternToken);
    }

    public void removePatternToken(PatternToken patternToken) {
        patternToken.setId(null);
        sequence.remove(patternToken);
    }
}