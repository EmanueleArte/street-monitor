export function formatUnderscoredString(input: string | undefined): string {
    if (!input) {
        return ""
    }
    const formatted = input.replace(/_/g, " ")
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export const base64ToBlob = (base64: string) => {
    const [prefix, base64Data] = base64.split(",")
    const byteString = atob(base64Data)
    const mimeType = prefix.match(/:(.*?);/)?.[1] || "application/octet-stream"

    const buffer = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
        buffer[i] = byteString.charCodeAt(i)
    }

    return new Blob([buffer], { type: mimeType });
}

export const blobToBase64 = (blob: Blob) => {
    const reader: FileReader = new FileReader()
    reader.readAsDataURL(blob)
    return new Promise<string>(resolve => {
        reader.onloadend = () => {
            resolve(reader.result as string)
        }
    })
}