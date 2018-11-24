package dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.io.Serializable;
import java.util.Collection;

public abstract class AbstractDAO<T extends Serializable> {

    private Class<T> aClass;
    private SessionFactory sessionFactory;

    AbstractDAO(Class<T> aClass){
        this.aClass = aClass;
    }

    public void setTypeClass(Class<T> aClass) {
        this.aClass = aClass;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public T findById(long id) {
        return getCurrentSession()
                .get(aClass, id);
    }

    public void update(T t) {
        getCurrentSession().update(t);
    }

    public void delete(T t) {
        getCurrentSession().delete(t);
    }

    public void create(T t) {
        getCurrentSession().persist(t);
    }

    public void deleteById(long id) {
        T t = findById(id);
        delete(t);
    }

    public Collection<T> findAll() {
        return getCurrentSession()
                .createQuery("from " + aClass.getName(), aClass)
                .getResultList();
    }

    protected final Session getCurrentSession(){
        return sessionFactory.getCurrentSession();
    }
}
