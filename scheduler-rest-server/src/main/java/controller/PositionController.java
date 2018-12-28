package controller;

import entity.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.PositionService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments/{departmentId}/positions")
public class PositionController extends AbstractController<Position>{

    private final PositionService positionService;

    @Autowired
    public PositionController(PositionService positionService) {
        super(positionService);
        this.positionService = positionService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<Position> getAll(@PathVariable long departmentId){
        return positionService.findAllInParent(departmentId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Long> create(@PathVariable long departmentId,
                                       @Valid @RequestBody Position position){
        positionService.createInParent(departmentId, position);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(position.getId()).toUri();
        return ResponseEntity.created(location).body(position.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{positionId}")
    public Position get(@PathVariable long departmentId,
                        @PathVariable long positionId){
        this.validate(positionId);
        return positionService.getById(positionId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{positionId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @PathVariable long positionId,
                                    @Valid @RequestBody Position position){
        this.validate(positionId);
        positionService.updateById(positionId, position);
        return ResponseEntity.ok("Position with ID:" + positionId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{positionId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId,
                                    @PathVariable long positionId){
        this.validate(positionId);
        positionService.deleteById(positionId);
        return ResponseEntity.ok("Position with ID:" + positionId +
                " was successfully deleted");
    }
}
