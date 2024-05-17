import { Tache } from "./tache";

export class user {
    _id!: string;
    nom!: string;
    email!: string;
    motdepasse!:string;
    role!:string;
    taches: Tache[] = [];
}

