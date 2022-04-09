import { Response, Request, Router } from "express";
import path from 'path';

const router = Router();

router.get("/chat", async (req: Request, res: Response) => {
    if(true) {
        res.sendFile(path.resolve(__dirname + '/../public/register.html'));
    } else {
        res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    }
});

export { router as chatRouter };