export function formatUnderscoredString(input: string | undefined): string {
    if (!input) {
        return ""
    }
    const formatted = input.replace(/_/g, ' ')
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function formatDate(date: Date): string {
    const SECOND_IN_MS: number = 1000
    const MINUTE_IN_MS: number = SECOND_IN_MS * 60
    const HOUR_IN_MS: number = MINUTE_IN_MS * 60
    const DAY_IN_MS: number = HOUR_IN_MS * 24
    const time: number = new Date().getTime() - date.getTime()

    if (time < HOUR_IN_MS) {
        const minutes = Math.floor(time / MINUTE_IN_MS)
        return `${minutes} ${minutes == 1 ? "minute" : "minutes"} ago`
    }
    if (time < DAY_IN_MS) {
        const hours = Math.floor(time / HOUR_IN_MS)
        return `${hours} ${hours == 1 ? "hour" : "hours"} ago`
    }
    const days = Math.floor(time / DAY_IN_MS)
    if (days > 7) return date.toLocaleDateString() // date + time or only date?
    return `${days} ${days == 1 ? "day" : "days"} ago`
}