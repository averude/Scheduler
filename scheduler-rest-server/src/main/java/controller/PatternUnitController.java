package controller;

import entity.PatternUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.PatternUnitService;

import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments/{departmentId}/patterns/{patternId}/units")
public class PatternUnitController {

    private PatternUnitService patternUnitService;

    @Autowired
    PatternUnitController(PatternUnitService patternUnitService) {
        this.patternUnitService = patternUnitService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<PatternUnit> getAll(@PathVariable long departmentId,
                                          @PathVariable long patternId) {
        return this.patternUnitService.findAllInParent(patternId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Long> create(@PathVariable long departmentId,
                                       @PathVariable long patternId,
                                       @RequestBody PatternUnit unit) {
        this.patternUnitService.create(unit);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(unit.getId()).toUri();
        return ResponseEntity.created(location).body(unit.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "{unitId}")
    public PatternUnit get(@PathVariable long departmentId,
                           @PathVariable long patternId,
                           @PathVariable long unitId) {
        return this.patternUnitService.getById(unitId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "{unitId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @PathVariable long patternId,
                                    @PathVariable long unitId,
                                    @RequestBody PatternUnit dayType) {
        this.patternUnitService.updateById(unitId, dayType);
        return ResponseEntity.ok("Unit with ID:" + unitId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{unitId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId,
                                    @PathVariable long patternId,
                                    @PathVariable long unitId) {
        this.patternUnitService.deleteById(unitId);
        return new ResponseEntity<>("Unit with ID:" + unitId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
