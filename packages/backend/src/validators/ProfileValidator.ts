import { RequestHandler } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

class ProfileValidator {
	indexValidate(): RequestHandler {
		return celebrate({
			[Segments.HEADERS]: Joi.object({
				authorization: Joi.string().required(),
			}).unknown(),
		});
	}
}

export default new ProfileValidator();
