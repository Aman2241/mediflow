package com.example.mediflow.controller;

import com.example.mediflow.service.AgenticService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/agent")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AgenticController {

    private final AgenticService agenticService;

    @PostMapping("/analyze/{patientId}")
    public Map<String, String> analyzePatient(@PathVariable Long patientId, @RequestBody Map<String, String> body) {
        String query = body.get("query");
        String response = agenticService.analyzePatientHealth(patientId, query);
        return Map.of("response", response);
    }
}
