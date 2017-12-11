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


export type Profile = {[string]: mixed};
