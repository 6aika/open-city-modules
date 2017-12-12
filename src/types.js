/* @flow */

export type ColorSet = {
  max: string,
  med: string,
  min: string,
};

export type Image = {
  source: string,
  name: ?string,
}

export type AttachmentType = {
  image: Image,
  onPress: () => void,
};

export type ServiceType = {
  serviceCode: number,
  service_name: string,
  description: ?string,
  metadata: ?string,
  type: ?string,
  keywords: ?Array<string>,
  group: ?string
}


export type Profile = {[string]: mixed};
