# Brizo

![Brizo Banner](https://github.com/oslabs-beta/Brizo/blob/dev/assets/brizo-high-resolution-color-logo.png?raw=true)

Brizo is a lightweight developer tool built from scratch to help developers monitor their Kubernetes (K8) clusters. Prometheus and ChartJS work together to monitor and display important cluster health metrics for a K8s cluster. Brizo also runs your cluster through CIS security testing standards to ensure proper cluster security.

<div align="center" style="display: flex; justify-content: center; align-items: center; gap: 25px;">
  <a href="https://reactjs.org/" rel="nofollow">
    <img src="https://camo.githubusercontent.com/ab4c3c731a174a63df861f7b118d6c8a6c52040a021a552628db877bd518fe84/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642" data-canonical-src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="ReactJs" style="max-width: 100%">
  </a>
  <a href="https://typescriptlang.org/" rel="nofollow">
    <img src="https://camo.githubusercontent.com/ee71fcc1aa3d059265517741dffc4161922fd744377e7a5f07c43381d0aa9aac/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747970657363726970742d2532333030374143432e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" style="max-width: 100%">
  </a>
  <a href="https://www.chartjs.org/" rel="nofollow">
    <img src="https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white" alt="ChartJS" style="max-width:100%">
  </a>
  <a href="https://expressjs.com/" rel="nofollow">
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="ExpressJS" style="max-width:100%">
  </a>
  <a href="https://www.npmjs.com/" rel="nofollow">
    <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" style="max-width:100%">
  </a>
  <a href="https://reactrouter.com/en/main" rel="nofollow">
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" style="max-width:100%">
  </a>
  <a href="https://sass-lang.com/" rel="nofollow">
    <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="SASS" style="max-width:100%">
  </a>
  <a href="https://webpack.js.org/" rel="nofollow">
    <img src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack" style="max-width:100%">
  </a>
  <a href="https://aws.amazon.com/" rel="nofollow">
    <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" style="max-width:100%">
  </a>
  <a href="https://www.apple.com/macos/" rel="nofollow">
    <img src="https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0" alt="MacOS" style="max-width:100%">
  </a>
  <a href="https://www.microsoft.com/en-us/windows" rel="nofollow">
    <img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" alt="Windows" style="max-width:100%">
  </a>
  <a href="https://www.docker.com/" rel="nofollow">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" style="max-width:100%">
  </a>
  <a href="https://eslint.org/" rel="nofollow">
    <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="Eslint" style="max-width:100%">
  </a>
  <a href="https://kubernetes.io/" rel="nofollow">
    <img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" alt="kubernetes" style="max-width:100%">
  </a>
</div> 
<br>

## Table of Contents

1. [Brizo](#Brizo)
2. [Features](#features)
3. [Benefits](#benefits)
4. [Privacy Statement](#privacy-statement)
5. [Installation](#installation)
6. [Scripts](#scripts)
7. [File Structure](#file-structure)
8. [Our Team](#our-team)
9. [License](#license)

## Features

Brizo offers several key features that make it a valuable tool for kubernetes cluster management:

1. **K8s Cluster Structure Display**: Brizo automatically generates a visual display of your K8s cluster structure, saving you the effort of tracking your cluster manually in the terminal. Navigate between namespaces with ease to see your deployed Nodes and PODs.

2. **Compatibility with Multiple Environments**: Brizo is compatible with multiple developer environments, including macOS, Windows, and Linux. Instructions based on your dev environment can be found in the [Installation](#installation) section. 

3. **Security Testing**: Brizo compares your cluster configuration to the CIS security standards, ensuring proper setup for developers. Brizo also offers remediations to address any of the test warnings/failures.

4. **Autoscale Testing**: Brizo works with Grafana Cloud k6 services to artificially create traffic spikes and monitor your cluster's responsiveness, which helps developers identify potential bottlenecks in their cluster configuration during the development phase.
<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmJienAyeHdzcnE3YW1zcjVhdjF1OHJybmVueWE0MHIzd2JwbnphZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FjcsLGyxj1D2DUqFkj/giphy.gif">
<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWZ0cjB2eTdubTM4cTN2bHpzY2tyNTUxbTc5bW8xZTNzbjcyd25zcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NnoaV9WhdHLusgvtVT/giphy.gif">
<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXA3a2hidTlqZjB1NHZ0OGd6aGRib29kdmMwMXZ2M3cycjIxb2xleiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/q8BbNW4FTlATTOJDB3/giphy.gif">
## Benefits

By using Brizo, developers can enjoy numerous benefits, such as:

1. **Streamlined Cluster Testing**: Brizo automates the security benchmarking of your cluster.

2. **Improved Cluster Structure for Autoscaling**: Brizo helps developers identify potential bottlenecks in their K8s cluster, which helps improve autoscaling capabilities.

3. **Intuitive Dashboards**: Brizo offers easy to read, live data charts to visually represent important cluster metrics scraped by Prometheus.

## Privacy Statement

Brizo scrapes your K8s cluster for the purpose of displaying metrics and running CIS security protocol benchmark tests. The application does not extract or store any personal data from users. However, as a precaution, developers should avoid using sensitive information when generating clusters. This ensures that no sensitive data is inadvertently recorded or stored in the database.

## Installation

1. Ensure you have the required prerequisites installed:
    - [npm](https://www.npmjs.com/)
    - [kubectl](https://kubernetes.io/docs/tasks/tools/)
    - [EKS Cluster](#EKS) or [Minikube Cluster](#Minikube)
    - [Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)
    - [Grafana Cloud](https://grafana.com/products/cloud/)

2. Fork the Brizo repository to your own GitHub account.
3. Clone your forked repository to your local machine.

```bash
git clone https://github.com/<YOUR-GITHUB-USERNAME>/brizo.git
```

4. Navigate to the root project directory and install dependencies.

```bash
cd brizo
npm install
```

## EKS-Setup
1. Create an [EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html)
  - Make sure your instance matches cpu architecture
2. Set up [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
3. Connect [Prometheus](https://docs.aws.amazon.com/eks/latest/userguide/prometheus.html)
4. Expose the Prometheus service: 
  - ```kubectl --namespace=prometheus port-forward deploy/prometheus-server 9090```
5. Connect [Grafana](https://aws.amazon.com/quickstart/architecture/eks-grafana/)
6. Expose the Grafana service: 
  - ```kubectl port-forward -n grafana svc/grafana 30381:80```
7. Build the [Kube-Bench](#Kube-Bench-EKS) Job

## Minikube Setup
1. Create a [Minkube Cluster](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/)
2. Install [Helm](https://helm.sh/docs/intro/install/)
3. Create a Prometheus service with [Helm](https://helm.sh/docs/intro/install/)
  - ```helm repo add prometheus-community https://prometheus-community.github.io/helm-charts```
  - ```helm repo update```
  - ```helm install prometheus prometheus-community/prometheus```
  - ```kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-ext```
  - ```minikube service prometheus-server-ext```
4. Create a Grafana service with [Helm](https://helm.sh/docs/intro/install/)
  - ```helm repo add grafana https://grafana.github.io/helm-charts```
  - ```helm repo update```
  - ```helm install grafana grafana/grafana```
  - ```kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-ext```
  - ```minikube service grafana-ext```
5. Get username and password for Grafana login
  - ```kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo```

## Kube-Bench-EKS
1. ```aws ecr create-repository --repository-name k8s/kube-bench --image-tag-mutability MUTABLE```
- ```git clone https://github.com/aquasecurity/kube-bench.git```
- ```cd kube-bench```
- ```aws ecr get-login-password --region <YOUR_AWS_REGION> | docker login --username AWS --password-stdin <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.<YOUR_AWS_REGION>.amazonaws.com```
- ```docker build -t kube-bench kube-bench```
- ```docker tag kube-bench:latest <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.<YOUR_AWS_REGION>.amazonaws.com/k8s/kube-bench:latest```
- ```docker push <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.<YOUR_AWS_REGION>.amazonaws.com/k8s/kube-bench:latest```
- ```eksctl create iamidentitymapping --cluster <YOUR_EKS_CLUSTER_NAME> --region=<YOUR_AWS_REGION> --arn     arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:user/<YOUR_IAM_USERNAME> --group system:masters --username admin```

## Scripts

Below are descriptions of each npm script:

- `npm run dev`: Starts the development server using Nodemon

## File Structure

```
|____assets
| |____brizo-high-resolution-color-logo.png
| |____Team
| | |____Anna.png
| | |____Cortland.png
| | |____DAWG.png
| | |____Owen.png
| | |____Weston.png
|____kbcommands.md
|____output.txt
|____.eslintrc.json
|____functions.ts
|____src
| |____server
| | |____routers
| | | |____apiRouter.ts
| | | |____securityRouter.ts
| | | |____clusterRouter.ts
| | | |____prometheusRouter.ts
| | | |____k6Router.ts
| | |____controllers
| | | |____k6Controller.ts
| | | |____securityController.ts
| | | |____clusterController.ts
| | | |____prometheusController.ts
| | |____server.ts
| |____client
| | |____index.tsx
| | |____App.tsx
| | |____index.html
| | |____css
| | | |____main.scss
| | | |____skeleton.css
| | | |____normalize.css
| | |____components
| | | |____MemoryUsageChart.tsx
| | | |____ViewNamespace.tsx
| | | |____GrandCISResults.tsx
| | | |____ViewStructure.tsx
| | | |____PodCard.tsx
| | | |____NavbarComponent.tsx
| | | |____NodeCard.tsx
| | | |____MainContainer.tsx
| | | |____StaticPromComponent.tsx
| | | |____CpuUsageChart.tsx
| | | |____ViewCluster.tsx
| | | |____DynamicPromComponent.tsx
| | | |____Loading.tsx
| | | |____CISConfigResult.tsx
```

## Our Team 

<table style="width:40%;">
  <tr>
    <td>
      <img src="./assets/Team/Cortland.png" style="width:6rem;" />
    </td>
    <td>
      <strong>Cortland Young</strong><br/>
      <a href="https://github.com/CortlandY">GitHub</a><br/>
      <a href="https://www.linkedin.com/in/cortland-young-008185222/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./assets/Team/Owen2.png" style="width:6rem;" />
    </td>
    <td>
      <strong>Owen Hill</strong><br/>
      <a href="https://github.com/owenpa">GitHub</a><br/>
      <a href="https://www.linkedin.com/in/on-hill/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./assets/Team/Jimmy.jpg" style="width:6rem;" />
    </td>
    <td>
      <strong>Jimmy Tran</strong><br/>
      <a href="https://github.com/itazurakozo/">GitHub</a><br/>
      <a href="https://www.linkedin.com/in/jimmytgtran/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./assets/Team/Weston.png" style="width:6rem;" />
    </td>
    <td>
      <strong>Weston Schott</strong><br/>
      <a href="https://github.com/wexy021">GitHub</a><br/>
      <a href="https://www.linkedin.com/in/weston-s-0930a5234/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./assets/Team/Anna.png" style="width:6rem;" />
    </td>
    <td>
      <strong>Anna Yu</strong><br/>
      <a href="https://github.com/Anna-QY">GitHub</a><br/>
      <a href="https://www.linkedin.com/in/anna-q-yu/">LinkedIn</a>
    </td>
  </tr>
  <tr>
</table>

## License

This project is licensed under the terms of the [MIT LICENSE](./LICENSE).
