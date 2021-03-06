import Realm from 'realm';

/**
 * Schema for Job
 */
export default class JobSchema extends Realm.Object {
    /**
     * Table name
     *
     * @return {string} table name
     * @constructor
     */
    static get NAME() {
        return 'Jobs';
    }

    /**
     * Job id column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_ID() {
        return 'id';
    }

    /**
     * Priority column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_PRIORITY() {
        return 'priority';
    }

    /**
     * Job name column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_NAME() {
        return 'name';
    }


    /**
     * param column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_PARAM() {
        return 'param';
    }

    /**
     * retryInterval column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_RETRY_INTERVAL() {
        return 'retryInterval';
    }

    /**
     * maxRetries column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_MAX_RETRIES() {
        return 'maxRetries';
    }
}

JobSchema.schema = {
    name: JobSchema.NAME,
    primaryKey: JobSchema.COLUMN_ID,
    properties: {
        [JobSchema.COLUMN_ID]: 'string',
        [JobSchema.COLUMN_NAME]: 'string',
        [JobSchema.COLUMN_PARAM]: 'string',
        [JobSchema.COLUMN_PRIORITY]: 'int',
        [JobSchema.COLUMN_RETRY_INTERVAL]: 'int',
        [JobSchema.COLUMN_MAX_RETRIES]: 'int',
    },
};
