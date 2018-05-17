package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(
        name = "departments",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "departments_unique_constraint",
                        columnNames = {"name"})
        }
)
public class Department implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Positive(message = "{entity.id.negative}")
    private Long id;

    @NotNull(message = "{department.name.empty}")
    @Size(  max = 64,
            min = 3,
            message = "{department.name.size}")
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY,
                orphanRemoval = true)
    private List<@NotNull @Valid Position> positions = new LinkedList<>();

    @JsonIgnore
    @OneToMany( mappedBy = "departmentId",
                cascade = CascadeType.ALL,
                fetch = FetchType.LAZY,
                orphanRemoval = true)
    private List<@NotNull @Valid ShiftPattern> patterns = new ArrayList<>();

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

    public List<@NotNull @Valid Position> getPositions() {
        return positions;
    }

    public void setPositions(List<@NotNull @Valid Position> positions) {
        this.positions = positions;
    }

    public List<ShiftPattern> getPatterns() {
        return patterns;
    }

    public void setPatterns(List<ShiftPattern> patterns) {
        this.patterns = patterns;
    }

    public void addPosition(Position position){
        position.setDepartmentId(this.getId());
        positions.add(position);
    }

    public void removePosition(Position position){
        position.setDepartmentId(null);
        positions.remove(position);
    }

    public void addPattern(ShiftPattern pattern){
        pattern.setDepartmentId(this.getId());
        patterns.add(pattern);
    }

    public void removePattern(ShiftPattern pattern){
        pattern.setDepartmentId(null);
        patterns.remove(pattern);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Department that = (Department) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(positions, that.positions);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
