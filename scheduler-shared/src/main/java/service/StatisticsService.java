package service;

import dto.CountDTO;

public interface StatisticsService {
    Iterable<CountDTO> countEmployeesByDepartmentId(long departmentId);
}
