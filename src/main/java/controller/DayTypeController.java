package controller;

import entity.DayType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.DayTypeService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/departments/{departmentId}/patterns/{patternId}/daytypes")
public class DayTypeController {

    private DayTypeService dayTypeService;

    @Autowired
    DayTypeController(DayTypeService dayTypeService) {
        this.dayTypeService = dayTypeService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<DayType> getAll(@PathVariable long departmentId,
                                      @PathVariable long patternId) {
        return this.dayTypeService.findAllInParent(patternId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Long> create(@PathVariable long departmentId,
                                       @PathVariable long patternId,
                                       @Valid @RequestBody DayType dayType) {
        this.dayTypeService.create(dayType);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(dayType.getId()).toUri();
        return ResponseEntity.created(location).body(dayType.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "{dayTypeId}")
    public DayType get(@PathVariable long departmentId,
                       @PathVariable long patternId,
                       @PathVariable long dayTypeId) {
        return this.dayTypeService.getById(dayTypeId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "{dayTypeId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @PathVariable long patternId,
                                    @PathVariable long dayTypeId,
                                    @Valid @RequestBody DayType dayType) {
        this.dayTypeService.updateById(dayTypeId, dayType);
        return ResponseEntity.ok("Day type with ID:" + dayTypeId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{dayTypeId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId,
                                    @PathVariable long patternId,
                                    @PathVariable long dayTypeId) {
        this.dayTypeService.deleteById(dayTypeId);
        return new ResponseEntity<>("Day type with ID:" + dayTypeId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
