/**
 * Node modules
 */
import { rateLimit } from 'express-rate-limit';
/**
 * Custom modules
 */
const limiter = rateLimit({
  windowMs: 60000,
  limit: 60, // максимум 60 запрос по айпи
  standardHeaders: 'draft-8', // последний стандарт заголовков
  legacyHeaders: false,
  message: {
    error:
      'Вы отправили слишком большое кол-во запросов в определенный промежуток времени. Пожалуйста, попробуйте позже',
  },
});
export default limiter;
