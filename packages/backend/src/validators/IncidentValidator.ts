import { RequestHandler } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

class IncidentValidator {
	indexValidate(): RequestHandler {
		return celebrate({
			[Segments.QUERY]: Joi.object().keys({
				page: Joi.number(),
			}),
		});
	}

	createValidate(): RequestHandler {
		return celebrate({
			[Segments.HEADERS]: Joi.object({
				authorization: Joi.string().required(),
			}).unknown(),
			[Segments.BODY]: Joi.object().keys({
				title: Joi.string().required(),
				description: Joi.string().required(),
				value: Joi.number().required(),
			}),
		});
	}

	deleteValidate(): RequestHandler {
		return celebrate({
			[Segments.HEADERS]: Joi.object({
				authorization: Joi.string().required(),
			}).unknown(),
			[Segments.PARAMS]: Joi.object().keys({
				page: Joi.number().required(),
			}),
		});
	}
}

export default new IncidentValidator();
