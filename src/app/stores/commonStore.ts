import { makeAutoObservable } from "mobx";

export default class CommonStore {
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setToken = (token: string | null) => {
        if(token) localStorage.setItem('jwt', token);
        this.token = token;
    }
}