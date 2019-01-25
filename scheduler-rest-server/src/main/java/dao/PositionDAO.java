package dao;

import entity.Position;

import java.util.Collection;

public interface PositionDAO extends GenericDAO<Position> {
    Collection<Position> findAllInDepartment(long departmentId);
}
