package com.example.mediflow.service;

import com.example.mediflow.dto.VitalsDTO;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class VitalsIngestionService {

    private final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
    private final ConcurrentHashMap<Long, Future<?>> activeMonitors = new ConcurrentHashMap<>();
    private final Random random = new Random();

    private final org.springframework.messaging.simp.SimpMessagingTemplate messagingTemplate;

    public VitalsIngestionService(org.springframework.messaging.simp.SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // In a real app, this would push to a WebSocket or Message Queue
    public void startMonitoring(Long patientId) {
        if (activeMonitors.containsKey(patientId)) {
            return;
        }

        Future<?> task = executor.submit(() -> {
            try {
                while (!Thread.currentThread().isInterrupted()) {
                    VitalsDTO vitals = generateVitals(patientId);
                    System.out.println("Processing Vitals for Patient " + patientId + ": " + vitals);
                    
                    messagingTemplate.convertAndSend("/topic/vitals/" + patientId, vitals);
                    
                    Thread.sleep(1000); // Simulate 1 second interval
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        activeMonitors.put(patientId, task);
    }

    public void stopMonitoring(Long patientId) {
        Future<?> task = activeMonitors.remove(patientId);
        if (task != null) {
            task.cancel(true);
        }
    }

    private VitalsDTO generateVitals(Long patientId) {
        return new VitalsDTO(
            patientId,
            60 + random.nextInt(40), // HR 60-100 normally
            110 + random.nextInt(20), // Systolic
            70 + random.nextInt(20),  // Diastolic
            LocalDateTime.now()
        );
    }
}
