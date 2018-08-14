import axios from 'axios';
const BASE_API = 'http://coreapi.skyware.systems/api/v1/';

export const getEntityList = (entity, data, token) => {
  //console.log('Calling Base API : ',BASE_API + entity);
  return axios.get(BASE_API + entity, {params: data, cancelToken: token});
};
export const getEntity = (entity, data) => {
  return axios.get(BASE_API + entity, {params: data});
};

export const postEntity = (entity, data) => {
  var config = {
    headers: {'Content-Type': 'multipart/form-data'},
  };
  var fd = new FormData();
  Object.keys(data).map((key, value) => {
    return fd.set(key, data[key]);
  });
  return axios.post(BASE_API + entity, fd, config);
};
export const postJsonEntity = (entity, data) => {
  return axios.post(BASE_API + entity, data);
};
export const putEntity = (entity, data) => {
  var config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  };

  var formBody = [];
  for (var property of Object.keys(data)) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  var fd = new FormData();
  Object.keys(data).map((key, value) => {
    return fd.set(key, data[key]);
  });
  return axios.put(BASE_API + entity, formBody, config);
};
