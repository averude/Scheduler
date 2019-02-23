package com.averude.uksatse.scheduler.shared.service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Optional;

@Service
public abstract class AbstractService<T extends Serializable, ID>
        implements GenericService<T, ID> {

    private CrudRepository<T, ID> repository;

    AbstractService() {

    }

    AbstractService(CrudRepository<T, ID> repository) {
        this.repository = repository;
    }

    public CrudRepository<T, ID> getGenericDAO() {
        return repository;
    }

    @Override
    public <S extends T> S save(S s) {
        return repository.save(s);
    }

    @Override
    public <S extends T> Iterable<S> saveAll(Iterable<S> iterable) {
        return repository.saveAll(iterable);
    }

    @Override
    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

    @Override
    public boolean existsById(ID id) {
        return repository.existsById(id);
    }

    @Override
    public Iterable<T> findAll() {
        return repository.findAll();
    }

    @Override
    public Iterable<T> findAllById(Iterable<ID> iterable) {
        return repository.findAllById(iterable);
    }

    @Override
    public long count() {
        return repository.count();
    }

    @Override
    public void deleteById(ID id) {
        repository.deleteById(id);
    }

    @Override
    public void delete(T t) {
        repository.delete(t);
    }

    @Override
    public void deleteAll(Iterable<? extends T> iterable) {
        repository.deleteAll(iterable);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }
}
