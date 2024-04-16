import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export function generateRandomId(length: number): string {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return id;
}

export async function captureImage() {
    const photo = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
    })
    
    const parts = photo.dataUrl!.split(',');
    //const mime = parts[0].split(':')[1].split(';')[0];
    const data = parts[1];

    // Decode the base64 data
    const byteCharacters = atob(data);
    
    // Create a new ArrayBuffer and a new Uint8Array
    const arrayBuffer = new ArrayBuffer(byteCharacters.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // Loop over the data and populate the Uint8Array with the byte values
    for (let i = 0; i < byteCharacters.length; i++) {
        uint8Array[i] = byteCharacters.charCodeAt(i);
    }

    // Create a new Blob object from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'image/png' });

    const fileName = generateRandomId(10);
    // Create a new File object from the Blob
    const file = new File([blob], `${fileName}.png`, { type: 'image/png' });

    return {
        imageDataString: photo.dataUrl!,
        actualFile: file,
    }
}