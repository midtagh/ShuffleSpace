import TimeShift from './timeShift/TimeShift.js';

class Project {
    constructor({title, id, userId}) {
        this.title = title;
        this.id = id;
        this.userId = userId; //customerId
        this.timeShifts = [];
    }

    addTimeShift = timeShift => {
        this.timeShifts.push(timeShift);
    };

    updateTimeShift = timeShift => {
        this.timeShifts = this.timeShifts.filter(x => x.id !== timeShift.id);
        this.timeShifts.push(timeShift);
    };

    getTimeShiftById = id => {
        const timeShift = this.timeShifts.find(x => x.id === id);
        if (!timeShift) throw new Error('time shift not found.')
        return timeShift;
    };

    getProjectTotalWork = () => this.timeShifts
            .reduce((acc, value) => {
                try {
                    return acc + value.getDuration();
                } catch {
                    return acc;
                }
            }, 0);

    scanBarcode = workerId => {
        const availableTimeShift = this.timeShifts
            .find(ts => ts.workerId === workerId && !ts.end)

        if(availableTimeShift) {
            availableTimeShift.endTimeShift(new Date());
        } else {
            const timeShiftSpec = {
                workerId,
                id: this.timeShifts.length+1,
                start: new Date()
            }
            const timeShift = TimeShift.fromSpec(timeShiftSpec);
            this.addTimeShift(timeShift);
        }
    }

    toSpec = () => {
        const projectSpec = {
            title: this.title,
            id: this.id,
            userId: this.userId,
            timeShifts: []
        };
        this.timeShifts
            .forEach(timeShift => {
                projectSpec.timeShifts.push(timeShift.toSpec())
            });
        projectSpec.duration = this.getProjectTotalWork();

        return projectSpec;
    };

    static fromSpec = spec => {
        const {title, id, userId, timeShifts} = spec;
        const project = new Project({
            title,
            id,
            userId
        });
        timeShifts
            .forEach(shiftSpec => {
                const timeShift = TimeShift.fromSpec(shiftSpec);
                project.addTimeShift(timeShift);
            });
        return project;
    };
}


export default Project;