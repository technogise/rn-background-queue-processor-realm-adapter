import RealmAdapter from "../../src/RealmAdapter";
import realmdb from '../../realmConfig';
import JobSchema from "../../src/local-db/JobSchema";
import FailedJobSchema from "../../src/local-db/FailedJobSchema";
import Job from "../__mocks__/Job";

describe('Test RealmAdapter', () => {
    test('should test addItem', (done) => {
        const adapter = new RealmAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 1,
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        adapter.addItem(job1);
        adapter.addItem(job2);
        const entity1 = {
            [JobSchema.COLUMN_ID]: jobToBeCreated1.id,
            [JobSchema.COLUMN_NAME]: jobToBeCreated1.name,
            [JobSchema.COLUMN_PARAM]: JSON.stringify(jobToBeCreated1.param),
            [JobSchema.COLUMN_PRIORITY]: jobToBeCreated1.priority,
            [JobSchema.COLUMN_RETRY_INTERVAL]: jobToBeCreated1.retryInterval,
            [JobSchema.COLUMN_MAX_RETRIES]: jobToBeCreated1.maxRetries,
        };
        const entity2 = {
            [JobSchema.COLUMN_ID]: jobToBeCreated2.id,
            [JobSchema.COLUMN_NAME]: jobToBeCreated2.name,
            [JobSchema.COLUMN_PARAM]: JSON.stringify(jobToBeCreated2.param),
            [JobSchema.COLUMN_PRIORITY]: jobToBeCreated2.priority,
            [JobSchema.COLUMN_RETRY_INTERVAL]: jobToBeCreated1.retryInterval,
            [JobSchema.COLUMN_MAX_RETRIES]: jobToBeCreated1.maxRetries,
        };
        setTimeout(() => {
            expect(realmdb.create).toHaveBeenCalledTimes(2);
            expect(realmdb.create).toHaveBeenCalledWith(
                JobSchema.NAME, entity1
            );
            expect(realmdb.create).toHaveBeenCalledWith(
                JobSchema.NAME, entity2
            );
            done();
        });
    });

    test('should test addFailedItem', (done) => {
        realmdb.mockClear();
        const adapter = new RealmAdapter();
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 1,
        };
        const job = new Job(jobToBeCreated);
        adapter.addFailedItem(job);
        const entity1 = {
            [FailedJobSchema.COLUMN_ID]: jobToBeCreated.id,
            [FailedJobSchema.COLUMN_NAME]: jobToBeCreated.name,
            [FailedJobSchema.COLUMN_PARAM]: JSON.stringify(jobToBeCreated.param),
            [FailedJobSchema.COLUMN_PRIORITY]: jobToBeCreated.priority,
            [FailedJobSchema.COLUMN_RETRY_INTERVAL]: jobToBeCreated.retryInterval,
            [FailedJobSchema.COLUMN_MAX_RETRIES]: jobToBeCreated.maxRetries
        };
        setTimeout(() => {
            expect(realmdb.create).toHaveBeenCalledTimes(1);
            expect(realmdb.create).toHaveBeenCalledWith(
                FailedJobSchema.NAME, entity1
            );
            done();
        });
    });

    test('should test remove', () => {
        const adapter = new RealmAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 1,
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        adapter.addItem(job1);
        adapter.addItem(job2);
        adapter.remove(jobToBeCreated1.id);
        expect(realmdb.delete).toHaveBeenCalledTimes(1);
    });

    test('should test getLength', () => {
        realmdb.setObjects([{
            id: '87897',
            name: 'test',
            param: 'jhhggfh',
            priority: 1,
        }, {
            id: '877',
            name: 'test',
            param: 'jhhggfh',
            priority: 1,
        }]);
        const adapter = new RealmAdapter();
        const len = adapter.getLength();
        expect(len).toBe(2);
    });

    test('should getAllItem', () => {
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 1,
        };
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
            priority: 2,
        };
        realmdb.setObjects([jobToBeCreated1, jobToBeCreated2]);
        const adapter = new RealmAdapter();
        const items = adapter.getAllItems();
        expect(items).toEqual([jobToBeCreated1, jobToBeCreated2]);
    });

    test('should getTopItem', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob',
            param: 'testParam',
            priority: 1,
        };
        const job = new Job(jobToBeCreated);
        const adapter = new RealmAdapter(Job.prototype);
        realmdb.setSortedMockCollection(job, JobSchema.COLUMN_PRIORITY);
        const item = adapter.getTopItem();
        expect(item instanceof Job).toBeTruthy();
        expect(item.job.id).toBe('testid');
        expect(item.job.name).toBe('testJob');
        expect(item.job.param).toBe('testParam');
        expect(item.job.priority).toBe(1);
        expect(item.job.retryInterval).toBe(2000);
        expect(item.job.maxRetries).toBe(5);
    });
});
