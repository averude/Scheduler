package com.averude.uksatse.scheduler.shared.utils;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class BasicDtoSavingUtil {
    private static final Logger logger = LoggerFactory.getLogger(BasicDtoSavingUtil.class);

    public <T extends Serializable, C extends Serializable, ID, DTO extends BasicDto<T, C>> DTO saveDto(DTO dto,
                                                                                       JpaRepository<T, ID> parentRepository,
                                                                                       JpaRepository<C, ID> childRepository,
                                                                                       BiConsumer<T, List<C>> onChildRemove,
                                                                                       BiConsumer<T, List<C>> onSetChildParentRelation) {
        logger.debug("Saving parent entity {} to the DB...", dto);
        T parentEntity = dto.getParent();
        List<C> childCollection = dto.getCollection();
        parentRepository.save(parentEntity);

        logger.debug("Removing entities that aren't in child collection...");
        onChildRemove.accept(parentEntity, childCollection);
        logger.debug("Deleted.");

        logger.debug("Setting child-parent relation");
        onSetChildParentRelation.accept(parentEntity, childCollection);

        childRepository.saveAll(childCollection);
        return dto;
    }

    public <T, C> List<BasicDto<T, C>> convertToDto(List<T> collection,
                                                    Function<T, List<C>> onGetChildCollection) {
        return collection.stream()
                .map(t -> new BasicDto<T, C>(t, onGetChildCollection.apply(t)))
                .collect(Collectors.toList());
    }

    public <C extends HasId> List<Long> getIds(List<C> collection) {
        return collection
                .stream()
                .filter(c -> c.getId() != null && c.getId() > 0)
                .map(C::getId)
                .collect(Collectors.toList());
    }
}
