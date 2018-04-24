package controller;

import entity.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.PositionService;

import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments/{departmentId}/positions")
public class PositionController {

    private final PositionService positionService;

    @Autowired
    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<Position> list(@PathVariable long departmentId){
        return positionService.getAll(departmentId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> add(@PathVariable long departmentId,
                                 @RequestBody Position position){
        positionService.createInParent(departmentId, position);
        return ResponseEntity.ok("New position in department " +
                "{" + departmentId + "} " +
                "was created with Id:" + position.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{positionId}")
    public Position get(@PathVariable long positionId){
        return positionService.getById(positionId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{positionId}")
    public ResponseEntity<?> update(@PathVariable long positionId,
                                    @RequestBody Position position){
        positionService.updateById(positionId, position);
        return ResponseEntity.ok("Position with ID:" + positionId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{positionId}")
    public ResponseEntity<?> delete(@PathVariable long positionId){
        positionService.deleteById(positionId);
        return ResponseEntity.ok("Position with ID:" + positionId +
                " was successfully deleted");
    }
}
