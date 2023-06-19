import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import fs from 'fs';

// type imports
import { indexObjectType } from '../../../types';
import { sectionResultsInfo } from '../../../types';
import { testResultsObjectType } from '../../../types';

const securityController = {
  // this method runs kube bench tool for cis testing, writes the log to output.text, and sends the info to the front end
  runKubeBench: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // create kube bench job
      securityController.applyKubeBenchJob(next);

      // get pod name of kube bench job
      const podName: string = await securityController.getKubeBenchPodName(
        next
      );

      // grab the log of the kube bench pod
      const kubeBenchOutput = await securityController.getKubeBenchPodLog(
        podName,
        res,
        next
      );

      // write kube bench pod log to output.txt
      securityController.writeOutputData(kubeBenchOutput, next);

      // parse kube bench pod log data before sending to front end
      const allTestInfo = await securityController.parseOutputData(
        kubeBenchOutput.split('\n'),
        next
      );

      // save parsed kube bench pod log data on res.locals
      res.locals.allTestInfo = allTestInfo;

      // move to next middleware
      return next();
    } catch (error) {
      // error handling
      return next(error);
    }
  },

  // method to apply job
  applyKubeBenchJob: async (next: NextFunction) => {
    // define command to create kube bench test as a job
    const command = 'kubectl apply -f tests/cis/job.yaml';

    // run command using exec
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // error handling
        console.log('Error applying kube bench job.');
        return next(error);
      }

      // return out of function once job is created
      return;
    });
  },

  // method to get pod name
  getKubeBenchPodName: async (next: NextFunction) => {
    // return a promise of type string for grabbing the pod log later
    return new Promise<string>((resolve, reject) => {
      // define command to find the kube bench pod name
      const command =
        'kubectl get pods -l job-name=kube-bench -o=jsonpath="{.items[0].metadata.name}"';

      // run command with exec
      exec(command, (error, stdout, stderr) => {
        if (error) {
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
  getKubeBenchPodLog: async (
    podName: string,
    res: Response,
    next: NextFunction
  ) => {
    // return a promise of type string which will be the log of the kube bench pod
    return new Promise<string>((resolve, reject) => {
      // define command to display kube bench pod log
      const command = `kubectl logs ${podName}`;

      // run command with exec
      exec(command, (error, stdout, stderr) => {
        if (error) {
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
      if (error) {
        // error handling
        console.log('Error writing output file.');
        return next(error);
      }
      console.log('Output file written successfully.');

      // return out of function
      return;
    });
  },

  parseOutputData: (outputData: String[], next: NextFunction) => {
    // initialize test results array
    const allTestResults: String[] = [];

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
    let cpsctStart: indexObjectType = {
      position: 0,
      assigned: false,
    };
    let cpsctEnd: indexObjectType = {
      position: 0,
      assigned: false,
    };

    // SECTION 2 INDICES
    let encStart: indexObjectType = {
      position: 0,
      assigned: false,
    };
    let encEnd: indexObjectType = {
      position: 0,
      assigned: false,
    };

    // SECTION 3 INDICES
    let cpcStart: indexObjectType = {
      position: 0,
      assigned: false,
    };
    let cpcEnd: indexObjectType = {
      position: 0,
      assigned: false,
    };

    // SECTION 4 INDICES
    let wnscStart: indexObjectType = {
      position: 0,
      assigned: false,
    };
    let wnscEnd: indexObjectType = {
      position: 0,
      assigned: false,
    };

    // SECTION 5 INDICES
    let kpStart: indexObjectType = {
      position: 0,
      assigned: false,
    };
    let kpEnd: indexObjectType = {
      position: 0,
      assigned: false,
    };

    // isolate test results by section -> find index positions to slice test results array
    for (let index = 0; index < allTestResults.length; index += 1) {
      // SECTION 1: Control Plane Security Configuration
      // find first index position to slice from testLines array
      if (
        allTestResults[index] !== undefined &&
        allTestResults[index].includes('1.1.1') &&
        !cpsctStart.assigned
      ) {
        cpsctStart.position = index;
        cpsctStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index] !== undefined &&
        allTestResults[index].includes('1.4.2') &&
        !cpsctEnd.assigned
      ) {
        cpsctEnd.position = index;
        cpsctEnd.assigned = true;
      }

      // SECTION 2: Etcd Node Configuration
      // find first index position to slice from testLines array
      if (
        allTestResults[index] !== undefined &&
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
        allTestResults[index] !== undefined &&
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
        allTestResults[index] !== undefined &&
        allTestResults[index].includes('3.1.1') &&
        !cpcStart.assigned
      ) {
        cpcStart.position = index;
        cpcStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index] !== undefined &&
        allTestResults[index].includes('3.2.2') &&
        !cpcEnd.assigned
      ) {
        cpcEnd.position = index;
        cpcEnd.assigned = true;
      }

      // SECTION 4: Worker Node Security Configuration
      // find first index position to slice from testLines array
      if (
        allTestResults[index] !== undefined &&
        allTestResults[index].includes('4.1.1') &&
        !wnscStart.assigned
      ) {
        wnscStart.position = index;
        wnscStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index] !== undefined &&
        allTestResults[index].includes('4.2.13') &&
        !wnscEnd.assigned
      ) {
        wnscEnd.position = index;
        wnscEnd.assigned = true;
      }

      // SECTION 5: Kubernetes Policies
      // find first index position to slice from testLines array
      if (
        allTestResults[index] !== undefined &&
        allTestResults[index].includes('5.1.1') &&
        !kpStart.assigned
      ) {
        kpStart.position = index;
        kpStart.assigned = true;
      }
      // find last index position to slice from testLines array
      if (
        allTestResults[index] !== undefined &&
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
      remediations: outputData.slice(
        outputData.indexOf('== Remediations master =='),
        outputData.indexOf('== Summary master ==')
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary master =='),
        outputData.indexOf('== Summary master ==') + 5
      ),
    };

    // create object to store testResults array, remediations array, and summary array for the given section
    const etcdNodeConfiguration: sectionResultsInfo = {
      testResults: allTestResults.slice(encStart.position, encEnd.position + 1),
      remediations: outputData.slice(
        outputData.indexOf('== Remediations etcd =='),
        outputData.indexOf('== Summary etcd ==')
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary etcd =='),
        outputData.indexOf('== Summary etcd ==') + 5
      ),
    };

    // create object to store testResults array, remediations array, and summary array for the given section
    const controlPlaneConfiguration: sectionResultsInfo = {
      testResults: allTestResults.slice(cpcStart.position, cpcEnd.position + 1),
      remediations: outputData.slice(
        outputData.indexOf('== Remediations controlplane =='),
        outputData.indexOf('== Summary controlplane ==')
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary controlplane =='),
        outputData.indexOf('== Summary controlplane ==') + 5
      ),
    };

    // create object to store testResults array, remediations array, and summary array for the given section
    const workerNodeSecurity: sectionResultsInfo = {
      testResults: allTestResults.slice(
        wnscStart.position,
        wnscEnd.position + 1
      ),
      remediations: outputData.slice(
        outputData.indexOf('== Remediations node =='),
        outputData.indexOf('== Summary node ==')
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary node =='),
        outputData.indexOf('== Summary node ==') + 5
      ),
    };

    // create object to store testResults array, remediations array, and summary array for the given section
    const kubernetesPolicies: sectionResultsInfo = {
      testResults: allTestResults.slice(kpStart.position, kpEnd.position + 1),
      remediations: outputData.slice(
        outputData.indexOf('== Remediations policies =='),
        outputData.indexOf('== Summary policies ==')
      ),
      summary: outputData.slice(
        outputData.indexOf('== Summary policies =='),
        outputData.indexOf('== Summary policies ==') + 5
      ),
    };

    const totalSummary: String[] = outputData.slice(
      outputData.indexOf('== Summary total =='),
      outputData.indexOf('== Summary total ==') + 5
    );

    // create all test info object to return to runKubeBench to be sent to front end
    // this object stores all the objects we just created for individual sections
    const allTestInfo: testResultsObjectType = {
      controlPlaneSecurityConfiguration,
      etcdNodeConfiguration,
      controlPlaneConfiguration,
      workerNodeSecurity,
      kubernetesPolicies,
      totalSummary,
    };

    // return allTestInfo object to be sent to front end
    return allTestInfo;
  },
};

export default securityController;
