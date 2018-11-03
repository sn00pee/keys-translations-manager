import React from 'react'
import PropTypes from 'prop-types'

const SideBar = props => (
	<div className="navbar-default sidebar" role="navigation">
		<div className="sidebar-nav navbar-collapse nav">
			<ul className="nav" id="side-menu">
				<li className="sidebar-search">
					{/*<InputPanel/>*/}
					{props.children}
				</li>
				{/*<li>
					<a href="index.html">
						<i className="fa fa-dashboard fa-fw"></i> Dashboard
					</a>
				</li>*/}
			</ul>
		</div>
	</div>
);

SideBar.propTypes = {
	children: PropTypes.node
};

export default SideBar
