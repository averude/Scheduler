package controller;

import exception.EntityNotFoundException;
import service.GenericService;

import java.io.Serializable;

public abstract class AbstractController<T extends Serializable> {

    private GenericService<T> genericService;

    AbstractController(GenericService<T> genericService) {
        this.genericService = genericService;
    }

    protected void validate(long id){
        T t = genericService.getById(id);
        if (t == null) {
            throw new EntityNotFoundException(id);
        }
    }
}
