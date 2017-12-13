/* @flow */

export type ColorSet = {
  max: string,
  med: string,
  min: string,
};

export type Image = {
  source: string,
  name: ?string,
  data: Any,
}

export type AttachmentType = {
  image: Image,
  onPress: () => void,
  index: number,
};

export type Location = {
  lat: float,
  lon: float,
}

export type ServiceType = {
  key: number,
  label: string,
  serviceCode: number,
  serviceName: string,
  description: ?string,
  metadata: ?string,
  type: ?string,
  keywords: ?Array<string>,
  group: ?string
}

export type ServiceRequest = {
  id: string;
  statusNotes: string;
  status: string;
  serviceCode: number;
  serviceName: ?string;
  description: string;
  requestedDateTime: Date;
  updatedDateTime: Date;
  address: ?string;
  location: ?Location,
  mediaUrl: Any,
  mediaUrls: Array<Any>,
}


export type Profile = {[string]: mixed};
