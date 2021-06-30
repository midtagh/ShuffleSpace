import Project from '../Project.js';
import TimeShift from '../timeShift/TimeShift.js';


test('can create a project from spec successfully', () => {
    const spec = {
        title: 'my awesome project',
        id: '1',
        userId: '2',
        timeShifts: [
            {
                workerId: '12',
                id: '22',
                start: new Date(2021, 5, 4),
                end: new Date(2021, 5, 6),
            },
            {
                workerId: '16',
                id: '34',
                start: new Date(2021, 5, 7),
                end: new Date(2021, 5, 8)
            },
        ]
    };

    const project = Project.fromSpec(spec);

    expect(project.id).toBe('1');
    expect(project.title).toBe('my awesome project');
    expect(project.userId).toBe('2');
    expect(project.timeShifts).toHaveLength(2);
    expect(project.timeShifts[0]).toBeInstanceOf(TimeShift);
});

test('can add a time shift to a project successfully', () => {
    const spec = {
        title: 'my awesome project',
        id: '1',
        userId: '2',
        timeShifts: [
            {
                workerId: '12',
                id: '22',
                start: new Date(2021, 5, 4),
                end: new Date(2021, 5, 6)
            },
            {
                workerId: '16',
                id: '34',
                start: new Date(2021, 5, 7),
                end: new Date(2021, 5, 8)
            },
        ]
    };

    const project = Project.fromSpec(spec);

    const newTimeShift = TimeShift.fromSpec({
        workerId: '55',
        id: '99'
    });

    project.addTimeShift(newTimeShift);

    expect(project.timeShifts).toHaveLength(3);
});

test('can update a timeShift successfully', () => {
    const spec = {
        title: 'my awesome project',
        id: '1',
        userId: '2',
        timeShifts: [
            {
                workerId: '12',
                id: '22',
                start: new Date(2021, 5, 4)
            }
        ]
    };

    const project = Project.fromSpec(spec);

    const timeShift = project.getTimeShiftById('22');
    timeShift.endTimeShift(new Date(2021, 5, 7));

    project.updateTimeShift(timeShift);

    const updatedTimeShift = project.getTimeShiftById('22');
    expect(updatedTimeShift.end).toEqual(new Date(2021, 5, 7));
});

test('can scan a barcode first time successfully', () => {
    const spec = {
        title: 'my awesome project',
        id: '1',
        userId: '2',
        timeShifts: [
            {
                workerId: '16',
                id: '34',
                start: new Date(2021, 5, 7),
            },
        ]
    };

    const project = Project.fromSpec(spec);

    project.scanBarcode("12");
    expect(project.timeShifts).toHaveLength(2);
})


test('can scan a barcode second time successfully', () => {
    const spec = {
        title: 'my awesome project',
        id: '1',
        userId: '2',
        timeShifts: [
            {
                workerId: '16',
                id: '34',
                start: new Date(2021, 5, 7),
            },
        ]
    };

    const project = Project.fromSpec(spec);
    project.scanBarcode('16');

    expect(project.timeShifts).toHaveLength(1);
    expect(project.timeShifts[0].end).not.toBeUndefined();
})

test('can get project total work time successfully', () => {
    const spec = {
        title: 'my awesome project',
        id: '1',
        userId: '2',
        timeShifts: [
            {
                workerId: '12',
                id: '22',
                start: new Date(2021, 5, 4),
                end: new Date(2021, 5, 6)
            },
            {
                workerId: '16',
                id: '34',
                start: new Date(2021, 5, 7),
                end: new Date(2021, 5, 8)
            },
        ]
    };

    const project = Project.fromSpec(spec);

    const totalWork = project.getProjectTotalWork();

    expect(totalWork).toBe(
        (spec.timeShifts[0].end.getTime() - spec.timeShifts[0].start.getTime()) +
        (spec.timeShifts[1].end.getTime() - spec.timeShifts[1].start.getTime())
    );
});

test('can convert project to spec successfully', () => {
    const spec = {
        title: 'my awesome project',
        id: '1',
        userId: '2',
        timeShifts: [
            {
                workerId: '12',
                id: '22',
                start: new Date(2021, 5, 4),
                end: new Date(2021, 5, 6),
                isActive: false
            },
            {
                workerId: '16',
                id: '34',
                start: new Date(2021, 5, 7),
                end: new Date(2021, 5, 8),
                isActive: false
            },
        ],
        duration: 259200000
    };

    const projectSpec = Project.fromSpec(spec).toSpec();

    expect(projectSpec).toEqual(spec);
});