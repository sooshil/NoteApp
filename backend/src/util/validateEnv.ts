import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators"

export default cleanEnv(process.env, {
    MongoConnectionString: str(),
    PortNumber: port(),
    SESSION_SECRET: str()
})