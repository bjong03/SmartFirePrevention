export interface DeviceData {
    [index: string]: any;
}

export class DeviceStatusApi {
    public static async getData(): Promise<DeviceData> {
        // Fetch from cloud endpoint.
        const response = await fetch(
            "https://bjong03.github.io/smartdevice/data.json",
        ); 

        // Return response JSON.
        return response.json(); 
    }
}