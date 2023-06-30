import type { Request, Response, NextFunction } from 'express';
import type { newPromObject, promQueryObject } from '../../../types';

const promURL = 'http://localhost:9090/api/v1/query?query=';

const prometheusController = {
  getDefaultMetrics: async (req: Request, res: Response, next: NextFunction) => {
    // destructure queries from request body
    const { queries } = req.body;

    // initialize empty array for default metrics we are scraping
    const defaultMetrics: newPromObject[] = [];
    try {
      // iterate over queries array
      for (const query of queries) {
        // query prometheus
        const response = await fetch(promURL + String(query));

        // parse response
        const data = await response.json();

        // iterate over data results
        data.data.result.forEach((element: promQueryObject) => {
          // define new element to be pushed into array
          const newElement: newPromObject = {
            queryName: element.metric.__name__,
            container: element.metric?.container,
            pod: element.metric.pod,
            name: element.metric.name,
            value: element.value![1]
          };

          // push new element to array
          defaultMetrics.push(newElement);
        });
      }

      // store default metrics on res.locals
      res.locals.defaultMetrics = defaultMetrics;

      // move to next middleware
      next();
    } catch (error) {
      // error handling
      next(error);
    }
  }
};

export default prometheusController;
