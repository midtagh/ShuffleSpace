import TimeShift from '../TimeShift.js';

test('can create time shift successfully', () => {
    const spec = {
        workerId: '1',
        id: '2'
    };

    const timeShift = TimeShift.fromSpec(spec);

    expect(timeShift.workerId).toBe('1');
    expect(timeShift.id).toBe('2');
});

test('can successfully start a time shift', () => {
    const spec = {
        workerId: '1',
        id: '2'
    };

    const timeShift = TimeShift.fromSpec(spec);
    const startTime = new Date();
    timeShift.startTimeShift(startTime);

    expect(timeShift.start).toEqual(startTime);
});

test('can successfully end a time shift', () => {
    const spec = {
        workerId: '1',
        id: '2'
    };

    const timeShift = TimeShift.fromSpec(spec);
    const endTime = new Date();
    timeShift.endTimeShift(endTime);

    expect(timeShift.end).toEqual(endTime);
});

test('can calculate duration successfully', () => {
    const spec = {
        workerId: '1',
        id: '2',
        start: new Date(2021, 5, 1, 20, 1, 5),
        end: new Date(2021, 5, 1, 21, 5, 6),
    };

    const timeShift = TimeShift.fromSpec(spec);

    const duration = timeShift.getDuration();
    expect(duration).toBe(spec.end.getTime() - spec.start.getTime());
});

test('calculating duration of uncompleted time shift fails', () => {
    const spec = {
        workerId: '1',
        id: '2',
        start: new Date(2021, 5, 1, 20, 1, 5),
    };

    const timeShift = TimeShift.fromSpec(spec);

    expect(() => timeShift.getDuration()).toThrow();
});

test('can convert time shift to spec successfully', () => {
    const spec = {
        workerId: '1',
        id: '2',
        start: new Date(2021, 5, 1, 20, 1, 5),
        end: new Date(2021, 5, 1, 21, 5, 6),
        isActive: false
    };

    const timeShift = TimeShift.fromSpec(spec);
    const timeShiftSpec = timeShift.toSpec();

    expect(timeShiftSpec).toEqual(spec);
});