import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';

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

            // parse output and store in variable
            const kubeBenchOutput = JSON.parse(stdout.trim());

            // save kube bench output to res.locals
            res.locals.kubeBenchOutput = kubeBenchOutput;

            // move to next middleware
            return next();
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
