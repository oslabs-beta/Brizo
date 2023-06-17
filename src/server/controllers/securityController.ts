import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import fs from 'fs';

const securityController = {
  runKubeBench: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // define command to run in terminal
      // ----------------> NEED TO FIGURE OUT WHAT CIS YAML PATH IS <---------------- //
      // const command = 'minikube ssh -- kube-bench run --config <cis_yaml_path> --ouput json';

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
                return next({error: 'Error writing to output file.'});
              } else console.log('Output file written successfully.');
            });

            // store output text file in const 
            fs.readFile('output.txt', 'utf-8', (error, data) => {
              if (error) {
                return next({error: 'Error reading output file.'})
              }
              console.log('Output file read successfully.');

              // split data file into array of lines and store it in outputLines const
              const outputLines = data.split('\n');

              // convert text data to JSON format
              const jsonOutputLines = outputLines.map((line) => {
                const [key] = line.split(':');
                return [key];
              })

              // initialize testLines const 
              const testLines: String[][] = [];

              // isolate individual tests from jsonOutputLines
              jsonOutputLines.forEach(line => {
                // test lines start with pass/warn/fail in []
                if (line[0].includes('[PASS]') || 
                    line[0].includes('[WARN]') || 
                    line[0].includes('[FAIL]')) {
                      testLines.push(line);
                    }
              });
              // save testLines on res.locals as allTestResults 
              // this is an array of test results from all 5 sections 
              res.locals.allTestResults = testLines;

              // save kube bench output to res.locals
              res.locals.kubeBenchOutput = jsonOutputLines;

              // initialize index variables to slice sections from testLines
              let cpsctStart: number = 0;
              let cpsctEnd: number = 61;

              // isolate test results by section
              for (let index = 0; index < testLines.length; index += 1) {
                // SECTION 1: Control Plane Security Configuration
                // find first index position to slice from testLines array 
                if (testLines[0][index] !== undefined && 
                  testLines[0][index].includes('1.1.1')) {
                  cpsctStart = index;
                }
                // find last index position to slice from testLines array 
                else if (testLines[0][index] !== undefined && 
                  testLines[0][index].includes('1.4.1')) {
                  cpsctEnd = index;
                  console.log('HERE');
                  // WHY DO I NEVER ENTER THIS CONDITIONAL BLOCK?
              }
              }
              res.locals.cpsctArr = testLines.slice(cpsctStart, cpsctEnd);
              const controlPlaneSecurityConfigurationTests: Object = {
                controlPlaneNodeConfigFiles: testLines
              }
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
};

export default securityController;
