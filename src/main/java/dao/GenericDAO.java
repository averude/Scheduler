package dao;

import java.io.Serializable;
import java.util.Collection;

public interface GenericDAO<T extends Serializable> {
    Collection<T> findAll();
    T findById(final long id);
    // CRUD
    void update(final T t);
    void delete(final T t);
    void create(final T t);
    void deleteById(final long id);
}
