import { XAndY, XYAndZ } from "@itwin/core-geometry"; //@ts-ignore no-unused-vars
import { BeButtonEvent, IModelApp, MarginOptions, Marker, StandardViewId, ViewChangeOptions, ZoomToOptions } from "@itwin/core-frontend";

export class SmartDeviceMarker extends Marker {

  // Override the default constructor to include smart device information
  constructor(
    location: XYAndZ,
    size: XAndY,
    smartDeviceId: string,
    smartDeviceType: string,
  ) {
    // Call base class constructor
    super(location, size);

    // Move all the code from the challenge into the new class
    this.title = smartDeviceId;
    this.setImageUrl("./fire.svg");
    this.label = smartDeviceType;
    this.labelOffset = { x: 0, y: 30 };
    this.labelColor = "black"; // ✅ Add this line to set label text color    
  }
}