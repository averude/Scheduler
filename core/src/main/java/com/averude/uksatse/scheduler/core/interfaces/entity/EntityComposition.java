package com.averude.uksatse.scheduler.core.interfaces.entity;

public interface EntityComposition<SideAType, SideBType> extends HasDateDuration {
    SideAType getSideA();
    SideBType getSideB();

    void setSideA(SideAType sideA);
    void setSideB(SideBType sideB);
}
