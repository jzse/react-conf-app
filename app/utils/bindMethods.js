// @flow
/*
	Bind your component's methods

	constructor(props) {
		super(props);
		bindMethods.call(this, ['handleClick', 'handleOther']);
	}
*/

export default function bindMethods (functions: Array<string>) {
	functions.forEach(f => (this[f] = this[f].bind(this)));
};
