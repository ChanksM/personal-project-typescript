import {createId} from "./idMaker";

interface PupilSchema {
    name: {
        first: string,
        last: string,
    };
    image: string;
    dateOfBirth: Date;
    phones: [
        {
        phone: string,
        primary: boolean,
        }
    ];
    sex: string;
    description: string;
}

class PupilsModel{
    public pupils: any;
    public name: {
        first: string,
        last: string,
    };
    public image: string;
    public dateOfBirth: Date;
    public phones: [
        {
        phone: string,
        primary: boolean,
        }
    ];
    public sex: string;
    public description: string;

    constructor() {
        this.pupils = new Map();
    }

    public async add(pupil: object) {
        const id = createId();
        this.pupils.set(id, pupil);

        return id;
    }

    public async read(id: string) {
        return { id, ...this.pupils.get(id)};
    }

    public async update(id: string, pupil: object) {
        return this.pupils.set(id, pupil);
    }

    public async remove(id: string) {
        this.pupils.delete(id);
    }
}

export { PupilsModel };
