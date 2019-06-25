import {createId} from "./idMaker";

interface TeacherSchema {
    name: {
        first: string,
        last: string,
    };
    image: string;
    dateOfBirth: Date;
    emails: [
        {
        email: string,
        primary: boolean,
        }
    ];
    phones: [
        {
        phone: string,
        primary: boolean,
        }
    ];
    sex: string;
    subjects: [
        {
        subject: string,
        }
    ];
    description: string;
}
class TeachersModel {
    public name: {
        first: string,
        last: string,
    };
    public image: string;
    public dateOfBirth: Date;
    public emails: [
        {
        email: string,
        primary: boolean,
        }
    ];
    public phones: [
        {
        phone: string,
        primary: boolean,
        }
    ];
    public sex: string;
    public subjects: [
        {
        subject: string,
        }
    ];
    public description: string;
    protected teachers: any;

    constructor() {
        this.teachers = new Map();
    }

    public async add(teacher: object) {
        const id = createId();
        this.teachers.set(id, teacher);
        return id;
    }

    public async read(id: string) {
        return { id, ...this.teachers.get(id) };
    }

    public async update(id: string, teacher: object) {
        return this.teachers.set(id, teacher);
    }

    public async remove(id: string) {
        this.teachers.delete(id);
    }
}

export {TeachersModel};
