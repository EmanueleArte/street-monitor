export function formatUnderscoredString(input: string | undefined): string {
    if (!input) {
        return ""
    }
    const formatted = input.replace(/_/g, ' ')
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}