import type { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import fs from 'fs';

// type imports
import type {
  allTestInfoType,
  allTestInfoEKSType,
  indexObjectType,
  sectionResultsInfo
} from '../../../types';

const securityController = {
  // this method runs kube bench tool for cis testing, writes the log to output.text, and sends the info to the front end
  runKubeBenchLocal: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // create kube bench job
      await securityController.applyKubeBenchJob('tests/cis/job.yaml', next);

      // get pod name of kube bench job
      const podName = await securityController.getKubeBenchPodName();

      // grab the log of the kube bench pod
      const kubeBenchOutput = await securityController.getKubeBenchPodLog(
        podName
      );

      // write kube bench pod log to output.txt
      securityController.writeOutputData(kubeBenchOutput, next);

      // parse kube bench pod log data before sending to front end
      const allTestInfo = securityController.filterOutputData(
        kubeBenchOutput.split('\n')
      );

      // save parsed kube bench pod log data on res.locals
      res.locals.allTestInfo = allTestInfo;

      // move to next middleware
      next();
    } catch (error) {
      // error handling
      next(error);
    }
  },

  runKubeBenchEKS: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // create kube bench job
      await securityController.applyKubeBenchJob('tests/cis/job-eks.yaml', next);

      // get pod name of kube bench job
      const podName = await securityController.getKubeBenchPodName();

      // grab the log of the kube bench pod
      const kubeBenchOutput = await securityController.getKubeBenchPodLog(
        podName
      );

      // write kube bench pod log to output.txt
      securityController.writeOutputData(kubeBenchOutput, next);

      // filter kube bench pod log data before sending to front end
      const allTestInfoEKS = securityController.filterOutputDataEKS(
        kubeBenchOutput.split('\n')
      );

      // save parsed kube bench pod log data on res.locals
      res.locals.allTestInfoEKS = allTestInfoEKS;

      // move to next middleware
      next();
    } catch (error) {
      // error handling
      next(error);
    }
  },

  // method to apply job
  applyKubeBenchJob: async (jobPath: string, next: NextFunction) => {
    // define command to create kube bench test as a job
    const command = `kubectl apply -f ${jobPath}`;

    // run command using exec
    exec(command, (error) => {
      if (error !== null) {
        // error handling
        console.log('Error applying kube bench job.');
        next(error);
      }
    });
  },

  // method to get pod name
  getKubeBenchPodName: async () => {
    // return a promise of type string for grabbing the pod log later
    return await new Promise<string>((resolve, reject) => {
      // define command to find the kube bench pod name
      const command =
        'kubectl get pods -l job-name=kube-bench -o=jsonpath="{.items[0].metadata.name}"';

      // run command with exec
      exec(command, (error, stdout) => {
        if (error !== null) {
          // error handling
          console.log('Error getting kube bench pod name.');
          // change state of promise to 'rejected' and pass in the reason (error)
          reject(error);
        }

        // trim whitespace from pod name string
        const podName = stdout.trim();

        // change state of promise to 'fulfilled' and pass in the fulfillment value (podName)
        resolve(podName);
      });
    });
  },

  // method to get pod log
  getKubeBenchPodLog: async (podName: string) => {
    // return a promise of type string which will be the log of the kube bench pod
    return await new Promise<string>((resolve, reject) => {
      // define command to display kube bench pod log
      const command = `kubectl logs ${podName}`;

      // run command with exec
      exec(command, (error, stdout) => {
        if (error !== null) {
          // error handling
          console.log('Error getting kube bench pod log.');
          // change state of promise to 'rejected' and pass in reason (error)
          reject(error);
        }

        // trim whitespace from output
        const kubeBenchOutput = stdout.trim();

        // change state of promise to 'fulfilled' and pass in fulfillment value (kubeBenchOutput)
        resolve(kubeBenchOutput);
      });
    });
  },

  // method to write output.txt file
  writeOutputData: (content: string, next: NextFunction) => {
    // use fs to write kube bench output to output.txt
    fs.writeFile('output.txt', content, (error) => {
      if (error !== null) {
        // error handling
        console.log('Error writing output file.');
        next(error);
      }
      console.log('Output file written successfully.');
    });
  },

  filterOutputData: (outputData: string[]) => {
    // initialize test results array
    const allTestResults: string[] = [];

    // iterate through outputData and store test results in test results array
    outputData.forEach((line) => {
      if (
        line.includes('[PASS]') ||
        line.includes('[WARN]') ||
        line.includes('[FAIL]')
      ) {
        allTestResults.push(line);
      }
    });

    // initialize index variables to slice sections from testLines
    /* initialize outside of for loop so we can access for object assignment below
      the assigned boolean is used to make sure we find the first index and don't reassign later.
      for example, if our first test starts with '1.1.1', it would be reassigned on test '1.1.11' later.
      the assigned property accounts for this
    */

    // SECTION 1 INDICES
    const cpsctStart: indexObjectType = {
      position: 0,
      assigned: false
    };
    const cpsctEnd: indexObjectType = {
      position: 0,
      assigned: false
    };

    // SECTION 2 INDICES
    const encStart: indexObjectType = {
      position: 0,
      assigned: false
    };
    const encEnd: indexObjectType = {
      position: 0,
      assigned: false
    };

    // SECTION 3 INDICES
    const cpcStart: indexObjectType = {
      position: 0,
      assigned: false
    };
    const cpcEnd: indexObjectType = {
      position: 0,
      assigned: false
    };

    // SECTION 4 INDICES
    const wnscStart: indexObjectType = {
      position: 0,
      assigned: false
    };
    const wnscEnd: indexObjectType = {
      position: 0,
      assigned: false
    };

    // SECTION 5 INDICES
    const kpStart: indexObjectType = {
      position: 0,
      assigned: false
    };
    const kpEnd: indexObjectType = {
      position: 0,
      assigned: false
    };

    // isolate test results by section -> find index positions to slice test results array
    for (let index = 0; index < allTestResults.length; index += 1) {
      // SECTION 1: Control Plane Security Configuration
      // find first index position to slice from testLines array
      if (
        allTestResults[index].includes('1.1.1') &&
        !cpsctStart.assigned
      ) {
        cpsctStart.position = index;
        cpsctStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index].includes('1.4.2') &&
        !cpsctEnd.assigned
      ) {
        cpsctEnd.position = index;
        cpsctEnd.assigned = true;
      }

      // SECTION 2: Etcd Node Configuration
      // find first index position to slice from testLines array
      if (
        allTestResults[index].includes(
          '2.1 Ensure that the --cert-file and --key-file arguments'
        ) &&
        !encStart.assigned
      ) {
        encStart.position = index;
        encStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index].includes(
          '2.7 Ensure that a unique Certificate Authority'
        ) &&
        !encEnd.assigned
      ) {
        encEnd.position = index;
        encEnd.assigned = true;
      }

      // SECTION 3: Control Plane Configuration
      // find first index position to slice from testLines array
      if (
        allTestResults[index].includes('3.1.1') &&
        !cpcStart.assigned
      ) {
        cpcStart.position = index;
        cpcStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index].includes('3.2.2') &&
        !cpcEnd.assigned
      ) {
        cpcEnd.position = index;
        cpcEnd.assigned = true;
      }

      // SECTION 4: Worker Node Security Configuration
      // find first index position to slice from testLines array
      if (
        allTestResults[index].includes('4.1.1') &&
        !wnscStart.assigned
      ) {
        wnscStart.position = index;
        wnscStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index].includes('4.2.13') &&
        !wnscEnd.assigned
      ) {
        wnscEnd.position = index;
        wnscEnd.assigned = true;
      }

      // SECTION 5: Kubernetes Policies
      // find first index position to slice from testLines array
      if (
        allTestResults[index].includes('5.1.1') &&
        !kpStart.assigned
      ) {
        kpStart.position = index;
        kpStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index].includes('5.7.4') &&
        !kpEnd.assigned
      ) {
        kpEnd.position = index;
        kpEnd.assigned = true;
      }
    }

    // create object to store testResults array, remediations array, and summary array for the given section
    const controlPlaneSecurityConfiguration: sectionResultsInfo = {
      testResults: allTestResults.slice(
        cpsctStart.position,
        cpsctEnd.position + 1
      ),
      remediations: securityController.condenseRemediations(
        outputData.slice(
          outputData.indexOf('== Remediations master =='),
          outputData.indexOf('== Summary master ==')
        )
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary master =='),
        outputData.indexOf('== Summary master ==') + 5
      )
    };

    // create object to store testResults array, remediations array, and summary array for the given section
    const etcdNodeConfiguration: sectionResultsInfo = {
      testResults: allTestResults.slice(encStart.position, encEnd.position + 1),
      remediations: securityController.condenseRemediations(
        outputData.slice(
          outputData.indexOf('== Remediations etcd =='),
          outputData.indexOf('== Summary etcd ==')
        )
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary etcd =='),
        outputData.indexOf('== Summary etcd ==') + 5
      )
    };

    // create object to store testResults array, remediations array, and summary array for the given section
    const controlPlaneConfiguration: sectionResultsInfo = {
      testResults: allTestResults.slice(cpcStart.position, cpcEnd.position + 1),
      remediations: securityController.condenseRemediations(
        outputData.slice(
          outputData.indexOf('== Remediations controlplane =='),
          outputData.indexOf('== Summary controlplane ==')
        )
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary controlplane =='),
        outputData.indexOf('== Summary controlplane ==') + 5
      )
    };

    // create object to store testResults array, remediations array, and summary array for the given section
    const workerNodeSecurity: sectionResultsInfo = {
      testResults: allTestResults.slice(
        wnscStart.position,
        wnscEnd.position + 1
      ),
      remediations: securityController.condenseRemediations(
        outputData.slice(
          outputData.indexOf('== Remediations node =='),
          outputData.indexOf('== Summary node ==')
        )
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary node =='),
        outputData.indexOf('== Summary node ==') + 5
      )
    };

    // create object to store testResults array, remediations array, and summary array for the given section
    const kubernetesPolicies: sectionResultsInfo = {
      testResults: allTestResults.slice(kpStart.position, kpEnd.position + 1),
      remediations: securityController.condenseRemediations(
        outputData.slice(
          outputData.indexOf('== Remediations policies =='),
          outputData.indexOf('== Summary policies ==')
        )
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary policies =='),
        outputData.indexOf('== Summary policies ==') + 5
      )
    };

    const totalSummary: string[] = outputData.slice(
      outputData.indexOf('== Summary total =='),
      outputData.indexOf('== Summary total ==') + 5
    );

    // create all test info object to return to runKubeBench to be sent to front end
    // this object stores all the objects we just created for individual sections
    const allTestInfo: allTestInfoType = {
      controlPlaneSecurityConfiguration,
      etcdNodeConfiguration,
      controlPlaneConfiguration,
      workerNodeSecurity,
      kubernetesPolicies,
      totalSummary
    };

    // return allTestInfo object to be sent to front end
    return allTestInfo;
  },

  filterOutputDataEKS: (outputData: string[]) => {
    // initialize test results array
    const allTestResults: string[] = [];

    // iterate through outputData and store test results in test results array
    outputData.forEach((line) => {
      if (
        line.includes('[PASS]') ||
        line.includes('[WARN]') ||
        line.includes('[FAIL]')
      ) {
        allTestResults.push(line);
      }
    });

    // initialize index variables to slice sections from testLines
    /* initialize outside of for loop so we can access for object assignment below
      the assigned boolean is used to make sure we find the first index and don't reassign later.
      for example, if our first test starts with '1.1.1', it would be reassigned on test '1.1.11' later.
      the assigned property accounts for this
    */

    // SECTION 4 INDICES
    const wnscStart: indexObjectType = {
      position: 0,
      assigned: false
    };
    const wnscEnd: indexObjectType = {
      position: 0,
      assigned: false
    };

    // isolate test results by section -> find index positions to slice test results array
    for (let index = 0; index < allTestResults.length; index += 1) {
      // SECTION 4: Worker Node Security Configuration
      // find first index position to slice from testLines array
      if (
        allTestResults[index].includes('3.1.1') &&
        !wnscStart.assigned
      ) {
        wnscStart.position = index;
        wnscStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index].includes('3.3.1') &&
        !wnscEnd.assigned
      ) {
        wnscEnd.position = index;
        wnscEnd.assigned = true;
      }
    }

    // create object to store testResults array, remediations array, and summary array for the given section
    const workerNodeSecurity: sectionResultsInfo = {
      testResults: allTestResults.slice(
        wnscStart.position,
        wnscEnd.position + 1
      ),
      remediations: securityController.condenseRemediations(
        outputData.slice(
          outputData.indexOf('== Remediations node =='),
          outputData.indexOf('== Summary node ==')
        )
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary node =='),
        outputData.indexOf('== Summary node ==') + 5
      )
    };

    const totalSummary: string[] = outputData.slice(
      outputData.indexOf('== Summary total =='),
      outputData.indexOf('== Summary total ==') + 5
    );

    // create all test info object to return to runKubeBench to be sent to front end
    // this object stores all the objects we just created for individual sections
    const allTestInfoEKS: allTestInfoEKSType = {
      workerNodeSecurity,
      totalSummary
    };

    // return allTestInfo object to be sent to front end
    return allTestInfoEKS;
  },

  condenseRemediations: (remediationsArr: string[]) => {
    const parsedRemediations: string[] = [];
    let combinedString = '';

    for (let index = 1; index < remediationsArr.length; index += 1) {
      if (remediationsArr[index] === '') {
        if (combinedString !== '') {
          parsedRemediations.push(combinedString);
          combinedString = '';
        }
      } else {
        combinedString += remediationsArr[index];
      }
    }
    if (combinedString !== '') parsedRemediations.push(combinedString);
    return parsedRemediations;
  }
};

export default securityController;
