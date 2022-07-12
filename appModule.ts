import {UserRepository} from "./user/userRepository.ts"
import {UserService} from "./user/userService.ts"
import { Injector, Singleton, Transient } from "https://deno.land/x/deninject/mod.ts";

class AppModule {

}

export default new Injector(new AppModule());
