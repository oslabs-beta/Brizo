import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import { json } from 'stream/consumers';
import fs from 'fs';

// type imports
import { indexObjectType } from '../../../types';
import { sectionResultsInfo } from '../../../types';
import { testResultsObjectType } from '../../../types';

const securityController = {
  // this method runs kube bench tool for cis testing
  runKubeBench: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // define command to run in terminal
      // apply job.yaml file to run tests as a Kubernetes job/POD
      const command = 'kubectl apply -f tests/cis/job.yaml';

      // execute command in terminal with exec
      exec(command, (error, stdout, stderr) => {
        // check for error
        if (error) {
          return next(error);
        }

        // get name of kube bench pod to access the logged test results
        const getPodNameCommand =
          'kubectl get pods -l job-name=kube-bench -o=jsonpath="{.items[0].metadata.name}"';

        // execute command in terminal with exec
        exec(getPodNameCommand, (error, stdout, stderr) => {
          if (error) {
            return next(error);
          }

          // trim output, do not parse yet so we can use it in the next command as a string
          const podName = stdout.trim();

          // get log of kube bench pod to view testing results
          const podLogCommand = `kubectl logs ${podName}`;

          // execute command in terminal with exec
          exec(podLogCommand, (error, stdout, stderr) => {
            if (error) {
              return next(error);
            }

            // trim output and store in variable
            const kubeBenchOutput = stdout.trim();

            // write kubeBenchOutput to output.txt file
            fs.writeFile('output.txt', kubeBenchOutput, (error) => {
              if (error) {
                return next({ error: 'Error writing to output file.' });
              } else console.log('Output file written successfully.');
            });

            // grab output.txt and parse it with helper function 
            // this way we can send data in meaningful chunks to front end
            fs.readFile('output.txt', 'utf-8', (error, data) => {
              if (error) {
                return next({ error: 'Error reading output file.' });
              }
              console.log('Output file read successfully.');

              // split data file into array of lines and store it in outputLines const
              const outputLines = data.split('\n');

              // invoke parseDataOutput function and pass in jsonOutputLines array
              const allTestInfo =
                securityController.parseOutputData(outputLines);

              // store the parsed data on res.locals 
              res.locals.allTestInfo = allTestInfo;

              // move to next middleware
              return next();
            });
          });
        });
      });
    } catch (error) {
      // error handling
      console.log('Error running kube bench.');
      return next(error);
    }
  },

  // helper function to parse the data produced by kube bench
  parseOutputData: (outputData: String[]) => {
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
    // initialize outside of for loop so we can access for object assignment below
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
    const allTestInfo: testResultsObjectType = {
      controlPlaneSecurityConfiguration,
      etcdNodeConfiguration,
      controlPlaneConfiguration,
      workerNodeSecurity,
      kubernetesPolicies,
      totalSummary,
    };

    return allTestInfo;
  },
};

export default securityController;
