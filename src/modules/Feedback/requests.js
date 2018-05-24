import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import { type ServiceType, type ServiceRequest } from 'open-city-modules/src/types';
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
        // console.warn(response._bodyInit)
        resolve(response._bodyInit);
      } else {
        console.warn("error");
        // TODO: Error handling
        reject(new Error());
      }
    });
  });

export const parseServiceTypes = (response): Array<ServiceType> => {
  const serviceTypeList: Array<ServiceType> = [];
  const responseData = JSON.parse(response);
  const blacklist = CONFIG.SERVICE_BLACKLIST || [];

  responseData.forEach((item) => {
    if (blacklist.indexOf(parseInt(item.service_code, 10)) === -1) {
      serviceTypeList.push({
        key: item.service_code,
        label: item.service_name,
        serviceCode: item.service_code,
        serviceName: item.service_name,
        description: item.description,
        metadata: item.metadata,
        type: item.type,
        keywords: item.keywords,
        group: item.group,
      });
    }
  });
};

export const parseServiceRequest = (serviceRequest): ServiceRequest => {
  const parsedRequest = {
    id: serviceRequest.service_request_id,
    statusNotes: serviceRequest.status_notes,
    status: serviceRequest.status,
    serviceCode: serviceRequest.service_code,
    serviceName: serviceRequest.service_name,
    description: serviceRequest.description,
    requestedDateTime: serviceRequest.requested_datetime,
    updatedDateTime: serviceRequest.updated_datetime,
    title: (serviceRequest.extended_attributes && serviceRequest.extended_attributes.title) ? serviceRequest.extended_attributes.title : serviceRequest.title,
    address: serviceRequest.address,
    location: {
      latitude: parseFloat(serviceRequest.lat),
      longitude: parseFloat(serviceRequest.long),
    },
    mediaUrl: serviceRequest.media_url,
    mediaUrls: serviceRequest.extended_attributes && serviceRequest.extended_attributes.media_urls,
  };

  if (serviceRequest.extended_attributes) {
    parsedRequest.extended_attributes = {
      tasks: serviceRequest.extended_attributes.tasks,
      detailedStatus: serviceRequest.extended_attributes.detailed_status
    }
  }

  return parsedRequest;
};

export const parseServiceRequests = (serviceRequestsData): Array<ServiceRequest> => {
  const serviceRequestList = [];
  if (serviceRequestsData.data) {
    serviceRequestsData.data.map((serviceRequest) => {
      serviceRequestList.push(parseServiceRequest(serviceRequest));
      // return None;
    });
  } else if (serviceRequestsData) {
    serviceRequestsData.map((serviceRequest) => {
      serviceRequestList.push(parseServiceRequest(serviceRequest));
      // return None;
    });
  }


  return serviceRequestList;
};

export const getServiceTypes = (locale = 'fi') => {
  const url = CONFIG.OPEN311_API_URL + CONFIG.OPEN311_SERVICES + CONFIG.OPEN311_SERVICE_LIST_LOCALE + locale;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

  return new Promise((resolve, reject) => {
    request(url, 'GET', headers, null, null).then((response) => {
      resolve(parseServiceTypes(response));
    }).catch(err => reject(err));
  });
};

export const getServiceRequests = () => {
  const url = CONFIG.OPEN311_API_URL + CONFIG.OPEN311_REQUESTS + CONFIG.OPEN311_SERVICE_REQUESTS_EXTENSIONS_POSTFIX;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

  return new Promise((resolve, reject) => {
    request(url, 'GET', headers, null, null).then((response) => {
      resolve(parseServiceRequests(JSON.parse(response.replace(/undefined/g, 'null'))));
    }).catch(err => reject(err));
  });
};

export const postServiceRequest = (data) => {
  const url = CONFIG.OPEN311_API_URL + CONFIG.OPEN311_REQUESTS + CONFIG.OPEN311_SERVICE_REQUESTS_EXTENSIONS_POSTFIX;
  const token = CONFIG.OPEN311_SEND_SERVICE_API_KEY;
  const method = 'POST';

  const headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
  data.append('api_key', token);
  return new Promise((resolve, reject) =>
    request(url, method, headers, data)
      .then(result => resolve(result)).catch(err => reject(err)));
};

export const getServiceRequest = (serviceRequestId) => {
  const url = CONFIG.OPEN311_API_URL
  + CONFIG.OPEN311_SERVICE_REQUEST_BASE_URL
  + serviceRequestId
  + CONFIG.OPEN311_SERVICE_REQUEST_PARAMETERS_URL;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

  return new Promise((resolve, reject) => {
    request(url, 'GET', headers, null, null).then((response) => {
      resolve(parseServiceRequest(JSON.parse(response)));
    }).catch(err => reject(err));
  });
};

export default request;
