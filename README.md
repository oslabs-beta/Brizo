# Brizo

  ![Brizo Banner](https://github.com/oslabs-beta/Brizo/blob/dev/assets/brizo-high-resolution-color-logo.png?raw=true)


Brizo is a lightweight developer tool built from scratch to help developers monitor their kubernetes clusters. Prometheus and ChartJS work together to monitor and display important cluster health metrics for a K8s cluster. Brizo also runs your cluster through CIS security testing standards to ensure proper cluster security.

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
8. [Contributions](#contributions)
9. [Our Team](#our-team)
10. [License](#license)


## Features
Brizo offers several key features that make it a valuable tool for kubernetes cluster management:

1. **K8s Cluster Structure Display**: Brizo automatically generates a visual display of your K8s cluster structure, saving you the effort of tracking your cluster manually in the terminal.
2. **Intuitive Interface**: Brizo is a Developer Tool that can be utilized directly in your browser. No more messy walls of text in your terminal.
3. **Compatibility with Multiple Environments**: Brizo is compatible with multiple developer environments, including macOS, Windows, and Linux. Instructions based on your dev environment can be found in the [Installation](#installation) section. 

## Benefits
By using Brizo, developers can enjoy numerous benefits, such as:
1. **Streamlined Cluster Testing**: Brizo automates the security benchmarking of your cluster.
2. **Improved Cluster Structure for Autoscaling**: Brizo helps developers identify potential bottlenecks in their K8s cluster, which helps improve autoscaling capabilities.
3. **Intuitive Dashboards**: Brizo offers customized Grafana dashboards that are tailored to ensure your cluster is set up ideally for autoscaling, and displays it in an intuitive manner.

## Privacy Statement
Brizo scrapes your K8s cluster for the purpose of displaying metrics and running CIS security protocol benchmark tests. The application does not extract or store any personal data from users. However, as a precaution, developers should avoid using sensitive information when generating clusters. This ensures that no sensitive data is inadvertently recorded or stored in the database.

## Installation
1. Ensure you have the required prerequisites installed:
    - [npm](https://www.npmjs.com/)
2. Fork the Brizo repository to your own GitHub account.
3. Clone your forked repository to your local machine.
```bash
git clone https://github.com/<your-github-username>/brizo.git
```
4. Navigate to the root project directory and install dependencies.
```bash
cd brizo
npm install
```

## Scripts
Below are descriptions of each npm script:

- `npm run dev`: Starts the development server using Nodemon

## File Structure
```
.
├── LICENSE
├── README.md
├── server
  └── controllers
  └── routers
├── client
  └── css
  └── components
├── tsconfig.json
├── webpack.config.js
├── types.ts
├── functions.ts
├── package-lock.json
└── package.json
```

## Contributions
We welcome contributions from the community. If you are interested in contributing to this project, please refer to our [Contributing Guidelines]() for more information.


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
      <img src="./assets/Team/Owen.png" style="width:6rem;" />
    </td>
    <td>
      <strong>Owen Hill</strong><br/>
      <a href="https://github.com/owenpa">GitHub</a><br/>
      <a href="https://www.linkedin.com/in/on-hill/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./assets/Team/DAWG.png" style="width:6rem;" />
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
      <strong>Qiong Yu (Anna)</strong><br/>
      <a href="https://github.com/Anna-QY">GitHub</a><br/>
      <a href="https://www.linkedin.com/in/qiong-yu-5040041a0/">LinkedIn</a>
    </td>
  </tr>
  <tr>
</table>


## License
This project is licensed under the terms of the [MIT LICENSE](./LICENSE).







