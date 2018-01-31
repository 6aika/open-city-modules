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
  latitude: float,
  longitude: float,
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
  title: ?string;
  serviceName: ?string;
  description: string;
  requestedDateTime: Date;
  updatedDateTime: Date;
  address: ?string;
  location: ?Location,
  mediaUrl: ?string,
  mediaUrls: ?Array<string>,
  extended_attributes: ?{ tasks: ?Array<Object>, detailedStatus: ?string },
}


export type Profile = {[string]: mixed};
