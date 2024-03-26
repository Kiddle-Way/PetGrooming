package com.petgrooming.domain;

public enum State {
    근무(0),
    퇴사(1);

    private final int value;

    State(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}