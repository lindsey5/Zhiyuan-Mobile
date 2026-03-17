export function formatToPeso (num : number) {
    const formatted = num.toLocaleString('en-us');

    return `₱ ${formatted}`;
}