package com.averude.uksatse.scheduler.core.service;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@Validated
public interface IService<T extends Serializable, ID> {
    <S extends T> S save(@Valid S var1);

    <S extends T> List<S> saveAll(@Valid Iterable<S> var1);

    Optional<T> findById(ID var1);

    boolean existsById(ID var1);

    List<T> findAll();

    List<T> findAllById(Iterable<ID> var1);

    long count();

    void deleteById(ID var1);

    void delete(T var1);

    void deleteAll(Iterable<? extends T> var1);

    void deleteAll();
}
