package com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class ReportSheetParticipant implements Serializable {
    private String position;
    private String name;
}
