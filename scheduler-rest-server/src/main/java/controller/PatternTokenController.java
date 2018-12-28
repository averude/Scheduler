package controller;

import entity.PatternToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.PatternTokenService;

import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments/{departmentId}/patterns/{patternId}/tokens")
public class PatternTokenController {

    private PatternTokenService patternTokenService;

    @Autowired
    PatternTokenController(PatternTokenService patternTokenService) {
        this.patternTokenService = patternTokenService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<PatternToken> getAll(@PathVariable long departmentId,
                                           @PathVariable long patternId) {
        return this.patternTokenService.findAllInParent(patternId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Long> create(@PathVariable long departmentId,
                                       @PathVariable long patternId,
                                       @RequestBody PatternToken token) {
        this.patternTokenService.create(token);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(token.getId()).toUri();
        return ResponseEntity.created(location).body(token.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "{tokenId}")
    public PatternToken get(@PathVariable long departmentId,
                            @PathVariable long patternId,
                            @PathVariable long tokenId) {
        return this.patternTokenService.getById(tokenId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "{tokenId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @PathVariable long patternId,
                                    @PathVariable long tokenId,
                                    @RequestBody PatternToken dayType) {
        this.patternTokenService.updateById(tokenId, dayType);
        return ResponseEntity.ok("Token with ID:" + tokenId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{tokenId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId,
                                    @PathVariable long patternId,
                                    @PathVariable long tokenId) {
        this.patternTokenService.deleteById(tokenId);
        return new ResponseEntity<>("Token with ID:" + tokenId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
