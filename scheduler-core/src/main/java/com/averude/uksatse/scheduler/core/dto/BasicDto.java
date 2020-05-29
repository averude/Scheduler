package com.averude.uksatse.scheduler.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class BasicDto<P, C> implements Serializable {
    private P parent;
    private List<C> collection;
}
