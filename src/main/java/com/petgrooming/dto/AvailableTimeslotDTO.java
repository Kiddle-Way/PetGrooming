package com.petgrooming.dto;

import java.time.LocalDate;

import com.petgrooming.domain.Designer;
import com.petgrooming.domain.ReserveTime;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AvailableTimeslotDTO {

    private Long a_t_num;
    private LocalDate a_t_date;
    private ReserveTime time;
    private boolean isAvailable;
    private Designer d_num;
    
}
