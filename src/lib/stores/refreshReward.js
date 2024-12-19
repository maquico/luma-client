import { writable } from 'svelte/store';

// Store to manage refresh state as a boolean
export const refreshReward = writable(false);

export function toggle() {
    // Toggle the boolean value of refreshReward
    refreshReward.update(value => !value);
}