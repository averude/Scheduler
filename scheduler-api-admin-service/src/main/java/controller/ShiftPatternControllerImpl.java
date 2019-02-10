package controller;

import controllers.ShiftPatternController;
import entity.ShiftPattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.ShiftPatternService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/patterns")
public class ShiftPatternControllerImpl implements ShiftPatternController {

    private final ShiftPatternService shiftPatternService;

    @Autowired
    ShiftPatternControllerImpl(ShiftPatternService shiftPatternService) {
        this.shiftPatternService = shiftPatternService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<ShiftPattern> getAll(@RequestHeader("Department-ID") long departmentId) {
        return this.shiftPatternService.findAllByDepartmentId(departmentId);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestHeader("Department-ID") long departmentId,
                                    @Valid @RequestBody ShiftPattern shiftPattern){
        if (departmentId == shiftPattern.getDepartmentId()) {
            this.shiftPatternService.save(shiftPattern);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{id}")
                    .buildAndExpand(shiftPattern.getId()).toUri();
            return ResponseEntity.created(location).body(shiftPattern.getId());
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "{patternId}")
    public Optional<ShiftPattern> get(@RequestHeader("Department-ID") long departmentId,
                                      @PathVariable long patternId) {
        return this.shiftPatternService.findById(patternId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT,
                    value = "{patternId}")
    public ResponseEntity<?> update(@RequestHeader("Department-ID") long departmentId,
                                    @PathVariable long patternId,
                                    @Valid @RequestBody ShiftPattern shiftPattern) {
        if (patternId == shiftPattern.getId() && departmentId == shiftPattern.getDepartmentId()) {
            this.shiftPatternService.save(shiftPattern);
            return ResponseEntity.ok("Shift pattern with ID:" + patternId +
                    " was successfully updated");
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{patternId}")
    public ResponseEntity<?> delete(@RequestHeader("Department-ID") long departmentId,
                                    @PathVariable long patternId) {
        this.shiftPatternService.deleteById(patternId);
        return new ResponseEntity<>("Shift pattern with ID:" + patternId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
