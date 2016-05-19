/**
 * Copyright(c) 2012-2016 weizoom
 */
"use strict";

var debug = require('debug')('m:project.projects:TopNavActions');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

var Reactman = require('reactman');

var NewProjectDialog = require('./NewProjectDialog.react');


var TopNavActions = React.createClass({
	onClickAddProject: function(event) {
		Reactman.PageAction.showDialog({
			title: "创建团队", 
			component: NewProjectDialog, 
			data: {},
			success: function(inputData, dialogState) {
				alert('haha');
			}
		});
	},

	render:function(){
		return (
		<button className="navbar-btn btn-default btn navbar-right mr5" onClick={this.onClickAddProject}>
			<span className="glyphicon glyphicon-plus"></span>
			添加团队
		</button>
		)
	}
});

module.exports = TopNavActions;

