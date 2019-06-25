import {SubjectsModel} from "./school/SubjectsModel";

import {LMSmodel} from "./school/LMSmodel";

import {TeachersModel} from "./school/TeachersModel";

import {PupilsModel} from "./school/PupilsModel";

import {GroupsModel} from "./school/GroupsModel";

import {GradebooksModel} from "./school/GradebooksModel";

const teacherSchema = {
    dateOfBirth: "10-03-1980",
    description: "Hello world",
    emails: [{ email: "mushni.chankseliani.1@btu.edu.ge", primary: true }],
    image: "Photo",
    name: { first: "Mushni", last: "Chankseliani" },
    phones: [{ phone: "577577577", primary: false }],
    sex: "male", subjects: [{ subject: "History" }],
};

const pupilSchema = {
    dateOfBirth: "10-03-2000",
    description: "Hello world",
    image: "Picture",
    name: { first: "Mush", last: "Chanks" },
    phones: [{ phone: "577588577", primary: false }],
    sex: "male",
};

const pupilSchemaSecond = {
    description: "Hello again",
    name: { first: "Mu", last: "Ch" },
    phones: [{ phone: "577588599", primary: false}, { phone: "599557558", primary: true}],
    sex: "male",
};

(async () => {
    const history = new SubjectsModel({
        description: "Hello History",
        lessons: 24,
        title: "History",
    });
    // console.log(history)
    const lms = new LMSmodel();
    await lms.add(history);

    const teacher = new TeachersModel();
    const teacherID = await teacher.add(teacherSchema);

    const pupil = new PupilsModel();
    const pupilId = await pupil.add(pupilSchema);
    await pupil.update(pupilId, pupilSchemaSecond);

    const group = new GroupsModel(pupil);
    const groupID = await group.add(236);
    await group.addPupil(groupID, pupilId);
    await group.readAll();

    const level = 1;
    const grade = await new GradebooksModel(group, teacher, lms);
    const gradebook = await grade.add(level, groupID);

    const record = {
        lesson: 3,
        mark: 7,
        pupilId: {pupilId},
        subjectId: history,
        teacherId: teacherID};

    await grade.addRecord(gradebook, record);

    const me = await grade.read(gradebook, pupilId);
    const result = await grade.readAll(gradebook);
    console.log(me);
    console.log(result);
})();
