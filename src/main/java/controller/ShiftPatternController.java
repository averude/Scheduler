package controller;

import entity.ShiftPattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.ShiftPatternService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments/{departmentId}/patterns")
public class ShiftPatternController extends AbstractController<ShiftPattern> {

    private ShiftPatternService shiftPatternService;

    @Autowired
    ShiftPatternController(ShiftPatternService shiftPatternService) {
        super(shiftPatternService);
        this.shiftPatternService = shiftPatternService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<ShiftPattern> getAll(@PathVariable long departmentId) {
        return this.shiftPatternService.findAllInParent(departmentId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> create(@PathVariable long departmentId,
                                    @Valid @RequestBody ShiftPattern shiftPattern){
        this.shiftPatternService.create(shiftPattern);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(shiftPattern.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "{patternId}")
    public ShiftPattern get(@PathVariable long departmentId,
                            @PathVariable long patternId) {
        return this.shiftPatternService.getById(patternId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "{patternId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @PathVariable long patternId,
                                    @Valid @RequestBody ShiftPattern shiftPattern) {
        this.shiftPatternService.updateById(patternId, shiftPattern);
        return ResponseEntity.ok("Shift pattern with ID:" + patternId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{patternId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId,
                                    @PathVariable long patternId) {
        this.shiftPatternService.deleteById(patternId);
        return new ResponseEntity<>("Shift pattern with ID:" + patternId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
