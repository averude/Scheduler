package controller;

import exception.EntityNotFoundException;
import service.GenericService;

import javax.validation.Validator;
import java.io.Serializable;
import java.util.Set;

public abstract class AbstractController<T extends Serializable> {

    private GenericService<T> genericService;

    AbstractController(GenericService<T> genericService) {
        this.genericService = genericService;
    }

    T validate(long id){
        T t = genericService.getById(id);
        if (t == null) {
            throw new EntityNotFoundException(id);
        }
        return t;
    }
}
