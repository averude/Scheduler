package service;

import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Min;
import java.io.Serializable;
import java.util.Collection;

@Validated
public interface GenericService<T extends Serializable> {
    Collection<T> getAll();
    Collection<T> getAll(@Min(value = 1L, message = "{entity.id.size}")
                         final long parentId);
    T getById(@Min(value = 1L, message = "{entity.id.size}")
              final long id);
    void create(T t);
    void createInParent(@Min(value = 1L, message = "{entity.id.size}")
                        final long parentId, T t);
    void deleteById(@Min(value = 1L, message = "{entity.id.size}")
                    final long id);
    void updateById(@Min(value = 1L, message = "{entity.id.size}")
                    final long id, T t);
}
