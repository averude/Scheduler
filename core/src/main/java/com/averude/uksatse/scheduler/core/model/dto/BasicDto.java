package com.averude.uksatse.scheduler.core.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasicDto<P, C> implements Serializable {
    private P parent;
    private List<C> collection;
}
