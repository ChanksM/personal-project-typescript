import {createId} from "./idMaker";

interface SubjSchema {
    title: string;
    lessons: number;
    description: string;
}

class SubjectsModel implements SubjSchema {
    public title: string;
    public lessons: number;
    public description: string;
    public id: string;

    constructor(subject: SubjSchema) {
        this.title = subject.title;
        this.lessons = subject.lessons;
        this.description = subject.description;
        this.id = createId();
    }
}

export {SubjectsModel};
