import { Router } from "express";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";

const specificationsRouter = Router();

const createSpecificationController = new CreateCategoryController();

specificationsRouter.post("/", createSpecificationController.handle);

export { specificationsRouter };
