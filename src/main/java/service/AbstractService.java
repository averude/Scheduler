package service;

import dao.GenericDAO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.Collection;

@Service
public abstract class AbstractService<T extends Serializable>
        implements GenericService<T> {

    private GenericDAO<T> genericDAO;

    AbstractService() {

    }

    AbstractService(GenericDAO<T> genericDAO) {
        this.genericDAO = genericDAO;
    }

    public GenericDAO<T> getGenericDAO() {
        return genericDAO;
    }

    @Override
    @Transactional
    public Collection<T> getAll() {
        return genericDAO.findAll();
    }

    @Override
    @Transactional
    public abstract Collection<T> getAll(long parentId);

    @Override
    @Transactional
    public T getById(long id) {
        return genericDAO.findById(id);
    }

    @Override
    @Transactional
    public void create(T t) {
        genericDAO.create(t);
    }

    @Override
    @Transactional
    public abstract void createInParent(long parentId, T t);

    @Override
    @Transactional
    public void deleteById(long id) {
        genericDAO.deleteById(id);
    }

    @Override
    @Transactional
    public abstract void updateById(long id, T t);
}
