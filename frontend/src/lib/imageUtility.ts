export const cropTo4by3 = (file: File, vertical: boolean = true): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()

        reader.onload = (e) => {
            img.src = e.target?.result as string
        }

        img.onload = () => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            if (!ctx) {
                reject(new Error("Failed to get canvas context"))
                return
            }

            const aspectRatio = vertical ? 3 / 4 : 4 / 3
            let cropWidth = img.width
            let cropHeight = img.height

            if (img.width / img.height > aspectRatio) {
                cropWidth = img.height * aspectRatio
            } else {
                cropHeight = img.width / aspectRatio
            }

            const cropX = (img.width - cropWidth) / 2
            const cropY = (img.height - cropHeight) / 2

            canvas.width = cropWidth
            canvas.height = cropHeight

            ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob)
                } else {
                    reject(new Error("Canvas is empty"))
                }
            }, file.type)
        }

        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    })
}

export const scaleToResolution = (blob: Blob, width: number = 960, height: number = 1280): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()

        reader.onload = (e) => {
            img.src = e.target?.result as string
        }

        img.onload = () => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            if (!ctx) {
                reject(new Error("Failed to get canvas context"))
                return
            }

            canvas.width = width
            canvas.height = height

            ctx.drawImage(img, 0, 0, width, height)

            canvas.toBlob((scaledBlob) => {
                if (scaledBlob) {
                    resolve(scaledBlob)
                } else {
                    reject(new Error("Canvas is empty"))
                }
            }, blob.type)
        }

        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(blob)
    })
}