package com.averude.uksatse.scheduler.core.converters;

import com.averude.uksatse.scheduler.core.model.ReportSheetParticipant;
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
