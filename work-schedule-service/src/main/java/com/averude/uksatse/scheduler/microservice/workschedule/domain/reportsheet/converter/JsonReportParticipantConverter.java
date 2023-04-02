package com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.converter;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.entity.ReportSheetParticipant;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Converter;

@Slf4j
@Converter
public class JsonReportParticipantConverter extends JsonObjectConverter<ReportSheetParticipant> {

    @Override
    public ReportSheetParticipant convertToEntityAttribute(String s) {
        if (s == null) {
            return null;
        }

        ReportSheetParticipant reportSheetParticipant = null;
        try {
            reportSheetParticipant = mapper.readValue(s, ReportSheetParticipant.class);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
        }
        return reportSheetParticipant;
    }
}
