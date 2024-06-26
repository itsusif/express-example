import { Router } from "express";
const router = Router();

import ExampleController from "../../controllers/v1/example";

router
    .route('/')
    .get(ExampleController.getExample);



export default router;