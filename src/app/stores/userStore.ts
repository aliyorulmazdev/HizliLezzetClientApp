import { makeAutoObservable, runInAction } from "mobx";
import { LoginFormValues, RegisterFormValues, User } from "../types/interfaces";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: LoginFormValues) => {
    try {
      const loginresponse = await agent.Account.login(creds);
      console.log(loginresponse);
      router.navigate('/');
    } catch (error) {
      // Handle login error
      console.error("Error during login:", error);
    }
  };  

  register = async (creds: RegisterFormValues) => {
    const user = await agent.Account.register(creds);
    console.log(user);
    router.navigate('/');
  };

  logout = () => {
    store.commonStore.setToken(null);
    localStorage.removeItem('jwt');
    this.user = null;
    router.navigate('/login')
  }
}
