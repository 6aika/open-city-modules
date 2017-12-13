import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import { type ServiceType } from 'open-city-modules/src/types';
const CONFIG = getConfig();

const request = (url, method, headers, body, data) =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      //TODO: Timeout handling
      reject(new Error(CONFIG.TIMEOUT_MESSAGE));
    }, CONFIG.TIMEOUT_THRESHOLD);
    fetch(url, {
      method,
      headers,
      body,
      data,
    }).then((response) => {
      // const parsedResponse = JSON.parse(response._bodyInit)
      clearTimeout(timeoutId);
      if (response.status === 200 || response.status === 201) {
        console.warn(response._bodyInit)

        resolve(response._bodyInit);
      } else {
        console.warn("error")
        //TODO: Error handling
        reject(new Error());
      }
    })
  });


export const parseServiceTypes = (response): Array<ServiceType> => {
  const serviceTypeList: Array<ServiceType> = [];
  const responseData = JSON.parse(response);
  for (key in responseData) {
    const item = responseData[key];
    const serviceType: ServiceType = {
      key: item.service_code,
      label: item.service_name,
      serviceCode: item.service_code,
      serviceName: item.service_name,
      description: item.description,
      metadata: item.metadata,
      type: item.type,
      keywords: item.keywords,
      group: item.group,
    }

    serviceTypeList.push(serviceType);
  }

  return serviceTypeList;
}

export const getServiceTypes = () => {

  const url = CONFIG.OPEN311_API_URL + CONFIG.OPEN311_SERVICES;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

  return new Promise((resolve, reject) => {
    request(url, 'GET', headers, null, null).then((response) => {
      resolve(parseServiceTypes(response));
    }).catch(err => reject(err));
  });
};

export const getServiceRequests = () => {
  return;
}

export const postServiceRequest = () => {
  return;
}

export const getServiceRequest = () => {
  return;
}




export default request;
