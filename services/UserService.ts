import User from "@/types/models/User";
import Service from "./Service";


export default class UserService extends Service<User>
{
    constructor()
    {
        super("users")
    }
}
