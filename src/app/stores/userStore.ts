import { makeAutoObservable, runInAction } from "mobx";
import { LoginFormValues, User } from "../types/interfaces";
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
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token)
    runInAction(() => this.user = user);
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
