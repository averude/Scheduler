package com.averude.uksatse.scheduler.shared.service.base;

import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@NoArgsConstructor
public abstract class AService<T extends Serializable, ID> implements IService<T, ID> {

    private JpaRepository<T, ID> repository;

    protected AService(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }

    @Override
    public <S extends T> S save(@Valid S s) {
        return repository.save(s);
    }

    @Override
    public <S extends T> List<S> saveAll(@Valid Iterable<S> iterable) {
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
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public List<T> findAllById(Iterable<ID> iterable) {
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
