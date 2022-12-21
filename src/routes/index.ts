import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRouter } from './specifications.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRouter);

export { routes };
