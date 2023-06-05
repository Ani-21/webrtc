import Joi from "joi";
import { schemeValidator } from "../../../services/socket/schemeValidator";

export const login = schemeValidator(
    Joi.object({
        name: Joi.string(),
    })
);
