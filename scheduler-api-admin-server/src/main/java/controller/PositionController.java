package controller;

import entity.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.PositionService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/positions")
public class PositionController {

    private final PositionService positionService;

    @Autowired
    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Position> getAll(@RequestHeader("Department-ID") long departmentId){
        return positionService.findAllByDepartmentId(departmentId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestHeader("Department-ID") long departmentId,
                                    @Valid @RequestBody Position position){
        if (departmentId == position.getDepartmentId()) {
            positionService.save(position);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{id}")
                    .buildAndExpand(position.getId()).toUri();
            return ResponseEntity.created(location).body(position.getId());
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{positionId}")
    public Optional<Position> get(@RequestHeader("Department-ID") long departmentId,
                                  @PathVariable long positionId){
        return positionService.findById(positionId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{positionId}")
    public ResponseEntity<?> update(@RequestHeader("Department-ID") long departmentId,
                                    @PathVariable long positionId,
                                    @Valid @RequestBody Position position){
        if (positionId == position.getId()) {
            positionService.save(position);
            return ResponseEntity.ok("Position with ID:" + positionId +
                    " was successfully updated");
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{positionId}")
    public ResponseEntity<?> delete(@RequestHeader("Department-ID") long departmentId,
                                    @PathVariable long positionId){
        positionService.deleteById(positionId);
        return ResponseEntity.ok("Position with ID:" + positionId +
                " was successfully deleted");
    }
}
