import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';


const securityController = {

  runKubeBench: async (req: Request, res: Response, next: NextFunction) => {
    try {

      // define command to run in terminal
      // ----------------> NEED TO FIGURE OUT WHAT CIS YAML PATH IS <---------------- //
      const command = 'minikube ssh -- kube-bench run --config <cis_yaml_path> --ouput json';

      // execute command in terminal with exec
      exec(command, (error, stdout, stderr) => {
        
        // check for error
        if (error) {
          return next(error);
        }

        // parse the standard output 
        const kubeBenchOutput = JSON.parse(stdout);

        // save kube bench output to res.locals
        res.locals.kubeBenchOutput = kubeBenchOutput;

        // move to next middleware
        return next();
      })
    } catch (error) {

      // error handling
      console.log('Error running kube bench.');
      return next(error);
    }
  }

};

export default securityController;