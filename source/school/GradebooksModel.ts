import {createId} from "./idMaker";

import { TeachersModel } from "./TeachersModel";

interface RecordSchema {
    pupilId: string;
    teacherId: string;
    subjectId: void;
    lesson: number;
    mark: number;
}
class GradebooksModel implements RecordSchema {
    public gradeBook: any;
    public groups: any;
    public teachers: any;
    public LMS: any;
    public pupilId: string;
    public teacherId: string;
    public subjectId: any;
    public lesson: number;
    public mark: number;

    constructor(groups: object, teachers: object, LMS: object) {
        this.gradeBook = new Map();
        this.groups = groups;
        this.teachers = teachers;
        this.LMS = LMS;
    }

    public async add(level: number, groupID: string) {
        if (!level || typeof level !== "number") {
            throw new Error("typeof of level must be a number");
        }
        const id = createId();
        this.gradeBook.set( id, { level, groupID, records: [] });
        return id;
    }

    public async clear() {
        return this.gradeBook.clear();
    }

    public async addRecord(id: string, record: object) {
        if (!this.gradeBook.has(id)) {
            throw new Error("wrong parameter");
        }
        this.gradeBook.get(id).records.push(record);
    }

    public async read(id: string, pupil: string) {
        const records = this.gradeBook.get(id).records.filter((record: any) => record.pupilId === pupil);
        const { name: { first, last } } = await this.groups.pupil.read(pupil);
        const result = { name: `${first} ${last}`, records};

        for (const { teacherId, subjectId, lesson, mark } of records) {
            if (!teacherId) {
                break;
            }
            const { name: { first, last } } = await this.teachers.read(teacherId);
            const { title: subject } = await this.LMS.read(subjectId.id);
            result.records.push({ teacher: `${first} ${last}`, subject, lesson, mark });
        }

        return result;
    }

    public async readAll(id: string) {
        const records = this.gradeBook.get(id).records;
        const result = new Map();
        for (const { pupilId, teacherId, subjectId, lesson, mark } of records) {
            if (!result.has(pupilId)) {
                const { name: { first, last } } = await this.groups.pupil.read(records[0].pupilId);
                result.set(pupilId, { name: `${first} ${last}`, records : [] });
            }
            const { name: { first, last } } = await this.teachers.read(teacherId);
            const { title: subject } = await this.LMS.read(subjectId.id);
            result.get(pupilId).records.push({ teacher: `${first} ${last}`, subject, lesson, mark });
        }

        return Array.from(result.values());
    }
}

export { GradebooksModel };
