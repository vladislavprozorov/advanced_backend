/**
 * Node modules
 */
import { Router } from 'express';

const router = Router();
router.get('/', (req, res) => {
  res
    .status(200)
    .send({
      msg: 'API is live',
      status: 'ok',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
});
export default router;
