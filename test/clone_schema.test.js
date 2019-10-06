'use strict';

const convert = require('../');
const should = require('should');

it('cloning schema by default', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: ['string', 'null'],
	};

	const result = await convert(schema);

	const expected = {
		type: 'string',
		nullable: true,
	};

	should(result).deepEqual(expected, 'result does not match the expected');
	should(result).not.deepEqual(schema, 'the schema was modified in place');
});

it('cloning schema with cloneSchema option', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: ['string', 'null'],
	};

	const result = await convert(schema, { cloneSchema: true });

	const expected = {
		type: 'string',
		nullable: true,
	};

	should(result).deepEqual(expected, 'result does not match the expected');
	should(result).not.deepEqual(schema, 'the schema was modified in place');
});

it('direct schema modification', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: ['string', 'null'],
	};

	const result = await convert(schema, { cloneSchema: false });

	const expected = {
		type: 'string',
		nullable: true,
	};

	should(result).deepEqual(expected, 'result does not match the expected');
	should(result).deepEqual(schema, 'the schema was not modified in place');
});
