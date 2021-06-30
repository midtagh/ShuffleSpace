class TimeShift {
    constructor({workerId, start, end, id}) {
        this.workerId = workerId;
        this.start = start;
        this.end = end;
        this.id = id;
    }

    startTimeShift = time => {
        this.start = time;
    };

    endTimeShift = time => {
        this.end = time;
    }

    getDuration = () => {
        if (!this.start || !this.end) throw new Error('shift is not completed.')
        return this.end.getTime() - this.start.getTime();
    }

    toSpec = () => {
        return {
            workerId: this.workerId,
            start: this.start,
            end: this.end,
            id: this.id,
            isActive: this.start && this.end === undefined
        };
    };

    static fromSpec = spec => {
        const {workerId, start, end, id} = spec;
        return new TimeShift({workerId, start, end, id});
    };
}


export default TimeShift;