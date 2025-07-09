import { DecorateContext, Decorator, Marker } from "@itwin/core-frontend";
import { IModelDataApi, SmartDevice } from "./IModelDataApi";

// A fresh Decorator.
export class SmartDeviceDecorator implements Decorator {
    private _markers: Marker[];

    constructor() {
        // Initialize the markers
        this._markers = [];
        this.addMarkers();
    }

    private async addMarkers() {
        // Fetch the data from the iModel
        const devices: SmartDevice[] = await IModelDataApi.getSmartDevices();

        // Debug: Print device IDs to console
        console.log("Fetched Smart Devices:", devices.map((d) => d.smartDeviceId));

        // Create a new marker for each of the devices
        devices.forEach((device) => {
            const marker = new Marker(
                { x: device.origin.x, y: device.origin.y, z: device.origin.z },
                { x: 50, y: 50 },
            );
            marker.label = device.smartDeviceId;

            // Set text (label) color to black
            marker.labelColor = "black";

            // Optional: set font if desired
            marker.labelFont = "bold 12px sans-serif";
            // Store the markers in a class variable
            this._markers.push(marker);
        });

        return this._markers;
    }

    public decorate(context: DecorateContext): void {
        /*  This is where we draw! */
        this._markers.forEach(marker => {
            marker.addDecoration(context);
        });
    }
}