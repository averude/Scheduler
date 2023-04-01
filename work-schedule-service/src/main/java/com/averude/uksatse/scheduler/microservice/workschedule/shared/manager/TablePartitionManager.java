package com.averude.uksatse.scheduler.microservice.workschedule.shared.manager;

public interface TablePartitionManager<T> {
    void createPartition(T t);
    void removePartition(T t);
}
