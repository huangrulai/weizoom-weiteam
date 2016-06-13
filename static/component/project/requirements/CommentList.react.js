/**
 * Copyright(c) 2012-2016 weizoom
 */
"use strict";

var debug = require('debug')('m:project.requirements:RequirementsPage:CommentList');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var classNames = require('classnames');

var Reactman = require('reactman');

var Store = require('./Store');
var Constant = require('./Constant');
var Action = require('./Action');
var NewRequirementDialog = require('./NewRequirementDialog.react');
var EditRequirementDialog = require('./EditRequirementDialog.react');

require('./style.css');

var CommentList = React.createClass({
	getInitialState: function() {
		return {
			isInEditMode: false,
			commentInEdit: '',
			comments: this.props.comments
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			comments: nextProps.comments
		})
	},

	onClickAddComment: function(event) {
		event.preventDefault();
		event.stopPropagation();

		var projectId = this.props.projectId;
		var requirementId = this.props.requirementId;

		Reactman.Resource.put({
			resource: "project.requirement_comment",
			data: {
				project_id: projectId,
				requirement_id: requirementId,
				content: this.state.commentInEdit
			},
			scope: this,
			success: function(data) {
				var comments = this.state.comments;
				comments.push(data);

				this.refs.input.clear();

				this.setState({
					isInEditMode: false,
					commentInEdit: '',
					comments: comments
				});
			}
		});
	},

	onClickEnterEditMode: function(event) {
		event.preventDefault();
		event.stopPropagation();
		this.setState({
			isInEditMode: true
		});

		_.delay(_.bind(function() {
			this.refs.input.focus();

			if (this.props.onEnterEditMode) {
				this.props.onEnterEditMode();
			}
		}, this), 100);
	},

	onClickCancelEditMode: function(event) {
		event.preventDefault();
		event.stopPropagation();

		this.refs.input.clear();

		this.setState({
			isInEditMode: false
		});
	},

	onChange: function(value, event) {
		var property = event.target.getAttribute('name');
		var newState = {};
		newState[property] = value;
		this.setState(newState);
	},

	renderActionArea: function() {
		var cButton = null;
		var richtextInputStyle = {};
		if (this.state.isInEditMode) {
			cButton = (
				<span className="fr">
					<button className="btn btn-danger btn-xs mr5" onClick={this.onClickCancelEditMode}><span className="glyphicon glyphicon-remove"></span> 取消</button>
					<button className="btn btn-primary btn-xs" onClick={this.onClickAddComment}><span className="glyphicon glyphicon-ok"></span> 提交</button>
				</span>
			)
		} else {
			richtextInputStyle = {
				'display': 'none'
			}
			cButton = <button className="btn btn-success btn-xs fr" onClick={this.onClickEnterEditMode}><span className="glyphicon glyphicon-plus"></span> 评论</button>;
		}

		return (
			<div className="xui-i-actionArea">
				<div style={richtextInputStyle}>
					<Reactman.FormRichTextInput name="commentInEdit" value={this.state.commentInEdit} label="" height={200} width={this.props.width-60} onChange={this.onChange} ref="input" />
				</div>
				{cButton}
			</div>
		);
	},

	render: function() {		
		var cComments = this.state.comments.map(function(comment, index) {
			return (
				<div className="xui-i-comment" key={index}>   
					<div className="clearfix">        
						<div className="fl"><img src={comment.creater.thumbnail} className="xui-i-thumbnail" /></div>
						<div className="fl ml10" dangerouslySetInnerHTML={{__html: comment.content}}></div>
					</div>
					<div className="xui-i-date">{comment.createdAt}</div>
				</div>
			)
		});

		var cActionArea = this.renderActionArea();

		return (
		<div className="xui-project-requirementCommentList">
			{cComments}

			{cActionArea}
		</div>
		);
	}
});

module.exports = CommentList;