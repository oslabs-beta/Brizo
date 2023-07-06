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
      name: 'DU MA Test',
      apm: [
        {
          provider: 'prometheus',
          remoteWriteURL: 'http://10.100.45.157:19090/api/v1/write',
          includeDefaultMetrics: true,
          includeTestRunId: true,
          resampleRate: 3
        },
        {
          provider: 'prometheus',
          remoteWriteURL: 'https://prometheus-prod-36-prod-us-west-0.grafana.net/api/prom/push',
          // optional parameters
          credentials: {
            token: '',
            // insert your token here
          },
          includeDefaultMetrics: true,
          metrics: ['http_req_sending', 'my_rate', 'my_gauge'], //...other options,
          includeDefaultMetrics: true,
          includeTestRunId: true,
          resampleRate: 3,
        },
      ]
    }
  }
}

export default function () {
  http.get('http://test.k6.io/');
  sleep(5);
}