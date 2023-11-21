import request from './request';

export function registerRequest(data: any) {
  return request<any>({
    method: 'post',
    url: '/register',
    data
  });
}

export function conversationsRequest(data: any) {
  return request<any>({
    method: 'post',
    url: '/conversations',
    data
  });
}
