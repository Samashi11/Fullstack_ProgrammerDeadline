import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
     res.send(
          "Halo! Server Express dengan TypeScript berjalan super cepat di Bun 🚀",
     );
});

app.listen(port, () => {
     console.log(`Server berjalan di http://localhost:${port}`);
});
