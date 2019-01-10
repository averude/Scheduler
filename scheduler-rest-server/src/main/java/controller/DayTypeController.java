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

@RestController
@RequestMapping("/api/v1/daytypes")
public class DayTypeController {

    private final DayTypeService dayTypeService;

    @Autowired
    public DayTypeController(DayTypeService dayTypeService) {
        this.dayTypeService = dayTypeService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<DayType> getAll() {
        return dayTypeService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Long> add(@Valid @RequestBody DayType dayType) {
        dayTypeService.create(dayType);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(dayType.getId()).toUri();
        return ResponseEntity.created(location).body(dayType.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{dayTypeId}")
    public DayType get(@PathVariable long dayTypeId) {
        return dayTypeService.getById(dayTypeId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{dayTypeId}")
    public ResponseEntity<?> put(@PathVariable long dayTypeId,
                                 @RequestBody DayType dayType) {
        dayTypeService.updateById(dayTypeId, dayType);
        return ResponseEntity.ok("Day type with ID:" + dayTypeId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{dayTypeId}")
    public ResponseEntity<?> delete(@PathVariable long dayTypeId) {
        dayTypeService.deleteById(dayTypeId);
        return new ResponseEntity<>("Day type with ID:" + dayTypeId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
