import { Response, Request, Router } from "express";

const router = Router();

router.get("/chat", async (req: Request, res: Response) => {
    res.sendFile(__dirname + '/public/index.html')
});

export { router as chatRouter };