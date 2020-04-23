package com.averude.uksatse.scheduler.core.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.StringJoiner;

public class BasicDto<E, C> implements Serializable {
    private E entity;
    private List<C> collection;

    public BasicDto() {
    }

    public BasicDto(E entity, List<C> collection) {
        this.entity = entity;
        this.collection = collection;
    }

    public E getEntity() {
        return entity;
    }

    public void setEntity(E entity) {
        this.entity = entity;
    }

    public List<C> getCollection() {
        return collection;
    }

    public void setCollection(List<C> collection) {
        this.collection = collection;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BasicDto<?, ?> basicDto = (BasicDto<?, ?>) o;
        return entity.equals(basicDto.entity) &&
                Objects.equals(collection, basicDto.collection);
    }

    @Override
    public int hashCode() {
        return Objects.hash(entity, collection);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", BasicDto.class.getSimpleName() + "{", "}")
                .add("entity=" + entity)
                .add("collection=" + collection)
                .toString();
    }
}
