class LMSmodel {
    public subjects: any;
    constructor() {
        this.subjects = new Map();
    }

    public async add(subject: any) {
        this.subjects.set(subject.id, subject);
    }

    public async remove(id: string) {
        this.subjects.delete(id);
    }
    public async verify(id: string) {
        return this.subjects.has(id);
    }

    public async read(id: string) {
        return this.subjects.get(id);
    }

    public async readAll() {
        return this.subjects.values().map((subjectId: string) => ({ subjectId }));
    }
}

export {LMSmodel};
