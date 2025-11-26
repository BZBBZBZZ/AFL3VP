import express from "express";
import { CustomerController } from "../controllers/customer-controller";
import { RestaurantController } from "../controllers/restaurant-controller";
import { OrderController } from "../controllers/order-controller";

export const publicRouter = express.Router();

publicRouter.post("/customers", CustomerController.create);
publicRouter.get("/customers", CustomerController.list); 
publicRouter.get("/customers/:id", CustomerController.get);
publicRouter.patch("/customers/:id", CustomerController.update);
publicRouter.delete("/customers/:id", CustomerController.delete);

publicRouter.post("/restaurants", RestaurantController.create);
publicRouter.get("/restaurants", RestaurantController.list); 
publicRouter.get("/restaurants/:id", RestaurantController.get);
publicRouter.patch("/restaurants/:id", RestaurantController.update);
publicRouter.delete("/restaurants/:id", RestaurantController.delete);

publicRouter.post("/orders", OrderController.create);
publicRouter.get("/orders", OrderController.list);