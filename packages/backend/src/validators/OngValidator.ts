import { RequestHandler } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

class OngValidator {
	createValidate(): RequestHandler {
		return celebrate({
			[Segments.BODY]: Joi.object().keys({
				name: Joi.string().required(),
				email: Joi.string().required().email(),
				whatsapp: Joi.number().required().min(10).max(11),
				city: Joi.string().required(),
				uf: Joi.string().required().length(2),
			}),
		});
	}
}

export default new OngValidator();
