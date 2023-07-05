import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  scenarios: {
    shared_iter_scenario: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 100,
      startTime: '0s'
    },
    per_vu_scenario: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 10,
      startTime: '10s'
    }
  },
  ext: {
    loadimpact: {
      // Project: Default project
      projectID: 3646357,
      // Test runs with the same name groups test runs together
      name: 'DU MA Test'
    }
  }
}

export default function () {
  http.get('http://test.k6.io/');
  sleep(5);
}