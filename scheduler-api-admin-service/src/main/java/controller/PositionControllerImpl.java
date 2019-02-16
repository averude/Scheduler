package controller;

import controllers.PositionController;
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
@RequestMapping("/positions")
public class PositionControllerImpl implements PositionController {

    private final PositionService positionService;

    @Autowired
    public PositionControllerImpl(PositionService positionService) {
        this.positionService = positionService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Position> getAll(@RequestHeader("Department-ID") Long departmentId){
        return positionService.findAllByDepartmentId(departmentId);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestHeader("Department-ID") Long departmentId,
                                    @Valid @RequestBody Position position){
        position.setDepartmentId(departmentId);
        positionService.save(position);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(position.getId()).toUri();
        return ResponseEntity.created(location).body(position.getId());
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/{positionId}")
    public Optional<Position> get(@RequestHeader("Department-ID") Long departmentId,
                                  @PathVariable Long positionId){
        return positionService.findById(positionId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{positionId}")
    public ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                                    @PathVariable Long positionId,
                                    @Valid @RequestBody Position position){
        if (positionId.equals(position.getId())) {
            positionService.save(position);
            return ResponseEntity.ok("Position with ID:" + positionId +
                    " was successfully updated");
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{positionId}")
    public ResponseEntity<?> delete(@RequestHeader("Department-ID") Long departmentId,
                                    @PathVariable Long positionId){
        positionService.deleteById(positionId);
        return ResponseEntity.ok("Position with ID:" + positionId +
                " was successfully deleted");
    }
}
