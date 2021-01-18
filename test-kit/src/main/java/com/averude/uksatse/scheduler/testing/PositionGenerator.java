package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.model.entity.Position;

import java.util.ArrayList;
import java.util.List;

public class PositionGenerator {

    public List<Position> generatePositionsList(int numberOfPositions) {
        var positions = new ArrayList<Position>();
        for (int i = 0; i < numberOfPositions; i++) {
            var id = (long) (i+1);
            var position = new Position();
            position.setId(id);
            position.setName("Position_" + id);
            position.setShortName("Position_" + id);
            positions.add(position);
        }
        return positions;
    }
}
