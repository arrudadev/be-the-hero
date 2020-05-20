import { RequestHandler } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

class SessionValidator {
	createValidate(): RequestHandler {
		return celebrate({
			[Segments.BODY]: Joi.object().keys({
				id: Joi.string().required(),
			}),
		});
	}
}

export default new SessionValidator();
