import {createId} from "./idMaker";

class GroupsModel {
    public groups: any;
    public pupil: any;

    constructor(pupil: object) {
        this.groups = new Map();
        this.pupil = pupil;
    }

    public async add(room: number) {
        const id = createId();
        this.groups.set(id, {room, students: new Set()});
        return id;
    }

    public async read(id: string) {
        this.conclution(id);
        return {id, ...this.groups.get(id)};
    }

    public async remove(id: string) {
        this.conclution(id);
        this.groups.delete(id);
    }

    public async update(id: string, room: number) {
        this.conclution(id);
        this.groups.set(id, room);
    }

    public async readAll() {
        const result: any = [];
        this.groups.forEach(({...group}: any, id: string): any => {
            group.students = Array.from(group.students);
            result.push( { id, ...group});
        });

        return result;
    }

    public async addPupil(id: string, pupil: string) {
        if (this.groups.has(id)) {
            this.groups.get(id).students.add(pupil);
        } else {
            throw new Error("Unknown id !");
        }
    }

    public async removePupil(id: string, pupil: string) {
        if ( this.groups.has(id) ) {
            this.groups.get(id).students.delete(pupil);
        } else {
            throw new Error("Unknown id!");
        }
    }

    protected conclution(id: string) {
        if ( !this.groups.has(id) ) {
            throw new Error("User not found with this id");
        }
    }
}

export { GroupsModel };
