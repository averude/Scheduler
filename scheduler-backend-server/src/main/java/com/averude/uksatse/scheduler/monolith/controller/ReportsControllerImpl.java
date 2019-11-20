package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.monolith.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class ReportsControllerImpl {
    private final ReportsService reportsService;

    @Autowired
    public ReportsControllerImpl(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/reports")
    public ResponseEntity<InputStreamResource> generateReport(Authentication authentication,
                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                              @RequestParam(value = "from")
                                                                      LocalDate from,
                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                              @RequestParam(value = "to")
                                                                      LocalDate to) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition",
                "attachment; filename=schedule_" + from + "_" + to + "_.xls");

        InputStreamResource resource = reportsService.generateReportByAuth(authentication, from, to);

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(resource);
    }
}
