package com.example.mediflow.config;

import com.example.mediflow.entity.Patient;
import com.example.mediflow.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PatientRepository patientRepository;

    @Override
    public void run(String... args) throws Exception {
        if (patientRepository.count() == 0) {
            patientRepository.save(new Patient(null, "John Doe", 45, "Male", null));
            patientRepository.save(new Patient(null, "Jane Smith", 32, "Female", null));
            patientRepository.save(new Patient(null, "Robert Brown", 60, "Male", null));
            System.out.println("Seeded test patients.");
        }
    }
}
