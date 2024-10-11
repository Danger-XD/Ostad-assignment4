import app from "./app.js";
import { PORT } from "./configs/configs.js";

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})