package service;

import java.io.Serializable;
import java.util.Collection;

public interface GenericService<T extends Serializable> {
    Collection<T> getAll();
    Collection<T> getAll(final long parentId);
    T getById(final long id);
    void create(T t);
    void createInParent(final long parentId, T t);
    void deleteById(final long id);
    void updateById(final long id, T t);
}
