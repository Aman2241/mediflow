package com.example.mediflow.controller;

import com.example.mediflow.service.VitalsIngestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vitals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow Next.js dev server
public class VitalsController {

    private final VitalsIngestionService vitalsService;

    @PostMapping("/monitor/{patientId}")
    public String startMonitoring(@PathVariable Long patientId) {
        vitalsService.startMonitoring(patientId);
        return "Monitoring started for patient " + patientId;
    }

    @PostMapping("/stop/{patientId}")
    public String stopMonitoring(@PathVariable Long patientId) {
        vitalsService.stopMonitoring(patientId);
        return "Monitoring stopped for patient " + patientId;
    }
}
