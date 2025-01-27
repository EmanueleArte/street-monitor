export function formatUnderscoredString(input: string | undefined): string {
    if (!input) {
        return ""
    }
    const formatted = input.replace(/_/g, " ")
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export const base64ToBlob = (base64: string): Blob => {
    const [prefix, base64Data] = base64.split(",")
    const byteString = atob(base64Data)
    const mimeType = prefix.match(/:(.*?);/)?.[1] || "application/octet-stream"

    const buffer = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
        buffer[i] = byteString.charCodeAt(i)
    }

    return new Blob([buffer], { type: mimeType });
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
    const reader: FileReader = new FileReader()
    reader.readAsDataURL(blob)
    return new Promise<string>(resolve => {
        reader.onloadend = () => {
            resolve(reader.result as string)
        }
    })
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