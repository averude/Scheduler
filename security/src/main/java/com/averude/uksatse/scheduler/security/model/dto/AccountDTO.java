package com.averude.uksatse.scheduler.security.model.dto;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private UserAccount userAccount;
    private List<Long> shiftIds;
}
