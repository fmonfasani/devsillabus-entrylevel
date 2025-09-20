import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.01'],
  },
  stages: [
    { duration: '30s', target: 20 },
    { duration: '2m', target: 20 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const res = http.get(`${__ENV.API_BASE_URL ?? 'http://localhost:3333'}/v1/orgs`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
