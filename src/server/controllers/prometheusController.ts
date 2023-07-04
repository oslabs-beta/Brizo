import type { Request, Response, NextFunction } from 'express';
import type { newDynamicPromObject, dynamicPromQueryObject, staticPromQueryObject, newStaticPromObject } from '../../../types';

const promURL = 'http://localhost:9090/api/v1/query?query=';

const prometheusController = {
  getDynamicMetrics: async (req: Request, res: Response, next: NextFunction) => {
    // destructure queries from request body
    const { queries } = req.body;

    // initialize empty array for dynamic metrics we are scraping
    const dynamicMetrics: newDynamicPromObject[] = [];
    try {
      // iterate over queries array
      for (const query of queries) {
        // query prometheus
        const response = await fetch(promURL + String(query));

        // parse response
        const data = await response.json();
        // iterate over data results
        data.data.result.forEach((element: dynamicPromQueryObject) => {
          // define new element to be pushed into array
          if (element.metric.name !== undefined && element.metric.container !== undefined) {
            const newElement: newDynamicPromObject = {
              queryName: element.metric.__name__,
              container: element.metric?.container,
              pod: element.metric.pod,
              name: element.metric.name,
              value: element.value![1]
            };
            // push new element to array
            dynamicMetrics.push(newElement);
          }
        });
      }

      // store dynamic metrics on res.locals
      res.locals.dynamicMetrics = dynamicMetrics;
      // move to next middleware
      next();
    } catch (error) {
      // error handling
      next(error);
    }
  },

  getStaticMetrics: async (req: Request, res: Response, next: NextFunction) => {
    // destructure queries from request body
    const { queries } = req.body;

    // initialize empty array for static metrics we are scraping
    const staticMetrics: newStaticPromObject[] = [];
    try {
      // iterate over queries array
      for (const query of queries) {
        // query prometheus
        const response = await fetch(promURL + String(query));

        // parse response
        const data = await response.json();
        // iterate over data results
        data.data.result.forEach((element: staticPromQueryObject) => {
          // define new element to be pushed into array
          console.log(element);
          if (element.metric.__name__ !== undefined) {
            const newElement: newStaticPromObject = {
              name: element.metric.__name__,
              value: element.value![1]
            };
            // push new element to array
            staticMetrics.push(newElement);
          }
        });
      }

      // store static metrics on res.locals
      res.locals.staticMetrics = staticMetrics;
      // move to next middleware
      next();
    } catch (error) {
      // error handling
      next(error);
    }
  }
};

export default prometheusController;
