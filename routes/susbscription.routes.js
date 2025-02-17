import { Router } from "express";
import { createSubscription, getSubscriptions } from "../controllers/subscription.controller.js";
import  authMiddleware  from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", createSubscription);

subscriptionRouter.get("/:id", createSubscription);

subscriptionRouter.post("/", authMiddleware, createSubscription);

subscriptionRouter.put("/", (req, res) => res.send({ title: "UPDATE subscription" }));

subscriptionRouter.delete("/", (req, res) => res.send({ title: "DELETE subscriptions" }));

subscriptionRouter.get("/user/:id", authMiddleware, getSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "CANCEL subscription" }));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "GET upcoming renewals" }));


export default subscriptionRouter;
