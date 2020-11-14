package com.averude.uksatse.scheduler.shared.manager;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScheduleTablePartitionManager implements TablePartitionManager<Long> {
    private static final String TABLE_NAME = "work_schedule";
    private static final String PARTITION_PREFIX = "_department_";

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void createPartition(@NonNull Long departmentId) {
        var sqlStatement = getCreateSQLStatement(departmentId);
        log.info("Creating partition of '{}' table for department id:{}...", TABLE_NAME, departmentId);
        log.debug("Executing SQL statement:'{}'", sqlStatement);
        jdbcTemplate.execute(sqlStatement);
        log.info("Partition of '{}' table for department id:{} was successfully created.", TABLE_NAME, departmentId);
    }

    @Override
    public void removePartition(@NonNull Long departmentId) {
        try {
            var sqlStatement = getDropSQLStatement(departmentId);
            log.info("Dropping partition of '{}' table for department id:{}.", TABLE_NAME, departmentId);
            log.debug("Executing SQL statement:'{}'", sqlStatement);
            jdbcTemplate.execute(sqlStatement);
            log.info("Partition of '{}' table for department id:{} was successfully dropped.", TABLE_NAME, departmentId);
        } catch (Exception e) {
            log.error("Cannot remove partition: " + e.getLocalizedMessage());
        }
    }

    private String getCreateSQLStatement(Long departmentId) {
        return new StringBuilder()
                .append("CREATE TABLE IF NOT EXISTS ")
                .append(TABLE_NAME)
                .append(PARTITION_PREFIX)
                .append(departmentId)
                .append(" PARTITION OF ")
                .append(TABLE_NAME)
                .append(" FOR VALUES IN (").append(departmentId).append(")")
                .toString();
    }

    private String getDropSQLStatement(Long departmentId) {
        return new StringBuilder()
                .append("DROP TABLE ")
                .append(TABLE_NAME)
                .append(PARTITION_PREFIX)
                .append(departmentId)
                .toString();
    }
}
