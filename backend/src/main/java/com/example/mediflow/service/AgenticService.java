package com.example.mediflow.service;

import com.example.mediflow.entity.Patient;
import com.example.mediflow.repository.PatientRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AgenticService {

    private final ChatClient chatClient;
    private final PatientRepository patientRepository;

    public AgenticService(ChatClient.Builder chatClientBuilder, PatientRepository patientRepository) {
        this.chatClient = chatClientBuilder.build();
        this.patientRepository = patientRepository;
    }

    public String analyzePatientHealth(Long patientId, String query) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // In a real app, fetch recent vitals and records
        String context = """
                Patient Name: {name}
                Age: {age}
                Gender: {gender}
                Medical History: [Simulated History: Hypertension, Diabetes Type 2]
                Current Vitals (Simulated): Heart Rate variable, BP elevated.
                """;

        PromptTemplate promptTemplate = new PromptTemplate(
                """
                You are MediFlow, an AI Medical Assistant. Use the following patient context to answer the doctor's query.
                
                CONTEXT:
                {context}
                
                QUERY:
                {query}
                
                Provide a concise, clinical analysis.
                """
        );

        Prompt prompt = promptTemplate.create(Map.of(
                "context", context.replace("{name}", patient.getName())
                        .replace("{age}", String.valueOf(patient.getAge()))
                        .replace("{gender}", patient.getGender()),
                "query", query
        ));

        try {
            return chatClient.prompt(prompt).call().content();
        } catch (Exception e) {
            System.err.println("AI Provider failed: " + e.getMessage());
            return "Simulated AI Analysis (Ollama not detected): " +
                   "Based on the simulated vitals, the patient shows signs of white-coat hypertension. " +
                   "Heart rate is within normal range but BP is slightly elevated. Monitor for next 24 hours.";
        }
    }
}
