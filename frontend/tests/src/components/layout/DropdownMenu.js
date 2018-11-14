import DropdownMenu from '../../../../src/components/layout/DropdownMenu'

function setup() {
	const props = {
			lang: 'en-US',
			loadMessages: sinon.spy(),
			showImportModal: sinon.spy(),
			findMergeable: sinon.spy()
		},
		wrapper = shallow(<DropdownMenu {...props}/>);

	return {
		props,
		wrapper
	}
}

describe('(component) DropdownMenu', () => {
	it('should render as a <ul>', () => {
		const { wrapper } = setup()
		expect(wrapper.type()).to.eql('ul');
	});

	describe('child: Import', () => {
		it('should call this.props.showImportModal() if clicked', () => {
			const { wrapper } = setup()
			wrapper.find('.nav').find('a').get(0).props.onClick();
		});
	});

	describe('child: Merge', () => {
		it('should call this.props.findMergeable() if clicked', () => {
			const { props, wrapper } = setup()
			wrapper.find('.nav').find('a').get(1).props.onClick();
			expect(props.findMergeable).calledOnce;
		});
	});

	describe('child: Language', () => {
		describe('if param equals this.props.lang', () => {
			it('shouldn\'t call this.props.loadMessages()', () => {
				const { props, wrapper } = setup()
				wrapper.find('.dropdown-menu').find('a').first().simulate('click');
				expect(props.loadMessages).to.have.not.been.called;
			});
		});

		describe('if param is not equal to this.props.lang', () => {
			it('should call this.props.loadMessages()', () => {
				const { props, wrapper } = setup()
				wrapper.find('.dropdown-menu').find('a').get(1).props.onClick();
				expect(props.loadMessages).calledOnce;

				wrapper.find('.dropdown-menu').find('a').get(2).props.onClick();
				expect(props.loadMessages).calledTwice;
			});
		});
	});

});
