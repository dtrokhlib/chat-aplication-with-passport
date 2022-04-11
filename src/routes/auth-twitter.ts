import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/auth/signin/twitter',
  passport.authenticate('twitter'),
  async (req: Request, res: Response) => {
    res.redirect('/');
  }
);

export { router as authTwitterRouter };
