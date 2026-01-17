package com.example.mediflow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VitalsDTO {
    private Long patientId;
    private int heartRate;
    private int systolic;
    private int diastolic;
    private LocalDateTime timestamp;
}
